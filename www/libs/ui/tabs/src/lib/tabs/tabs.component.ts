import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tabs } from './tabs';


@Component({
  selector: 'casper-ui-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent {
  @Output() activateContent: EventEmitter<Tabs> = new EventEmitter<Tabs>();
  @Input() active!: Tabs;
  tabs = Object.keys(Tabs).filter(key => isNaN(Number(key)));
  default = Tabs.Custom;
  constructor() { }

  isDefault(tabIndex: Tabs) {
    return this.active === tabIndex;
  }

  isActive(tabIndex: Tabs) {
    return this.active === tabIndex;
  }

  activate(tabIndex: Tabs) {
    this.active = tabIndex;
    this.activateContent.emit(this.active);
  }
}
