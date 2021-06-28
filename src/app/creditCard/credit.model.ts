export class Credit {
  constructor(
    public ccNumber: string,
    public userName: string,
    public ccLimit: string,
    public ccBalance?: string,
    public createdTime?: string
  ) {}
}
