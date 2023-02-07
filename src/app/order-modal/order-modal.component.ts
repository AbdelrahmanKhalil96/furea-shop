import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.css']
})
export class OrderModalComponent  implements OnInit {
  closeResult = '';


  changeOrderStatus(status:any){
    this.service.orderDetails.userOrders.forEach((order: { orderStatus: any; }) => {
      order.orderStatus=status
    });
  }
  openDeleteModal() {
    const modalRef = this.modalService.open(DeleteConfirmComponent);
   // this.service.selectedAdminEdit=order
  }
  saveOrder(){
    this.service.saveEditedOrder(this.service.orderDetails.userOrders,this.service.selectedAdminEdit)
      setTimeout(() => {
    this.modalService.dismissAll();

}, 1000);
  }

  constructor(
    public activeModal: NgbActiveModal,
    public service:ProductService,
    private modalService: NgbModal
  ) { }
  changeAction(order: any,count: any){
    order.productSum=order.price*count
  order.qty=count }
  ngOnInit() {
  //  throw new Error('Method not implemented.');
    setTimeout(() => {
      this.service.getOrderDetails({"Id":this.service.selectedAdminEdit.id})

      console.log(this.service.selectedAdminEdit)

  },);

  }
}
