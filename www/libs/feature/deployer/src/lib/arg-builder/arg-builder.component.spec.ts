import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArgBuilderComponent } from './arg-builder.component';
import { DeployerService } from '@casper-data/data-access-deployer';
import { StorageService } from '@casper-util/storage';
import { CepSchemaService, seedCepSchemaCache } from './cep-schema.service';
import { of } from 'rxjs';
import { Tabs } from '@casper-ui/tabs';

describe('ArgBuilderComponent', () => {
  let component: ArgBuilderComponent;
  let fixture: ComponentFixture<ArgBuilderComponent>;
  let storage: { get: jest.Mock; setState: jest.Mock };

  beforeEach(async () => {
    storage = {
      get: jest.fn((key: string) => {
        if (key === 'deploy_args') {
          return JSON.stringify([
            { name: 'name', type: 'String', value: 'TOKEN' },
            { name: 'symbol', type: 'String', value: 'TKN' },
          ]);
        }
        if (key === 'args') {
          return [];
        }
        if (key === 'entry_point') {
          return '';
        }
        return undefined;
      }),
      setState: jest.fn(),
    };

    const cepSchema = new CepSchemaService();
    seedCepSchemaCache(cepSchema, [
      {
        cep: 'cep18',
        install: [
          { name: 'name', type: 'String', optional: false },
          { name: 'symbol', type: 'String', optional: false },
          { name: 'decimals', type: 'U8', optional: false },
          { name: 'total_supply', type: 'U256', optional: false },
        ],
        entrypoints: {
          transfer: [
            { name: 'recipient', type: 'Key', optional: false },
            { name: 'amount', type: 'U256', optional: false },
          ],
        },
      },
    ]);

    await TestBed.configureTestingModule({
      imports: [ArgBuilderComponent],
      providers: [
        {
          provide: DeployerService,
          useValue: {
            getState: () => of({ has_wasm: true }),
            setState: jest.fn(),
          },
        },
        { provide: StorageService, useValue: storage },
        { provide: CepSchemaService, useValue: cepSchema },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ArgBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('prefills install rows from deploy_args when wasm and CEP tab', async () => {
    component.hasWasm = true;
    component.active = Tabs['CEP-18'];
    component.isOpen = true;
    await Promise.resolve();
    await Promise.resolve();
    expect(component.rows.length).toBeGreaterThanOrEqual(2);
    const nameRow = component.rows.find((r) => r.name === 'name');
    expect(nameRow?.value).toBe('TOKEN');
  });

  it('build emits session_args_json and stores deploy_args', async () => {
    component.hasWasm = true;
    component.active = Tabs['CEP-18'];
    component.isOpen = true;
    await Promise.resolve();
    await Promise.resolve();
    const emitted: string[] = [];
    component.argumentChanged.subscribe((v) => emitted.push(v));
    component.rows = component.rows.map((r) =>
      r.name === 'decimals' ? { ...r, value: '9' } : r,
    );
    component.build();
    expect(emitted[0]).toContain('"name":"name"');
    expect(storage.setState).toHaveBeenCalled();
  });
});
