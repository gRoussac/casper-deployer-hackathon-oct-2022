import { Injectable } from '@angular/core';
import { State } from '@casper-api/api-interfaces';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: null
})
export class RouteurHubService {

  private readonly connectSource = new Subject<void>;
  private readonly refreshPurseSource = new Subject<void>;
  connect$ = this.connectSource.asObservable();
  refreshPurse$ = this.refreshPurseSource.asObservable();
  private readonly state = new BehaviorSubject<State>({});

  connect() {
    this.connectSource.next();
  }

  refreshPurse() {
    this.refreshPurseSource.next();
  }

  setState(state: State) {
    this.state.next(state);
  }

  getState() {
    return this.state.asObservable();
  }

}
