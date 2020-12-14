const utils = {
  range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),
  random: (min, max) => min + Math.floor(max * Math.random()),
};

export default utils;
