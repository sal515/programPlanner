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
        for (i = 0; i < 93 / 3; i++) {
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

    clickedBoxes: number[] = [];

    mouseClick = false;

    ngOnInit() {
        this.classesService.cast.subscribe(classes => this.classes = classes);
    }

    getTime(index: number) {
        let hours: number;
        let minutes: number;
        let time: number;

        time = index;

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
        return (classInput.start - 480) / 10 + 2;
    }

    /**
     * Gets the time row at which the class ends
     */
    getClassRowEnd(classInput: ClassInfo) {
        return (classInput.end - 480) / 10 + 2;
    }

    /**
     * Gets the day of the class
     */
    getClassColumn(classInput: ClassInfo) {
        return classInput.day + 1;
    }

    checkFreeTime(inputIndex: number) {
        let column: number;
        let row: number;

        column = inputIndex % 5 + 1;
        row = inputIndex / 5 + 1;

        let i: number;
        for (i = 0; i < this.classes.classInfo.length; i++) {
            if ((column === this.classes.classInfo[i].day)
                && ((row * 5 + 475) >= this.classes.classInfo[i].start)
                && ((row * 5 + 475) < this.classes.classInfo[i].end)) {
                return false;
            }
        }
        return true;
    }

    getData(inputIndex) {
        let column: number;
        let row: number;
        column = (inputIndex % 5 + 1);
        row = Math.floor(inputIndex / 5 + 1) * 5 + 475;
        return (this.getTime(row)).toString() + ' , ' + column.toString();
    }

    setMouseOver(inputIndex: number) {
        if (this.mouseClick === false) {
            return;
        }
        const present = false;
        let i: number;
        for (i = 0; i < this.clickedBoxes.length; i++) {
            if (this.clickedBoxes[i] === inputIndex) {
                this.clickedBoxes.splice(i, 1);
                return;
            }
        }
        this.clickedBoxes.push(inputIndex);
    }

    mouseClicked(input: number) {
        this.mouseClick = true;
        this.setMouseOver(input);
    }

    mouseDeclicked() {
        this.mouseClick = false;
    }
}

