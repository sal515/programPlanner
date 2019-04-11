import {Component, OnInit} from '@angular/core';
import {ClassesService} from '../../classes-service/classes.service';
import {ClassInfo, ClassInfoArray} from '../../models/class-info.model';

@Component({
    selector: 'app-calendar-view-component',
    templateUrl: './calendar-view.component.html',
    styleUrls: ['./calendar-view.component.css']
})
export class CalendarViewComponent implements OnInit {
    constructor(private classesService: ClassesService) {
        let i: number;

        /**
         * Determines the number of time slots in the calendar
         */
        for (i = 0; i < 160 / 3; i++) {
            this.timeColumn[i] = i;
            this.times = [5 * i];
        }

        /**
         * 5 minute blocks
         *
         */
        for (i = 0; i < 720; i++) {
            this.gridTimes[i] = i;
        }
    }

    timeColumn: number[] = [];
    times: number[] = [];
    classes: ClassInfoArray = new ClassInfoArray();
    gridTimes: number[] = [];

    ngOnInit() {
        this.classesService.cast.subscribe(classes => this.classes = classes);
    }

    getSpace() {
        return ' ';
    }

    getTime(index: number) {
        let hours: number;
        let minutes: number;
        let time: number;

        time = index;

        /**
         * Determines time of the course in its displayed box
         */
        hours = Math.floor(time / 60);
        minutes = (time % 60);
        if (hours > 12) {
            hours -= 12;
        }
        let minutesString: String;
        if (minutes === 5 || minutes === 0) {
            minutesString = 0 + minutes.toString();
        } else {
            minutesString = minutes.toString();
        }
        return hours + ':' + minutesString;
    }

    /**
     * Gets the time row at which the class starts
     */
    getClassRowStart(classInput: ClassInfo) {
        return (classInput.start - 525) / 5  + 2;
    }

    /**
     * Gets the time row at which the class ends
     */
    getClassRowEnd(classInput: ClassInfo) {
        return (classInput.end - 525) / 5 + 2;
    }

    /**
     * Gets the day of the class
     */
    getClassColumn(classInput: ClassInfo) {
        return classInput.day + 1;
    }
}

