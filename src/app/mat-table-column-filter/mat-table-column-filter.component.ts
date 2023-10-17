import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FilterOptions, TableFilterConfig } from '../shared/TableFilterConfig';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-mat-table-column-filter',
  templateUrl: './mat-table-column-filter.component.html',
  styleUrls: ['./mat-table-column-filter.component.css']
})
export class MatTableColumnFilterComponent {
  
  positionCol:boolean=true;
  nameCol:boolean=true;
  weightCol:boolean=true;
  symbolCol:boolean=true;
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

  
  
  selectedFilterType1 = 'contains';
  selectedFilterType2 = 'contains';
  columnName = 'ClientNumber';
  inputValue = '';
  secondInputValue = '';
  filterCondition = 'and';
  columnDataType = 'text';
  selectedRBValue = '';
  selectedDateFilterType1 = 'after';
  selectedDateFilterType2 = 'after';
  dtFilter1: Date | null = null;
  dtFilter2: Date | null = null;
  filterOptions1: any;
  filterOptions2: any;
  dateFilterOptions1: any;
  dateFilterOptions2: any;
  numericFilterOptions1: any;
  numericFilterOptions2: any;
  selectedNumericFilterType1 = 'equals';
  selectedNumericFilterType2 = 'greaterOrEqual';
  numVal1 = 0;
  numVal2 = 0;
  filteredData:any;

  columnFilters: { [key: string]: any } = {};

  applyFilter(type = 'apply') {

    this.filteredData = null;

    const filterOptions: FilterOptions = {
      columnDataType: this.columnDataType,
      originalData:this.originalData,
      filteredData:null,
      columnName: this.columnName,
      dtFilter1: this.dtFilter1,
      dtFilter2: this.dtFilter2,
      filterCondition: this.filterCondition,
      inputValue: this.inputValue,
      secondInputValue: this.secondInputValue,
      selectedFilterType1: this.selectedFilterType1,
      selectedFilterType2: this.selectedFilterType2,
      selectedDateFilterType1: this.selectedDateFilterType1,
      selectedDateFilterType2: this.selectedDateFilterType2,
      selectedRBValue: this.selectedRBValue,
      selectedNumericFilterType1:this.selectedNumericFilterType1,
      selectedNumericFilterType2:this.selectedNumericFilterType2,
      numVal1:this.numVal1,
      numVal2:this.numVal2
    };

    if(type == 'apply')
      this.columnFilters[this.columnName] = filterOptions;

    console.log(this.columnFilters);

    const keys = Object.keys(this.columnFilters);

    keys.forEach((element:any) => {
      const colOptionsObj = { ...this.columnFilters[element] };
      if(this.filteredData == null)
      {
        colOptionsObj.filteredData = this.originalData;
      }
      else{
        colOptionsObj.filteredData = this.filteredData;
      }
      console.log(element);
      colOptionsObj.filteredData = TableFilterConfig.getFilteredData(colOptionsObj);
      this.filteredData = colOptionsObj.filteredData;
    });

    this.updateMatTable(keys.length == 0 ? this.originalData : this.filteredData);

  }

  setColFilterSelectedValues(){
    if (this.columnFilters[this.columnName]) {
      const filterData = this.columnFilters[this.columnName];

      this.selectedFilterType1 = filterData.selectedFilterType1;
      this.selectedDateFilterType1 = filterData.selectedDateFilterType1;
      this.dtFilter1 = filterData.dtFilter1;
      this.inputValue = filterData.inputValue;
      this.filterCondition = filterData.filterCondition;
      this.selectedFilterType2 = filterData.selectedFilterType2;
      this.secondInputValue = filterData.secondInputValue;
      this.selectedDateFilterType2 = filterData.selectedDateFilterType2;
      this.dtFilter2 = filterData.dtFilter2;
      this.selectedRBValue = filterData.selectedRBValue;

    }
    else{
      this.inputValue = '';
      this.secondInputValue = '';
      this.dtFilter1 = null;
      this.dtFilter2 = null;
      this.filterCondition = 'and';
      this.selectedFilterType1 = 'contains';
      this.selectedFilterType2 = 'contains';
      this.selectedDateFilterType1 = 'equals';
      this.selectedDateFilterType2 = 'equals';
      this.selectedRBValue = '';
    }
  }


  clearFilter() {
    delete this.columnFilters[this.columnName];
    this.applyFilter('clear');
  }

  setColumnDataType(colName:string, event:Event) {
      this.columnName = colName;
      event.stopPropagation();
      if (colName == 'IsActive' || colName == 'IsHeld') {
        this.columnDataType = 'boolean';
      }
      else if (colName == 'HeldUntilDate') {
        this.columnDataType = 'date';
      }
      else {
        this.columnDataType = 'text';
      }
      this.setColFilterSelectedValues();
    }
 

    updateMatTable(filteredData: any) {
      this.dataSource = new MatTableDataSource<any>();
      this.dataSource.data = [...filteredData];
      
      
    }
 

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  
  onCheckboxChange(checkboxValue:string, event: MatCheckboxChange) {
    console.log(event);

     
    
    switch (checkboxValue) {
      case 'position':
        this.handleColumnChange(this.positionCol, checkboxValue);
        break;
      case 'name':
        this.handleColumnChange(this.nameCol, checkboxValue);
        break;
      case 'weight':
        this.handleColumnChange(this.weightCol, checkboxValue);
        break;
      case 'symbol':
        this.handleColumnChange(this.symbolCol, checkboxValue);
        break;
      default:
        // Handle other cases if needed
    }
  }
  
  private handleColumnChange(columnValue: boolean, checkboxValue: string) {
    if (columnValue && !this.displayedColumns.includes(checkboxValue)) {
      this.addColumnToDisplay(checkboxValue);
    } else if (!columnValue && this.displayedColumns.includes(checkboxValue)) {
      this.removeColumnFromDisplay(checkboxValue);
    }
  }
  

  addColumnToDisplay(checkboxValue:string){
    this.displayedColumns.push(checkboxValue);
  }
  removeColumnFromDisplay(checkboxValue:string){
    const index = this.displayedColumns.indexOf(checkboxValue);
    this.displayedColumns.splice(index, 1);
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



