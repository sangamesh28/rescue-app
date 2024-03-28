import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {environment} from '../../../../../src/environments/environment'
import { Router } from '@angular/router';
import { ButtonModule, ToastComponent, ToastModule } from '@coreui/angular';
import { NotificationsModule } from '../../notifications/notifications.module';

@Component({
  selector: 'app-add-contacts',
  standalone: true,
  imports: [HttpClientModule,FormsModule,ToastModule,ButtonModule],
  templateUrl: './add-contacts.component.html',
  styleUrl: './add-contacts.component.scss'
})
export class AddContactsComponent implements OnInit{
  toasterVisible = false;
  fireBaseUrl=environment.fireBaseUrl
  @ViewChild('contactForm') contactForm!: NgForm; // Access the form using ViewChild
  


  constructor(private http:HttpClient, private router:Router){}

  ngOnInit() {  }

  addContact(contactForm:{name:string;email:string;phoneNo:number;address:string}){
    this.http.post(`${this.fireBaseUrl}.json`,contactForm).subscribe(responseData=>{
      console.log(responseData);
      this.contactForm.resetForm(); 
      this.toasterVisible = true;
      setTimeout(() => {
        this.toasterVisible=false
      }, 3000);
    })
  }

  viewContacts(){
    this.router.navigate(['/'])
  }

  closeToaster(){
    this.toasterVisible=false
  }

  position = 'top-end';
  visible = false;
  percentage = 0;

  toggleToast() {
    this.visible = !this.visible;
  }

  onVisibleChange($event: boolean) {
    this.visible = $event;
    this.percentage = !this.visible ? 0 : this.percentage;
  }

  onTimerChange($event: number) {
    this.percentage = $event * 25;
  }



}
