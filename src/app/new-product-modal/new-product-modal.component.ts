import { Component,  OnInit  } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-new-product-modal',
  templateUrl: './new-product-modal.component.html',
  styleUrls: ['./new-product-modal.component.css']
})
export class NewProductModalComponent implements OnInit{
  closeResult = '';


  addProduct(){
    this.service.addNewProduct( )
      setTimeout(() => {
    this.modalService.dismissAll();

}, 500);
  }

  constructor(
    public activeModal: NgbActiveModal,
    public service:ProductService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
  }
}
