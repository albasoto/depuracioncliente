import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

const EXCEL_EXTENSION = '.xlsx';


@Injectable()
export class ExcelService {

  public arrayBuffer: any;

  constructor() { }
  public exportAsExcelFile(json: any[], excelFileName: string): void {

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);

    const workbook: XLSX.WorkBook = { Sheets: { 'unidad': worksheet }, SheetNames: ['unidad'] };

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    this.saveAsExcelFile(excelBuffer, excelFileName);


    


  }

  public crearPlantilla(pestanias: any[], excelFileName: string): void {
    const worksheets: XLSX.WorkSheet[] = []
    var SheetNames = []
    var work = {}
    pestanias.forEach(entidad => {
      SheetNames.push(entidad.nombre)
      work[entidad.nombre] = XLSX.utils.json_to_sheet(entidad.valores)

    });

    const workbook: XLSX.WorkBook = { Sheets: work, SheetNames: SheetNames };

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }




  leer(path: any) {
    return XLSX.read(path)
  }



  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });

    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}