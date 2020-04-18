// TODO: Check why roll animation is slowing down
export const GooeySubstanceHTML = (config) => `
  <style>  
  
  .blob-container {
    position: absolute;
    width: 50vw;
    height: 50vw;
    top: 50%;
    overflow: hidden;
    left: 50%;
    transform: translate(-50%, -50%) rotate(0deg);
    filter: url("#goo-square"); }

  .box {
    width: 150px;
    height: 150px;
    position: absolute;
    top: -99999px;
    bottom: -99999px;
    margin: auto;
    left: -99999px;
    right: -99999px;
    border-radius: 50%;
    background-color: var(--blob-color);
    animation: shrink 15s infinite 2s;
    transition: background-color 4s linear; }

  .piece:nth-child(1) {
    width: 100px;
    height: 100px;
    position: absolute;
    top: -99999px;
    bottom: -99999px;
    margin: auto;
    left: -99999px;
    right: -99999px;
    border-radius: 50%;
    background-color: var(--blob-color);
    animation: ani-1 15s infinite 2s;
    transition: background-color 4s linear; }

  @keyframes ani-1 {
    0% {
      transform: rotate(222.65514deg) translate(0px) scale(1); }
    50% {
      transform: rotate(222.65514deg) translate(165.20818px) scale(0.15); }
    100% {
      transform: rotate(222.65514deg) translate(0px) scale(1); } }
  .piece:nth-child(2) {
    width: 100px;
    height: 100px;
    position: absolute;
    top: -99999px;
    bottom: -99999px;
    margin: auto;
    left: -99999px;
    right: -99999px;
    border-radius: 50%;
    background-color: var(--blob-color);
    animation: ani-2 15s infinite 2s;
    transition: background-color 4s linear; }

  @keyframes ani-2 {
    0% {
      transform: rotate(227.96072deg) translate(0px) scale(1); }
    50% {
      transform: rotate(227.96072deg) translate(208.25278px) scale(0.15); }
    100% {
      transform: rotate(227.96072deg) translate(0px) scale(1); } }
  .piece:nth-child(3) {
    width: 100px;
    height: 100px;
    position: absolute;
    top: -99999px;
    bottom: -99999px;
    margin: auto;
    left: -99999px;
    right: -99999px;
    border-radius: 50%;
    background-color: var(--blob-color);
    animation: ani-3 15s infinite 2s;
    transition: background-color 4s linear; }

  @keyframes ani-3 {
    0% {
      transform: rotate(320.60325deg) translate(0px) scale(1); }
    50% {
      transform: rotate(320.60325deg) translate(218.75381px) scale(0.15); }
    100% {
      transform: rotate(320.60325deg) translate(0px) scale(1); } }
  .piece:nth-child(4) {
    width: 100px;
    height: 100px;
    position: absolute;
    top: -99999px;
    bottom: -99999px;
    margin: auto;
    left: -99999px;
    right: -99999px;
    border-radius: 50%;
    background-color: var(--blob-color);
    animation: ani-4 15s infinite 2s;
    transition: background-color 4s linear; }

  @keyframes ani-4 {
    0% {
      transform: rotate(109.79603deg) translate(0px) scale(1); }
    50% {
      transform: rotate(109.79603deg) translate(154.67458px) scale(0.15); }
    100% {
      transform: rotate(109.79603deg) translate(0px) scale(1); } }
  .piece:nth-child(5) {
    width: 100px;
    height: 100px;
    position: absolute;
    top: -99999px;
    bottom: -99999px;
    margin: auto;
    left: -99999px;
    right: -99999px;
    border-radius: 50%;
    background-color: var(--blob-color);
    animation: ani-5 15s infinite 2s;
    transition: background-color 4s linear; }

  @keyframes ani-5 {
    0% {
      transform: rotate(348.85433deg) translate(0px) scale(1); }
    50% {
      transform: rotate(348.85433deg) translate(230.2103px) scale(0.15); }
    100% {
      transform: rotate(348.85433deg) translate(0px) scale(1); } }
  .piece:nth-child(6) {
    width: 100px;
    height: 100px;
    position: absolute;
    top: -99999px;
    bottom: -99999px;
    margin: auto;
    left: -99999px;
    right: -99999px;
    border-radius: 50%;
    background-color: var(--blob-color);
    animation: ani-6 15s infinite 2s;
    transition: background-color 4s linear; }

  @keyframes ani-6 {
    0% {
      transform: rotate(307.31676deg) translate(0px) scale(1); }
    50% {
      transform: rotate(307.31676deg) translate(152.02206px) scale(0.15); }
    100% {
      transform: rotate(307.31676deg) translate(0px) scale(1); } }
  .piece:nth-child(7) {
    width: 100px;
    height: 100px;
    position: absolute;
    top: -99999px;
    bottom: -99999px;
    margin: auto;
    left: -99999px;
    right: -99999px;
    border-radius: 50%;
    background-color: var(--blob-color);
    animation: ani-7 15s infinite 2s;
    transition: background-color 4s linear; }

  @keyframes ani-7 {
    0% {
      transform: rotate(85.21106deg) translate(0px) scale(1); }
    50% {
      transform: rotate(85.21106deg) translate(206.7023px) scale(0.15); }
    100% {
      transform: rotate(85.21106deg) translate(0px) scale(1); } }
  .piece:nth-child(8) {
    width: 100px;
    height: 100px;
    position: absolute;
    top: -99999px;
    bottom: -99999px;
    margin: auto;
    left: -99999px;
    right: -99999px;
    border-radius: 50%;
    background-color: var(--blob-color);
    animation: ani-8 15s infinite 2s;
    transition: background-color 4s linear; }

  @keyframes ani-8 {
    0% {
      transform: rotate(5.87689deg) translate(0px) scale(1); }
    50% {
      transform: rotate(5.87689deg) translate(218.35731px) scale(0.15); }
    100% {
      transform: rotate(5.87689deg) translate(0px) scale(1); } }
  .piece:nth-child(9) {
    width: 100px;
    height: 100px;
    position: absolute;
    top: -99999px;
    bottom: -99999px;
    margin: auto;
    left: -99999px;
    right: -99999px;
    border-radius: 50%;
    background-color: var(--blob-color);
    animation: ani-9 15s infinite 2s;
    transition: background-color 4s linear; }

  @keyframes ani-9 {
    0% {
      transform: rotate(45.75913deg) translate(0px) scale(1); }
    50% {
      transform: rotate(45.75913deg) translate(210.82526px) scale(0.15); }
    100% {
      transform: rotate(45.75913deg) translate(0px) scale(1); } }
  .piece:nth-child(10) {
    width: 100px;
    height: 100px;
    position: absolute;
    top: -99999px;
    bottom: -99999px;
    margin: auto;
    left: -99999px;
    right: -99999px;
    border-radius: 50%;
    background-color: var(--blob-color);
    animation: ani-10 15s infinite 2s;
    transition: background-color 4s linear; }

  @keyframes ani-10 {
    0% {
      transform: rotate(222.41326deg) translate(0px) scale(1); }
    50% {
      transform: rotate(222.41326deg) translate(155.39923px) scale(0.15); }
    100% {
      transform: rotate(222.41326deg) translate(0px) scale(1); } }
  .piece:nth-child(11) {
    width: 100px;
    height: 100px;
    position: absolute;
    top: -99999px;
    bottom: -99999px;
    margin: auto;
    left: -99999px;
    right: -99999px;
    border-radius: 50%;
    background-color: var(--blob-color);
    animation: ani-11 15s infinite 2s;
    transition: background-color 4s linear; }

  @keyframes ani-11 {
    0% {
      transform: rotate(54.79377deg) translate(0px) scale(1); }
    50% {
      transform: rotate(54.79377deg) translate(151.91223px) scale(0.15); }
    100% {
      transform: rotate(54.79377deg) translate(0px) scale(1); } }
  .piece:nth-child(12) {
    width: 100px;
    height: 100px;
    position: absolute;
    top: -99999px;
    bottom: -99999px;
    margin: auto;
    left: -99999px;
    right: -99999px;
    border-radius: 50%;
    background-color: var(--blob-color);
    animation: ani-12 15s infinite 2s;
    transition: background-color 4s linear; }

  @keyframes ani-12 {
    0% {
      transform: rotate(193.14058deg) translate(0px) scale(1); }
    50% {
      transform: rotate(193.14058deg) translate(219.22602px) scale(0.15); }
    100% {
      transform: rotate(193.14058deg) translate(0px) scale(1); } }
  .piece:nth-child(13) {
    width: 100px;
    height: 100px;
    position: absolute;
    top: -99999px;
    bottom: -99999px;
    margin: auto;
    left: -99999px;
    right: -99999px;
    border-radius: 50%;
    background-color: var(--blob-color);
    animation: ani-13 15s infinite 2s;
    transition: background-color 4s linear; }

  @keyframes ani-13 {
    0% {
      transform: rotate(238.74258deg) translate(0px) scale(1); }
    50% {
      transform: rotate(238.74258deg) translate(150.92328px) scale(0.15); }
    100% {
      transform: rotate(238.74258deg) translate(0px) scale(1); } }
  .piece:nth-child(14) {
    width: 100px;
    height: 100px;
    position: absolute;
    top: -99999px;
    bottom: -99999px;
    margin: auto;
    left: -99999px;
    right: -99999px;
    border-radius: 50%;
    background-color: var(--blob-color);
    animation: ani-14 15s infinite 2s;
    transition: background-color 4s linear; }

  @keyframes ani-14 {
    0% {
      transform: rotate(213.08676deg) translate(0px) scale(1); }
    50% {
      transform: rotate(213.08676deg) translate(228.88614px) scale(0.15); }
    100% {
      transform: rotate(213.08676deg) translate(0px) scale(1); } }
  .piece:nth-child(15) {
    width: 100px;
    height: 100px;
    position: absolute;
    top: -99999px;
    bottom: -99999px;
    margin: auto;
    left: -99999px;
    right: -99999px;
    border-radius: 50%;
    background-color: var(--blob-color);
    animation: ani-15 15s infinite 2s;
    transition: background-color 4s linear; }

  @keyframes ani-15 {
    0% {
      transform: rotate(79.30656deg) translate(0px) scale(1); }
    50% {
      transform: rotate(79.30656deg) translate(174.11889px) scale(0.15); }
    100% {
      transform: rotate(79.30656deg) translate(0px) scale(1); } }
  .piece:nth-child(16) {
    width: 100px;
    height: 100px;
    position: absolute;
    top: -99999px;
    bottom: -99999px;
    margin: auto;
    left: -99999px;
    right: -99999px;
    border-radius: 50%;
    background-color: var(--blob-color);
    animation: ani-16 15s infinite 2s;
    transition: background-color 4s linear; }

  @keyframes ani-16 {
    0% {
      transform: rotate(289.54331deg) translate(0px) scale(1); }
    50% {
      transform: rotate(289.54331deg) translate(193.44225px) scale(0.15); }
    100% {
      transform: rotate(289.54331deg) translate(0px) scale(1); } }
  .piece:nth-child(17) {
    width: 100px;
    height: 100px;
    position: absolute;
    top: -99999px;
    bottom: -99999px;
    margin: auto;
    left: -99999px;
    right: -99999px;
    border-radius: 50%;
    background-color: var(--blob-color);
    animation: ani-17 15s infinite 2s;
    transition: background-color 4s linear; }

  @keyframes ani-17 {
    0% {
      transform: rotate(100.16648deg) translate(0px) scale(1); }
    50% {
      transform: rotate(100.16648deg) translate(200.05491px) scale(0.15); }
    100% {
      transform: rotate(100.16648deg) translate(0px) scale(1); } }
  .piece:nth-child(18) {
    width: 100px;
    height: 100px;
    position: absolute;
    top: -99999px;
    bottom: -99999px;
    margin: auto;
    left: -99999px;
    right: -99999px;
    border-radius: 50%;
    background-color: var(--blob-color);
    animation: ani-18 15s infinite 2s;
    transition: background-color 4s linear; }

  @keyframes ani-18 {
    0% {
      transform: rotate(208.31294deg) translate(0px) scale(1); }
    50% {
      transform: rotate(208.31294deg) translate(223.02387px) scale(0.15); }
    100% {
      transform: rotate(208.31294deg) translate(0px) scale(1); } }
  .piece:nth-child(19) {
    width: 100px;
    height: 100px;
    position: absolute;
    top: -99999px;
    bottom: -99999px;
    margin: auto;
    left: -99999px;
    right: -99999px;
    border-radius: 50%;
    background-color: var(--blob-color);
    animation: ani-19 15s infinite 2s;
    transition: background-color 4s linear; }

  @keyframes ani-19 {
    0% {
      transform: rotate(139.60661deg) translate(0px) scale(1); }
    50% {
      transform: rotate(139.60661deg) translate(160.98304px) scale(0.15); }
    100% {
      transform: rotate(139.60661deg) translate(0px) scale(1); } }
  .piece:nth-child(20) {
    width: 100px;
    height: 100px;
    position: absolute;
    top: -99999px;
    bottom: -99999px;
    margin: auto;
    left: -99999px;
    right: -99999px;
    border-radius: 50%;
    background-color: var(--blob-color);
    animation: ani-20 15s infinite 2s;
    transition: background-color 4s linear; }

  @keyframes ani-20 {
    0% {
      transform: rotate(21.74939deg) translate(0px) scale(1); }
    50% {
      transform: rotate(21.74939deg) translate(205.45678px) scale(0.15); }
    100% {
      transform: rotate(21.74939deg) translate(0px) scale(1); } }
  @keyframes roll {
    0% {
      transform: translate(-50%, -50%) rotate(0deg); }
    100% {
      transform: translate(-50%, -50%) rotate(360deg); } }
  @keyframes shrink {
    0% {
      transform: scale(1); }
    50% {
      transform: scale(0.5); }
    100% {
      transform: scale(1); } }

  </style>
  <div class="blob-container">
    <div class="box"></div>
    <div class="piece"></div>
    <div class="piece"></div>
    <div class="piece"></div>
    <div class="piece"></div>
    <div class="piece"></div>
    <div class="piece"></div>
    <div class="piece"></div>
    <div class="piece"></div>
    <div class="piece"></div>
    <div class="piece"></div>
    <div class="piece"></div>
    <div class="piece"></div>
    <div class="piece"></div>
    <div class="piece"></div>
    <div class="piece"></div>
    <div class="piece"></div>
    <div class="piece"></div>
    <div class="piece"></div>
    <div class="piece"></div>
    <div class="piece"></div>     
  </div>
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
    <defs>
      <filter id="goo-circle">
        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -7"
          result="goo-circle" />
        <feBlend in="SourceGraphic" in2="goo-circle" />
      </filter>
      <filter id="goo-square">
        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
          result="goo-square" />
        <feComposite in="SourceGraphic" in2="goo-square" operator="atop" />
      </filter>
    </defs>
  </svg>
`
export default GooeySubstanceHTML;