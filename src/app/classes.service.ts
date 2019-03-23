import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ClassInfoArray} from './ClassInfo';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {
  private classes = new BehaviorSubject<ClassInfoArray>(new ClassInfoArray());
  cast = this.classes.asObservable();

  constructor() { }

  editUser(weekClasses: ClassInfoArray) {
    this.classes.next(weekClasses);
  }
}
