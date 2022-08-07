import { AppState } from './../../store/app.state';
import { Observable } from 'rxjs';
import { getName } from './../state/counter.selectors';
import { Store } from '@ngrx/store';
import { CounterState } from './../state/counter.state';
import { Component, OnInit } from '@angular/core';
import { changeName, customIncrement } from '../state/counter.actions';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.css']
})
export class CustomCounterInputComponent implements OnInit {

  value? : number;
  name$?: Observable<string>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
   this.name$ = this.store.select(getName);
  }

  onAdd(){
    this.store.dispatch(customIncrement({count: this.value}))

  }

  onChangeTextName(){
    this.store.dispatch(changeName());
  }

}
