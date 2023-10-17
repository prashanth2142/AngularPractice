export class TableFilterConfig{
    public static applyTextFilter1(columnValue: string, filterValue: string, selectedFilterType:string): boolean {
        switch (selectedFilterType) {
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
            return true;
        }
    }

    public static applyTextFilter2(columnValue: string, filterValue: string, selectedFilterType2:string): boolean {
        switch (selectedFilterType2) {
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
            return true;
        }
    }

    public static applyBooleanFilter(columnValue: string, filterValue: string): boolean {
        return columnValue === filterValue;
    }

    public static applyDateFilter1(columnValue: string, filterValue: string, selectedDateFilterType:string): boolean {
        const itemDateObj = new Date(columnValue);
        if(filterValue == ''){
            return true;
        }
        const inputDateObj = new Date(filterValue);
        switch (selectedDateFilterType) {
        case 'equals':
            return itemDateObj.getTime() === inputDateObj.getTime();
        case 'notEquals':
            return itemDateObj.getTime() !== inputDateObj.getTime();
        case 'afterOrEqual':
            return itemDateObj >= inputDateObj;
        case 'after':
            return itemDateObj > inputDateObj;
        case 'beforeOrEqual':
            return itemDateObj <= inputDateObj;
        case 'before':
            return itemDateObj < inputDateObj;
        default:
            return true;
        }
    }

    public static applyDateFilter2(columnValue: string, filterValue: string, selectedDateFilterType2:string): boolean {
        const itemDateObj2 = new Date(columnValue);
        if(filterValue == ''){
            return true;
        }
        const inputDateObj2 = new Date(filterValue);
        switch (selectedDateFilterType2) {
        case 'equals':
            return itemDateObj2.getTime() === inputDateObj2.getTime();
        case 'notEquals':
            return itemDateObj2.getTime() !== inputDateObj2.getTime();
        case 'afterOrEqual':
            return itemDateObj2 >= inputDateObj2;
        case 'after':
            return itemDateObj2 > inputDateObj2;
        case 'beforeOrEqual':
            return itemDateObj2 <= inputDateObj2;
        case 'before':
            return itemDateObj2 < inputDateObj2;
        default:
            return true;
        }
    }

    public static applyNumericFilter1(columnValue: number, filterValue: number, selectedFilterType: string = ''): boolean {
        switch (selectedFilterType) {
          case 'equals':
            return columnValue === filterValue;
          case 'notEquals':
            return columnValue === filterValue;
          case 'greaterOrEqual':
            return columnValue >= filterValue;
          case 'greater':
            return columnValue > filterValue;
          case 'lessOrEqual':
            return columnValue <= filterValue;
          case 'less':
            return columnValue < filterValue;
          default:
            return true;
        }
      }

    public static  filterOptions1 = [
        { value: 'equals', label: 'Is Equal To' },
        { value: 'notEquals', label: 'Is Not Equal To' },
        { value: 'contains', label: 'Contains' },
        { value: 'notContains', label: 'Does Not Contain' },
        { value: 'startsWith', label: 'Starts With' },
        { value: 'endsWith', label: 'Ends With' },
    ];

    public static  filterOptions2 = [
        { value: 'equals', label: 'Is Equal To' },
        { value: 'notEquals', label: 'Is Not Equal To' },
        { value: 'contains', label: 'Contains' },
        { value: 'notContains', label: 'Does Not Contain' },
        { value: 'startsWith', label: 'Starts With' },
        { value: 'endsWith', label: 'Ends With' },
    ];

    public static  dateFilterOptions1 = [
        { value: 'equals', label: 'Is equal to' },
        { value: 'notEquals', label: 'Is not equal to' },
        { value: 'afterOrEqual', label: 'Is after or equal to' },
        { value: 'after', label: 'Is after' },
        { value: 'beforeOrEqual', label: 'Is before or equal to' },
        { value: 'before', label: 'Is before' },
    ];

    public static  dateFilterOptions2 = [
        { value: 'equals', label: 'Is equal to' },
        { value: 'notEquals', label: 'Is not equal to' },
        { value: 'afterOrEqual', label: 'Is after or equal to' },
        { value: 'after', label: 'Is after' },
        { value: 'beforeOrEqual', label: 'Is before or equal to' },
        { value: 'before', label: 'Is before' },
    ];

    public static getFilteredData(options: FilterOptions){
        let  filteredData = [];
        if(options.columnDataType == 'boolean'){
            filteredData = options.originalData.filter((item: any) => {
                let columnValue = '';
                columnValue = item[options.columnName].toString().toLowerCase();
                const filterValue = options.selectedRBValue.toLowerCase();
                const boolFilter = TableFilterConfig.applyBooleanFilter(columnValue, filterValue);
                return boolFilter;
            });

        }
        else if(options.columnDataType == 'date'){
            const itemDateObj1 = TableFilterConfig.formatDate(options.dtFilter1); //'2023-01-01';
            const itemDateObj2 = TableFilterConfig.formatDate(options.dtFilter2); //'2023-01-01';
            filteredData = options.originalData.filter((item: any) => {
                let columnValue = '';
                if(item[options.columnName] != null){
                    columnValue = item[options.columnName].toString();
                    const condition1 = TableFilterConfig.applyDateFilter1(columnValue, itemDateObj1, options.selectedDateFilterType1);

                    const condition2 = TableFilterConfig.applyDateFilter2(columnValue, itemDateObj2, options.selectedDateFilterType2);

                    if (options.filterCondition === 'and') {
                        return condition1 && condition2;
                    } else if (options.filterCondition === 'or') {
                        return condition1 || condition2;
                    } else {
                        return false;
                    }
                }
                else{
                    return false;
                }



            });

        }
        else if(options.columnDataType == 'number'){
            filteredData = options.originalData.filter((item: any) => {
              let columnValue = 0;
              columnValue = Number(item[options.columnName]);
      
              const filterValue = options.numVal1 != undefined ? options.numVal1 : 0;
              const secondFilterValue =  options.numVal2 != undefined ? options.numVal2 : 0;
              const condition1 = TableFilterConfig.applyNumericFilter1(columnValue, filterValue, options.selectedNumericFilterType1);
              const condition2 = TableFilterConfig.applyNumericFilter1(columnValue, secondFilterValue, options.selectedNumericFilterType2);
      
              if (options.filterCondition === 'and') {
                return condition1 && condition2;
              } else if (options.filterCondition === 'or') {
                return condition1 || condition2;
              } else {
                return false;
              }
            });
          }
        else{
            if (options.inputValue !== '') {
                filteredData = options.originalData.filter((item: any) => {
                    let columnValue = '';
                    if(options.columnName == 'TeamDTO.Name')
                    {
                        columnValue = item['TeamDTO'].Name.toString().toLowerCase();
                    }
                    else if(options.columnName == 'CarrierDTO.Name')
                    {
                        columnValue = item['CarrierDTO'].Name.toString().toLowerCase();
                    }
                    else{
                        columnValue = item[options.columnName].toString().toLowerCase();
                    }

                    const filterValue = options.inputValue.toLowerCase();
                    const secondFilterValue = options.secondInputValue != undefined ? options.secondInputValue.toLowerCase() : '';
                    const condition1 = TableFilterConfig.applyTextFilter1(columnValue, filterValue, options.selectedFilterType1);
                    const condition2 = TableFilterConfig.applyTextFilter2(columnValue, secondFilterValue, options.selectedFilterType2);

                    if (options.filterCondition === 'and') {
                        return condition1 && condition2;
                    } else if (options.filterCondition === 'or') {
                        return condition1 || condition2;
                    } else {
                        return false;
                    }
                });


            }
        }
        return filteredData;
    }

    public static formatDate(date: Date | null): string {
        if (date) {
            let date1 = new Date(date);
            const year = date1.getFullYear();
            const month = String(date1.getMonth() + 1).padStart(2, '0');
            const day = String(date1.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
        return '';
    }


}

export interface FilterOptions {
  columnDataType: string;
  originalData: any;
  filteredData:any;
  columnName: any;
  dtFilter1: Date | null;
  dtFilter2: Date | null;
  filterCondition: string;
  inputValue: string;
  secondInputValue: string;
  selectedFilterType1: string;
  selectedFilterType2: string;
  selectedDateFilterType1: string;
  selectedDateFilterType2: string;
  selectedRBValue: string;
  selectedNumericFilterType1:string;
  selectedNumericFilterType2:string;
  numVal1?:number;
  numVal2?:number;
}