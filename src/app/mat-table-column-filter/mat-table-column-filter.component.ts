import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-mat-table-column-filter',
  templateUrl: './mat-table-column-filter.component.html',
  styleUrls: ['./mat-table-column-filter.component.css']
})
export class MatTableColumnFilterComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: MatTableDataSource<PeriodicElement> | any;

  originalData : PeriodicElement[] = [];

  inputValue: string = '';

  @ViewChild('nameInput') nameInput: ElementRef | undefined;

  onInputChange(event: Event) {
    this.inputValue = (event.target as HTMLInputElement).value;
  }

  // Track the visibility state of each column's div
  columnDivVisibility: { [key: string]: boolean } = {};

  ngOnInit() {
    this.originalData = ELEMENT_DATA;
    this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  }

  toggleDiv(column: string) {
    // Toggle the visibility of the div for the clicked column
    this.columnDivVisibility[column] = !this.columnDivVisibility[column];
    this.openPopup();
  }

  applyFilter1() {


    // Apply the filter to the specified column
    if (this.dataSource != undefined)
      this.dataSource.filter = this.inputValue;

    this.closePopup();



  }

  filterValue: string = '';
  selectedFilterType: string = 'contains';


  applyFilter() {
    this.dataSource.filterPredicate = (data: PeriodicElement) => {
      switch (this.selectedFilterType) {
        case 'equals':
          return data.name.toLowerCase() === this.inputValue.toLowerCase();
        case 'notEquals':
          return data.name.toLowerCase() !== this.inputValue.toLowerCase();
        case 'contains':
          return data.name.toLowerCase().includes(this.inputValue.toLowerCase());
        case 'notContains':
          return !data.name.toLowerCase().includes(this.inputValue.toLowerCase());
        case 'startsWith':
          return data.name.toLowerCase().startsWith(this.inputValue.toLowerCase());
        case 'endsWith':
          return data.name.toLowerCase().endsWith(this.inputValue.toLowerCase());
        default:
          return true; // No filtering by default
      }
    };

    this.dataSource.filter = this.inputValue.trim().toLowerCase();
    this.closePopup();
  }

  resetTable() {
    this.inputValue = '';
    this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    this.closePopup();
  }

  showPopup: boolean = false;

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }
  
}


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];