import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription} from 'rxjs';
import { of, mergeMap, interval, map } from 'rxjs';
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
    console.log(this.count$);
  }

  ngOnInit() {
    // Subscribe to the observable to get its value
    this.getUpdatedValue();
    //this.rxJSExample();
this.mergeMapExam();
    
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


  rxJSExample(){
    const str = 'Hello World';
const str$ = of(str);
str$.subscribe((result:any) => console.log({ result }));
// Will emit a single item with the type of string
// result: "Hello World"

const arr = [1, 2, 3];
const arr$ = of(arr);
arr$.subscribe((result) => console.log({ result }));
// Will emit a single item with the type of Array<number>
// result: [1,2,3]

const arr2 = [4, 5, 6];
const arr2$ = of(arr, arr2);
arr2$.subscribe((result) => 

console.log({ result })
);
// Will emit a single two values each with the type of Array<number>
// result: [1,2,3]
// result: [4,5,6]

const imAPromise = fetch('https://pokeapi.co/api/v2/pokemon/ditto').then(
  (response) => response.json()
);
const imAPromise$ = of(imAPromise);
imAPromise$.subscribe((result) => console.log({ result }));
// Will emit a single item with the type of Promise
// result: Promise

function* iterator() {
  const values = ['iterator-1', 'iterator-2', 'iterator-3'];
  for (let i = 0; i < values.length; i++) {
    yield values[i];
  }
}

const imAnIterable = iterator();
const imAnIterable$ = of(imAnIterable);
imAnIterable$.subscribe((result) => console.log({ result }));
  }


  mergeMapExam(){
   

const letters = of('a', 'b', 'c', 'd', 'e', 'f');
const result = letters.pipe(
  mergeMap(x => interval(5000).pipe(map(i => x + i)))
);

result.subscribe(x => console.log(x));

// Results in the following:
// a0
// b0
// c0
// a1
// b1
// c1
// continues to list a, b, c every second with respective ascending integers
  }

  


}
