##Angular Instructions:
#####===================  Start of Info  ==================
* Each component has 3 files:
  
        a. componentName.component.html
        b. componentName.component.css
        c. componentName.component.ts
        
* Components are made to be reused within the project.

#####===================  End of Info  ==================


#####===================  Start of Create Component  ==================
* Typical declaration of a component involves with modifying the .ts file as follows:
   ```javascript        
     
        import {Component} from '@angular/core';
        
        @Component({
          selector: 'app-componentName',
          templateUrl: './componentName.component.html',
          styleUrls: ['./componentName.component.css']
        })
        export class ComponentNameComponent {
          // title = 'Can be anything you want';
        }
    ```
    * The explanation for the code above
    
    * The selector shown above is the <tag-name>
    
    * The templateUrl is the reference to the html doc for the specific component
    
    * The styleUrls is the reference to the css file for the specific component 
    
* Once the .ts file is configured with the code shown above,     
   
   go to --> file: module.ts --> import as shown below:
   
        import {ComponentNameComponent} from './dir/componentName.component';
        
        (the IDE should be able to recognize the component and import for you when you type)

* After importing the module add the component in the declarations as shown below:
        
        @NgModule({
          declarations: [
            AppComponent,
            componentExample1,
            ComponentNameComponent      <<<------ This is the one 
          ],
#####===================  End of Create Component  ==================

#####===================  Start of Create Model, Service and Observable to Share the same data between Modules ==================
   
   * Steps to create a Model of data to uniformly use and object over a component or Module
   * This would be analogous to Class in java 
      * Create a model file in the component directory:
          * programPlanner\src\app\user\course.model.ts
      * The model file will contain the following code: 
            
            export interface CourseModel {
              courseType: string;
              courseCode: number;
            }
      * As stated earlier this is basically a Class declaration, and can be instantiated where required

   * Steps to create a service:
        * Create a service file in the component directory: 
            * Example: programPlanner\src\app\user\course.service.ts
        * The service file will have to import the Model file that was created beforehand
            
              import {CourseModel} from './course.model';
              import {Injectable} from '@angular/core';
              
              // this is a service to save data locally in angular -- not preferred method
              // this service needs to be exported  -  and injected to components that needs to use it
              // The Service needs to be exprted with the export keyword below but if the Injectable decorator is used it doesn't have to be added to the main
              
              
              @Injectable({providedIn: 'root'})
              export class CourseService {
                private _courseArr: CourseModel[] = [];
              
                // arrays and objects in JS are reference types,
                getCourse() {
                  // the method of returning an array by value - typescript way of passing by value
                  return [...this._courseArr];
              
                  // the method of returning shown below returns a reference
                  // return this._course;
                }
                addCourse(courseType: string, courseCode: number) {
                  // creating a new course object and saving it to the array above
                  const courseObj: CourseModel = {courseType: courseType, courseCode: courseCode};
                  this._courseArr.push(courseObj);
                }
              }
        * The service needs to be added imported in the component where it will be used 

   * Steps to add observables to the service created above:
        * Create a service file in the component directory: 
            * Example: programPlanner\src\app\user\course.service.ts
        * The service file will have to import the Model file that was created beforehand
            
              import {CourseModel} from './course.model';
              import {Injectable} from '@angular/core';
              
              // this is a service to save data locally in angular -- not preferred method
              // this service needs to be exported  -  and injected to components that needs to use it
              // The Service needs to be exprted with the export keyword below but if the Injectable decorator is used it doesn't have to be added to the main
              
              
              @Injectable({providedIn: 'root'})
              export class CourseService {
                private _courseArr: CourseModel[] = [];
              
                // arrays and objects in JS are reference types,
                getCourse() {
                  // the method of returning an array by value - typescript way of passing by value
                  return [...this._courseArr];
              
                  // the method of returning shown below returns a reference
                  // return this._course;
                }
                addCourse(courseType: string, courseCode: number) {
                  // creating a new course object and saving it to the array above
                  const courseObj: CourseModel = {courseType: courseType, courseCode: courseCode};
                  this._courseArr.push(courseObj);
                }
              }
        * The service needs to be added imported in the component where it will be used 

     
        
    
    
#####===================  End of Create Component  ==================

   


#####===================  Start of Import Material Component and Use It==================
* Typical declaration of a material component involves importing the material module in the  module.ts file as shown below:
        
        * First Thing to do in the module.ts file: Import the material module
        
        import {
          MatInputModule,
          MatCardModule
        } from '@angular/material';        
        import {Component} from '@angular/core';
        
       -->> The material input and card module was imported above <<-- 
        
       
        * Second Thing to do in the module.ts file: add the import module name to the imports array
                
                @NgModule({
                  declarations: [
                    AppComponent,
                    HeaderComponent,
                    CourseCreateComponent
                  ],
                  imports: [
                    BrowserModule,
                    BrowserAnimationsModule,
                    MatInputModule,
                    MatCardModule

        -->> The material input module and card module was added to the imports array <<-- 


* Once the module.ts file is configured with the code shown above, the imported modules tags can be used in .html file of any component. Example shown below:
      
      * Card tag example: (can be used in any component.html as regular html tags)   
      
                <mat-card>Simple card</mat-card>
                
      * input tag example: (can be used in any component.html as regular html tags)   
                
                <input matInput placeholder="CourseModel" value="SOEN 341">

* The component.css file can be used to style the material tags along with the custom angular component                


* See more details at :

      https://material.angular.io/             

      
#####===================  End of Import Material Component and Use ==================    


#####===================  Start of Listening to Module Events Without writing custom listening event in JS (angular style) ==================

* Add an event to the button or text box that you want to listen to, example below:
        
        --> The folloing is html material button tag in the example_component.component.html file <--
        
        <button mat-raised-button color="primary" (click)="methodToRunOnEvent()">ButtonName</button>
            
* Define the methodToRunOnEvent() method in the class for the module in the example.component.ts file :

      import {Component} from '@angular/core';
      
      @Component({
        selector: 'app-example-component',
        templateUrl: './example_component.component.html',
        styleUrls: ['./example_component.component.css']
      })
      export class exampleComponent {
        methodToRunOnEvent() {
          alert('Event was listned and the custom method was called from module class definition');
        }
      }
#####===================  End of Listening to Module Events Without writing listening event in JS (angular style) ==================    



#####===================  Start of Communication between two components (Using Template type Form) ==================

* This section shows how 2 components communicate using model objects 
    * The form validation is done using the NgForm module and ngForm directive in the form tag
    

* Create a model for the course that was emitted, by utilizing an interface
      
      // create a new file in the course_list folder called "course.model.ts" and add the model:

          export interface CourseModel {
            courseType: string;
            courseCode: number;
          }


* create a component1 that outputs the data as shown below:
    
    ##### Warning: The -->> ngForm <<-- directive are not detected by the IDE but it is a proper angular usage.
    
    * example.component1.ts file:
    
    
        import {Component} from '@angular/core';
        import {EventEmitter} from '@angular/core';
        import {Output} from '@angular/core';
        import {CourseModel} from '../course.model';
        import {NgForm} from '@angular/forms';
        
        @Component({
          selector: 'app-course-create',
          templateUrl: './course_create.component.html',
          styleUrls: ['./course_create.component.css']
        })
        export class CourseCreateComponent {
          courseCodeText = 'CourseModel Code';
          courseTypeText = 'CourseModel Type';
          // courseTypeName;
          // courseCodeName;
          @Output() courseCreated = new EventEmitter<CourseModel>();
        
          onSaveCourse( form: NgForm) {
            if (form.invalid) {
              return;
            }
            const course: CourseModel = {
              courseType: form.value.courseTypeForm,
              courseCode: form.value.courseCodeNumber
              // courseType: form.value.,
              // courseCode: number
          };
            this.courseCreated.emit(course);
          }
        }
        
        
        
   * example.component1.html file:
    
    ```html
        <mat-card>
          <!--The ngSubmit bind the form element to the onSaveCourse() method -->
          <!--and the tag #courseForm tag of type ngForm allows access to the input Fields that uses ngModel using their name parameter-->
              <form (ngSubmit)="onSaveCourse(couseForm)" #couseForm="ngForm">
              <mat-form-field appearance="outline">
                  <mat-label>{{courseTypeText}}</mat-label>
                <!--the ngModel is added as parameter to make the input field part of the angular from template-->
                <!--required is a parameter that makes the input field red if the input does not meet req - visual thing only -->
                <!--the minimum length is set to 2 after that no error shown-->
                  <input matInput placeholder="SOEN"
                         name="courseTypeForm"
                         ngModel
                         required
                         minlength="2"
                         #passThisField = "ngModel">
                <!--the following line checks if the input field is empty and displays an error-->
                <mat-error *ngIf="passThisField.invalid">Please enter a CourseModel Type</mat-error>
                  <mat-icon matSuffix>class</mat-icon>
                  <mat-hint>Example: SOEN</mat-hint>
                </mat-form-field>
                <mat-form-field appearance="outline">
                  <mat-label>{{courseCodeText}}</mat-label>
                  <!--The ngModel is used as binding of angular template forms-->
                  <input matInput placeholder="341"
                         name="courseCodeNumber"
                         ngModel
                         required
                         minlength="2"
                        #passCouseCodeField="ngModel">
                  <mat-error *ngIf="passCouseCodeField.invalid">Please enter a CourseModel Code</mat-error>
                  <mat-icon matSuffix>sentiment_very_satisfied</mat-icon>
                  <mat-hint>Example: 341</mat-hint>
                </mat-form-field>
              <mat-form-field>
                <mat-select placeholder="Select">
                  <mat-option value="option">Option</mat-option>
                </mat-select>
              </mat-form-field>
                <button mat-raised-button color="primary" type="submit">Save</button>
              </form>
        </mat-card>
    ```

   * example.component1.css file:
    
            mat-card{
              width: 100%;
              margin: auto;
            }
            mat-form-field, input{
              width: 100%;
              margin: auto;
            }
    

* Create another component2 that takes the data from component1
    
     * example.component2.html file:
      
      
        <!--<p><button mat-raised-button color="primary" (click)="array_fill()">Fill</button></p>-->
        
        <mat-accordion multi="true" *ngIf="courses.length > 0">
          <!--multi=true allows multiple to be open? -->
          <!--*ngIf="courses.length > 0    allows us to check if the courses array is not empty -->
          <mat-expansion-panel *ngFor="let course of courses">
            <!--*ngFor="let storedCourse of courses"   is going to go through every element in the courses array in the class-->
            <mat-expansion-panel-header>
              {{ course.courseType }}
            </mat-expansion-panel-header>
            <p>{{ course.courseCode}} </p>
            <!--The storedCourse.content will output the elements in the courses array-->
          </mat-expansion-panel>
        </mat-accordion>
        <!-- if the courses array is empty the according will not be displayed -->
        
        <p class="text-center mat-body-1" *ngIf="courses.length <= 0"> No post added yet</p>
        <!--*ngIf="courses.length <= 0"   this will ckeck if the courses array is empty and display this p tag-->
      

   * example.component2.ts file:
        
        
    
            import {Component} from '@angular/core';
            import {Input} from '@angular/core';
            
            import {CourseModel} from '../course.model';
            
            @Component({
              selector: 'app-course-list',
              templateUrl: './course_list.component.html',
              styleUrls: ['./course_list.component.css']
            })
            export class CourseListComponent {
              @Input() courses: CourseModel[] = [];
            }         
    
    
   * example.component2.css file:
  
            :host{
              display: block;
              margin-top: 1rem;
            }
            
            .text-center{
              text-align: center;
            }
 
  
  
  
  * Modify the main app.module.ts 
          
          
              import { AppComponent } from './app.component';
              import { BrowserModule } from '@angular/platform-browser';
              import { NgModule } from '@angular/core';
              import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
              import {HttpClientModule} from '@angular/common/http';
              
              // import the following in service
              // import {HttpClient} from '@angular/common/http';
              
              // angular forms input and output 2-way binding module
              import {FormsModule} from '@angular/forms';
              // angular forms input and output 2-way binding module
              
              
              // angular imports
              import {
                MatInputModule,
                MatCardModule,
                MatGridListModule,
                MatButtonModule,
                MatToolbarModule,
                MatFormFieldModule,
                MatIconModule,
                MatOptionModule,
                MatSelectModule,
                MatExpansionModule
              } from '@angular/material';
              // angular imports
              
              // imports of my custom components
              import {HeaderComponent} from './header/header.component';
              import {CourseCreateComponent} from './user/course_create/course_create.component';
              import {CourseListComponent} from './user/course_list/course_list.component';
              // imports of my custom components
              
              @NgModule({
                declarations: [
                  AppComponent,
                  HeaderComponent,
                  CourseCreateComponent,
                  CourseListComponent
                ],
                imports: [
                  BrowserModule,
                  BrowserAnimationsModule,
                  FormsModule,
                  MatInputModule,
                  MatCardModule,
                  MatGridListModule,
                  MatButtonModule,
                  MatToolbarModule,
                  MatFormFieldModule,
                  MatIconModule,
                  MatOptionModule,
                  MatSelectModule,
                  MatExpansionModule
                ],
                providers: [],
                bootstrap: [AppComponent]
              })
              export class AppModule { }
  
  
   
   * app.component.ts file:
   
      
                  import { CourseModel } from './user/course.model';
                  import {Component} from '@angular/core';
                  
                  @Component({
                    selector: 'app-root',
                    templateUrl: './app.component.html',
                    styleUrls: ['./app.component.css']
                  })
                  export class AppComponent {
                    storedCourse: CourseModel[] = [];
                    onCourseCreated(course) {
                      this.storedCourse.push(course);
                    }
                  }

    
    
   * app.component.ts file:
          
                      import { CourseModel } from './user/course.model';
                      import {Component} from '@angular/core';
                      
                      @Component({
                        selector: 'app-root',
                        templateUrl: './app.component.html',
                        styleUrls: ['./app.component.css']
                      })
                      export class AppComponent {
                        storedCourse: CourseModel[] = [];
                        onCourseCreated(course) {
                          this.storedCourse.push(course);
                        }
                      }
                      
   * app.component.html file:
          
          <app-header></app-header>
          
          <main>
            <app-course-create (courseCreated)="onCourseCreated($event)"></app-course-create>
            <app-course-list [courses]="storedCourse"></app-course-list>
          </main>
          
          
  * app.component.css file:
             
          main {
            margin: 1rem auto;
            width: 60%;
          
          }

             


  
  
#####===================  End of Communication between two components ==================    
















#####===================  Start of Communication between two components (Using two way binding) ==================

* Create a model for the course that was emitted, by utilizing an interface
      
      // create a new file in the course_list folder called "course.model.ts" and add the model:

          export interface CourseModel {
            courseType: string;
            courseCode: number;
          }


* create a course object inside the onClick event of one components button as shown below:

        // import the course model 
        import {CourseModel} from '../course.model';

        export class CourseCreateComponent {
        
        // The variables shown below are two-way binded to the input boxes
        
          courseTypeName = '';
          courseCodeName = 0;
        
          onSaveCourse() {
              const course: CourseModel = {
              courseType: this.courseTypeName,
              courseCode: this.courseCodeName
            };
      
* now we will emit the courseCreateComponent event so that courseList can see it:      
      
      // Import event emitter in the module that needs to emit an event
          
          import {EventEmitter} from '@angular/core';
          import {Output} from '@angular/core';

      
      // Initialize an event emitter object with proper name in the class
      // Put the new EventEmitter object on top of the variables created in the step above
          
          @Output() courseCreated = new EventEmitter<CourseModel>();


      // Now emit the emitter object from the method as follows
      // This will allow the event to be listened from the **Parent Component** the module by other modules
          
          import {Component} from '@angular/core';
          import {EventEmitter} from '@angular/core';
          import {Output} from '@angular/core';
          import {CourseModel} from '../course.model';
          
          @Component({
            selector: 'app-course-create',
            templateUrl: './course_create.component.html',
            styleUrls: ['./course_create.component.css']
          })
          
          export class CourseCreateComponent {
            courseTypeName = '';
            courseCodeName = 0;
            @Output() courseCreated = new EventEmitter<CourseModel>();
          
            onSaveCourse() {
              const course: CourseModel = {
                courseType: this.courseTypeName,
                courseCode: this.courseCodeName
              };
              this.courseCreated.emit(course);



* Now go to the parent component .ts file and add an array to save the courses created
      // Get the course model first
      // This is basically the event that will be be referenced from the module
      
      import { CourseModel } from './user/course.model';
      import {Component} from '@angular/core';
      
      @Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
      })
      export class AppComponent {
        storedCourse: CourseModel[] = [];
        onCourseCreated(course) {
          this.storedCourse.push(course);
        }
      }

      

* Now go to the parent component .html file add add the listening event with the value equal to the onCourseCreated() above
      
      // This allows the component event to be referenced from the parent module 
      
       <app-storedCourse-create (courseCreated)="onCourseCreated($event)"></app-storedCourse-create>
        <app-course-list></app-course-list>

* Now go to the module that is going to take in data from the module that is outputting data (above)
        
        // ofcourse get the model of the course first
        // in the module that is going to take in data, 
        // an array has to be declared needs to be exposed to the parent module for input, so import the input module
        
        import {Input} from '@angular/core';
        
        
       // and expose the input array that need to take in data as shown below
        
        import {Component} from '@angular/core';
        import {Input} from '@angular/core';
        
        import {CourseModel} from './course.model';
        
        @Component({
          selector: 'app-course-list',
          templateUrl: './course_list.component.html',
          styleUrls: ['./course_list.component.css']
        })
        export class CourseListComponent {
         @Input() courses: CourseModel[] = [];
        }

            
* Now go back to the parent component .html file and set the input component array to the array of the parent module
        
          <app-course-create (courseCreated)="onCourseCreated($event)"></app-course-create>
          <app-course-list [courses]="storedCourse"></app-course-list>

#####===================  End of Communication between two components ==================    












#####===================  Start of Getting the Textbox/TextArea input (one way binding) ==================

* Add an input extractor to a textbox or textarea, example below:
        
        --> The folloing is html material button tag in the example_component.component.html file <--
        --> The #courseTypeInput will extract and save the value inputted by the user in the textbox or textarea <--
        
            <input matInput placeholder="SOEN" #courseTypeInput>

        --> The #courseTypeInput can then be passed to the button click event to send to db or to satisfy any other requirement <--

            <button mat-raised-button color="primary" (click)="onSaveCourse(courseTypeInput)">Save</button>
            
* Define the methodToRunOnEvent(courseTypeInput) method in the class for the module in the example.component.ts file :


      --> The #courseTypeInput is used in the methodToRunOnEvent method defined in the module class<--

      import {Component} from '@angular/core';
      
      @Component({
        selector: 'app-example-component',
        templateUrl: './example_component.component.html',
        styleUrls: ['./example_component.component.css']
      })
      methodToRunOnEvent(courseTypeInput: HTMLInputElement) {
         alert(courseTypeInput.value);
       }
      }
#####===================  End of Getting the Textbox/TextArea input ==================    
