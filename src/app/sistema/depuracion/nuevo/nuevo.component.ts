import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { Version } from 'src/app/clases/version';
import { ExcelService } from 'src/app/servicios/excel.service';
import { Columna } from 'src/app/clases/columna';
import { Entidad } from 'src/app/clases/entidad';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.scss'],
  providers: [ExcelService]
})
export class NuevoComponent implements OnInit {



  versiones: Version[] = []

  entidades: Entidad[] = []

  versionSeleccionada: Version = { id: 0 }

  configuraciones: any[] = []

  pestanias: { id: number, nombre: string, valores?: any[], columnas?: any[], values?:any[] }[] = []
  file: File;
  public arrayBuffer: any;


  constructor(private apiService: ApiService, private excelService: ExcelService) {

    var estudiante = { nombre: 'juanito', apellido: 'salazar' }













    this.apiService.get('version', { sort: 'nombre' }).subscribe((versionesRecibidas: Version[]) => {
      this.versiones = versionesRecibidas
    })

    this.apiService.get('entidad', {}).subscribe((entidades: Entidad[]) => {
      this.entidades = entidades
    })
  }

  verVersion(res) {
    this.apiService.get('entidadversion', { version: res.target.value }).subscribe((config: any[]) => {
      this.configuraciones = config
      this.generarPestanias()
    })
  }

  generarPestanias() {
    this.configuraciones.forEach(configuracion => {

      var entidad: Entidad = this.entidades.find(enti => enti.id == configuracion.columna.entidad)
      
      if (!this.pestanias.find(pes => pes.nombre == entidad.nombre))
        this.pestanias.push({ id: entidad.id, nombre: entidad.nombre })
    });


    this.pestanias.forEach(pestania => {
      pestania.columnas = []
      this.configuraciones.forEach(configuracion => {
        if (configuracion.columna.entidad == pestania.id) {

          pestania.columnas.push({ nombre: configuracion.columna.nombre })
        }

      });
    });


  }

  incomingfile(event) {
    this.file = event.target.files[0];
    this.Upload(this.file)
  }

  Upload(file: File) {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
     
      this.pestanias[0].values = XLSX.utils.sheet_to_json(worksheet, { raw: true })
      this.pestanias[1].values = []

      console.log(this.pestanias[0])
    }
    fileReader.readAsArrayBuffer(file);
  }


  generarPlantilla() {

    this.pestanias.forEach(pestania => {
      pestania.valores = []
      this.configuraciones.forEach(configuracion => {
        if (configuracion.columna.entidad == pestania.id) {

          pestania.valores.push({ [configuracion.columna.nombre]: '' })
        }

      });
    });






    this.excelService.crearPlantilla(this.pestanias, 'sample')
  }

  ngOnInit() {
  }

}
