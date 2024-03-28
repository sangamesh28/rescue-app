import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddContactsComponent} from './add-contacts/add-contacts.component';
import {ViewContactsComponent} from './view-contacts/view-contacts.component'

const routes:Routes=[
  {
    path:'',
    data:{
      title:'Contacts',
    },
    children:[
      {
        path:'',
        pathMatch:'full',
        redirectTo:'view'
      },
      {
        path:'view',
        component:ViewContactsComponent,
        data:{
          title:'View Contacts'
        }
      },
      {
        path:'add',
        component:AddContactsComponent,
        data:{
          title:'Add Contacts'
        }
      }
    ]
  }
]



@NgModule({
  imports: [RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class ContactsRoutingModule { }
