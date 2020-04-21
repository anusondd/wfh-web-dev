import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { first, take } from 'rxjs/operators';
import * as moment from 'moment';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Parser  } from "json2csv";
import saveAs from 'save-as'

@Component({
  selector: 'app-wfh',
  templateUrl: './wfh.component.html',
  styleUrls: ['./wfh.component.scss']
})
export class WfhComponent implements OnInit {

  form: FormGroup;
  formArray: FormArray;
  formSubmitAttempt: boolean;
  name = null;
  email = null;
  stateFrom: boolean = false;

  language = ""
  languageList = [{ id: 'th', name: 'Thai', img: "../../assets/images/th.png" }, { id: 'en', name: 'English', img: "../../assets/images/en.png" }]

  symptomsList = [
    { id: "ไข้", name: "wfh.Symptoms.answer1" },
    { id: "ไอแห้ง , ไอเสมหะ", name: "wfh.Symptoms.answer2" },
    { id: "เจ็บคอ", name: "wfh.Symptoms.answer3" },
    { id: "หายใจลำบาก", name: "wfh.Symptoms.answer4" },
    { id: "อื่นๆ", name: "wfh.Symptoms.answer5" },
  ]
  symptomsOrther = '';

  WorkStatusList = [
    { id: 1, value: "ปฏิบัติงานที่บ้าน" },
    { id: 2, value: "ปฏิบัติงานที่สำนักงาน หรือ โรงงาน" },
    { id: 3, value: "ลาพักร้อน ลาป่วย ลาประเภทอื่นๆ หรือ วันหยุดประจำสัปดาห์ วันหยุดนักขัตฤกษ์" },
  ]

  CheckInTimeList = [
    { id: 1, value: "Check-in เช้า เวลา 07.30" },
    { id: 2, value: "Check-out เย็น เวลา 16.30" },
  ]

  HealthConditionList = [
    { id: 1, value: "สุขภาพสมบูรณ์ แข็งแรง" },
    { id: 2, value: "ไม่สบาย รู้สึกป่วย" },
  ]

  RiskLevellist = [
    { id: 0, value: "F0 ผู้ติดเชื้อ COVID-19" },
    { id: 1, value: "F1 เป็นผู้ใกล้ชิดกับกลุ่ม F0" },
    { id: 2, value: "F2 เป็นผู้ใกล้ชิดกับกลุ่ม F1" },
    { id: 3, value: "F3 เป็นผู้ใกล้ชิดกับกลุ่ม F2" },
    { id: 4, value: "F4 เป็นผู้ใกล้ชิดกับกลุ่ม F3" },
    { id: 5, value: "F5 ไม่มีความเสี่ยง" },
  ]

  F2RiskDescList = [
    { id: 1, value: "เป็นผู้ใกล้ชิดกับกลุ่ม F1" },
    { id: 2, value: "เป็นผู้ที่เดินทางกลับจากประเทศกลุ่มเสี่ยงตามประกาศบริษัท" },
  ]

  F3RiskDescList = [
    { id: 1, value: "เป็นผู้ใกล้ชิดกับกลุ่ม F2" },
    { id: 2, value: "เป็นผู้ที่เดินทางกลับจากต่างประเทศ นอกเหนือประเทศกลุ่มเสี่ยงทุกประเทศ" },
  ]

  utc = null;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private authService: AuthService,
    public translate: TranslateService,
    private angularFireAuth: AngularFireAuth,
  ) {
  }

  ngOnInit() {
    this.initLanguage()
    this.angularFireAuth.authState.subscribe(user => {
      this.email = user.email;
      this.name = user.displayName;
    })
    this.buildForm();

  }

  ngDoCheck() {
    this.validateForm();
  }


  buildForm() {



    let date = moment().toISOString();
    this.utc = "+" + (new Date().getTimezoneOffset() / 60 * -1)

    this.symptomsChecked = false

    this.form = this.fb.group({
      SubmitterEmail: this.fb.control(this.email),
      // CompanyName: this.fb.control(company),
      // ManagerEmail: this.fb.control(managerMail),
      // ManagerName: this.fb.control(managerMail),
      // UserTimeZone: this.fb.control(this.utc),
      SubmissionDateTime: this.fb.control(date),
      CheckInDate: this.fb.control(date),
      WorkStatus: this.fb.control(null, [Validators.required]),  // 1
      CheckInTime: this.fb.control(null, [Validators.required]), // 2
      Task1: this.fb.control(null, []),
      Task2: this.fb.control(null, []),
      Task3: this.fb.control(null, []),
      HealthCondition: this.fb.control(null, []),
      PersonInteractedWith: this.fb.control(null, []),
      // Symptoms: this.fb.control(null, []),
      Symptoms: this.fb.array([]),
      symptomsOrther: this.fb.control(null, []),
      AdditionalComments: this.fb.control(null, []),
      RiskLevel: this.fb.control(null, []),
      F2RiskDesc: this.fb.control(null, []),
      F3RiskDesc: this.fb.control(null, []),
      ResponseID: this.fb.control(null, []),
    });


    // this.form.setControl('Symptoms', this.buildArray());
  }

  // buildArray() {
  //   let formArray = []
  //   this.symptomsList.forEach((val, i) => {
  //     formArray.push(this.fb.group({ i: val.id }))
  //   })

  //   this.formArray = this.fb.array(formArray);
  //   return this.formArray;
  // }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.form.get('Symptoms') as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  symptomsChecked: boolean = false
  symptomsOrtherChange(e) {
    console.log('symptomsOrtherChange', e);
    const checkArray: FormArray = this.form.get('Symptoms') as FormArray;

    if (e.target.value) {
      this.symptomsList[4].id = e.target.value;
      checkArray.push(new FormControl(e.target.value));
      this.symptomsChecked = true
    } else {
      this.symptomsList[4].id = "อื่นๆ"
      this.symptomsChecked = false

      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (this.symptomsList.some(val => val.id != item.value)) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });

    }

  }

  validateForm() {
    if (this.form) {
      this.form.valueChanges.pipe(take(1)).subscribe(value => {
        console.log('valueChanges', value);
        this.form.clearValidators();

        // case check in from home
        if (value.WorkStatus == 1 && value.CheckInTime == 1) {
          this.setValidate('RiskLevel')
          if (value.RiskLevel == 0 || value.RiskLevel == 1 || value.RiskLevel == 4 || value.RiskLevel == 5) {
            this.setValidate('HealthCondition')
            if (value.HealthCondition == 1) {
              this.setValidate('PersonInteractedWith')
            } else if (value.HealthCondition == 2) {
              this.setValidate('Symptoms')
              this.setValidate('PersonInteractedWith')
            }
          } else if (value.RiskLevel == 2 || value.RiskLevel == 3) {
            if (value.RiskLevel == 2) {
              this.setValidate('F2RiskDesc')
              this.setValidate('HealthCondition')
              if (value.HealthCondition == 1) {
                this.setValidate('PersonInteractedWith')
              } else if (value.HealthCondition == 2) {
                this.setValidate('Symptoms')
                this.setValidate('PersonInteractedWith')
              }
            } else if (value.RiskLevel == 3) {
              this.setValidate('F3RiskDesc')
              this.setValidate('HealthCondition')
              if (value.HealthCondition == 1) {
                this.setValidate('PersonInteractedWith')
              } else if (value.HealthCondition == 2) {
                this.setValidate('Symptoms')
                this.setValidate('PersonInteractedWith')
              }
            }
          }
        }

        // case check out from home
        if (value.WorkStatus == 1 && value.CheckInTime == 2) {
          this.setValidate('HealthCondition')
          if (value.HealthCondition == 1) {
            this.setValidate('PersonInteractedWith')
          } else if (value.HealthCondition == 2) {
            this.setValidate('Symptoms')
            this.setValidate('PersonInteractedWith')
          }
        }

        // case check in from office
        if (value.WorkStatus == 2 && value.CheckInTime == 1) {
          this.setValidate('RiskLevel')
          if (value.RiskLevel == 0 || value.RiskLevel == 1 || value.RiskLevel == 4 || value.RiskLevel == 5) {
            this.setValidate('HealthCondition')
            if (value.HealthCondition == 1) {
              this.setValidate('PersonInteractedWith')
            } else if (value.HealthCondition == 2) {
              this.setValidate('Symptoms')
              this.setValidate('PersonInteractedWith')
            }
          } else if (value.RiskLevel == 2 || value.RiskLevel == 3) {
            if (value.RiskLevel == 2) {
              this.setValidate('F2RiskDesc')
              this.setValidate('HealthCondition')
              if (value.HealthCondition == 1) {
                this.setValidate('PersonInteractedWith')
              } else if (value.HealthCondition == 2) {
                this.setValidate('Symptoms')
                this.setValidate('PersonInteractedWith')
              }
            } else if (value.RiskLevel == 3) {
              this.setValidate('F3RiskDesc')
              this.setValidate('HealthCondition')
              if (value.HealthCondition == 1) {
                this.setValidate('PersonInteractedWith')
              } else if (value.HealthCondition == 2) {
                this.setValidate('Symptoms')
                this.setValidate('PersonInteractedWith')
              }
            }
          }
        }

        // case check out from office
        if (value.WorkStatus == 2 && value.CheckInTime == 2) {
          this.setValidate('HealthCondition')
          if (value.HealthCondition == 1) {
            this.setValidate('PersonInteractedWith')
          } else if (value.HealthCondition == 2) {
            this.setValidate('Symptoms')
            this.setValidate('PersonInteractedWith')
          }
        }

        // case leave
        if (value.WorkStatus == 3) {
          this.clearValidate('CheckInTime')
          this.setValidate('RiskLevel')
          if (value.RiskLevel == 0 || value.RiskLevel == 1 || value.RiskLevel == 4 || value.RiskLevel == 5) {
            this.setValidate('HealthCondition')
            if (value.HealthCondition == 1) {
              this.setValidate('PersonInteractedWith')
            } else if (value.HealthCondition == 2) {
              this.setValidate('Symptoms')
              this.setValidate('PersonInteractedWith')
            }
          } else if (value.RiskLevel == 2 || value.RiskLevel == 3) {
            if (value.RiskLevel == 2) {
              this.setValidate('F2RiskDesc')
              this.setValidate('HealthCondition')
              if (value.HealthCondition == 1) {
                this.setValidate('PersonInteractedWith')
              } else if (value.HealthCondition == 2) {
                this.setValidate('Symptoms')
                this.setValidate('PersonInteractedWith')
              }
            } else if (value.RiskLevel == 3) {
              this.setValidate('F3RiskDesc')
              this.setValidate('HealthCondition')
              if (value.HealthCondition == 1) {
                this.setValidate('PersonInteractedWith')
              } else if (value.HealthCondition == 2) {
                this.setValidate('Symptoms')
                this.setValidate('PersonInteractedWith')
              }
            }
          }
        }

      })
    }
  }

  setValidate(input) {
    this.form.controls[input].clearValidators();
    this.form.controls[input].setValidators([Validators.required]);
    this.form.controls[input].updateValueAndValidity();
  }

  clearValidate(input) {
    this.form.controls[input].clearValidators();
    this.form.controls[input].setValidators(null);
    this.form.controls[input].updateValueAndValidity();
  }


  loading: boolean = false;
  async onSubmit() {
    console.log(this.form.value);
    if (this.form.valid) {

      this.formSubmitAttempt = false
      this.loading = true

      let date = moment().toISOString();

      let value = this.form.value;
      value = {
        ...value,
        SubmitterEmail: this.email,
        SubmissionDateTime: date,
        CheckInDate: date,
        WorkStatus: (value.WorkStatus) ? this.WorkStatusList.find(v => v.id == value.WorkStatus).value : "",
        CheckInTime: (value.CheckInTime) ? this.CheckInTimeList.find(v => v.id == value.CheckInTime).value : "",
        HealthCondition: (value.HealthCondition) ? this.HealthConditionList.find(v => v.id == value.HealthCondition).value : "",
        RiskLevel: (value.RiskLevel) ? this.RiskLevellist.find(v => v.id == value.RiskLevel).value : "",
        F2RiskDesc: (value.F2RiskDesc) ? this.F2RiskDescList.find(v => v.id == value.F2RiskDesc).value : "",
        F3RiskDesc: (value.F3RiskDesc) ? this.F3RiskDescList.find(v => v.id == value.F3RiskDesc).value : "",
        Symptoms: (value.Symptoms) ? value.Symptoms.toString() : ""
      }

      value.Symptoms = (value.HealthCondition == "สุขภาพสมบูรณ์ แข็งแรง") ? "" : value.Symptoms;

      console.log("value===>", value);
      try {
        let res = await this.authService.checkTime(value)
        console.log('checkTime', res)
        this.stateFrom = true;
        this.loading = false
      } catch (error) {
        console.log('checkTime', error)
        this.loading = false
        this.stateFrom = false;
      }

    } else {
      this.formSubmitAttempt = true
    }
  }

  onReset() {
    this.stateFrom = false;
    this.buildForm()
  }

  logOut() {
    this.authService.signOut();
    this.router.navigate(['login']);
  }

  initLanguage() {
    this.translate.addLangs(['en', 'th']);
    if (localStorage.getItem('locale')) {
      const browserLang = localStorage.getItem('locale');
      this.language = localStorage.getItem('locale')
      this.translate.use(browserLang.match(/en|th/) ? browserLang : 'en');
    } else {
      localStorage.setItem('locale', 'th');
      this.language = 'th'
      this.translate.setDefaultLang('th');
    }
  }

  changeLang(language: string) {
    console.log('changeLang', language);
    this.language = language
    localStorage.setItem('locale', language);
    this.translate.use(language);
  }

  report() {
    this.authService.reportTimeSheet(this.email).then(querySnapshot => {
      console.log('reportTimeSheet', querySnapshot)
      let report = querySnapshot.docs.map(doc=> { return doc.data()});
      console.log('report',report);
      
      const json2csvParser = new Parser();
      const csv = json2csvParser.parse(report);

      console.log('csv',csv);
      let blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
      saveAs(blob, 'timesheet.csv')

    }).catch(e => {
      console.log('reportTimeSheet', e)
    })
  }

}
