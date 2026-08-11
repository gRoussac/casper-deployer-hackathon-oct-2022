import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { CLType, CLTypeEnum, NamedCLTypeArg } from '@casper-api/api-interfaces';

@Component({
  selector: 'casper-ui-argument',
  standalone: true,
  imports: [],
  templateUrl: './argument.component.html',
  styleUrls: ['./argument.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArgumentComponent {
  @Input() defaultType: NamedCLTypeArg = { name: '', cl_type: CLType.U8() };
  @Output() rowChange = new EventEmitter<NamedCLTypeArg>();
  CLTypeEnum = CLTypeEnum;
  types = Object.keys(this.CLTypeEnum || {}).filter((key) =>
    isNaN(Number(key)),
  );

  get displayValue(): string {
    const value = this.defaultType.value;
    if (value === undefined || value === null) {
      return '';
    }
    if (
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean'
    ) {
      return String(value);
    }
    return JSON.stringify(value);
  }

  onNameInput(event: Event): void {
    const raw = (event.target as HTMLInputElement).value.replace(/\s*\*$/, '');
    this.emitRow({ ...this.defaultType, name: raw.trim() });
  }

  onTypeChange(event: Event): void {
    const label = (event.target as HTMLSelectElement).value;
    this.emitRow({
      ...this.defaultType,
      cl_type: CLTypeFromLabel(label),
      session_type: label,
    });
  }

  onValueInput(event: Event): void {
    this.emitRow({
      ...this.defaultType,
      value: (event.target as HTMLInputElement).value,
    });
  }

  private emitRow(row: NamedCLTypeArg): void {
    this.defaultType = row;
    this.rowChange.emit(row);
  }
}

function CLTypeFromLabel(label: string): CLType {
  switch (label) {
    case 'Bool':
      return CLType.Bool();
    case 'I32':
      return CLType.I32();
    case 'I64':
      return CLType.I64();
    case 'U8':
      return CLType.U8();
    case 'U32':
      return CLType.U32();
    case 'U64':
      return CLType.U64();
    case 'U128':
      return CLType.U128();
    case 'U256':
      return CLType.U256();
    case 'U512':
      return CLType.U512();
    case 'Unit':
      return CLType.Unit();
    case 'String':
      return CLType.String();
    case 'Key':
      return CLType.Key();
    case 'URef':
      return CLType.URef();
    case 'PublicKey':
      return CLType.PublicKey();
    case 'ByteArray':
      return CLType.ByteArray();
    case 'Option':
      return CLType.Option(CLType.Any());
    case 'List':
      return CLType.List(CLType.Any());
    case 'Result':
      return CLType.Result(CLType.Any(), CLType.Any());
    case 'Map':
      return CLType.Map(CLType.Any(), CLType.Any());
    case 'Tuple1':
      return CLType.Tuple1(CLType.Any());
    case 'Tuple2':
      return CLType.Tuple2(CLType.Any(), CLType.Any());
    case 'Tuple3':
      return CLType.Tuple3(CLType.Any(), CLType.Any(), CLType.Any());
    default:
      return CLType.Any();
  }
}
