import {Component, OnInit} from '@angular/core';
import {ClassesService} from '../classes-service/classes.service';
import {ClassInfo, ClassInfoArray, Day} from '../models/class-info.model';

@Component({
  selector: 'app-home',
  templateUrl: './home-view-container.component.html',
  styleUrls: ['./home-view-container.component.css']
})
export class HomeViewContainerComponent implements  OnInit {

  classes: ClassInfoArray = new ClassInfoArray();
  constructor (private classesService: ClassesService) {
  }

  ngOnInit() {
    this.classes.classInfo.push( new ClassInfo(795, 850, 'SOEN341', Day.Monday));
    this.classes.classInfo.push(new ClassInfo(865, 930, 'COEN346', Day.Monday));

    this.classes.classInfo.push(new ClassInfo(725, 1000, 'ELEC321', Day.Tuesday));
    this.classes.classInfo.push(new ClassInfo(1045, 1100, 'COEN390', Day.Tuesday));

    this.classes.classInfo.push(new ClassInfo(695, 790, 'ENGR213', Day.Wednesday));

    this.classes.classInfo.push(new ClassInfo(1005, 1100, 'ENGR371', Day.Thursday));

    this.classes.classInfo.push(new ClassInfo(545, 580, 'ELEC490', Day.Friday));

    this.classesService.editUser(this.classes);
  }
}

