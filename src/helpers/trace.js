export default (key, props = {}, { debug, timestamp }) => {
  if (debug) {
    debug.stopAndPersist(`[${new Date() - timestamp}]ms ${key.bold} ${JSON.stringify(props)}`);
    debug.start();
  }
};
