import { Observable } from 'rxjs';
import { Ticker } from 'src/models/ticker';

export interface IBackendApi {
    getTickersBySymbol(symbol: string): Observable<Ticker[]>;
}
