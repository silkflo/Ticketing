import nats, { Stan } from 'node-nats-streaming';

class NatsWrapper {
  // ? to tell typescript that the type is undefined for a certain amount of time
  private _client?: Stan;

  get client() {
    if (!this._client) {
      throw new Error('Cannot access NATS client before connecting');
    }
    return this._client;
  }

  connect(clusteId: string, clientId: string, url: string) {
    this._client = nats.connect(clusteId, clientId, { url });

    return new Promise<void>((resolve, reject) => {
      this.client.on('connect', () => {
        console.log('connected to NATS');
        resolve();
      });

      this.client.on('error', (err) => {
        reject(err);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();
