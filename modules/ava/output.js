'use strict';
import colors from 'colors';

export default (text, newLine = true) => {
  let output = text.grey;
  if (newLine) output = `${'<AVA>'.magenta} ${output}\n`;
  process.stdout.write(output);
}
