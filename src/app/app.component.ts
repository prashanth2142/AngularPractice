import { Component } from '@angular/core'; 
import { TreeService } from './tree-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tree View'; 

  constructor(private treeService: TreeService) { 
  }
}
