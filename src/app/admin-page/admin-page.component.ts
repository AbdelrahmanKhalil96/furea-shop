import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ProductService } from '../product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderModalComponent } from '../order-modal/order-modal.component';
import { UserAdminModalComponent } from '../user-admin-modal/user-admin-modal.component';
import { EditProductModalComponent } from '../edit-product-modal/edit-product-modal.component';
import { NewProductModalComponent } from '../new-product-modal/new-product-modal.component';
@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit{
  title = 'Decoded ID Token';
  user$ = this.authService.user$;
  openModal(order:any) {
    const modalRef = this.modalService.open(OrderModalComponent);
    this.service.selectedAdminEdit=order
  }
  openUserModal(user:any) {
    const modalRef = this.modalService.open(UserAdminModalComponent);
    this.service.selectedUserEdit=user
  }
  openEditProductModal(product:any) {
    const modalRef = this.modalService.open(EditProductModalComponent);
    this.service.selectedProductEdit=product
  }
  openNewProductModal() {
    const modalRef = this.modalService.open(NewProductModalComponent);
  }
ngOnInit(){

 setTimeout(() => {
       this.service.getAdminusersOrders();
       this.service.getallUsersAdmin();
       this.service.getAllProducts();

console.log(this.service.loggedUser)
  },);
}
  constructor(private authService: AuthService, public service:ProductService ,
    private modalService: NgbModal) {}
}
