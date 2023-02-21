import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceTableService } from 'src/app/services/service-table.service';
import { BranchTableService } from 'src/app/services/branch-table.service';
import { InstanceTableService } from 'src/app/services/instance-table.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add.dialog',
  templateUrl: '../../dialogs/add/add.dialog.html',
  styleUrls: ['../../dialogs/add/add.dialog.css']
})

export class AddDialogComponent implements OnInit  {
  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private serviceTableService: ServiceTableService, private branchTableService: BranchTableService, private instanceTableService: InstanceTableService) { }

  service = {
    id: -1,
    name: '',
    branchId: -1,
    instanceId: -1,
    isEnabled: false
  };
  branches = [];
  instances = [];

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  ngOnInit(): void {
    this.getBranchAll();
    this.getInstanceAll();
  }

  getBranchAll(): void {
    this.branchTableService.getAll()
      .subscribe(
        data => {
          this.branches = data.rows;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  
  getInstanceAll(): void {
    this.instanceTableService.getAll()
      .subscribe(
        data => {
          this.instances = data.rows;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
    // empty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    const data = {
      name: this.service.name,
      branchId: this.service.branchId,
      instanceId: this.service.instanceId,
      isEnabled: this.service.isEnabled,
    };

    this.serviceTableService.create(data)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }
}
