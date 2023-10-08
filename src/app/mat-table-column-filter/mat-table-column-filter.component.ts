import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FilterOptions, TableFilterConfig } from '../shared/TableFilterConfig';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-mat-table-column-filter',
  templateUrl: './mat-table-column-filter.component.html',
  styleUrls: ['./mat-table-column-filter.component.css']
})
export class MatTableColumnFilterComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: MatTableDataSource<PeriodicElement> | any;
  originalData: PeriodicElement[] = [];
  // Define a variable to track the active popup
  activePopup: HTMLElement | null = null;
  @Input() selectedColValue: string | undefined;
  @ViewChild(MatMenuTrigger) menu: MatMenuTrigger | undefined;

  clickedLocationObj:Event | undefined;

  ngOnInit() {
    this.originalData = ELEMENT_DATA;
    this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    this.filterOptions1 = TableFilterConfig.filterOptions1;
    this.filterOptions2 = TableFilterConfig.filterOptions2;
  }

  showPopup: boolean = false;

  selectedFilterType: string = 'contains';
  selectedFilterType2: string = 'contains';
  columnName: string = 'ClientNumber';
  inputValue: string = '';
  secondInputValue: string = '';
  filterCondition: string = 'and';
  filterCondition2: string = 'and';

  columnDataType: string = 'text';
  selectedRBValue: string = 'true';
  selectedDateFilterType: string = 'equals';
  selectedDateFilterType2: string = 'equals';
  dtFilter1: Date | null = null;
  dtFilter2: Date | null = null;
  filterOptions1: any;
  filterOptions2: any;
  dateFilterOptions1: any;
  dateFilterOptions2: any;

  colSelectedTemp:string='';

  onInputChange(event: Event) {
    this.inputValue = (event.target as HTMLInputElement).value;
  }

  onSecondInputChange(event: Event) {
    this.secondInputValue = (event.target as HTMLInputElement).value;
  }

  applyFilter() {
    if(this.inputValue != '' || this.secondInputValue != ''){
      const filterOptions: FilterOptions = {
        columnDataType: this.columnDataType,
        originalData: this.originalData,
        columnName: this.columnName,
        dtFilter1: this.dtFilter1,
        dtFilter2: this.dtFilter2,
        filterCondition: this.filterCondition,
        inputValue: this.inputValue,
        secondInputValue: this.secondInputValue,
        selectedFilterType: this.selectedFilterType,
        selectedFilterType2: this.selectedFilterType2,
        selectedDateFilterType: this.selectedDateFilterType,
        selectedDateFilterType2: this.selectedDateFilterType2,
        selectedRBValue: this.selectedRBValue,
      };
      const filteredData = TableFilterConfig.getFilteredData(filterOptions);
      this.updateMatTable(filteredData);
    }
    
    if(this.activePopup)
      this.activePopup.classList.remove('active');

  }



  resetTable() {
    this.inputValue = '';
    this.secondInputValue = '';
    this.dtFilter1 = null;
    this.dtFilter2 = null;
    this.dataSource = new MatTableDataSource<any>();
    this.dataSource.data = [...this.originalData];
    this.showPopup = true;
    if(this.activePopup)
      this.activePopup.classList.remove('active');
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    // this.sortDataAccessor();
  }

  setClickedLocation(event: Event) {
    console.log(event);
    this.clickedLocationObj = event;
  }

  toggleDiv(colSelected: string, event: Event, colDataType: string = 'text') {
    console.log(this.selectedColValue);
    this.showPopup = !this.showPopup;
    this.columnName = colSelected;
    this.columnDataType = colDataType;
    event.stopPropagation();
    const columnHeader = this.clickedLocationObj?.target as HTMLElement;
    if (this.activePopup) {
      this.activePopup.classList.remove('active');
      if(this.colSelectedTemp != colSelected)
        this.showPopup = true;
    }
    const popup = document.getElementById('popupId');
    if (popup != null && this.showPopup) {
      const rect = columnHeader.getBoundingClientRect();
      const table = columnHeader.closest('table');
      if (table) {
        const tableRect = table.getBoundingClientRect();
        const left = rect.left - tableRect.left;
        const top = rect.bottom - tableRect.top;
        popup.style.left = `${left}px`;
        popup.style.top = `${top}px`;
        popup.classList.add('active');
        this.activePopup = popup;
      }
      popup.classList.add('active');
      this.activePopup = popup;
      this.colSelectedTemp = colSelected;
    }

    

    //console.log(`Clicked: ${value}`);
    if(this.menu)
    // Close the menu
      this.menu.closeMenu();
  }

  onColumnNameChange(event: any) {
    const newValue = event.value;
    if (newValue == 'IsActive' || newValue == 'IsHeld') {
      this.columnDataType = 'boolean';
    }
    else if (newValue == 'HeldUntilDate') {
      this.columnDataType = 'date';
    }
    else {
      this.columnDataType = 'text';
    }
  }



  updateMatTable(filteredData: any) {
    this.dataSource = new MatTableDataSource<any>();
    this.dataSource.data = [...filteredData];
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    //this.sortDataAccessor();
  }

  handleItemClick(value: string) {
    // Do something with the item value, e.g., emit an event or update a property
    console.log(`Clicked: ${value}`);
    if(this.menu)
    // Close the menu
      this.menu.closeMenu();
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