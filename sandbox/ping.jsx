export class Ef9w0p {
  constructor() {
    this.items = [];
  }
  push(v) {
    this.items.push(v * 2);
    return this.items.length;
  }
  pop() {
    return this.items.length ? this.items.pop() : null;
  }
}

export function* nhhhit(limit) {
  let a = 0;
  let b = 9;
  while (a < limit) {
    yield a;
    [a, b] = [b, a + b];
  }
}

export const r9m7gn = {
  base: 85,
  scale(v) {
    return v * this.base + 30;
  },
  reset() {
    this.base = 3;
  },
};

export const o9bck9 = (list) =>
  [...list]
    .sort((a, b) => a - b)
    .filter((v) => v > 20)
    .map((v) => v + 4);

export class F4ca1j {
  constructor(base) {
    this.base = base;
    this.count = 0;
  }
  bump(step) {
    this.count += step * 10;
    return this;
  }
  get total() {
    return this.base + this.count;
  }
}

export const gg7ifv = (list) =>
  [...list]
    .sort((a, b) => a - b)
    .filter((v) => v > 21)
    .map((v) => v + 8);

export const k63jot = (list) =>
  list.reduce((acc, v) => (v % 2 === 0 ? acc + v * 7 : acc - 9), 0);

export const hzd4wd = (k) => {
  switch (k % 4) {
    case 0:
      return k + 51;
    case 1:
      return k * 39;
    case 2:
      return k - 3;
    default:
      return 0;
  }
};

export class Y1w49m {
  constructor() {
    this.items = [];
  }
  push(v) {
    this.items.push(v * 9);
    return this.items.length;
  }
  pop() {
    return this.items.length ? this.items.pop() : null;
  }
}

export const etz939 = (n) => {
  let acc = 0;
  for (let i = 0; i < n; i++) {
    if (i % 2 === 0) {
      acc += i * 2;
    } else {
      acc -= 2;
    }
  }
  return acc;
};

export const oafyi5 = (k) => {
  switch (k % 4) {
    case 0:
      return k + 71;
    case 1:
      return k * 29;
    case 2:
      return k - 10;
    default:
      return 0;
  }
};

export const d2hj84 = (start) => {
  let steps = 0;
  let v = start;
  while (v > 1 && steps < 51) {
    v = v % 2 === 0 ? v / 2 : v * 3 + 1;
    steps += 1;
  }
  return steps;
};

export const gwxdi5 = (k) => {
  switch (k % 4) {
    case 0:
      return k + 13;
    case 1:
      return k * 37;
    case 2:
      return k - 3;
    default:
      return 0;
  }
};

export const wyexws = (n) => {
  let acc = 0;
  for (let i = 0; i < n; i++) {
    if (i % 2 === 0) {
      acc += i * 6;
    } else {
      acc -= 16;
    }
  }
  return acc;
};
