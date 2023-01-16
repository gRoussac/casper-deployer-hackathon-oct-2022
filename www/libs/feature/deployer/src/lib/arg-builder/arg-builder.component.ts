import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tabs, TabsComponent } from '@casper-ui/tabs';
import { ArgumentComponent } from '@casper-ui/argument';

import { customArg, defaultTabs } from './tabs';
import { StorageService } from '@casper-util/storage';
import { NamedCLTypeArg } from 'casper-js-sdk';

@Component({
  selector: 'casper-deployer-arg-builder',
  standalone: true,
  imports: [CommonModule, TabsComponent, ArgumentComponent],
  templateUrl: './arg-builder.component.html',
  styleUrls: ['./arg-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArgBuilderComponent {
  @Input() set isOpen(value: boolean) {
    this._isOpen = value;
    this.addArgs();
  }

  get isOpen(): boolean {
    return this._isOpen;
  }
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() argurmentChanged: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('form') formElt!: ElementRef;
  Tabs = Tabs;
  default = Tabs.Custom;
  active: Tabs = this.default;
  defaultTabs = defaultTabs.map(tab => {
    return {
      name: tab.name,
      types: tab.types.sort((a, b) => a.name.localeCompare(b.name))
    };
  });
  argument = '';

  private _isOpen = false;

  constructor(
    private readonly storageService: StorageService
  ) { }

  activateContent(tabIndex: Tabs) {
    this.active = tabIndex;
  }

  add() {
    this.defaultTabs[this.active].types.push(customArg);
  }

  build() {
    this.argument = '';
    const collection = this.formElt.nativeElement.children as HTMLCollection;
    Array.from(collection).forEach((collection: Element) => {
      const children = Array.from(collection.children);
      if (!(children[2] as HTMLInputElement).value) {
        return;
      }
      children.forEach((child: Element, index: number) => {
        let value = (child as HTMLInputElement).value;

        let sep = '';
        switch (index) {
          case 0:
          default:
            sep = ':';
            break;
          case 1:
            value = value.toLowerCase();
            sep = '=\'';
            break;
          case 2:
            value = ['\'\'', '""'].includes(value) ? '' : value;
            sep = '\';';
            break;
        }
        this.argument += [value, sep, '\n'].join('');
      });
    });
    this.argument && this.argurmentChanged.emit(this.argument);
  }

  trackByFn = (index: number, item: NamedCLTypeArg): string => item.name;

  private addArgs() {
    const args: NamedCLTypeArg[] = this.storageService.get('args');
    this.defaultTabs[0].types = [];
    args && args.forEach((arg: NamedCLTypeArg) => {
      this.defaultTabs[0].types.push(arg);
    });

  }
}
