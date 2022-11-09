import { Injectable } from '@angular/core';
import {finalize} from "rxjs";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";

@Injectable({
  providedIn: 'root'
})
export class FilebaseService {

  constructor() { }
  uploadFile(selectedImage: any,storage: any): any {
    if(selectedImage!=null){
      const filePath= `${selectedImage.name.split('.').splice(0,-1).join('.')}_${new Date().getTime()}`
      const fileRef= storage.ref(filePath);
      storage.upload(filePath,selectedImage).snapshotChanges().pipe(
        finalize(()=>{
          fileRef.getDownloadURL().subscribe((url: any)=>{
            console.log("url"+url)
            return url;
          })
        })
      ).subscribe();
    }
  }

}
