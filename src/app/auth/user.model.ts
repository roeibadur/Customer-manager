export class UserModel {
  constructor(
    public email: string,
    public _tokenExpiredDate: Date,
    public token: string
  ) {}
}
