import { Component, ElementRef, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import { map } from 'rxjs';
import { EntryService } from '../entry.service';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent {
  constructor(private service: EntryService) {
  }

  displayedColumns: string[] = 
  ['id', 'date', 'situation', 'emotion', 'autoThough',
  'behavior', 'alternativeThough', 'consequences'];

  getEntries() {
    return this.service.get().pipe(map(datas => datas.sort((a, b) => a.date.valueOf() - b.date.valueOf())))
  }

  savePDF() {
    let doc = new jsPDF('landscape');

    autoTable(doc, { 
      html: '#content',
      styles: {
        fontSize: 8,
        minCellWidth: 8,
        cellPadding: 2,
      },
      margin: { vertical: 0, horizontal: 0, }, 
    })
    doc.save('table.pdf')
  }
}
