// TODO: Check why roll animation is slowing down
const GooeySubstanceHTML = `
  <style>  
  .blob-container {
    position: absolute;
    width: 50vw;
    height: 50vw;
    top: 50%;
    overflow: hidden;
    left: 50%;
    transform: translate(-50%, -50%) rotate(0deg);
    filter: url("#goo-square");
    // animation: roll 45s steps(3, end) infinite 2s; 
  }

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
    animation: ani-1 15s infinite 2s;
    transition: background-color 4s linear; }

  @keyframes ani-1 {
    0% {
      transform: rotate(351.06108deg) translate(0px) scale(1); }
    50% {
      transform: rotate(351.06108deg) translate(242.7704px) scale(0.15); }
    100% {
      transform: rotate(351.06108deg) translate(0px) scale(1); } }
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
    animation: ani-2 15s infinite 2s;
    transition: background-color 4s linear; }

  @keyframes ani-2 {
    0% {
      transform: rotate(2.43849deg) translate(0px) scale(1); }
    50% {
      transform: rotate(2.43849deg) translate(155.07157px) scale(0.15); }
    100% {
      transform: rotate(2.43849deg) translate(0px) scale(1); } }
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
    animation: ani-3 15s infinite 2s;
    transition: background-color 4s linear; }

  @keyframes ani-3 {
    0% {
      transform: rotate(212.88332deg) translate(0px) scale(1); }
    50% {
      transform: rotate(212.88332deg) translate(178.57458px) scale(0.15); }
    100% {
      transform: rotate(212.88332deg) translate(0px) scale(1); } }
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
    animation: ani-4 15s infinite 2s;
    transition: background-color 4s linear; }

  @keyframes ani-4 {
    0% {
      transform: rotate(275.44005deg) translate(0px) scale(1); }
    50% {
      transform: rotate(275.44005deg) translate(248.96127px) scale(0.15); }
    100% {
      transform: rotate(275.44005deg) translate(0px) scale(1); } }
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
    animation: ani-5 15s infinite 2s;
    transition: background-color 4s linear; }

  @keyframes ani-5 {
    0% {
      transform: rotate(265.05239deg) translate(0px) scale(1); }
    50% {
      transform: rotate(265.05239deg) translate(195.62603px) scale(0.15); }
    100% {
      transform: rotate(265.05239deg) translate(0px) scale(1); } }
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
    animation: ani-6 15s infinite 2s;
    transition: background-color 4s linear; }

  @keyframes ani-6 {
    0% {
      transform: rotate(183.04365deg) translate(0px) scale(1); }
    50% {
      transform: rotate(183.04365deg) translate(228.50204px) scale(0.15); }
    100% {
      transform: rotate(183.04365deg) translate(0px) scale(1); } }
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
    animation: ani-7 15s infinite 2s;
    transition: background-color 4s linear; }

  @keyframes ani-7 {
    0% {
      transform: rotate(291.62758deg) translate(0px) scale(1); }
    50% {
      transform: rotate(291.62758deg) translate(197.90256px) scale(0.15); }
    100% {
      transform: rotate(291.62758deg) translate(0px) scale(1); } }
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
    animation: ani-8 15s infinite 2s;
    transition: background-color 4s linear; }

  @keyframes ani-8 {
    0% {
      transform: rotate(347.34013deg) translate(0px) scale(1); }
    50% {
      transform: rotate(347.34013deg) translate(170.12988px) scale(0.15); }
    100% {
      transform: rotate(347.34013deg) translate(0px) scale(1); } }
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
    animation: ani-9 15s infinite 2s;
    transition: background-color 4s linear; }

  @keyframes ani-9 {
    0% {
      transform: rotate(344.59313deg) translate(0px) scale(1); }
    50% {
      transform: rotate(344.59313deg) translate(207.89518px) scale(0.15); }
    100% {
      transform: rotate(344.59313deg) translate(0px) scale(1); } }
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
    animation: ani-10 15s infinite 2s;
    transition: background-color 4s linear; }

  @keyframes ani-10 {
    0% {
      transform: rotate(8.18862deg) translate(0px) scale(1); }
    50% {
      transform: rotate(8.18862deg) translate(188.64477px) scale(0.15); }
    100% {
      transform: rotate(8.18862deg) translate(0px) scale(1); } }
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
    animation: ani-11 15s infinite 2s;
    transition: background-color 4s linear; }

  @keyframes ani-11 {
    0% {
      transform: rotate(239.96122deg) translate(0px) scale(1); }
    50% {
      transform: rotate(239.96122deg) translate(235.50488px) scale(0.15); }
    100% {
      transform: rotate(239.96122deg) translate(0px) scale(1); } }
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
    animation: ani-12 15s infinite 2s;
    transition: background-color 4s linear; }

  @keyframes ani-12 {
    0% {
      transform: rotate(10.67063deg) translate(0px) scale(1); }
    50% {
      transform: rotate(10.67063deg) translate(157.71049px) scale(0.15); }
    100% {
      transform: rotate(10.67063deg) translate(0px) scale(1); } }
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
    animation: ani-13 15s infinite 2s;
    transition: background-color 4s linear; }

  @keyframes ani-13 {
    0% {
      transform: rotate(101.28404deg) translate(0px) scale(1); }
    50% {
      transform: rotate(101.28404deg) translate(229.4695px) scale(0.15); }
    100% {
      transform: rotate(101.28404deg) translate(0px) scale(1); } }
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
    animation: ani-14 15s infinite 2s;
    transition: background-color 4s linear; }

  @keyframes ani-14 {
    0% {
      transform: rotate(338.87301deg) translate(0px) scale(1); }
    50% {
      transform: rotate(338.87301deg) translate(235.80531px) scale(0.15); }
    100% {
      transform: rotate(338.87301deg) translate(0px) scale(1); } }
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
    animation: ani-15 15s infinite 2s;
    transition: background-color 4s linear; }

  @keyframes ani-15 {
    0% {
      transform: rotate(101.63104deg) translate(0px) scale(1); }
    50% {
      transform: rotate(101.63104deg) translate(221.1837px) scale(0.15); }
    100% {
      transform: rotate(101.63104deg) translate(0px) scale(1); } }
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
    animation: ani-16 15s infinite 2s;
    transition: background-color 4s linear; }

  @keyframes ani-16 {
    0% {
      transform: rotate(79.26962deg) translate(0px) scale(1); }
    50% {
      transform: rotate(79.26962deg) translate(172.57817px) scale(0.15); }
    100% {
      transform: rotate(79.26962deg) translate(0px) scale(1); } }
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
    animation: ani-17 15s infinite 2s;
    transition: background-color 4s linear; }

  @keyframes ani-17 {
    0% {
      transform: rotate(196.53701deg) translate(0px) scale(1); }
    50% {
      transform: rotate(196.53701deg) translate(222.12919px) scale(0.15); }
    100% {
      transform: rotate(196.53701deg) translate(0px) scale(1); } }
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
    animation: ani-18 15s infinite 2s;
    transition: background-color 4s linear; }

  @keyframes ani-18 {
    0% {
      transform: rotate(289.91822deg) translate(0px) scale(1); }
    50% {
      transform: rotate(289.91822deg) translate(205.37231px) scale(0.15); }
    100% {
      transform: rotate(289.91822deg) translate(0px) scale(1); } }
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
    animation: ani-19 15s infinite 2s;
    transition: background-color 4s linear; }

  @keyframes ani-19 {
    0% {
      transform: rotate(66.53334deg) translate(0px) scale(1); }
    50% {
      transform: rotate(66.53334deg) translate(195.93611px) scale(0.15); }
    100% {
      transform: rotate(66.53334deg) translate(0px) scale(1); } }
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
    animation: ani-20 15s infinite 2s;
    transition: background-color 4s linear; }

  @keyframes ani-20 {
    0% {
      transform: rotate(82.77556deg) translate(0px) scale(1); }
    50% {
      transform: rotate(82.77556deg) translate(187.24786px) scale(0.15); }
    100% {
      transform: rotate(82.77556deg) translate(0px) scale(1); } }
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