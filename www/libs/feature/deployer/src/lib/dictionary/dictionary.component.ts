import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { DeployerService } from '@casper-data/data-access-deployer';
import { ResultService } from '../result/result.service';
import { State } from '@casper-api/api-interfaces';
import { StoredValue } from 'casper-js-sdk/dist/lib/StoredValue';

@Component({
  selector: 'casper-deployer-state-dictionary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DictionaryComponent implements AfterViewInit, OnDestroy {
  @ViewChild('contractHashElt') contractHashElt!: ElementRef;
  @ViewChild('dictionaryNameElt') dictionaryNameElt!: ElementRef;
  @ViewChild('dictionaryItemKeyElt') dictionaryItemKeyElt!: ElementRef;
  @ViewChild('seedUrefElt') seedUrefElt!: ElementRef;

  apiUrl?: string;
  stateRootHash?: string;

  private getStateSubscription!: Subscription;
  private getDictionarySubscription!: Subscription;

  constructor(
    private readonly deployerService: DeployerService,
    private readonly resultService: ResultService,
  ) { }

  ngAfterViewInit(): void {
    this.getStateSubscription = this.deployerService.getState().subscribe((state: State) => {
      state.stateRootHash && (this.stateRootHash = state.stateRootHash);
      state.apiUrl && (this.apiUrl = state.apiUrl);
    });
  }

  ngOnDestroy() {
    this.getStateSubscription && this.getStateSubscription.unsubscribe();
    this.getDictionarySubscription && this.getDictionarySubscription.unsubscribe();
  }

  getDictionary() {
    this.stateRootHash && (this.getDictionarySubscription = this.deployerService.getDictionaryItemByName(this.stateRootHash, this.contractHash, this.dictionaryName, this.dictionaryItemKey, this.seedUref, this.apiUrl).subscribe(dict => {
      dict && this.resultService.setResult<StoredValue>('Dictionnary', dict as StoredValue);
      this.getDictionarySubscription.unsubscribe();
    }));
  }

  get contractHash(): string {
    return this.contractHashElt?.nativeElement?.value.split('-').pop();
  }

  get dictionaryName(): string {
    return this.dictionaryNameElt?.nativeElement.value;
  }

  get dictionaryItemKey(): string {
    return this.dictionaryItemKeyElt?.nativeElement.value;
  }

  get seedUref(): string {
    return this.seedUrefElt?.nativeElement.value;
  }

  get isButtonDisabled(): boolean {
    const firstCondition = !this.dictionaryItemKey;
    const secondCondition = !this.seedUref && (!this.dictionaryName || !this.contractHash);
    return firstCondition || secondCondition;
  }

  get isSeedUrefDisabled(): boolean {
    return !!this.contractHash || !!this.dictionaryName;
  }

  get isDictionaryNameorHashDisabled(): boolean {
    return !!this.seedUref;
  }
}
