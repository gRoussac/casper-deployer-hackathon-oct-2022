import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Roles } from '@casper-api/api-interfaces';

@Component({
  selector: 'casper-escrow-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input() activePublicKey!: string;
  @Input() balance!: string;
  @Input() role?: Roles;
  @Input() isButtonHidden!: boolean;
  @Input() isConnected!: boolean;
  @Output() connect: EventEmitter<void> = new EventEmitter<void>();
}
