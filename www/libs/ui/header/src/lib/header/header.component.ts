import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'casper-ui-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() activePublicKey!: string;
  @Input() balance!: string;
  @Input() role?: string;
  @Input() isButtonHidden!: boolean;
  @Input() isConnected!: boolean;
  @Output() connect: EventEmitter<void> = new EventEmitter<void>();
}
