import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit, OnChanges {

  archivoSeleccionado: FileList;
  archivo: File = null;
  mensaje = '';
  existe = false;
  nombreArchivo = 'Seleccionar Archivo';
  @Output() guardar = new EventEmitter<File>();
  @Output() eliminar = new EventEmitter();
  guardado: boolean = null;
  @Input() requerido: boolean;
  @Input() extensiones: string[];

  @ViewChild('myInput')
  myInputVariable: ElementRef;
  isSubmit = false;

  constructor() { }

  ngOnInit(): void {
  }

  seleccionarArchivo(event): void {
    this.archivoSeleccionado = event.target.files;
    this.validarArchivo();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.guardado !== undefined && this.guardado == false) {
       this.nombreArchivo = 'Seleccionar Archivo';
       if(this.myInputVariable !== undefined){
        this.myInputVariable.nativeElement.value = "";
       }
    }
  }

  validarArchivo(): void {
    this.guardado = true;
    
    this.mensaje = '';
      if (this.archivoSeleccionado.length === 1) {
        this.archivo = this.archivoSeleccionado[0];

        const ext = this.archivo.name.split('.').pop();

        // Se valida la extencion
        if (this.validateExt(ext)) {
          if (this.validateSize(this.archivo.size)) {
            this.existe = true;
            this.nombreArchivo = this.archivo.name;
           
            this.guardar.emit(this.archivoSeleccionado[0]);
          } else {
            this.eliminarArchivo();
            this.mensaje = 'Tamaño no permitido';
          }
        } else {
          this.eliminarArchivo();
          this.mensaje = 'El archivo no tiene la extensión adecuada';
        }

      } else if(this.existe == false){
        this.eliminarArchivo();
        this.mensaje = 'Seleccione solo un archivo:';
      }
  }

  validateExt(ext) {
    var exts = this.extensiones.filter(function(extencion) {
      if (extencion == ext) {
          return extencion;
      }
  });
  return exts.length === 0 ? false : true;
    switch (ext) {
      case 'jpg':
      case 'jpeg':
      case 'tiff':
      case 'tif':
      case 'pdf':
        return true;
      default:
        return false;
    }
  }

  validateSize(size) {
    if (size <= 4000000) {
      return true;
    }
    return false;
  }

  eliminarArchivo() {
    this.existe = false;
    if(this.myInputVariable != null || this.myInputVariable != undefined){
        this.myInputVariable.nativeElement.value = "";
    }
    this.nombreArchivo = 'Seleccionar Archivo';
    this.guardado = false;
    this.eliminar.emit();
    
  }

  

  get validInput() {
    if(this.requerido !== null && this.requerido === true &&
      this.guardado !== null && this.guardado === false ){
      return true;
    }
    return false;

  }



}
