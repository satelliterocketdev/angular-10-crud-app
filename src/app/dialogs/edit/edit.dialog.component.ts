import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BranchTableService } from 'src/app/services/branch-table.service';
import { InstanceTableService } from 'src/app/services/instance-table.service';
import { ServiceTableService } from 'src/app/services/service-table.service';
import { Component, Inject, OnInit  } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-baza.dialog',
  templateUrl: '../../dialogs/edit/edit.dialog.html',
  styleUrls: ['../../dialogs/edit/edit.dialog.css']
})
export class EditDialogComponent implements OnInit   {

  constructor(public dialogRef: MatDialogRef<EditDialogComponent>,
    private serviceTableService: ServiceTableService,
    private branchTableService: BranchTableService, private instanceTableService: InstanceTableService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  branches = [];
  instances = [];
  service = {
    id: -1,
    name: '',
    branchId: -1,
    instanceId: -1,
    isEnabled: false
  };

  ngOnInit(): void {
    this.service = this.data;
    this.getBranchAll();
    this.getInstanceAll();
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
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

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    this.serviceTableService.update(this.service.id, this.service)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }
}
