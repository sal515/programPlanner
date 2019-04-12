import { Component } from '@angular/core';

@Component({
    selector: 'app-course-history-dialog',
    templateUrl: './course-history-dialog.component.html',
    styleUrls: ['./course-history-dialog.component.css']
})
export class CourseHistoryDialogComponent{

    courseHistoryData = CourseHistoryDialogComponent.getCourseHistory();
    semesters = CourseHistoryDialogComponent.getSemestersCourseHistory();

    static getCourseHistory()
    {
        let studentProfile = JSON.parse(localStorage.getItem('studentProfile'));
        return studentProfile.courseHistory;
    }

    static getSemestersCourseHistory()
    {
        let studentProfile = JSON.parse(localStorage.getItem('studentProfile'));
        let courseHistory = studentProfile.courseHistory;
        let semestersArray : string[] = [];
        for (let semester in courseHistory){
            semestersArray.push(semester);
        }
        return semestersArray;
    }
}
