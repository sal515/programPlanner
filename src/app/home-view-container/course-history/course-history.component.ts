import {Component} from '@angular/core';
import {MatDialog} from '@angular/material';


@Component({
  selector: 'app-course-history-component',
  templateUrl: './course-history.component.html',
  styleUrls: ['./course-history.component.css'],
})
export class CourseHistoryComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(CourseHistoryDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'app-course-history-dialog-component',
  templateUrl: 'course-history-dialog.component.html',
})
export class CourseHistoryDialogComponent {}
