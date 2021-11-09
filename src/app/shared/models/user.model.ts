export class User {
  constructor(
    public displayName: string,
    public email: string,
    public id: string,
    private _idToken: string,
    private _tokenExpirationDate: Date
  ) {}

  get idToken(): string | null {
    if (this._tokenExpirationDate && this._tokenExpirationDate > new Date()) {
      return this._idToken;
    }
    return null;
  }
}
