import {Component} from '@angular/core';
import {MatDialog} from '@angular/material';
import {CourseHistoryDialogComponent} from "./course-history-dialog/course-history-dialog.component";

@Component({
  selector: 'app-course-history-component',
  templateUrl: './course-history.component.html',
  styleUrls: ['./course-history.component.css'],
})
export class CourseHistoryComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(CourseHistoryDialogComponent, {width: "600px"});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}


