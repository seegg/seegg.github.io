

export class SyncAutoQueue<T> {
  queue: T[] = [];
  lockAquire = false;
  count = 0;
  /**
   * A queue to automatically handle items as it gets add.
   * only start the next item after the current item has been completed.
   */
  constructor() {
    //
  }

  add(item: T) {
    //
    this.queue.push(item);
    // console.log('add item', this.size, this.lockAquire);
    if (!this.lockAquire) this.poll();
  }

  async poll() {
    //
    if (this.lockAquire) return;
    this.lockAquire = true;
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const currentItem = this.queue.shift();
      console.log('starting', this.count);
      if (typeof currentItem === 'function') {
        await currentItem();
      }
      console.log('ended', this.count);
      this.count++;
      this.lockAquire = false;
      this.next();
    } catch (e) {
      console.error(e);
    }
  }

  get size() {
    //
    return this.queue.length;
  }

  next() {
    // 
    if (this.size > 0) {
      this.poll();
    } else {
      return null;
    }
  }

  empty() {
    this.queue = [];
  }

}
