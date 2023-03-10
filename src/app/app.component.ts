import { Component } from '@angular/core';
import { map, take, tap } from 'rxjs';
import { Entry } from './entry.model';
import { EntryService } from './entry.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private service: EntryService) {
  }


  getEntries() {
    return this.service.get().pipe(map(datas => datas.sort((a, b) => b.date.valueOf() - a.date.valueOf())))
  }

  export() {
    this.getEntries().pipe(take(1)).subscribe(entries => {
      const blob = new Blob([JSON.stringify(entries)], { type: 'application/json' });
      const data = window.URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = data;
      link.download = "export-beck-columns-logger.json";
      link.click();
      setTimeout(() => {
        window.URL.revokeObjectURL(data);
      }, 400)
    })
  }

}


//https://stackoverflow.com/questions/60499335/how-to-test-pwa-on-over-https-with-self-signed-openssl-certificate


