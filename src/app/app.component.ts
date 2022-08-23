import { Component, OnDestroy, OnInit, VERSION } from '@angular/core';
import { BoolSubjectService } from './boolSubject.service';
import { tap } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;

  boolStatus: Boolean = false;
  boolStatusTap: Boolean = false;
  boolStatusData: Boolean = false;
  nextCalls: number = 0;

  constructor(private boolSubjectService: BoolSubjectService) {}

  ngOnInit(): void {
    this.boolSubjectService.boolValueSubject
      .pipe(
        tap((tapValue: boolean) => {
          this.boolStatusTap = tapValue;
        })
      )
      .subscribe(
        /*
        (value) => {
          this.boolStatusData = value;
        }
        */

        {
          next: (_value) => {
            this.boolStatusData = _value;
          },
          error(err) {
            console.log(err);
          },
          complete() {
            console.log('Completed');
          },
        }
      );
  }

  sendNewValue() {
    if (this.boolStatus !== this.boolStatusTap)
      this.boolStatus = this.boolStatusTap;
    else if (this.boolStatus !== this.boolStatusData)
      this.boolStatus = this.boolStatusData;
    this.boolSubjectService.boolValueSubject.next(!this.boolStatus);
    this.nextCalls++;
  }

  sendError() {
    this.boolSubjectService.boolValueSubject.error('Error in the subject');
  }

  sendComplete() {
    this.boolSubjectService.boolValueSubject.complete();
  }
}
