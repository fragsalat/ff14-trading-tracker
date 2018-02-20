import {NewPacketAction} from 'app/actions/new-packet-action';
import {TcpStream} from 'app/network/tcp-stream';
import {Cap, decoders, PROTOCOL} from 'cap';

export class NetworkListener {

  /**
   * @return {NetworkListener}
   */
  static getInstance() {
    if (!this.instance) {
      this.instance = new NetworkListener();
    }
    return this.instance;
  }

  constructor() {
    this.cap = new Cap();
    this.stream = new TcpStream();
  }

  connect(filter) {
    const device = Cap.deviceList().find(device => device.addresses.length).name;
    const bufferSize = 10 * 1024 * 1024;
    const buffer = new Buffer(65535);
    this.linkType = this.cap.open(device, filter, bufferSize, buffer);

    console.log(this.linkType);
    this.cap.on('packet', (length, trunctated) => {
      const ethernet = decoders.Ethernet(buffer);
      if (this.linkType === 'ETHERNET') {
        if (ethernet.info.type === PROTOCOL.ETHERNET.IPV4) {
          const ipv4 = decoders.IPV4(buffer, ret.offset);
          console.log('from: ' + ipv4.info.srcaddr + ' to ' + ipv4.info.dstaddr);

          if (ipv4.info.protocol === PROTOCOL.IP.TCP) {
            console.log('Decoding TCP ...');

            const tcp = decoders.TCP(buffer, ret.offset);
            console.log(' from port: ' + tcp.info.srcport + ' to port: ' + tcp.info.dstport);

            const dataLength = ipv4.info.totallen - ipv4.hdrlen - tcp.hdrlen;
            const data = buffer.slice(tcp.offset, tcp.offset + dataLength);
            // Notify for new packet
            new NewPacketAction(ipv4.info, tcp.info, data).dispatch();
            this.stream.publish(data);
          }
        }
      }
    });
  }

  /**
   * Pass callback to
   * @param callback
   */
  onPacket(callback) {
    this.stream.subscribe(callback);
  }
}