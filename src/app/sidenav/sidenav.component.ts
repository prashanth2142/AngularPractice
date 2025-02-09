import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  @ViewChild('drawer') sidenav!: MatSidenav;
  isExpanded = window.innerWidth > 768; // Expand on larger screens

  toggleSidenav() {
    this.sidenav.toggle();
  }

  closeSidenav() {
    if (window.innerWidth <= 768) {
      this.sidenav.close();
    }
  }
}
