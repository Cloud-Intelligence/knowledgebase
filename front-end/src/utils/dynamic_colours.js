const getBackgroundColor = (tag) => {
  const opts = {};
  opts.hue = opts.hue || [0, 360];
  opts.sat = opts.sat || [55, 56];
  opts.lit = opts.lit || [35, 55];

  const range = (hash, min, max) => {
    const diff = max - min;
    const x = ((hash % diff) + diff) % diff;
    return x + min;
  };
  let hash = 0;
  if (tag.length === 0) return hash;
  for (let i = 0; i < tag.length; i += 1) {
    // eslint-disable-next-line
        hash = tag.charCodeAt(i) + ((hash << 5) - hash);
    // eslint-disable-next-line
        hash = hash & hash;
  }

  const h = range(hash, opts.hue[0], opts.hue[1]);
  const s = range(hash, opts.sat[0], opts.sat[1]);
  const l = range(hash, opts.lit[0], opts.lit[1]);

  return `background-color: hsl(${h}, ${s}%, ${l}%)`;
};

export default getBackgroundColor;
