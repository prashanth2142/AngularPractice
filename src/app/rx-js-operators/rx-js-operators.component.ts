import { Component, OnInit } from '@angular/core';
import { combineLatest, concatMap, delay, exhaustMap, flatMap, from, interval, mergeMap, of, switchMap, take, timer } from 'rxjs';

@Component({
  selector: 'app-rx-js-operators',
  templateUrl: './rx-js-operators.component.html',
  styleUrls: ['./rx-js-operators.component.css']
})
export class RxJsOperatorsComponent implements OnInit {

  constructor(){
    
const example = (operator:any) => () =>
from([0,1,2,3,4])
.pipe(operator((x:any) => of(x).pipe(delay(500))))
.subscribe({
  next: (v) => console.log(v),
  error: (e) => console.error(e),
  complete: () => console.log(`${operator.name} completed`)
});

// example(mergeMap)();
// //example(flatMap);
// //example(concatMap)();    
// example(switchMap)();
// example(exhaustMap)();

  }

  users = [
    {id:1, name: 'Prashanth', isActive:true},
    {id:2, name: 'RVVNS', isActive:true},
    {id:3, name: 'Eshank', isActive:true}
    
    ]
    
    users$ = of(this.users);

ngOnInit(): void {
  //this.users$.subscribe(users=>console.log(users));

  let color = of('Black', 'Red', 'Blue');
  let brand = of('Jaguar', 'Ford', 'BMW');
  let price = of(100, 200, 300);

  const joinStream = combineLatest([color, brand, price]);

  const subscribe = joinStream.subscribe(([color, brand, price]) => {
    console.log(color + ' ' + brand + ' ' + 'costed me' + ' ' + price );
  }); 

  const source = of('Hello World');

source.subscribe(value => console.log(value));

const arraySource = from([1, 2, 3, 4, 5]);
const stringSource = from('Hello World');
const promiseSource = from(Promise.resolve('World'));

//arraySource.subscribe(value => console.log(value));
// Output: 1, 2, 3, 4, 5

stringSource.subscribe(value => console.log(value));
// Output: 'H', 'e', 'l', 'l', 'o'

//promiseSource.subscribe(value => console.log(value));
// Output: 'World'
   
}




}
