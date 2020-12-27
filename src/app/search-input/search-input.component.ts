import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, mergeAll, switchMap } from 'rxjs/operators';
import { Ticker } from 'src/models/ticker';
import { BackendApiService } from 'src/services/backend-api/backend-api.service';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit, OnDestroy {

  title = 'Ticker symbol (e.g. SPY)';
  name = '';
  subscriptions: Subscription[] = [];
  isFocusInput = false;
  tickers: Ticker[] = [];

  @ViewChild('inputField') inputField: ElementRef;

  constructor(
    private backendApiService: BackendApiService,
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.subscriptions && this.subscriptions.length !== 0) {
      this.subscriptions.forEach((value: Subscription) => value.unsubscribe())
    }
  }

  ngAfterViewInit() {
    this.subscriptions.push(fromEvent(this.inputField.nativeElement, 'focusin').subscribe(value => {
      this.isFocusInput = true;
      this.isTransformLabel(true);
    }));
    this.subscriptions.push(fromEvent(this.inputField.nativeElement, 'focusout').subscribe(value => {
      this.isTransformLabel(false);
      this.isFocusInput = false;
    }));
    this.subscriptions.push(fromEvent(this.inputField.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        map((event: Event) => (<HTMLInputElement>event.target).value),
        distinctUntilChanged(),
        switchMap(value => this.backendApiService.backendApi.getTickersBySymbol(value)),
      )
      .subscribe((data) => {
        this.tickers = data;
      })
    )
  }

  isTransformLabel(inFocus: boolean): boolean {
    return inFocus;
  }

  get changeLabelStyle(): string {
    return this.isFocusInput || this.name.length > 0 ? 'changed-label-style' : '';
  }

  get showClearButton(): boolean {
    return this.name && this.name.length > 0;
  }

  clearInput(): void {
    this.name = '';
    this.tickers = [];
  }

  updateSelectedTicker(ticker: Ticker): void {
    this.name = ticker.symbol.toLocaleUpperCase();
    this.tickers = [];
  }

}
