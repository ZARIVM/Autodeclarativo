import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertasService } from '@app/shared/services/alertas/alertas.service';
import { AutoDeclarativoModel } from '../models/autodeclarativoModel';
import { AutodeclarativoService } from '../services/autodeclarativo.service';

@Component({
  selector: 'igac-adjuntar-documentacion',
  templateUrl: './adjuntar-documentacion.component.html',
  styleUrls: ['./adjuntar-documentacion.component.scss']
})
export class AdjuntarDocumentacionComponent implements OnInit {

  @Output() page: EventEmitter<any>;
  @Input() objAutodeclarativo: AutoDeclarativoModel;
  listArchivos: any[] = [];
  indexArchivos = 0;
 extComunes = ["pdf", "jpg", "png"]
 extShape = ["shp", "shx", "dbf"]
  //archivos

  constructor(  private autdeService: AutodeclarativoService,
    private alertasService: AlertasService,) {
      this.page = new EventEmitter();
     }

  ngOnInit(): void {
  }

  onFileTouch(): void { }
  onFileChange(event): void {
    if (
      event.target.files &&
      event.target.files.length
    ) {
      let file = event.target.files[0];
      const ext = file.name.split('.').pop();


          this.indexArchivos++;
          this.listArchivos.push({ file: event.target.files[0], name: event.target.files[0].name, index: this.indexArchivos })

      //   } else {
      //     this.showAlert(this.autdeService.getAlertInfo(
      //       'Tamaño no permitido',
      //       false,
      //       true
      //     ));
      //   }

      // } else {
      //   this.showAlert(this.autdeService.getAlertInfo(
      //     'El archivo no tiene la extensión adecuada',
      //     false,
      //     true
      //   ));
      // }

      //this.reader.readAsDataURL(event.target.files[0]);
    }
  }
  showAlert(alert): void {
    this.alertasService.mensajeWarn(alert).subscribe((response) => {
      if (response.isConfirmed) {
      }
    });
  }

  lastPage(page): void {
    this.page.emit({ page, body: this.objAutodeclarativo });
  }

  nextPage(page): void {
    // this.objAutodeclarativo.predial = this.predialSelect;
    //this.page.emit({ page, body: this.objAutodeclarativo });
  }

  guardarArchivo(archivo: File, name){
     this.listArchivos.push({file: archivo, nombre: name})
  }


  eliminarArchivo(name){
    this.listArchivos = this.listArchivos.filter(file=>{
      return file.nombre !== name;
    })
  }

}
