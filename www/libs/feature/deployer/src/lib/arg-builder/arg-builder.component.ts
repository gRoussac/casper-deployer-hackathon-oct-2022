import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';

import { Tabs, TabsComponent } from '@casper-ui/tabs';
import { ArgumentComponent } from '@casper-ui/argument';
import { defaultTabs } from './tabs';
import { StorageService } from '@casper-util/storage';
import {
  NamedCLTypeArg,
  State,
  CLType,
  parseSessionArgsJson,
  mergeSchemaWithValues,
  serializeSessionArgsJson,
  coerceSessionValue,
  SessionArgType,
} from '@casper-api/api-interfaces';
import { DeployerService } from '@casper-data/data-access-deployer';
import { Subscription } from 'rxjs';
import { CepSchemaService, tabToCepId } from './cep-schema.service';

@Component({
  selector: 'casper-deployer-arg-builder',
  standalone: true,
  imports: [TabsComponent, ArgumentComponent],
  templateUrl: './arg-builder.component.html',
  styleUrls: ['./arg-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArgBuilderComponent implements OnDestroy {
  @Input() set isOpen(value: boolean) {
    this._isOpen = value;
    if (value) {
      void this.hydrate();
    }
  }

  get isOpen(): boolean {
    return this._isOpen;
  }

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() argumentChanged: EventEmitter<string> = new EventEmitter<string>();

  Tabs = Tabs;
  default = Tabs.Custom;
  active: Tabs = this.default;
  tabDefs = defaultTabs;
  /** Rows shown for the active tab. */
  rows: NamedCLTypeArg[] = [];
  hasWasm = false;
  entryPoint = '';

  private _isOpen = false;
  private getStateSubscription: Subscription;

  constructor(
    private readonly storageService: StorageService,
    private readonly deployerService: DeployerService,
    private readonly cepSchemaService: CepSchemaService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
    this.getStateSubscription = this.deployerService
      .getState()
      .subscribe((state: State) => {
        if (undefined !== state.has_wasm) {
          this.hasWasm = !!state.has_wasm;
        }
        if (state.entry_point !== undefined) {
          this.entryPoint = state.entry_point || '';
        }
        if (this._isOpen) {
          void this.hydrate();
        }
      });
  }

  ngOnDestroy(): void {
    this.getStateSubscription?.unsubscribe();
  }

  activateContent(tabIndex: Tabs) {
    this.active = tabIndex;
    void this.hydrate();
  }

  add() {
    this.rows = [...this.rows, this.blankRow()];
    this.changeDetectorRef.markForCheck();
  }

  trackByFn = (index: number, item: NamedCLTypeArg): string =>
    `${item.name}-${index}`;

  onRowChange(index: number, row: NamedCLTypeArg) {
    const next = [...this.rows];
    next[index] = row;
    this.rows = next;
  }

  build() {
    const sessionRows = this.rows
      .map((row) => {
        const type: SessionArgType =
          row.session_type ?? String(row.cl_type ?? 'Any');
        const raw =
          row.value === undefined || row.value === null
            ? ''
            : typeof row.value === 'string'
              ? row.value
              : JSON.stringify(row.value);
        const value = coerceSessionValue(type, raw);
        return {
          name: row.name?.replace(/\s*\*$/, '').trim() || '',
          type,
          value,
        };
      })
      .filter((r) => r.name && r.value !== undefined);

    const json = serializeSessionArgsJson(sessionRows);
    if (json && json !== '[]') {
      this.storageService.setState({ deploy_args: json });
      this.argumentChanged.emit(json);
    }
  }

  private blankRow(): NamedCLTypeArg {
    return { name: '', cl_type: CLType.U8(), session_type: 'U8', value: '' };
  }

  private async hydrate(): Promise<void> {
    await this.cepSchemaService.ensureReady().catch(() => undefined);

    const deployArgs = parseSessionArgsJson(
      this.storageService.get('deploy_args') || '',
    );
    const storedArgs = (this.storageService.get('args') || []) as unknown[];
    const entryPoint =
      this.entryPoint || this.storageService.get('entry_point') || '';
    this.entryPoint = entryPoint;
    this.hasWasm = !!(this.hasWasm || this.storageService.get('has_wasm'));

    const tab = this.tabDefs.find((t) => t.name === this.active);
    const cepId = tab?.cepId ?? tabToCepId(Tabs[this.active] || '');

    let schemaRows: NamedCLTypeArg[] = [];

    // Custom tab: prefer existing Args JSON (custom WASM / free-form), else on-chain.
    if (this.active === Tabs.Custom) {
      if (deployArgs.length) {
        schemaRows = mergeSchemaWithValues(
          deployArgs.map((r) => ({
            name: r.name,
            type: r.type,
            optional: false,
          })),
          deployArgs,
        );
      } else if (Array.isArray(storedArgs) && storedArgs.length > 0) {
        schemaRows = mergeSchemaWithValues(storedArgs, deployArgs);
      }
    } else if (Array.isArray(storedArgs) && storedArgs.length > 0 && !cepId) {
      schemaRows = mergeSchemaWithValues(storedArgs, deployArgs);
    }

    if (!schemaRows.length && cepId) {
      // No entrypoint → install schema. Entrypoint → that EP's args.
      if (entryPoint) {
        schemaRows = mergeSchemaWithValues(
          this.cepSchemaService.entrypointArgs(cepId, entryPoint),
          deployArgs,
        );
      } else {
        schemaRows = mergeSchemaWithValues(
          this.cepSchemaService.installArgs(cepId),
          deployArgs,
        );
      }
    }

    if (!schemaRows.length && deployArgs.length) {
      schemaRows = mergeSchemaWithValues(
        deployArgs.map((r) => ({
          name: r.name,
          type: r.type,
          optional: false,
        })),
        deployArgs,
      );
    }

    // Always keep at least one editable row (Custom / empty schema).
    this.rows = schemaRows.length ? schemaRows : [this.blankRow()];
    this.changeDetectorRef.markForCheck();
  }
}
