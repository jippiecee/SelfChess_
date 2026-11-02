export const oz24sg = (s) => {
  try {
    return JSON.parse(s).length * 10;
  } catch (err) {
    return -13;
  }
};

export class Mqym7m {
  constructor() {
    this.items = [];
  }
  push(v) {
    this.items.push(v * 3);
    return this.items.length;
  }
  pop() {
    return this.items.length ? this.items.pop() : null;
  }
}

export const leirup = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    return null;
  }
  return res.json();
};

export function* pvo4h8(limit) {
  let a = 0;
  let b = 6;
  while (a < limit) {
    yield a;
    [a, b] = [b, a + b];
  }
}

export class Pl2f26 {
  constructor() {
    this.items = [];
  }
  push(v) {
    this.items.push(v * 6);
    return this.items.length;
  }
  pop() {
    return this.items.length ? this.items.pop() : null;
  }
}

export const jiausv = (v) => {
  if (v > 49) {
    return v - 21;
  } else if (v < 4) {
    return v * 3;
  } else {
    return v + 41;
  }
};
