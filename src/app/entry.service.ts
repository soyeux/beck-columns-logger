import { Injectable, OnInit } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Entry } from './entry.model';


const storageKey = "entries"

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private entries: Entry[] = [];

  constructor() { 
    this.init()
  }

  init() {
    const items = localStorage.getItem(storageKey);
    if (items != null) {
      this.entries = JSON.parse(items);
    }
  }

  store() {
    localStorage.setItem(storageKey, JSON.stringify(this.entries))
  }

  get() {
    this.entries.sort((a, b) => a.date.valueOf() - b.date.valueOf());
    return of(this.entries);
  }

  add() {
    let maxId = 0
    for (const entry of this.entries) {
      if (entry.id > maxId) {
        maxId = entry.id;
      }
    }

    const entry: Entry = {
      id: maxId++,
      date: new Date(),
      situation: '',
      emotion: '',
      autoThough: '',
      behavior: '',
      alternativeThough: '',
      consequences: ''
    }

    
    this.entries = [...this.entries, entry]
    this.store();
    return of();
  }

  remove(id: number) {
    this.entries = this.entries.filter(item => item.id !== id);
    this.store();
    return of();
  }

  edit(entry: Entry) {
    const i = this.entries.indexOf(entry)
    this.entries = [...this.entries.slice(0, i), entry, ...this.entries.slice(i+1)]
    this.store()
    return of()
      
  }
}
