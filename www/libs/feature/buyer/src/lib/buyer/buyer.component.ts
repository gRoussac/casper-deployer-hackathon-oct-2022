import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Roles, User, Users } from '@casper-api/api-interfaces';

@Component({
  selector: 'casper-escrow-buyer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuyerComponent {

  @Input()
  set users(value: Users) {
    this._users = value;
    this._users && this.updatedefaultPublicKey();
  }
  get users(): Users {
    return this._users;
  }

  defaultPublicKey!: string;

  private _users!: Users;
  private readonly Roles = Roles;

  updatedefaultPublicKey() {
    this.defaultPublicKey = this._users && this.users?.find(
      (user: User) => user.role === this.Roles.Seller
    )?.PublicKey as string;
  }

  send() {

  }
}
