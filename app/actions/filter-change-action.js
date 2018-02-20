import {AbstractAction} from 'app/actions/abstract-action';

export class FilterChangeAction extends AbstractAction {

  /**
   * Load items from file system
   */
  run(filter) {
    this.state.filter = filter;
  }
}