import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-save-records-bulk',
  templateUrl: './save-records-bulk.component.html',
  styleUrl: './save-records-bulk.component.css'
})
export class SaveRecordsBulkComponent {
  initialData: CheckListServiceInfo[] = [];

  checkListData: CheckListRow[] = [];
  showValidation = false;
  showSuccessMessage = false;
  showModifiedOnly = false;
  validationErrors: string[] = [];
  lastSaveCount = 0;

  ngOnInit(): void {

    this.initialData = [
      {
        description: 'Annual HVAC system maintenance and cleaning.',
        label: 'HVAC Maintenance',
        name: 'hvac_maintenance_2024',
        id: 'a01b2c3d',
        attachment: null
      },
      {
        description: 'Inspection of all fire extinguishers and smoke detectors.',
        label: 'Fire Safety Inspection',
        name: 'fire_safety_inspection',
        id: 'b3c4d5e6',
        attachment: null
      },
      {
        description: 'Quarterly server room hardware audit.',
        label: 'Server Room Audit',
        name: 'server_audit_q3',
        id: 'c5d6e7f8',
        attachment: null
      },
      {
        description: 'Vehicle fleet tire rotation and fluid check.',
        label: 'Fleet Service Check',
        name: 'vehicle_check_fleet',
        id: 'd7e8f9g0',
        attachment: null
      },
      {
        description: 'Review of all office security protocols.',
        label: 'Security Protocol Review',
        name: 'office_security_review',
        id: 'e9f0g1h2',
        attachment: null
      }
    ];

    this.loadInitialData();
  }

  loadInitialData(): void {
    if (this.initialData && this.initialData.length > 0) {
      this.checkListData = this.initialData.map(item => ({
        ...item,
        _isModified: false,
        _originalData: { ...item }
      }));
    } else {
      // If no initial data, start with one empty row
      this.addRow();
    }
  }

  addRow(): void {
    const newRow: CheckListRow = {
      id: '',
      name: '',
      label: '',
      description: '',
      attachment: null,
      _isModified: true,
      _originalData: undefined // null indicates this is a new row
    };
    this.checkListData.push(newRow);
    this.hideMessages();
  }

  removeRow(item: CheckListRow): void {
    const index = this.checkListData.indexOf(item);
    if (index > -1) {
      this.checkListData.splice(index, 1);
    }
    this.hideMessages();
  }

  onFieldChange(item: CheckListRow, field: keyof CheckListServiceInfo, event: any): void {
    const value = event.target.value;
    (item as any)[field] = value;

    // Mark as modified if it's not a new row
    if (item._originalData) {
      item._isModified = this.hasChanges(item);
    }

    this.hideMessages();
  }

  onFileSelected(event: any, item: CheckListRow): void {
    const file = event.target.files[0];
    item.attachment = file || null;

    // Mark as modified if it's not a new row
    if (item._originalData) {
      item._isModified = this.hasChanges(item);
    }
  }

  private hasChanges(item: CheckListRow): boolean {
    if (!item._originalData) return true; // New row

    return (
      item.id !== item._originalData.id ||
      item.name !== item._originalData.name ||
      item.label !== item._originalData.label ||
      item.description !== item._originalData.description ||
      item.attachment !== item._originalData.attachment
    );
  }

  resetRow(item: CheckListRow): void {
    if (item._originalData) {
      item.id = item._originalData.id;
      item.name = item._originalData.name;
      item.label = item._originalData.label;
      item.description = item._originalData.description;
      item.attachment = item._originalData.attachment;
      item._isModified = false;
    }
  }

  resetChanges(): void {
    // Reset all modified existing rows
    this.checkListData.forEach(item => {
      if (item._originalData && item._isModified) {
        this.resetRow(item);
      }
    });

    // Remove new rows
    this.checkListData = this.checkListData.filter(item => item._originalData !== null);

    this.hideMessages();
  }

  getModifiedRows(): CheckListRow[] {
    return this.checkListData.filter(item => item._isModified);
  }

  getModifiedCount(): number {
    return this.getModifiedRows().length;
  }

  getDisplayData(): CheckListRow[] {
    if (this.showModifiedOnly) {
      return this.getModifiedRows();
    }
    return this.checkListData;
  }

  isNewRow(item: CheckListRow): boolean {
    return item._originalData === null;
  }

  validateModifiedData(): boolean {
    this.validationErrors = [];
    let isValid = true;
    const modifiedRows = this.getModifiedRows();

    modifiedRows.forEach((item, index) => {
      const displayIndex = this.checkListData.indexOf(item) + 1;

      if (!item.id.trim()) {
        this.validationErrors.push(`Row ${displayIndex}: ID is required`);
        isValid = false;
      }

      if (!item.name.trim()) {
        this.validationErrors.push(`Row ${displayIndex}: Name is required`);
        isValid = false;
      }

      if (!item.label.trim()) {
        this.validationErrors.push(`Row ${displayIndex}: Label is required`);
        isValid = false;
      }

      if (!item.description.trim()) {
        this.validationErrors.push(`Row ${displayIndex}: Description is required`);
        isValid = false;
      }
    });

    return isValid;
  }

  saveModified(): void {
    this.hideMessages();
    this.showValidation = true;

    if (!this.validateModifiedData()) {
      return;
    }

    const modifiedRows = this.getModifiedRows();
    this.performBulkSave(modifiedRows);
  }

  private performBulkSave(modifiedData: CheckListRow[]): void {
    console.log('Saving modified data:', modifiedData);

    // Separate new rows and updated rows
    const newRows = modifiedData.filter(item => this.isNewRow(item));
    const updatedRows = modifiedData.filter(item => !this.isNewRow(item));

    console.log('New rows:', newRows);
    console.log('Updated rows:', updatedRows);

    // Create FormData for each item
    const formDataArray = modifiedData.map((item, index) => {
      const formData = new FormData();
      formData.append('id', item.id);
      formData.append('name', item.name);
      formData.append('label', item.label);
      formData.append('description', item.description);
      formData.append('isNew', this.isNewRow(item).toString());

      if (item.attachment) {
        formData.append('attachment', item.attachment);
      }

      return formData;
    });

    console.log('FormData array ready for API:', formDataArray);

    // Simulate successful save
    setTimeout(() => {
      this.lastSaveCount = modifiedData.length;
      this.showSuccessMessage = true;
      this.showValidation = false;

      // Update the original data and reset modification flags
      modifiedData.forEach(item => {
        item._originalData = {
          id: item.id,
          name: item.name,
          label: item.label,
          description: item.description,
          attachment: item.attachment
        };
        item._isModified = false;
      });

      // Hide success message after 3 seconds
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 3000);
    }, 1000);

    // Example of how you might call your actual service:
    /*
    this.checklistService.bulkSave(formDataArray).subscribe(
      (response) => {
        console.log('Save successful:', response);
        this.lastSaveCount = modifiedData.length;
        this.showSuccessMessage = true;
        this.showValidation = false;
        
        // Update original data and reset flags
        modifiedData.forEach(item => {
          item._originalData = { ...item };
          item._isModified = false;
        });
      },
      (error) => {
        console.error('Save failed:', error);
        // Handle error
      }
    );
    */
  }
  private hideMessages(): void {
    this.showValidation = false;
    this.showSuccessMessage = false;
    this.validationErrors = [];
  }
}


// Interface definition
export interface CheckListServiceInfo {
  description: string;
  label: string;
  name: string;
  id: string;
  attachment: File | null;
}

// Interface to track row changes
interface CheckListRow extends CheckListServiceInfo {
  _isModified?: boolean;
  _originalData?: CheckListServiceInfo;
}