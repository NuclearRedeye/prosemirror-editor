import { Plugin } from 'prosemirror-state';

class Logger {
  constructor() {
    console.log('Logger(): Called');
  }

  print(message) {
    console.log(message);
  }
}

export const trackChangesPlugin = new Plugin({
  state: {
    init(_, instance) {
      return new Logger();
    },
    apply(transaction, instance) {
      instance.print('hello from plugin!');
      return instance;
    }
  }
});
