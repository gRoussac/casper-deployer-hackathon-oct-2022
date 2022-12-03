import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, OnDestroy, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { GetDeployResult } from 'casper-js-sdk';
import { DeployerService } from '@casper-data/data-access-deployer';
import { State } from '@casper-api/api-interfaces';
import { ResultService } from '../result/result.service';

@Component({
  selector: 'casper-deployer-get-deploy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './get-deploy.component.html',
  styleUrls: ['./get-deploy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GetDeployComponent implements OnDestroy, AfterViewInit {
  @Output() refreshPurse: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('getDeployElt') getDeployElt!: ElementRef;
  apiUrl?: string;
  deploy_hash?: string;

  private getStateSubscription!: Subscription;
  private getDeploySubscription!: Subscription;

  constructor(
    private readonly deployerService: DeployerService,
    private readonly resultService: ResultService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnDestroy() {
    this.getStateSubscription && this.getStateSubscription.unsubscribe();
    this.getDeploySubscription && this.getDeploySubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.getStateSubscription = this.deployerService.getState().subscribe((state: State) => {
      if (state.apiUrl) {
        this.apiUrl = state.apiUrl;
      }
      if (state.deploy_hash) {
        this.deploy_hash = state.deploy_hash;
        this.getDeployElt.nativeElement.value = this.deploy_hash;
      }
      this.changeDetectorRef.markForCheck();
    });
  }

  getDeploy() {
    const deploy_hash = this.getDeployElt.nativeElement.value.replace('deploy-', '');
    deploy_hash && (this.getDeploySubscription = this.deployerService.getDeploy(deploy_hash, this.apiUrl).subscribe(deploy => {
      deploy && this.resultService.setResult<GetDeployResult>('Deploy info', deploy as GetDeployResult);
      this.refreshPurse.emit();
      this.getDeploySubscription.unsubscribe();
    }));
  }

  copy(value: string): void {
    this.resultService.copyClipboard(value);
  }

  get isGetDeployDisabled() {
    return !this.getDeployElt?.nativeElement.value;
  }
}
