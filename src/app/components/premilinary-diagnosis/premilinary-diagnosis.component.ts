import {Component} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastService} from "../../layouts/bootstrap/toast/ToastService";
import {finalize} from "rxjs";

@Component({
  selector: 'app-premilinary-diagnosis',
  templateUrl: './premilinary-diagnosis.component.html',
  styleUrls: ['./premilinary-diagnosis.component.css']
})
export class PremilinaryDiagnosisComponent {
  loadingSymptoms: boolean = true;
  symptoms: any[] = [];
  years: any[] = [];
  genders: any[] = ["male", "female"];
  diagnosisForm: FormGroup;
  loadingDiagnosis: boolean = true;
  diagnosis: any[] =[];
  saveDiagnosisForm: FormGroup;
  newDiagnosis: boolean = true;
  searchDiagnosisForm: FormGroup;
  existingDiagnosis: any;
  loadingExistingDiagnosis: boolean = false;

  constructor(private apiServices: ApiService, private formBuilder: FormBuilder, private toastService: ToastService,) {
    this.fetchSymptoms();
    this.generateArrayOfYears();
    this.diagnosisForm = this.formBuilder.group({
      symptomsId: this.formBuilder.array([], Validators.required),
      yearOfBirth: ['', Validators.required],
      gender: ['', Validators.required],

    })

    this.saveDiagnosisForm = this.formBuilder.group({
      diagnosis: ['', Validators.required],
      identifier: ['', Validators.required]

    })

    this.searchDiagnosisForm = this.formBuilder.group({
      identifier: ['', Validators.required]
    })
  }

  generateArrayOfYears = () => {
    const max = new Date().getFullYear();
    const min = max - 120;
    const years = []

    for (let i = max; i >= min; i--) {
      years.push(i)
    }
    this.years = years;
  }


  fetchSymptoms = () => {
    this.apiServices.get_("/v1/preliminary-diagnosis/symptoms")
      .pipe(finalize(() => {
        this.loadingSymptoms = false;
      })).subscribe((response: any) => {
      if (response.status == true) {
        this.symptoms = response.data;
      } else {
        // this.alertService.alertSuccess(response.message);
        this.toastService.showDanger(response.message);
      }
    }, (error) => {
      console.log(error);
      this.toastService.showDanger(error);
    })
  }

  onSymptomsCheckboxChange(e: any) {
    const checkArray: FormArray = this.diagnosisForm.get('symptomsId') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  submitDiagnosisForm() {
    let request = this.diagnosisForm.value;
    console.log(request);
    this.apiServices.post_("/v1/preliminary-diagnosis/diagnosis", request)
      .pipe(
        finalize(() => {
          this.loadingDiagnosis = false;
        })
      ).subscribe((response: any) => {
      if (response.status == true) {
        this.diagnosis = response.data;

        if(this.diagnosis.length == 0){
          this.toastService.showDanger("No diagnosis");
        }
      }
      else {
        // this.alertService.alertSuccess(response.message);
        this.toastService.showDanger(response.message);
      }
    }, (error) => {
      console.log(error);
      this.toastService.showDanger(error);
    })
  }

  submitSaveDiagnosisForm() {
    let request = this.saveDiagnosisForm.value;
    let selectedDiagnosis = this.diagnosis.filter((d) => {
      return d.id == request.diagnosis
    })[0]

    let req = {
      "diagnosis": selectedDiagnosis,
      "identifier": request.identifier
    }

    console.log(req);
    this.apiServices.post_("/v1/preliminary-diagnosis/save-diagnosis", req)
      .pipe(
        finalize(() => {
          this.loadingDiagnosis = false;
        })
      ).subscribe((response: any) => {
      if (response.status == true) {
        this.diagnosis = [];
      }
      else {
        // this.alertService.alertSuccess(response.message);
        this.toastService.showDanger(response.message);
      }
    }, (error) => {
      console.log(error);
      this.toastService.showDanger(error);
    })
  }

  submitSearchDiagnosisForm() {
    this.existingDiagnosis = null;
    let request = this.searchDiagnosisForm.value;
    console.log(request);
    this.apiServices.get_(`/v1/preliminary-diagnosis/get-diagnosis/${request.identifier}`,)
      .pipe(
        finalize(() => {
          this.loadingExistingDiagnosis = false;
        })
      ).subscribe((response: any) => {
      if (response.status == true) {
        this.existingDiagnosis = response.data;
      }
      else {
        // this.alertService.alertSuccess(response.message);
        this.toastService.showDanger(response.message);
      }
    }, (error) => {
      console.log(error);
      this.toastService.showDanger(error);
    })
  }
}
