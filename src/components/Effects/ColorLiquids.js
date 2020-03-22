import React from 'react';
import { generateRandomString } from '../../utils/helpers';
import { colorLiquidHTML } from '../../constants/effects';
class ColorLiquidsWebComponent extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open'});
  }

  connectedCallback() {
    this._shadowRoot.innerHTML = colorLiquidHTML;
    this.index = 1;
    this.init(this._shadowRoot, JSON.parse(this.getAttribute('config')));
  }

  disconnectedCallback() {
    // remove event handlers
    cancelAnimationFrame(this.intervalState);
  }

  static get observedAttributes(){
    return ['config'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if(oldVal != newVal) {
      // render stuffs on attributes update
    }
  }
 
  // This function returns svg dom object of the liquid based
  // of the passed config object
  generateWaveHtml(config, svgClasses) {
    let { fill, liquid, colors, color } = config;
    let isGradient = fill === 'gradient';
    switch (liquid) {
      case 'blob4':
      case 'blob5':
      case 'blob6':
        svgClasses += ' rotate-180';
        break;
    }

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

    return new DOMParser().parseFromString(str,
      'text/xml'
    ).firstChild;
  }

  waveAnimate(document, colorsConfig, svgRoot) {
    this.index = this.index % colorsConfig.length;
    let currentPrimary = document.querySelector('.primary');
    svgRoot.appendChild(this.generateWaveHtml(colorsConfig[this.index], 'primary'));

    let currentSecondary = document.querySelector('.secondary');
    if (currentSecondary) {
      currentSecondary.remove();
    }
    currentPrimary.classList.remove('primary');
    currentPrimary.classList.add('secondary');
    this.index++;
  }
  
  
  init(document, colorsConfig) {
    const svgRoot = document.querySelector('.svg-list');
    svgRoot.appendChild(this.generateWaveHtml(colorsConfig[0], 'primary'));

    let noOfSeconds = 10;
    let last = 0.01;
    function animate(now) {
      // for every 10 seconds call the inner function
      // TODO: Fix double wave render issue
      if (now - last >= noOfSeconds * 1000) {
        last = now;
        this.waveAnimate(document, colorsConfig, svgRoot);
      }
      this.intervalState = requestAnimationFrame(animate.bind(this));
    };
    animate.call(this);
  }
}

customElements.define('color-liquids', ColorLiquidsWebComponent);

const ColorLiquids = (props) => {
  let { config } = props.settings;
  let configStr = JSON.stringify(config);
  return (
    <color-liquids config={configStr}></color-liquids>
  );
};

export default ColorLiquids;