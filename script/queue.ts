
//A simple queue to make sure items are process one at a time sequentially.
export class SyncAutoQueue<T> {
  queue: T[] = [];
  lockAquired = false;
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
    //only dequque and call the item if the lock is free.
    if (this.lockAquired) return;
    //aquire the lock and then call the item at the front of the queue.
    this.lockAquired = true;
    try {
      const currentItem = this.queue.shift();
      if (typeof currentItem === 'function') {
        await currentItem();
      }
      //release the lock and poll the next item.
      this.lockAquired = false;
      this.next();
    } catch (e) {
      console.error(e);
    }
  }

  get size() {
    return this.queue.length;
  }

  /**
   * There is no item in queue and there's no item waiting to finish executing.
   */
  get isInactive() {
    return this.size === 0 && !this.lockAquired;
  }

  next() {
    if (this.size > 0) {
      this.poll();
    } else {
      return null;
    }
  }

  peek(): T | null {
    return this.size > 0 ? this.queue[0] : null;
  }

  empty() {
    this.queue = [];
  }

}
