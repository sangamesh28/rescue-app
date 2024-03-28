import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { map } from 'rxjs';
import {environment} from '../../../../../src/environments/environment'
import { TablesComponent } from '../../base/tables/tables.component';
import { BaseModule } from '../../base/base.module';
import { AlertModule, TableModule } from '@coreui/angular';


// Define an interface for the structure of your response data
interface Contact {
  id:string;
  name: string;
  email: string;
  phone:number;
  address:string;

}

@Component({
  selector: 'app-view-contacts',
  standalone: true,
  imports: [HttpClientModule,CommonModule,FormsModule,TableModule,AlertModule],
  templateUrl: './view-contacts.component.html',
  styleUrl: './view-contacts.component.scss'
})
export class ViewContactsComponent implements OnInit{

  showDeleteAlert=false
  showModifyAlert=false
  fireBaseUrl=environment.fireBaseUrl

  allContacts:Contact[]=[]
  selectedContact: Contact | null = null; // Holds the selected contact for editing


  constructor(private http:HttpClient){}

  ngOnInit(){
    this.fetchContacts()
  }

  fetchContacts(){
    this.http.get<{ [key: string]: Contact }>(`${this.fireBaseUrl}.json`)
      .pipe(
        map(responseData => {
          const contactsArray: Contact[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              contactsArray.push({ ...responseData[key], id: key });
            }
          }
          return contactsArray;
        })
      )
      .subscribe(contacts => {
        this.allContacts=contacts
        console.log(this.allContacts);
        
      });
  }

  clearAllContacts(){
    return this.http.delete(`${this.fireBaseUrl}.json`).subscribe(()=>{
      this.allContacts=[]
      this.showDeleteAlert = true;
      setTimeout(() => {
        this.showDeleteAlert = false;
      }, 1000);
    })
  }

  deleteContact(contactId: string) {
    // Make a DELETE request to the Firebase endpoint with the specific contact ID
    this.http.delete(`${this.fireBaseUrl}/${contactId}.json`)
      .subscribe(() => {
        // After successful deletion, remove the contact from the array
        this.allContacts = this.allContacts.filter(contact => contact.id !== contactId);
        this.showDeleteAlert = true;
        setTimeout(() => {
          this.showDeleteAlert = false;
        }, 1000);
      });
  }

  editContact(contact: Contact) {
    this.selectedContact = { ...contact }; // Assign the clicked contact to selectedContact for editing
  }

  cancelEdit() {
    this.selectedContact = null; // Reset selectedContact to null to cancel editing
  }

  saveEditedContact() {
    if (this.selectedContact) {
      const updatedContact: Contact = {
        id: this.selectedContact.id,
        name: this.selectedContact.name,
        email: this.selectedContact.email,
        phone: this.selectedContact.phone,
        address: this.selectedContact.address
      };
  
      // Make a PUT request to update the contact details in the database
      this.http.put(`${this.fireBaseUrl}/${this.selectedContact.id}.json`, updatedContact)
        .subscribe(() => {
          // After successful update, reset selectedContact to null to exit editing mode
          this.selectedContact = null;
          this.fetchContacts()
          this.showModifyAlert = true;
        setTimeout(() => {
          this.showModifyAlert = false;
        }, 1000);
        });
    }
  }
  
}
  



