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
  
  ngOnInit() {
    this.originalData = ELEMENT_DATA;
    this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  }

  filterValue: string = '';
  selectedFilterType: string = 'contains';
  columnName:string = 'name';
  inputValue: string = '';
  showPopup: boolean = false;

  onInputChange(event: Event) {
    this.inputValue = (event.target as HTMLInputElement).value;
  }

  applyFilter(){

    if(this.inputValue != ''){
      const filteredData = this.originalData.filter((item: any) => {
        const columnValue = item[this.columnName].toString().toLowerCase();
        const filterValue = this.inputValue.toLowerCase();
    
        switch (this.selectedFilterType) {
          case 'equals':
            return columnValue === filterValue;
          case 'notEquals':
            return columnValue !== filterValue;
          case 'contains':
            return columnValue.includes(filterValue);
          case 'notContains':
            return !columnValue.includes(filterValue);
          case 'startsWith':
            return columnValue.startsWith(filterValue);
          case 'endsWith':
            return columnValue.endsWith(filterValue);
          default:
            return true; // No filtering by default
        }
      });
    
      this.dataSource = new MatTableDataSource(filteredData);

    }
    else{
      this.showPopup = false;
    }
   
  }

   

  resetTable() {
    this.inputValue = '';
    this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    this.closePopup();
  }

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  toggleDiv() {
    this.showPopup = !this.showPopup;
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