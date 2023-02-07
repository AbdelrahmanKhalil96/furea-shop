import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css']
})
export class DeleteConfirmComponent  implements OnInit {
  constructor(
    public activeModal: NgbActiveModal,
    public service:ProductService,
    private modalService: NgbModal

  ) { }
  DeleteOrder(){
    this.service.deleteOrder(this.service.selectedAdminEdit.id);
    setTimeout(() => {
          this.modalService.dismissAll();

    }, 1000);
  }
  ngOnInit(){

  }
}
