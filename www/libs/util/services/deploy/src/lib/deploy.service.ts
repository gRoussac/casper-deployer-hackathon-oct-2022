import { Inject, Injectable } from '@angular/core';
import { ENV_CONFIG, EnvironmentConfig } from '@casper-util/config';
import { TOASTER_TOKEN, Toaster } from '@casper-util/toaster';
import { SDK_TOKEN } from '@casper-util/wasm';
import {
  AddressableEntityHash,
  Bytes,
  PackageHash,
  PricingMode,
  SDK,
  Transaction,
  TransactionBuilderParams,
  TransactionStrParams,
} from 'casper-rust-wasm-sdk';

@Injectable()
export class DeployService {
  constructor(
    @Inject(ENV_CONFIG) public readonly config: EnvironmentConfig,
    @Inject(TOASTER_TOKEN) private readonly toastr: Toaster,
    @Inject(SDK_TOKEN) private readonly sdk: SDK,
  ) {}

  makeTransaction(
    transactionStrParams: {
      chain_name: string;
      initiator_addr: string;
      private_key?: string;
      timestamp?: string;
      ttl?: string;
    },
    sessionStrParams: {
      session_path?: string;
      session_name?: string;
      session_hash?: string;
      session_entry_point?: string;
      session_version?: string;
      session_args_json?: string;
      session_call_package?: boolean;
      is_install_upgrade?: boolean;
    },
    payment_amount: string,
    wasm?: Uint8Array,
  ): Transaction | undefined {
    const { chain_name, initiator_addr, private_key, timestamp, ttl } =
      transactionStrParams;

    const {
      session_path,
      session_name,
      session_hash,
      session_entry_point,
      session_version,
      session_args_json,
      session_call_package,
      is_install_upgrade,
    } = sessionStrParams;

    const transaction_params = new TransactionStrParams(
      chain_name,
      initiator_addr,
      private_key,
      timestamp,
      ttl,
    );
    transaction_params.payment_amount = payment_amount;
    transaction_params.standard_payment = true;
    transaction_params.pricing_mode = PricingMode.Classic;
    if (session_args_json) {
      transaction_params.session_args_json = session_args_json;
    }

    try {
      const builder_params = this.toBuilderParams({
        session_path,
        session_name,
        session_hash,
        session_entry_point,
        session_version,
        session_call_package,
        is_install_upgrade,
        wasm,
      });
      const transaction = this.sdk.make_transaction(
        builder_params,
        transaction_params,
      );
      return transaction.toJson();
    } catch (err) {
      console.error(err);
      this.toastr.error(err as string, 'Error with transaction args');
    }
    return;
  }

  makeTransferTransaction(
    transactionStrParams: {
      chain_name: string;
      initiator_addr: string;
      private_key?: string;
      timestamp?: string;
      ttl?: string;
    },
    target_account: string,
    amount: string,
  ) {
    const { chain_name, initiator_addr, private_key, timestamp, ttl } =
      transactionStrParams;

    const transaction_params = new TransactionStrParams(
      chain_name,
      initiator_addr,
      private_key,
      timestamp,
      ttl,
    );
    transaction_params.payment_amount =
      this.config['gasFeeTransfer'] || '100000000';
    transaction_params.standard_payment = true;
    transaction_params.pricing_mode = PricingMode.Classic;

    try {
      const transaction = this.sdk.make_transfer_transaction(
        undefined,
        target_account,
        amount,
        transaction_params,
        undefined,
      );
      return transaction.toJson();
    } catch (err) {
      console.error(err);
      this.toastr.error(err as string, 'Error with transfer transaction');
    }
    return;
  }

  /** @deprecated Use makeTransaction */
  makeDeploy(
    deployStrParams: {
      chain_name: string;
      session_account: string;
      private_key?: string;
      timestamp?: string;
      ttl?: string;
    },
    sessionStrParams: {
      session_path?: string;
      session_name?: string;
      session_hash?: string;
      session_entry_point?: string;
      session_version?: string;
      session_args_json?: string;
      session_call_package?: boolean;
    },
    payment_amount: string,
    wasm?: Uint8Array,
  ) {
    return this.makeTransaction(
      {
        chain_name: deployStrParams.chain_name,
        initiator_addr: deployStrParams.session_account,
        private_key: deployStrParams.private_key,
        timestamp: deployStrParams.timestamp,
        ttl: deployStrParams.ttl,
      },
      sessionStrParams,
      payment_amount,
      wasm,
    );
  }

  /** @deprecated Use makeTransferTransaction */
  makeTransfer(
    deployStrParams: {
      chain_name: string;
      session_account: string;
      private_key?: string;
      timestamp?: string;
      ttl?: string;
    },
    target_account: string,
    amount: string,
  ) {
    return this.makeTransferTransaction(
      {
        chain_name: deployStrParams.chain_name,
        initiator_addr: deployStrParams.session_account,
        private_key: deployStrParams.private_key,
        timestamp: deployStrParams.timestamp,
        ttl: deployStrParams.ttl,
      },
      target_account,
      amount,
    );
  }

  private toBuilderParams(session: {
    session_path?: string;
    session_name?: string;
    session_hash?: string;
    session_entry_point?: string;
    session_version?: string;
    session_call_package?: boolean;
    is_install_upgrade?: boolean;
    wasm?: Uint8Array;
  }): TransactionBuilderParams {
    if (session.session_path || session.wasm) {
      if (!session.wasm) {
        throw new Error('WASM bytes are required for session transactions');
      }
      return TransactionBuilderParams.newSession(
        Bytes.fromUint8Array(session.wasm),
        session.is_install_upgrade ?? true,
      );
    }

    const entryPoint = session.session_entry_point || 'call';
    if (!session.session_call_package) {
      if (session.session_name) {
        return TransactionBuilderParams.newInvocableEntityAlias(
          session.session_name,
          entryPoint,
        );
      }
      if (session.session_hash) {
        return TransactionBuilderParams.newInvocableEntity(
          this.toAddressableEntityHash(session.session_hash),
          entryPoint,
        );
      }
      throw new Error('session name or hash is required');
    }

    if (session.session_name) {
      return TransactionBuilderParams.newPackageAlias(
        session.session_name,
        entryPoint,
        session.session_version || undefined,
      );
    }
    if (session.session_hash) {
      return TransactionBuilderParams.newPackage(
        this.toPackageHash(session.session_hash),
        entryPoint,
        session.session_version || undefined,
      );
    }
    throw new Error('package name or hash is required');
  }

  private toAddressableEntityHash(raw: string): AddressableEntityHash {
    const value = raw.trim();
    try {
      return AddressableEntityHash.fromFormattedStr(value);
    } catch {
      const hex = value
        .replace(/^entity-contract-/, '')
        .replace(/^entity-/, '')
        .replace(/^hash-/, '')
        .replace(/^contract-/, '');
      return new AddressableEntityHash(hex);
    }
  }

  private toPackageHash(raw: string): PackageHash {
    const value = raw.trim();
    try {
      return PackageHash.fromFormattedStr(value);
    } catch {
      const hex = value
        .replace(/^package-/, '')
        .replace(/^hash-/, '')
        .replace(/^contract-package-/, '');
      return new PackageHash(hex);
    }
  }
}
