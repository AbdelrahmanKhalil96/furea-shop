import { HttpClient, HttpEventType, HttpErrorResponse  } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteProdctConfirmComponent } from '../delete-prodct-confirm/delete-prodct-confirm.component';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-edit-product-modal',
  templateUrl: './edit-product-modal.component.html',
  styleUrls: ['./edit-product-modal.component.css']
})
export class EditProductModalComponent implements OnInit{
  closeResult = '';

  progress: number=0;
  message: string='';
  openDeleteProdModal() {
    const modalRef = this.modalService.open(DeleteProdctConfirmComponent);
   // this.service.selectedAdminEdit=order
  }
  saveProduct(){
    this.service.saveEditedProduct( )
      setTimeout(() => {
    this.modalService.dismissAll();

}, 500);
  }
  fileName1 = '';

  fileName2 = '';
  fileName3 = '';
  fileName4 = '';
fileName=''
  @Output() public onUploadFinished = new EventEmitter();

  onFileSelected(event:any,oldImage:any,id:any) {

      const file:File = event.target.files[0];
var rand= Math.random() * 100000;
      if (file) {
        if(oldImage=='image1'){
          this.fileName1=file.name;
        }
if(oldImage=='image2'){
  this.fileName2=file.name;
}
else if(oldImage=='image3'){
  this.fileName3=file.name;
}
else if(oldImage=='image4'){
  this.fileName4=file.name;
}
          this.fileName = file.name;
console.log(rand)
          const formData = new FormData();

          formData.append("thumbnail", file);
          formData.append("id", id);
          formData.append("oldImage", oldImage);
          formData.append("rand", rand.toFixed());


console.log(formData)
          const upload$ = this.http.post('http://localhost:5000/ImgUpload/', formData)

          upload$.subscribe({
            next: (event:any) => {
            if (event.type === HttpEventType.UploadProgress)
              this.progress = Math.round(100 * event.loaded / event.total);
            else if (event.type === HttpEventType.Response) {
              this.message = 'Upload success.';
              this.onUploadFinished.emit(event.body);
              console.log("event is "+event)
            }
            this.service.getAllProducts();
            setTimeout(() => {
                          this.service. getEditedProductDetails(this.service.selectedProductEdit.id);

            }, 500);
          },
          error: (err: HttpErrorResponse) => console.log(err)
        });
      }
  }
  constructor(
    public activeModal: NgbActiveModal,
    public service:ProductService,
    private modalService: NgbModal,
    private http: HttpClient
  ) { }

  ngOnInit() {
  }
}
