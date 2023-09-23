import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { decrement, increment, reset } from '../store/counter.actions';

@Component({
  selector: 'app-my-counter',
  templateUrl: './my-counter.component.html',
  styleUrls: ['./my-counter.component.css']
})
export class MyCounterComponent {
  count$: Observable<number> | undefined;

  countValue: number = 0; // Property to store the value
  private countSubscription: Subscription | undefined; // Subscription

 
  constructor(private store: Store<{ count: number }>) {
    this.count$ = store.select('count');
  }

  ngOnInit() {
    // Subscribe to the observable to get its value
    this.getUpdatedValue();
    
  }
 
  increment() {
    this.store.dispatch(increment());
    this.getUpdatedValue();
  }
 
  decrement() {
    this.store.dispatch(decrement());
    this.getUpdatedValue();
  }
 
  reset() {
    this.store.dispatch(reset());
    this.getUpdatedValue();
  }

  ngOnDestroy(){
    console.log('counter component destroyed.');
    this.countSubscription?.unsubscribe();
  }

  getUpdatedValue(){
    this.countSubscription = this.store.select('count').subscribe(value => {
      this.countValue = value;
    });
  }

}
