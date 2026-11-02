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
