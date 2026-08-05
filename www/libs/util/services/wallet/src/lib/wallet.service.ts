import { CasperWallet, Transaction } from 'casper-rust-wasm-sdk';

export class WalletService {
  private wallet: CasperWallet | null = null;

  private getWallet(): CasperWallet | null {
    if (this.wallet) {
      return this.wallet;
    }
    if (typeof globalThis.CasperWalletProvider !== 'function') {
      return null;
    }
    try {
      this.wallet = new CasperWallet();
      return this.wallet;
    } catch (err) {
      console.warn('Casper Wallet provider is unavailable', err);
      return null;
    }
  }

  public async getVersion(): Promise<string> {
    const wallet = this.getWallet();
    if (!wallet) {
      return '';
    }
    try {
      return wallet.getVersion();
    } catch (err) {
      console.warn(err);
    }
    return '';
  }

  private async connect(): Promise<boolean> {
    const wallet = this.getWallet();
    if (!wallet) {
      return false;
    }
    try {
      return wallet.connect();
    } catch (err) {
      console.warn(err);
    }
    return false;
  }

  public async isConnected(): Promise<boolean> {
    const wallet = this.getWallet();
    if (!wallet) {
      return false;
    }
    try {
      return wallet.isConnected();
    } catch (err) {
      console.warn(err);
    }
    return false;
  }

  public async switchAccount(): Promise<boolean> {
    const wallet = this.getWallet();
    if (!wallet) {
      return false;
    }
    try {
      return wallet.switchAccount();
    } catch (err) {
      console.warn(err);
    }
    return false;
  }

  public async getActivePublicKey(): Promise<string> {
    const wallet = this.getWallet();
    if (!wallet) {
      return '';
    }
    const is_connected = await this.connect();
    return (is_connected && (await wallet.getActivePublicKey())) || '';
  }

  public async signTransaction(
    transaction: Transaction,
    public_key?: string,
  ): Promise<Transaction> {
    const wallet = this.getWallet();
    if (!wallet) {
      console.warn('Casper Wallet extension is not installed');
      return new Transaction(transaction);
    }
    const is_connected = await this.connect();
    if (!is_connected) {
      console.warn('Casper Wallet is not connected');
    }
    return wallet.signTransaction(new Transaction(transaction), public_key);
  }

  /** @deprecated Use signTransaction */
  public async signDeploy(
    deploy: Transaction,
    public_key?: string,
  ): Promise<Transaction> {
    return this.signTransaction(deploy, public_key);
  }
}

declare global {
  // Injected by the Casper Wallet browser extension.
  // eslint-disable-next-line no-var
  var CasperWalletProvider: (() => unknown) | undefined;
}
