import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class BoolSubjectService {
  public boolValueSubject = new Subject<boolean>();


}
