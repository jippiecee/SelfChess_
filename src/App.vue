<script setup>
import { computed } from "vue";
import Board from "./components/Board.vue";
import { useGame } from "./composables/useGame";
import { G } from "./chess/engine";

const g = useGame();
const turn = computed(() => (g.state.value.t === "w" ? "White" : "Black"));
const bar = computed(() => 50 + 50 * Math.tanh(g.score.value / 450));
const fmt = (v) => (Math.abs(v) > 90000 ? (v > 0 ? "1-0" : "0-1") : (v > 0 ? "+" : "") + (v / 100).toFixed(2));
const icons = (list) => list.map((u) => G[u] + "\uFE0E").join("");
</script>

<template>
  <header class="nav"><div class="wrap">Solo Chess</div></header>

  <main class="wrap layout">
    <div class="left">
      <Board
        :board="g.state.value.b" :flipped="g.flipped.value" :selected="g.selected.value" :targets="g.targets.value"
        :last="g.lastMove.value" :check="g.checkSquare.value" :hint="g.hintMove.value" @pick="g.pick"
      />
      <p class="credit">created by jippiecee</p>
    </div>

    <aside class="side">
      <section class="card center">
        <template v-if="g.result.value.over"><h2>{{ g.result.value.text }}</h2></template>
        <template v-else><h2>{{ turn }}</h2><p>turn<span v-if="g.result.value.text"> · {{ g.result.value.text }}</span></p></template>
        <div class="btns">
          <button @click="g.reset">New game</button>
          <button @click="g.undo">Undo</button>
          <button @click="g.flipped.value = !g.flipped.value">Flip</button>
        </div>
      </section>

      <section class="card">
        <h3>Analysis</h3>
        <div class="row"><strong class="score">{{ fmt(g.score.value) }}</strong><span class="muted">{{ g.thinking.value ? "thinking..." : "depth 3" }}</span></div>
        <div class="bar"><div :style="{ width: bar + '%' }"></div></div>
        <ol class="lines">
          <li v-for="l in g.lines.value" :key="l.san"><span>{{ l.san }}</span><span class="muted">{{ fmt(l.score) }}</span></li>
        </ol>
        <label class="muted"><input type="checkbox" v-model="g.showHint.value" /> Show best move on board</label>
      </section>

      <section class="card">
        <h3>Moves history</h3>
        <div class="table">
          <table>
            <thead><tr><th>#</th><th>White</th><th>Black</th></tr></thead>
            <tbody><tr v-for="r in g.rows.value" :key="r.n"><td>{{ r.n }}</td><td>{{ r.w }}</td><td>{{ r.b }}</td></tr></tbody>
          </table>
        </div>
        <p class="captured muted">
          <span>{{ icons(g.captured.value.byWhite) }}</span><span>{{ icons(g.captured.value.byBlack) }}</span>
          <span v-if="g.captured.value.diff">{{ g.captured.value.diff > 0 ? "White" : "Black" }} +{{ Math.abs(g.captured.value.diff) }}</span>
        </p>
      </section>

      <blockquote class="quote">
        "Sit at the chessboard and play with yourself, it's amazing."
        <footer>Magnus Carlsen</footer>
      </blockquote>
    </aside>
  </main>
</template>

<style>
:root { --bg: #171414; --card: #2b2b2b; --text: #eeeeee; --muted: #9b9b9b; --line: #3d3d3d; --b: min(calc(100vh - 220px), 60vw); }
* { box-sizing: border-box; }
body { margin: 0; background: var(--bg); color: var(--text); font: 15px/1.5 Roboto, "Segoe UI", system-ui, sans-serif; }
.wrap { max-width: 1480px; margin: 0 auto; padding: 0 24px; }
.nav { background: var(--card); height: 64px; display: flex; align-items: center; font-weight: 700; font-size: 18px; }
.layout { display: grid; grid-template-columns: max-content minmax(0, 1fr); gap: 24px; padding-top: 24px; padding-bottom: 24px; align-items: start; }
.credit { margin-top: 14px; text-align: center; font-size: 0.875rem; color: var(--muted); }
.side { display: grid; gap: 16px; min-width: 0; }
.card { background: var(--card); border-radius: 4px; padding: 20px 24px; }
.center { text-align: center; }
h2 { margin: 0; font-size: 44px; font-weight: 400; line-height: 1.1; }
h3 { margin: 0 0 12px; font-size: 16px; font-weight: 600; }
p { margin: 0; }
.muted { color: var(--muted); }
.btns { display: flex; gap: 8px; justify-content: center; margin-top: 16px; }
button { font: inherit; padding: 6px 16px; border-radius: 4px; border: 1px solid var(--line); background: transparent; color: var(--text); cursor: pointer; }
button:hover { background: var(--line); }
.row { display: flex; justify-content: space-between; align-items: baseline; }
.score { font-size: 24px; font-weight: 500; font-variant-numeric: tabular-nums; }
.bar { height: 8px; background: #111; border-radius: 4px; overflow: hidden; margin: 8px 0 12px; }
.bar div { height: 100%; background: #eee; transition: width 0.3s; }
.lines { list-style: none; margin: 0 0 12px; padding: 0; font-variant-numeric: tabular-nums; }
.lines li { display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid var(--line); }
.table { max-height: 230px; overflow: auto; }
table { width: 100%; border-collapse: collapse; }
th, td { text-align: left; padding: 6px 8px; font-size: 14px; }
th { font-weight: 600; color: var(--text); border-bottom: 1px solid var(--line); }
td:first-child, th:first-child { width: 48px; color: var(--muted); }
.captured { display: flex; gap: 12px; margin-top: 12px; min-height: 1.5em; }
.quote { margin: 0; padding: 4px 4px 0 16px; border-left: 3px solid var(--line); color: var(--muted); font-style: italic; }
.quote footer { margin-top: 4px; font-style: normal; font-size: 13px; }
@media (max-width: 960px) { :root { --b: calc(100vw - 100px); } .layout { grid-template-columns: minmax(0, 1fr); } }
</style>