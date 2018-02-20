export class Store {

  /**
   * @returns {Store}
   */
  static getInstance() {
    if (!this.instance) {
      this.instance = new Store();
    }
    return this.instance;
  }

  /**
   * Current application state
   * @type {Object}
   */
  _state = {};

  /**
   * List of subscribers to notify on state change
   * @type {Array}
   */
  _callbacks = [];

  /**
   * Subscribe to state changes and get the initial state
   * @param {Function} callback Will be initially called and when state changes. The state is passed as parameter.
   */
  subscribe(callback) {
    this._callbacks.push(callback);
    // Call back with current state
    callback(this.getState());
  }

  /**
   * Set new parts of the application state
   * @param {Object} newState
   */
  setState(newState) {
    this._state = Object.assign({}, this._state, newState);

    this._callbacks.forEach(callback =>
      callback(this.getState())
    );
  }

  /**
   * Replaces the current application state with a new one
   * @param {Object} newState
   */
  replaceState(newState) {
    this._state = Object.assign({}, newState);

    this._callbacks.forEach(callback =>
      callback(this.getState())
    );
  }

  /**
   * Get a clone of the current state
   * @returns {Object}
   */
  getState() {
    return this._state;
  }

  dispatch(action) {
    this.replaceState(action.state);
  }
}
