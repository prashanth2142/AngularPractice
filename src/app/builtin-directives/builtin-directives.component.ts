import { Component } from '@angular/core';

@Component({
  selector: 'app-builtin-directives',
  templateUrl: './builtin-directives.component.html',
  styleUrls: ['./builtin-directives.component.css']
})
export class BuiltinDirectivesComponent {
items:any;
isDisabled :boolean=false; 
username:string='Test User Name';
fontSize:number=25;
isActive:boolean=true;
textColor:string='red';
condition:boolean=true;
showContent:boolean=true;

ngOnInit(){
  this.items = ['Item 1','Item 2','Item 3','Item 4','Item 5']
}

handleClick(){

}
submitForm(){

}

}
