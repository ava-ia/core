'use strict';

export default (text) => {
  process.stdout.write(`${'<AVA>'.magenta} ${text.grey}\n`);
};
