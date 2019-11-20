import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../shared/notification.service';
import { MustMatch } from '../shared/must-match.validator';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  changepasswordform:FormGroup;
  submitted:boolean=false;
   
  constructor(private formbuilder : FormBuilder,public notification :NotificationService ) { }

  ngOnInit() {
    this.changepasswordform=this.formbuilder.group({
      oldpassword:['',Validators.required],
      newpassword:['',Validators.required],
      confirmpassword:['',Validators.required],
    }, {
      validator: MustMatch('newpassword', 'confirmpassword')
    })
  }
  get f() { return this.changepasswordform.controls; }

  onSubmit() {
    this.submitted = true;

        // stop here if form is invalid
        if (this.changepasswordform.invalid) {
            this.notification.error('Not Submitted');
            return;
        }
      this.notification.success('Submitted successfully');
  }
}
