import { Component } from '@angular/core';

@Component({
  selector: 'app-csv-upload',
  templateUrl: './csv-upload.component.html'
})
export class CsvUploadComponent {

  columns: any[] = [];
  dataSource: any[] = [];

  onFileSelect(event: any) {
    const file: File = event.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      this.parseCSV(text);
    };
    reader.readAsText(file);
  }

  parseCSV(csv: string) {
    const lines = csv.split('\n').filter(line => line.trim() !== '');
    const headers = lines[0].split(',');

    this.columns = headers.map(h => ({
      field: h.trim(),
      header: h.trim()
    }));

    this.dataSource = lines.slice(1).map((line, index) => {
  const values = line.split(',');
  const row: any = { id: index, errors: {} };

  headers.forEach((header, i) => {
    row[header.trim()] = values[i]?.trim();
  });

  row.errors = this.validateRow(row);

  return row;
});
  }

  validateRow(row: any): any {
    const errors: any = {};

    if (!row['Client'] && !row['Route']) {
      errors['Client'] = 'Either Client or Route is required';
      errors['Route'] = 'Either Client or Route is required';
    }

    if (!row['Carrier']) {
      errors['Carrier'] = 'Carrier is required';
    }

    if (!row['Original ETA']) {
      errors['Original ETA'] = 'Original ETA is required';
    }

    if (!row['New ETA']) {
      errors['New ETA'] = 'New ETA is required';
    }

    if (row['Original ETA'] && row['New ETA']) {
      const o = new Date(row['Original ETA']);
      const n = new Date(row['New ETA']);
      if (o >= n) {
        errors['Original ETA'] = 'Original ETA must be earlier than New ETA';
        errors['New ETA'] = 'Original ETA must be earlier than New ETA';
      }
    }

    if (!row['Reason for delay']) {
      errors['Reason for delay'] = 'Reason is required';
    }

    if (!row['Quantity'] && !row['Tracking number']) {
      errors['Quantity'] = 'Either Quantity or Tracking Number required';
      errors['Tracking number'] = 'Either Quantity or Tracking Number required';
    }

    if (!row['Created By']) {
      errors['Created By'] = 'Created By is required';
    }

    return errors;
  }

  onCellEdit(row: any) {
    row.errors = this.validateRow(row);
  }
}