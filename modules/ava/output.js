'use strict';
import colors from 'colors';

export default (text, newLine = true) => {
  let output = text;
  if (newLine) output = `${'<AVA>'.magenta} ${output}\n`.bold;
  process.stdout.write(output);
}
