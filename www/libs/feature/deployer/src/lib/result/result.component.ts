import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, OnDestroy, QueryList, Renderer2, ViewChild, ViewChildren, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultService } from './result.service';
import { Result } from './result';
import { Subscription } from 'rxjs';
import { StorageService } from '@casper-util/storage';
import { decodeBase16 } from 'casper-js-sdk';
import { DeployerService } from '@casper-data/data-access-deployer';

@Component({
  selector: 'casper-deployer-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultComponent implements AfterViewInit, OnDestroy {
  title!: string;
  result!: string;
  resultHtml!: string;

  @ViewChild('resultElt') resultElt!: ElementRef;
  @ViewChild('NotesElt') NotesElt!: ElementRef;
  @ViewChild('codeElt', { read: ElementRef }) contentChildren!: ElementRef;

  private getResultSubscription!: Subscription;
  private readonly key_regex = /[a-z-]+-([a-z0-9]{64})/;
  private readonly exclude_regex = /contract-(wasm|package-wasm)-?[a-z0-9]+/;

  constructor(
    private readonly resultService: ResultService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly storageService: StorageService,
    private readonly deployerService: DeployerService,
    private readonly renderer: Renderer2
  ) { }

  ngAfterViewInit() {
    this.resultService.getResult().subscribe((res: Result) => {
      this.title = res.title;
      this.result = res.result;
      this.resultHtml = res.resultHtml;

      this.changeDetectorRef.markForCheck();
      setTimeout(() => {
        const htmlCollection = (this.contentChildren.nativeElement.children), array = [...htmlCollection];
        array.forEach((child: HTMLSpanElement) => {
          const key = this.cleanKey(child.textContent || '');
          if (!key || !this.checkKey(key)) {
            return;
          }
          this.renderer.addClass(child, 'selected');
        });
      });

    });
    const notes = this.storageService.get('notes');
    notes && (this.NotesElt.nativeElement.value = notes);
  }

  ngOnDestroy() {
    this.getResultSubscription && this.getResultSubscription.unsubscribe();
  }

  copy(value: string): void {
    this.resultService.copyClipboard(value);
  }

  reset() {
    this.title = '';
    this.result = '';
    this.resultHtml = '';
  }

  goToBottom() {
    this.resultElt.nativeElement.scrollTop = this.resultElt.nativeElement.scrollHeight;
  }

  goToTop() {
    this.resultElt.nativeElement.scrollTop = 0;
  }

  get isScrollable() {
    return this.resultElt?.nativeElement.scrollHeight > this.resultElt?.nativeElement.clientHeight;
  }

  onNotesChange() {
    const notes = this.NotesElt.nativeElement.value;
    notes && this.storageService.setState({ notes });
  }

  emptyNotes() {
    this.NotesElt.nativeElement.value = '';
    this.storageService.setState({ notes: '' });
  }

  listenDblClick($event: Event) {
    const key = this.cleanKey(($event.target as HTMLSpanElement).textContent || '');
    key && this.resultService.copyClipboard(key);
    if (!key || !this.checkKey(key)) {
      return;
    }
    this.deployerService.setState({ key });
  }

  private cleanKey(key: string): string {
    return key.replace(/["']/g, '') || '';
  }

  private checkKey(key: string): boolean {
    const parsing = key && !this.exclude_regex.test(key) && key.match(this.key_regex);
    if (!parsing || parsing.length !== 2 || decodeBase16(parsing[1]).length !== 32) {
      return false;
    }
    return true;
  }

}
