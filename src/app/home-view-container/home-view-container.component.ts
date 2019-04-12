import {Component, OnInit} from '@angular/core';
import {ClassesService} from '../classes-service/classes.service';
import {ClassInfo, ClassInfoArray} from '../models/class-info.model';

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
    // this.classes.classInfo.push( new ClassInfo(650, 700, 'SOEN341',"", 1));
    // this.classes.classInfo.push(new ClassInfo(860, 930, 'COEN346',"", 1));
    //
    // this.classes.classInfo.push(new ClassInfo(725, 1000, 'ELEC321',"", 2));
    // this.classes.classInfo.push(new ClassInfo(1040, 1100, 'COEN390',"", 2));
    //
    // this.classes.classInfo.push(new ClassInfo(690, 790, 'ENGR213', "",3));
    //
    // this.classes.classInfo.push(new ClassInfo(920, 1000, 'ENGR371',"", 4));
    //
    // this.classes.classInfo.push(new ClassInfo(540, 580, 'ELEC490', "", 5));

    //this.classesService.editUser(this.classes);
  }
}

