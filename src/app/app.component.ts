import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BranchTableService } from 'src/app/services/branch-table.service';
import { InstanceTableService } from 'src/app/services/instance-table.service';
import { ServiceTableService } from 'src/app/services/service-table.service';
import {AddDialogComponent} from './dialogs/add/add.dialog.component';
import {EditDialogComponent} from './dialogs/edit/edit.dialog.component';
import {DeleteDialogComponent} from './dialogs/delete/delete.dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit  {
  title = 'Angular10Crud';
  displayedColumns = ['id', 'name', 'branchId', 'instanceId', 'isEnabled','actions'];
  services = [];
  currentService = null;
  selectedBranch = -1;
  currentIndex = -1;
  branches = [];
  instances = [];
  dataSource = new MatTableDataSource(this.services);

  constructor(private serviceTableService: ServiceTableService, private branchTableService: BranchTableService, private instanceTableService: InstanceTableService, public dialog: MatDialog) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter',  {static: true}) filter: ElementRef;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getBranchAll();
    this.getInstanceAll();
    this.retrieveServices();
  }
  branchFilterChanged(branchId){
    console.log("branch", branchId);
    this.searchBranch(branchId);
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

  addNew() {
    const dialogRef = this.dialog.open(AddDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        // this.exampleDatabase.dataChange.value.services.push(this.dataService.getDialogData());
        // this.refreshTable();
        this.refreshList();
      }
    });
  }
  deleteItem(id) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // const foundIndex = this.exampleDatabase.dataChange.value.services.findIndex(x => x.id === this.id);
        // for delete we use splice in order to remove single object from DataService
        // this.exampleDatabase.dataChange.value.services.splice(foundIndex, 1);
        this.refreshList();
      }
    });
  }

  startEdit(id, name, branchId, instanceId, isEnabled) {
    console.log({id: id, name: name, branchId: branchId, instanceId: instanceId, isEnabled: isEnabled});
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {id: id, name: name, branchId: branchId, instanceId: instanceId, isEnabled: isEnabled}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        // const foundIndex = this.exampleDatabase.dataChange.value.services.findIndex(x => x.id === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        // this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        // And lastly refresh table
        this.refreshList();
      }
    });
  }

  retrieveServices(): void {
    this.serviceTableService.getAll()
      .subscribe(
        data => {
          this.services = data.rows;
          this.dataSource.data = this.services;
          console.log("services", data.rows);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.paginator._changePageSize(this.paginator.pageSize);
    this.retrieveServices();
    this.currentService = null;
    this.currentIndex = -1;
  }
  
  filterAll(): void {
    this.selectedBranch = -1;
    this.refreshList();
  }

  getBranchName(id) {
    let found = this.branches.filter(e=>e.id==id);
    return found.length > 0 ? found[0].name : "";
  }
  getInstanceName(id) {
    let found = this.instances.filter(e=>e.id==id);
    return found.length > 0 ? found[0].name : "";
  }

  setActiveService(tutorial, index): void {
    this.currentService = tutorial;
    this.currentIndex = index;
  }

  removeAllServices(): void {
    this.serviceTableService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  searchBranch(branchId): void {
    this.serviceTableService.findByBranch(branchId)
      .subscribe(
        data => {
          this.services = data.rows;
          this.dataSource.data = this.services;
          // this.dataSource.data = this.services;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}
