import { Component } from '@angular/core';  

  //external js function declaration
  declare function getToday(): any;
  declare function greetings(name: any): any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'App Home'; 

  constructor() { 
  }

ngOnInit(): void {
    // // call the externaljs functions
    // getToday(); // without param
    // greetings('Prashanth'); // with param

    // import('src/assets/custom').then(customFile=>{
    //   customFile.getToday();
    // });

}
}
