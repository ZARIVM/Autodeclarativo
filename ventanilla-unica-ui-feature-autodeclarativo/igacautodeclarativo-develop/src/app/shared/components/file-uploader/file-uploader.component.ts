import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import { LoadingService } from '@shared/services/loading/loading.service';

@Component({
  selector: 'igac-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {

  @Input() control: string;
  @Input() formulario: FormGroup;
  @Input() fileType: string;
  @Input() size: number;
  @Input() required: boolean;

  @Input() title = '';
  @Input() subtitle = '';

  reader: FileReader;
  fileName: string;
  fileToUpload: string;

  constructor(private loadingService: LoadingService,) {
  }

  ngOnInit(): void {
    // this.initReader();
  }

  initReader(): void {
    this.reader = new FileReader();
    this.reader.onloadend = () => {
      this.fileToUpload = this.encodeFile(this.reader.result);
      this.setValue();
    };
  }

  onFileChange(event): void {
    if (event.target.files && event.target.files.length &&
      event.target.files[0].size <= this.size) {
      console.log('event', event);
      this.fileName = event.target.files[0].name;
      this.fileToUpload = event.target.files[0];
      this.setValue();
      //this.reader.readAsDataURL(event.target.files[0]);
    } else {
      this.fileName = null;
    }
  }

  onFileTouch(): void {
    console.log('control:' , this.control);
    console.log('fileType:' , this.fileType);
    this.formulario.get(this.control).markAsTouched();
    this.formulario.patchValue({
      [this.control]: null
    });
  }

  setValue(): void {
    const value = {name: this.fileName, file: this.fileToUpload};
    this.formulario.patchValue({
      [this.control]: value
    });
  }

  encodeFile(event: any): any {
    let encoded = event.toString().replace(/^data:(.*,)?/, '');
    if ((encoded.length % 4) > 0) {
      encoded += '='.repeat(4 - (encoded.length % 4));
    }
    return encoded;
  }

  get fileInvalid(): boolean {
    return this.formulario.get(this.control).invalid && this.formulario.get(this.control).touched;
  }
}
