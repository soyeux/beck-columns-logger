import { Injectable, OnInit } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { Entry, SerializedEntry } from './entry.model';


const storageKey = "entries"

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private entries: BehaviorSubject<Entry[]>;

  constructor() { 
    const items = localStorage.getItem(storageKey);
    if (items!= null) {
      const s: SerializedEntry[] = JSON.parse(items);
      const entries: Entry[] = [];
      for (const se of s) {
        entries.push({
          ...se,
          date: new Date(Date.parse(se.date))
        })
      }
      this.entries = new BehaviorSubject(entries); 
    } else {
      this.entries = new BehaviorSubject<Entry[]>([]); 
    
    }
  }


  store() {
    localStorage.setItem(storageKey, JSON.stringify(this.entries.value))
  }

  get() {
    return this.entries;
  }

  add() {
    let maxId = 0
    for (const entry of this.entries.value) {
      if (entry.id > maxId) {
        maxId = entry.id;
      }
    }

    const entry: Entry = {
      id: ++maxId,
      date: new Date(),
      situation: '',
      emotion: '',
      autoThough: '',
      behavior: '',
      alternativeThough: '',
      consequences: ''
    }

    
    this.entries.next([...this.entries.value, entry])
    this.store();
    return of();
  }

  remove(id: number) {
    this.entries.next(this.entries.value.filter(item => item.id !== id));
    this.store();
    return of();
  }

  edit(entry: Entry) {
    // const i = this.entries.value.indexOf(entry)
    const i = this.entries.value.filter(item => item.id !== entry.id);
    this.entries.next([...i, entry])
    console.log(this.entries);
    this.store()
    return of()
      
  }
}
