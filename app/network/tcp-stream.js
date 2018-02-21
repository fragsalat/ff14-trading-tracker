export class TcpStream {

  constructor() {
    this.subscriptions = [];
  }

  subscribe(callback) {
    this.subscriptions.push(callback);
  }

  publish(...args) {
    this.subscriptions.forEach(callback => callback(...args));
  }
}