import { Injectable, Injector } from '@angular/core';
import { BackendApiHttpService } from './backend-api-http.service';
import { IBackendApi } from './backend-api.interfice';

@Injectable()
export class BackendApiService {
  private _backendApi: IBackendApi;
  constructor(protected injector: Injector) {
    this._backendApi = injector.get(BackendApiHttpService);
  }

  get backendApi(): IBackendApi {
    return this._backendApi;
  }
}
