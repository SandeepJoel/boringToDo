import React from 'react';
import { generateRandomString } from '../../utils/helpers';

class ColorLiquidsWebComponent extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open'});
  }

  connectedCallback() {
    this._shadowRoot.innerHTML = `
    <style>
      svg {
        width: 100%;
        height: 100%;
        position: absolute; }
        svg path {
          stroke: none;
          animation-duration: 20s;
          animation-fill-mode: forwards;
          animation-timing-function: linear; }

      svg.rotate-180 {
        transform: rotate(180deg); }

      svg.blob1 path {
        animation-name: blob1; }

      svg.blob2 path {
        animation-name: blob2; }

      @keyframes blob1 {
        0% {
          d: path("m-11.444628,-8.048312c-3.140579,-5.378913 53.053023,-5.454973 53.198237,3.376171c0.145215,8.831144 -8.770224,19.502336 -24.251582,15.866166c-15.481357,-3.63617 -11.27162,10.726983 -23.339128,9.250349c-12.067516,-1.476638 -2.466941,-23.113776 -5.607528,-28.492685z"); }
        25% {
          d: path("m-28.795354,-5.908146c121.633194,-51.430897 616.10513,-42.270872 462.777242,67.878373c-153.327888,110.149245 115.868414,279.566312 -113.659648,224.562429c-229.528062,-55.003883 -154.634013,59.11043 -243.680104,96.834777c-89.046091,37.724347 -227.070684,-337.844682 -105.43749,-389.275579z"); }
        50% {
          d: path("m-28.79535,-5.90815c121.63319,-51.43089 865.10513,-24.27087 711.77724,85.87838c-153.32789,110.14924 103.86841,416.56631 -170.65965,377.56243c-274.52806,-39.00388 -266.63401,-74.88957 -432.6801,-39.16523c-166.04609,35.72434 -230.07069,-372.84468 -108.43749,-424.27558z"); }
        100% {
          d: path("m-28.79535,-5.90815c121.63319,-51.43089 865.10513,-24.27087 711.77724,85.87838c-153.32789,110.14924 103.86841,416.56631 -170.65965,377.56243c-274.52806,-39.00388 -266.63401,-74.88957 -432.6801,-39.16523c-166.04609,35.72434 -230.07069,-372.84468 -108.43749,-424.27558z"); } }
      @keyframes blob2 {
        0% {
          d: path("m29.111039,-10.3016c-7.253941,-0.038298 -41.206301,-1.335958 -42.099303,0.045929c-0.893003,1.38189 -1.760668,33.247394 0.218596,40.687763c1.979267,7.440369 5.483205,-3.352861 8.900681,-6.274761c1.708737,-1.460952 5.187272,2.820702 10.87375,-6.20092c5.686478,-9.021622 0.997196,-7.26307 7.839167,-13.817671c6.841971,-6.554601 9.01036,-5.131141 12.687265,-6.146902c3.676904,-1.015761 8.833784,-8.255139 1.579845,-8.293438z"); }
        17% {
          d: path("m293.360857,-0.584409c-50.768634,-0.214905 -288.393299,-7.496182 -294.643218,0.257708c-6.249918,7.753891 -1.862844,169.781554 11.989575,211.530052c13.852419,41.748499 24.77811,-40.746094 48.696223,-57.141112c11.959057,-8.197508 69.775416,85.496455 79.24074,3.911297c9.465322,-81.58516 107.391884,19.884423 113.438603,-16.893962c6.046718,-36.778385 -5.972338,-92.009676 49.048498,-88.677986c55.020837,3.33169 42.998213,-52.771094 -7.77042,-52.985998z"); }
        30% {
          d: path("m573.408321,-8.727364c-58.716872,-0.272012 -566.580154,0.384806 -573.808548,10.199154c-7.228393,9.814348 -36.163117,323.538796 4.403773,304.562125c40.56689,-18.976671 7.942775,-79.661124 65.048149,-45.134965c57.105374,34.526159 110.359905,65.411614 159.213703,-2.792576c48.853798,-68.20419 141.762546,60.922129 191.864541,14.370549c50.101995,-46.551581 23.868756,-125.620574 87.503545,-121.403547c63.634792,4.21703 124.491708,-159.528729 65.774837,-159.80074z"); }
        42% {
          d: path("m633.709339,-8.714123c-64.712285,-0.351142 -637.159482,-5.866968 -645.125946,6.802417c-7.966464,12.669385 -27.128198,424.021372 17.580862,399.524304c44.709061,-24.497068 24.208529,-9.406944 84.417464,-21.900832c60.208935,-12.493888 111.628317,63.530787 180.016075,8.213381c68.387758,-55.317406 171.692258,48.644268 226.910026,-11.449372c55.217767,-60.093641 15.396699,-114.890831 85.529056,-109.447052c70.13236,5.443782 115.384747,-271.391706 50.672463,-271.742846z"); }
        50% {
          d: path("m661.473384,-20.905646c-67.754221,-0.378509 -673.264464,-0.170249 -681.605408,13.486548c-8.340944,13.656798 -33.018894,463.22225 13.791808,436.815957c46.810704,-26.406293 39.192939,22.16826 102.23212,8.700637c63.039181,-13.467622 103.029202,2.326982 174.631669,-9.608408c71.602467,-11.935391 270.534095,66.281887 328.34749,1.504736c57.813392,-64.777153 -13.110914,-76.151783 60.31816,-70.283733c73.429078,5.868053 70.03838,-380.23723 2.284161,-380.615737z"); }
        100% {
          d: path("m661.473384,-20.905646c-67.754221,-0.378509 -673.264464,-0.170249 -681.605408,13.486548c-8.340944,13.656798 -33.018894,463.22225 13.791808,436.815957c46.810704,-26.406293 39.192939,22.16826 102.23212,8.700637c63.039181,-13.467622 103.029202,2.326982 174.631669,-9.608408c71.602467,-11.935391 270.534095,66.281887 328.34749,1.504736c57.813392,-64.777153 -13.110914,-76.151783 60.31816,-70.283733c73.429078,5.868053 70.03838,-380.23723 2.284161,-380.615737z"); } }
      .svg {
        z-index: 0; }

      .hide {
        display: none; }

      .secondary {
        z-index: 1; }

      .primary {
        z-index: 2; }      
    </style>
    <div class="svg-list">
    </div>`;
    this.init(this._shadowRoot, JSON.parse(this.getAttribute('config')));
  }

  disconnectedCallback() {
    // remove event handlers
    clearInterval(this.intervalState);
  }

  static get observedAttributes(){
    return ['config'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if(oldVal != newVal) {
      // render stuffs on attributes update
    }
  }
 
  // This function returns svg dom object of the wave based
  // of the passed config object
  generateWaveHtml(config, svgClasses) {
    let { fill, liquid, colors, color } = config;
    let isGradient = fill === 'gradient';
    let id = generateRandomString();
    let str = `
      <svg xmlns="http://www.w3.org/2000/svg" class="${svgClasses} ${liquid}" 
        preserveAspectRatio="none" viewBox="0 0 580 400">
        <path fill="${isGradient ? `url(#${id})` : color}" />
          ${isGradient ? `<defs>
              <linearGradient id="${id}" spreadMethod="pad">
                <stop offset="0%" stop-color="${colors[0]}" stop-opacity="1" />
                <stop offset="100%" stop-color="${colors[1]}" stop-opacity="1" />
              </linearGradient>
          </defs> `
        : ''}      
      </svg> `;
    return new DOMParser().parseFromString(str, 'text/xml').firstChild;
  }

  init(document, colorsConfig) {
    const svgRoot = document.querySelector('.svg-list');
    svgRoot.appendChild(this.generateWaveHtml(colorsConfig[0], 'primary'));

    let index = 1;
    this.intervalState = setInterval(() => {
      index = index % colorsConfig.length;
      let currentPrimary = document.querySelector('.primary');
      svgRoot.appendChild(this.generateWaveHtml(colorsConfig[index], 'primary'));

      let currentSecondary = document.querySelector('.secondary');
      if (currentSecondary) {
        currentSecondary.remove()
      }
      currentPrimary.classList.remove('primary');
      currentPrimary.classList.add('secondary');
      index++;
    }, 10000);
  }
}

customElements.define('color-liquids', ColorLiquidsWebComponent);

export const ColorLiquids = (props) => {
  let { config } = props.settings;
  let configStr = JSON.stringify(config);
  return (
    <color-liquids config={configStr}></color-liquids>
  );
};