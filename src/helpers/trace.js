export default (key, props, { debug }) => {
  if (debug) {
    debug.stopAndPersist(`${key.green} ${JSON.stringify(props)}`);
    debug.start();
  }
};
