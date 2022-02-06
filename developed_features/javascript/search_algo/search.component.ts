import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { SearchEvent } from '../../interfaces/generic';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('searchBox') searchBox: ElementRef;
  @Input('originalArr') originalArr: any[] = [];
  @Input('addClass') addClass: string;
  @Output() response = new EventEmitter<SearchEvent>();
  inputValue: string = '';
  subscription: Subscription;

  constructor() {}
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.subscription = fromEvent(this.searchBox.nativeElement, 'input')
      .pipe(
        map((e) => this.inputValue),
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe((input) => this.onSearchHandler(input));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  classHandler() {
    let className = 'form-control default ';
    if (this.addClass) className += this.addClass;
    return className;
  }

  onSearchHandler(inputValue: string) {
    const input = inputValue.trim().toLowerCase();

    // return original array of items if input is empty
    if (!this.inputValue) {
      return this.response.emit({
        results: this.originalArr,
        input: input,
      });
    }

    const results = this.searchAlgo(input, this.originalArr);
    return this.response.emit({ results, input: input });
  }

  searchAlgo(input: string, searchArr: any[]): any[] {
    const regEx = new RegExp(input, 'i');
    let filteredArr: any[] = [];
    // Filters original array based on user input
    // For arrays containing primitive values only i.e. ['hello world awesome', 'world'] or [1, 2] or [1, 'hello', 'world', 2]
    if (typeof searchArr[0] !== 'object') {
      searchArr.forEach((item) => {
        const result = regEx.test(item);
        if (result) filteredArr.push(item);
      });
    }
    // For arrays containing arrays i.e. [[], [], []]
    if (Array.isArray(searchArr[0])) {
      searchArr.forEach((arr) => {
        const result = this.nestedSearch(input, arr);
        if (result) filteredArr.push(arr);
      });
    }

    // For arrays containing objects i.e. [{hello: "hello world"}] or [{hello: {type: 'world'}}] or [{hello: {type: ['hello']}}]
    else {
      searchArr.forEach((obj) => {
        let entries = Object.entries(obj);
        for (const [key, value] of entries) {
          if (typeof value !== 'object') {
            const result = regEx.test(value.toString());
            if (result) {
              return filteredArr.push(obj);
            }
          } else {
            const result = this.nestedSearch(input, obj);
            if (result) {
              return filteredArr.push(obj);
            }
          }
        }
      });
    }
    return filteredArr;
  }

  // Recursive if needed
  // Will stop nested recursion if first value returns true
  nestedSearch(input: string, obj: any): boolean {
    const regEx = new RegExp(input, 'i');
    // obj can either be a nested object or array
    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i += 1) {
        if (typeof obj[0] !== 'object') {
          const result = regEx.test(obj[i]);
          if (result) return true;
        } else {
          const result = this.nestedSearch(input, obj[i]);
          if (result) return true;
        }
      }
    } else {
      let entries = Object.entries(obj);
      for (const [key, value] of entries) {
        if (typeof value !== 'object') {
          // string/number
          const result = regEx.test(value.toString());
          if (result) return true;
        } else {
          const result = this.nestedSearch(input, value);
          if (result) return true;
        }
      }
    }
    return false; // return false if no matches
  }
}
