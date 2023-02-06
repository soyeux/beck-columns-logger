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

  displayedColumns: string[] = ['id'];

  getEntries() {
    return this.service.get().pipe(map(datas => datas.sort((a, b) => a.date.valueOf() - b.date.valueOf())))
  }

  savePDF() {
    let doc = new jsPDF();

    autoTable(doc, { html: '#content' })
    doc.save('table.pdf')
  }
}
