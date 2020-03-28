import React from 'react';
import { generateRandomString } from '../../utils/helpers';
import colorLiquidHTML from '../../html/ColorLiquid';
class ColorLiquidsWebComponent extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open'});
  }

  connectedCallback() {
    this._shadowRoot.innerHTML = colorLiquidHTML;
    this.index = 1;
    this.config = JSON.parse(this.getAttribute('config'));
    this.animateConfig = {
      last: Date.now(),
      noOfSeconds: 10,
    }
    this.init();    
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
 
  // Following are effect specific functions 

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

  waveAnimate() {
    this.index = this.index % this.config.length;
    let currentPrimary = this._shadowRoot.querySelector('.primary');
    this.svgRoot.appendChild(this.generateWaveHtml(this.config[this.index], 'primary'));

    let currentSecondary = this._shadowRoot.querySelector('.secondary');
    if (currentSecondary) {
      currentSecondary.remove();
    }
    currentPrimary.classList.remove('primary');
    currentPrimary.classList.add('secondary');
    this.index++;
  }

  startAnimate() {
    // for every 10 seconds call the inner function
    this.currentTime = Date.now();
    if (this.currentTime - this.animateConfig.last >= this.animateConfig.noOfSeconds * 1000) {
      this.animateConfig.last = this.currentTime;
      this.waveAnimate();
    }
    this.intervalState = requestAnimationFrame(this.startAnimate.bind(this));
  };
  
  init() {
    this.svgRoot = this._shadowRoot.querySelector('.svg-list');
    this.svgRoot.appendChild(this.generateWaveHtml(this.config[0], 'primary'));
    this.intervalState = requestAnimationFrame(this.startAnimate.bind(this));
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