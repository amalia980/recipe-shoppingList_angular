//find out if the token exists and how long it is valid


export class User {


  constructor(
    public email: string,
     public id: string,
     private _token: string,
     private _tokenExpirationDate: Date) { }

     get token() {
      if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {//if the exper date does not exist OR the current is date is more than the token date
        return null;
      }
      return this._token;
     }
}
