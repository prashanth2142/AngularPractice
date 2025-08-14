import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CarTableDataService } from '../services/car-table-data-service.service';
import { MatSort } from '@angular/material/sort';


export class Group {
  level = 0;
  parent!: Group;
  expanded = true;
  totalCounts = 0;
  [key: string]: any;  // Index signature to allow dynamic property access
  get visible(): boolean {
    return !this.parent || (this.parent.visible && this.parent.expanded);
  }
}


@Component({
  selector: 'app-group-rows',
  standalone: false,
  templateUrl: './group-rows.component.html',
  styleUrl: './group-rows.component.css'
})
export class GroupRowsComponent {
  title = 'Grid Grouping';
  @ViewChild(MatSort) sort!: MatSort;
  public dataSource = new MatTableDataSource<any | Group>([]);

  _alldata!: any[];
  columns: any[];
  displayedColumns: string[];
  groupByColumns: string[] = [];

  pageSizeOptions = [5, 10, 25];
  totalRecords: any[] = [];

  // Use '!' to assert that paginator will be initialized later
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    protected dataSourceService: CarTableDataService,
  ) {

    this.columns = [{
      field: 'id'
    }, {
      field: 'vin'
    }, {
      field: 'brand'
    }, {
      field: 'year'
    }, {
      field: 'color'
    }];
    this.displayedColumns = this.columns.map(column => column.field);
    this.groupByColumns = ['brand'];
  }

  ngOnInit() {
    this.dataSourceService.getAllData()
    .subscribe(
      (data: any) => {
          data.data.forEach((item:any, index:any) => {
            item.id = index + 1;
          });
          this._alldata = data.data;
          this.dataSource.data = this.addGroups(this._alldata, this.groupByColumns);
          this.dataSource.filterPredicate = this.customFilterPredicate.bind(this);
          this.dataSource.filter = performance.now().toString();
        },
      (err: any) => console.log(err)
    );
  }

  ngAfterViewInit() {
    // After the view is initialized, assign the paginator to the dataSource
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
      
    }
    this.dataSource.sort = this.sort;
  }

  groupBy(event:any, column:any) {
    event.stopPropagation();
    this.checkGroupByColumn(column.field, true);
    this.dataSource.data = this.addGroups(this._alldata, this.groupByColumns);
    this.dataSource.filter = performance.now().toString();
  }

  checkGroupByColumn(field:string, add :any) {
    let found = null;
    for (const column of this.groupByColumns) {
      if (column === field) {
        found = this.groupByColumns.indexOf(column, 0);
      }
    }
    if (found != null && found >= 0) {
      if (!add) {
        this.groupByColumns.splice(found, 1);
      }
    } else {
      if ( add ) {
        this.groupByColumns.push(field);
      }
    }
  }

  unGroupBy(event:any, column:any) {
    event.stopPropagation();
    this.checkGroupByColumn(column.field, false);
    this.dataSource.data = this.addGroups(this._alldata, this.groupByColumns);
    this.dataSource.filter = performance.now().toString();
  }

  // below is for grid row grouping
  customFilterPredicate(data: any | Group, filter: string): boolean {
    return (data instanceof Group) ? data.visible : this.getDataRowVisible(data);
  }

  getDataRowVisible(data: any): boolean {
    const groupRows = this.dataSource.data.filter((row) => {
      if (!(row instanceof Group)) return false;
    
      return this.groupByColumns.every((column: string) =>
        (row as any)[column] && data[column] && (row as any)[column] === data[column]
      );
    });
    
    

    if (groupRows.length === 0) {
      return true;
    }
    const parent = groupRows[0] as Group;
    return parent.visible && parent.expanded;
  }

  groupHeaderClick(row:any) {
    row.expanded = !row.expanded;
    this.dataSource.filter = performance.now().toString();  // bug here need to fix
  }

  addGroups(data: any[], groupByColumns: string[]): any[] {
    const rootGroup = new Group();
    rootGroup.expanded = true;
    return this.getSublevel(data, 0, groupByColumns, rootGroup);
  }

  getSublevel(data: any[], level: number, groupByColumns: string[], parent: Group): any[] {
    if (level >= groupByColumns.length) {
      return data;
    }
    const groups = this.uniqueBy(
      data.map(
        row => {
          const result = new Group();
          result.level = level + 1;
          result.parent = parent;
          for (let i = 0; i <= level; i++) {
            result[groupByColumns[i]] = row[groupByColumns[i]];
          }
          return result;
        }
      ),
      JSON.stringify);

    const currentColumn = groupByColumns[level];
    let subGroups : any = [];
    groups.forEach((group:any) => {
      const rowsInGroup = data.filter(row => group[currentColumn] === row[currentColumn]);
      group.totalCounts = rowsInGroup.length;
      const subGroup = this.getSublevel(rowsInGroup, level + 1, groupByColumns, group);
      subGroup.unshift(group);
      subGroups = subGroups.concat(subGroup);
    });
    return subGroups;
  }

  uniqueBy<T>(array: T[], keyFn: (item: T) => string | number): T[] {
    const seen = new Set<string | number>();
    return array.filter(item => {
      const key = keyFn(item);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }
  

  isGroup(index:any, item:any): boolean {
    return item.level;
  }
}
