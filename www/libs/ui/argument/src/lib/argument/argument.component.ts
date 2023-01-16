import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CLType, CLTypeBuilder, CLTypeTag } from 'casper-js-sdk';

@Component({
  selector: 'casper-ui-argument',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './argument.component.html',
  styleUrls: ['./argument.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArgumentComponent {
  @Input() name = '';
  @Input() defaultType: CLType = CLTypeBuilder.u8();
  CLTypeTag = CLTypeTag;
  types = Object.keys(CLTypeTag).filter(key => isNaN(Number(key)));
}
