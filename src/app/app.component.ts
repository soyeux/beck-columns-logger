import { Component } from '@angular/core';
import { map, tap } from 'rxjs';
import { Entry } from './entry.model';
import { EntryService } from './entry.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'beck-columns-logger';

  constructor(private service: EntryService) {
  }

  getEntries() {
    return this.service.get().pipe(map(datas => datas.sort((a, b) => b.date.valueOf() - a.date.valueOf())))
  }

  addEntry() {
    this.service.add().subscribe()
  }

  save(entry: Entry) {
    this.service.edit(entry)
  }
}


//https://stackoverflow.com/questions/60499335/how-to-test-pwa-on-over-https-with-self-signed-openssl-certificate


