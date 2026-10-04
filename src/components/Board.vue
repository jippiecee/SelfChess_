<script setup>
import { computed } from "vue";
import { G, col } from "../chess/engine";

const props = defineProps({
  board: Array, flipped: Boolean, selected: Number, targets: Map,
  last: Object, check: Number, hint: Object,
});
defineEmits(["pick"]);

const order = computed(() => { const a = [...Array(64).keys()]; return props.flipped ? a.reverse() : a; });
const ranks = computed(() => (props.flipped ? [1, 2, 3, 4, 5, 6, 7, 8] : [8, 7, 6, 5, 4, 3, 2, 1]));
const files = computed(() => (props.flipped ? [..."HGFEDCBA"] : [..."ABCDEFGH"]));
const glyph = (p) => G[p.toUpperCase()] + "\uFE0E";
const isLight = (i) => ((i >> 3) + (i & 7)) % 2 === 0;
const marked = (m, i) => m && (m.f === i || m.t === i);
</script>

<template>
  <div class="frame">
    <div class="ranks"><span v-for="r in ranks" :key="r">{{ r }}</span></div>
    <div class="grid">
      <div
        v-for="i in order" :key="i" class="sq"
        :class="{
          light: isLight(i), dark: !isLight(i), selected: selected === i,
          last: marked(last, i), check: check === i, hint: marked(hint, i),
        }"
        @click="$emit('pick', i)"
      >
        <span v-if="board[i]" class="piece" :class="col(board[i])">{{ glyph(board[i]) }}</span>
        <i v-if="targets.has(i)" :class="board[i] ? 'ring' : 'dot'"></i>
      </div>
    </div>
    <div></div>
    <div class="files"><span v-for="f in files" :key="f">{{ f }}</span></div>
  </div>
</template>

<style scoped>
.frame { display: grid; grid-template-columns: 2.2rem var(--b); grid-template-rows: var(--b) 2.2rem; padding: 1.2rem 1.2rem 0.4rem 0.4rem; background: var(--card); border-radius: 4px; width: max-content; }
.ranks { display: grid; grid-template-rows: repeat(8, minmax(0, 1fr)); }
.files { display: grid; grid-template-columns: repeat(8, minmax(0, 1fr)); }
.ranks span, .files span { display: grid; place-items: center; color: var(--muted); font-size: 0.9rem; }
.grid { display: grid; grid-template-columns: repeat(8, minmax(0, 1fr)); grid-template-rows: repeat(8, minmax(0, 1fr)); width: var(--b); height: var(--b); }
.sq { position: relative; display: grid; place-items: center; cursor: pointer; user-select: none; font-size: calc(var(--b) / 8 * 0.74); line-height: 1; }
.light { background: #ecdcb8; }
.dark { background: #a9825a; }
.last::before { content: ""; position: absolute; inset: 0; background: rgba(255, 215, 60, 0.4); }
.selected { box-shadow: inset 0 0 0 4px rgba(60, 130, 230, 0.85); }
.hint { box-shadow: inset 0 0 0 4px rgba(60, 170, 110, 0.9); }
.check { background: radial-gradient(circle, #e04444 0, rgba(224, 68, 68, 0) 75%), #a9825a; }
.piece { position: relative; z-index: 1; margin-top: -0.06em; }
.piece.w { color: #fff; -webkit-text-stroke: 1.4px #222; paint-order: stroke fill; }
.piece.b { color: #1b1b1f; -webkit-text-stroke: 1px #000; }
.dot, .ring { position: absolute; z-index: 2; pointer-events: none; }
.dot { width: 28%; height: 28%; border-radius: 50%; background: rgba(20, 20, 20, 0.28); }
.ring { inset: 6%; border-radius: 50%; border: calc(var(--b) / 8 * 0.08) solid rgba(20, 20, 20, 0.28); }
</style>