export class TcpStream {

  constructor() {
    this.subscriptions = [];
  }

  subscribe(callback) {
    this.subscriptions.push(callback);
  }

  publish(data) {
    this.subscriptions.forEach(callback => callback(data));
  }
}