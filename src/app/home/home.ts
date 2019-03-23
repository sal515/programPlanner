import {Component, OnInit} from '@angular/core';
import {ClassesService} from '../classes.service';
import {ClassInfo, ClassInfoArray, Day} from '../ClassInfo';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements  OnInit{
  courseName = 'ENGR';
  day = 'monday';
  startHour = 8;
  startMinute = 30;
  endHour = 9;
  endMinute = 10;
  success = '';

  classes: ClassInfoArray = new ClassInfoArray();
  constructor (private classesService: ClassesService) {
  }

  ngOnInit() {
    this.classes.classInfo.push( new ClassInfo(650, 700, 'SOEN341', Day.Monday));
    this.classes.classInfo.push(new ClassInfo(860, 930, 'COEN346', Day.Monday));

    this.classes.classInfo.push(new ClassInfo(725, 1000, 'ELEC321', Day.Tuesday));
    this.classes.classInfo.push(new ClassInfo(1040, 1100, 'COEN390', Day.Tuesday));

    this.classes.classInfo.push(new ClassInfo(690, 790, 'ENGR213', Day.Wednesday));

    this.classes.classInfo.push(new ClassInfo(920, 1000, 'ENGR371', Day.Thursday));

    this.classes.classInfo.push(new ClassInfo(540, 580, 'ELEC490', Day.Friday));

    this.classesService.editUser(this.classes);
  }

  onClickMe() {

  }
}

