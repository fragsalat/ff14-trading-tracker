import {ToggleRecordMessagesAction} from 'app/actions/toggle-record-messages-action';
import {Store} from 'app/store';
import {h, Component} from 'preact';

export class MessagesPage extends Component {

  constructor(props) {
    super(props);

    Store.getInstance().setState({messages: [], recordMessages: false});
    Store.getInstance().subscribe(state =>
      this.setState({messages: state.messages || [], recordMessages: state.recordMessages})
    )
  }

  toggleRecording() {
    new ToggleRecordMessagesAction();
  }

  render() {
    return (
      <div className="packets">
        <header>
          <input
            type="checkbox"
            id="record-packets"
            value={this.state.recordMessages}
            onChange={() => this.toggleRecording()}
          />
          <label for="record-packets">
            {this.state.recordMessages ? 'Stop' : 'Start'} recording FFXIV Messages
          </label>
        </header>
        {this.state.messages.map(({bundle, message, sent}) =>
          <div className="packet">
            {sent ? 'SEND' : 'RECV'} | {message.type} | {message.length} | {message.dataHex}
          </div>
        )}
      </div>
    );
  }
}