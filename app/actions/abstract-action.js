import {Store} from 'app/store';

export class AbstractAction {

  constructor(...args) {
    this.state = Store.getInstance().getState();
    this.promise = Promise.resolve()
      .then(this.run.bind(this, ...args))
      .then(this.dispatch);
  }

  run() {
    throw new Error('Implement run method!!');
  }

  dispatch() {
    Store.getInstance().dispatch(this);
  }
}