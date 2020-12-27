export class Ticker {

  private _name: string;
  private _symbol: string;

  constructor(
    name: string,
    symbol: string,
  ) {
    this._name = name;
    this._symbol = symbol;
  }

  get name(): string {
    return this._name;
  }


  get symbol(): string {
    return this._symbol;
  }

  static createFromAny(object: any): Ticker {
    if (object == null) {
      return null;
    }

    return new Ticker(
      object.name,
      object.symbol,
    );
  }

  static createFromAnyArray(array: any): Ticker[] {
    if (!array) {
      return [];
    }
    return array.map(this.createFromAny).filter((item: any) => item != null);
  }
}
