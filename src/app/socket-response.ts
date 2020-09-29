export class SocketResponse {
  constructor(public success: boolean,
    public error?: string,
    public data?: any,
    public message?: string){}
}
