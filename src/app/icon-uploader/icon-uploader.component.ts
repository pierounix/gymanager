import { Component, OnInit } from '@angular/core';
import { IconService } from '../services/icon.service';
import {
  DomSanitizer,
  SafeUrl,
} from '@angular/platform-browser';
import { Icon } from '../models/Icon';
import { environment } from 'src/environments/environment';
import { AlertService } from '../services/alert-service.service';

const IMAGES_URL = environment.imagesURL;


class ImageSnippet {
  status: string = 'init';

  constructor(public src: SafeUrl, public file: File) {}
}

@Component({
  selector: 'app-icon-uploader',
  templateUrl: './icon-uploader.component.html',
  styleUrls: ['./icon-uploader.component.css']
})

export class IconUploaderComponent {

  selectedFile: ImageSnippet;
  selected: boolean;
  pending: boolean;
  errorMessage: string;
  icon =  new Icon();

  constructor(private iconService: IconService,
    private sanitization: DomSanitizer,
    private alertService: AlertService) {}

  private onSuccess() {
    this.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();


    reader.addEventListener('load', (event: any) => {

      if (file.size > 100000) {
         this.alertService.create('INFO', 5000, 'File troppo grande. Dimensione massima 100 Kb');
      } else {
        const safeUrl = this.sanitization.bypassSecurityTrustUrl(event.target.result);
        this.selectedFile = new ImageSnippet(safeUrl, file);
        this.selected = true;
        this.icon =  new Icon();
      }

    });
    reader.readAsDataURL(file);
  }

  uploadImage(image: ImageSnippet) {

    if (this.icon.title) {
      // this.icon.path = IMAGES_URL + this.icon.title.replace(/\s/g, '');
      this.icon.path = IMAGES_URL + this.selectedFile.file.name;
      this.pending = true;

      this.iconService.getIconByTitle(this.icon.title).subscribe(
          (res) => {
            if (res == null) {
              this.iconService.uploadImage(this.selectedFile.file).subscribe(
                (res1) => {
                  this.iconService.addIcon(this.icon).subscribe(
                    (res2) => {
                      this.pending = false;
                      this.alertService.create('INFO', 5000, 'Immagine caricata con successo');
                    },
                    (err) => {
                      this.pending = false;
                      this.alertService.create('ERRORE', 5000, err);
                    });
                },
                (err) => {
                  this.pending = false;
                  this.onError();
                });

            } else {
              this.pending = false;
              this.alertService.create('ERRORE', 5000, 'Titolo duplicato');
            }
          },
          (err) => {
            this.pending = false;
            this.alertService.create('ERRORE', 5000, err);
          });


    } else {
      this.errorMessage = 'Inserire titolo';
    }



  }

}
