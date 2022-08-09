import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/models/api-response';
import { Employee } from 'src/app/models/employee';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees: Observable<Employee[]> | undefined;

  dtOptions: DataTables.Settings = {};
  @ViewChild('dtOptions', { static: true }) table: any;
  constructor(private employeeService: EmployeeServiceService,
    private router: Router) {
    setTimeout(function () {
      $(function () {
        $('#example').DataTable();
      });
    }, 2000);

  }

  ngOnInit() {
    this.employees = this.employeeService.getEmployees();
    setTimeout(function () {
      $(function () {
        $('#example').DataTable();
      });
    }, 2000);

  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id)
      .subscribe(
        data => {
          console.log(data);
          this.employees = this.employeeService.getEmployees();
        },
        error => console.log(error));
  }

  updateEmployee(id: number) {
    this.router.navigate(['update', id]);
  }

}
