module.exports = {
  safeParse: (v) => {
    try {
      return JSON.parse(v);
    } catch (error) {
      return false;
    }
  },
  safeStringify: (v) => {
    try {
      return JSON.stringify(v);
    } catch (error) {
      return false;
    }
  },
};
