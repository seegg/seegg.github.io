
//A simple que to make sure items are process one at a time.
export class SyncAutoQueue<T> {
  queue: T[] = [];
  lockAquired = false;
  count = 0;
  /**
   * A queue to automatically handle items as it gets add.
   * only start the next item after the current item has been completed.
   */
  constructor() { /** */ }

  add(item: T) {
    this.queue.push(item);
    if (!this.lockAquired) this.poll();
  }

  async poll() {
    if (this.lockAquired) return;
    this.lockAquired = true;
    try {
      const currentItem = this.queue.shift();
      console.log('started', this.count);
      if (typeof currentItem === 'function') {
        await currentItem();
      }
      console.log('ended', this.count);
      this.count++;
      this.lockAquired = false;
      this.next();
    } catch (e) {
      console.error(e);
    }
  }

  get size() {
    return this.queue.length;
  }

  next() {
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
