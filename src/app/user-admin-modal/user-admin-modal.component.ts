import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-user-admin-modal',
  templateUrl: './user-admin-modal.component.html',
  styleUrls: ['./user-admin-modal.component.css']
})
export class UserAdminModalComponent  implements OnInit {
  closeResult = '';




  saveUser(){
    this.service.saveEditedUser( )
      setTimeout(() => {
    this.modalService.dismissAll();

}, 1000);
  }


  constructor(
    public activeModal: NgbActiveModal,
    public service:ProductService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
  }
}
