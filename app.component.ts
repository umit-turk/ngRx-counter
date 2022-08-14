import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { getLoading } from './store/Shared/shared.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ngRx';
  showLoading?: Observable<boolean>;

  constructor(private store: Store<AppState>){}
  ngOnInit(): void {
    this.showLoading = this.store.select(getLoading);

  }

}
