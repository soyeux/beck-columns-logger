import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Entry } from '../../entry.model';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnChanges {
  @Input() entry!: Entry;
  @Output() save: EventEmitter<Entry> = new EventEmitter();
  @Output() delete: EventEmitter<Entry> = new EventEmitter();
  @ViewChild('picker') picker: any;
  form: FormGroup | undefined;

  constructor(private fb: FormBuilder) {

  }

  initForm() {
    this.form = this.fb.group({
      date: [this.entry.date],
      situation: [this.entry.situation],
      emotion: [this.entry.emotion],
      autoThough: [this.entry.autoThough],
      behavior: [this.entry.behavior],
      alternativeThough: [this.entry.alternativeThough],
      consequences: [this.entry.consequences],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initForm()
  }

  deleteEntry() {
    this.delete.emit(this.entry)
  }

  cancel() {
    this.initForm()
  }

  submit() {
    const entry: Entry = {
      id: this.entry.id,
      date: this.form?.value.date,
      situation: this.form?.value.situation,
      emotion: this.form?.value.emotion,
      autoThough: this.form?.value.autoThough,
      behavior: this.form?.value.behavior,
      alternativeThough: this.form?.value.alternativeThough,
      consequences: this.form?.value.consequences
    }; 

    this.save.emit(entry)
  }

}
