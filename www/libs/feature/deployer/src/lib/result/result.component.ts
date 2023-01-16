import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, Renderer2, ViewChild, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultService } from './result.service';
import { Result } from './result';
import { Subscription } from 'rxjs';
import { StorageService } from '@casper-util/storage';

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

  private getResultSubscription!: Subscription;

  constructor(
    private readonly resultService: ResultService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly storageService: StorageService
  ) { }

  ngAfterViewInit() {
    this.resultService.getResult().subscribe((res: Result) => {
      this.title = res.title;
      this.result = res.result;
      this.resultHtml = res.resultHtml;
      this.changeDetectorRef.markForCheck();
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

}
