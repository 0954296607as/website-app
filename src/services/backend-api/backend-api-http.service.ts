import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseHttpUrl } from '../../configuration';
import { Ticker } from 'src/models/ticker';
import { IBackendApi } from './backend-api.interfice';


@Injectable()
export class BackendApiHttpService implements IBackendApi {
    constructor(private http: HttpClient) { }

    getTickersBySymbol(symbol: string): Observable<Ticker[]> {
        if (!symbol) {
            return of([]);
        }
        const headers = new HttpHeaders({
            // 'Access-Control-Allow-Methods': 'GET',
            // 'Access-Control-Allow-Origin': 'http://localhost:4200',
            // 'Access-Control-Allow-Headers': 'Accept',
        });
        return this.http.get(`${this.apiUrl}/ticker/${symbol}`, { headers: headers })
            .pipe(
                map(values => {
                    return Ticker.createFromAnyArray(values);

                })
            );
    }

    private get apiUrl(): string {
        return `${baseHttpUrl}`;
    }
}
