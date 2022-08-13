import { COUNTER_STATE_NAME } from './state/counter.selectors';
import { StoreModule } from "@ngrx/store";
import { CustomCounterInputComponent } from "./custom-counter-input/custom-counter-input.component";
import { CounterButtonsComponent } from "./counter-buttons/counter-buttons.component";
import { CounterOutputComponent } from "./counter-output/counter-output.component";
import { RouterModule } from "@angular/router";
import { CounterComponent } from "./counter/counter.component";
import { Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { counterReducer } from "./state/counter.reducer";

const routes: Routes = [
  {
    path: "",
    component: CounterComponent,
  },
];

@NgModule({
  declarations: [
    CounterComponent,
    CounterOutputComponent,
    CounterButtonsComponent,
    CustomCounterInputComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(COUNTER_STATE_NAME, counterReducer),
  ],
})
export class CounterModule {}
