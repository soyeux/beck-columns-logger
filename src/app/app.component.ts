import { Component } from '@angular/core';
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
    return this.service.get()
  }

  addEntry() {
    this.service.add().subscribe()
  }
}


//https://stackoverflow.com/questions/60499335/how-to-test-pwa-on-over-https-with-self-signed-openssl-certificate


