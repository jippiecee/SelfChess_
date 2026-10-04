import { ref, shallowRef, computed } from "vue";
import { start, legal, mk, san, inChk, col, analyze, VAL } from "../chess/engine";

/** Semua state permainan: posisi, riwayat, seleksi bidak, dan hasil analisis. */
export function useGame() {
  const state = shallowRef(start());
  const history = shallowRef([]); // [{ m, san }]
  const selected = ref(-1);
  const flipped = ref(false);
  const showHint = ref(true);
  const thinking = ref(false);
  const lines = shallowRef([]); // 3 langkah terbaik
  const score = ref(0);
  let token = 0;

  const moves = computed(() => legal(state.value));
  const targets = computed(() => new Map(moves.value.filter((m) => m.f === selected.value).map((m) => [m.t, m])));
  const inCheck = computed(() => inChk(state.value.b, state.value.t));
  const checkSquare = computed(() => (inCheck.value ? state.value.b.indexOf(state.value.t === "w" ? "K" : "k") : -1));
  const lastMove = computed(() => history.value.at(-1)?.m ?? null);
  const hintMove = computed(() => (showHint.value && lines.value[0]?.m) || null);

  const result = computed(() => {
    const s = state.value;
    const rest = s.b.filter((p) => p && !"kK".includes(p));
    if (!moves.value.length) {
      return inCheck.value
        ? { over: true, text: `Checkmate, ${s.t === "w" ? "Black" : "White"} wins`, score: s.t === "w" ? -1e5 : 1e5 }
        : { over: true, text: "Stalemate", score: 0 };
    }
    if (s.hm >= 100) return { over: true, text: "Draw by 50-move rule", score: 0 };
    if (rest.length < 2 && rest.every((p) => "nNbB".includes(p))) return { over: true, text: "Draw, insufficient material", score: 0 };
    return { over: false, text: inCheck.value ? "Check" : "", score: null };
  });

  const rows = computed(() => {
    const out = [];
    history.value.forEach((h, i) => (i % 2 ? (out.at(-1).b = h.san) : out.push({ n: i / 2 + 1, w: h.san, b: "" })));
    return out;
  });

  const captured = computed(() => {
    const init = { Q: 1, R: 2, B: 2, N: 2, P: 8 }, have = { w: {}, b: {} };
    for (const p of state.value.b) if (p) { const c = col(p), u = p.toUpperCase(); have[c][u] = (have[c][u] || 0) + 1; }
    const lost = (c) => Object.entries(init).flatMap(([u, n]) => Array(Math.max(0, n - (have[c][u] || 0))).fill(u));
    const value = (c) => Object.entries(have[c]).reduce((a, [u, n]) => a + VAL[u] * n, 0);
    return { byWhite: lost("b"), byBlack: lost("w"), diff: (value("w") - value("b")) / 100 };
  });

  function runAnalysis() {
    const t = ++token;
    lines.value = [];
    thinking.value = false;
    if (result.value.over) { score.value = result.value.score; return; }
    thinking.value = true;
    setTimeout(() => { // beri waktu UI untuk render dulu sebelum mesin berpikir
      if (t !== token) return;
      const res = analyze(state.value, moves.value);
      if (t !== token) return;
      lines.value = res.slice(0, 3);
      score.value = res[0].score;
      thinking.value = false;
    }, 30);
  }

  function play(m) {
    history.value = [...history.value, { m, san: san(state.value, m, moves.value) }];
    state.value = mk(state.value, m);
    selected.value = -1;
    runAnalysis();
  }

  function pick(i) {
    if (result.value.over) return;
    if (selected.value >= 0 && targets.value.has(i)) return play(targets.value.get(i));
    selected.value = col(state.value.b[i]) === state.value.t ? i : -1;
  }

  function undo() {
    if (!history.value.length) return;
    history.value = history.value.slice(0, -1);
    state.value = history.value.reduce((s, h) => mk(s, h.m), start());
    selected.value = -1;
    runAnalysis();
  }

  function reset() {
    state.value = start();
    history.value = [];
    selected.value = -1;
    runAnalysis();
  }

  runAnalysis();
  return { state, selected, flipped, showHint, thinking, lines, score, targets, checkSquare, lastMove, hintMove, result, rows, captured, pick, undo, reset };
}
