import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-delete-prodct-confirm',
  templateUrl: './delete-prodct-confirm.component.html',
  styleUrls: ['./delete-prodct-confirm.component.css']
})
export class DeleteProdctConfirmComponent  implements OnInit {
  constructor(
    public activeModal: NgbActiveModal,
    public service:ProductService,
    private modalService: NgbModal

  ) { }
  DeleteProd(){
    this.service.deleteProduct(this.service.selectedProductEdit.id);
    setTimeout(() => {
          this.modalService.dismissAll();

    }, 1000);
  }
  ngOnInit(){

  }
}
