import React from 'react';
import GooeySubstanceHTML from '../../html/GooeySubstance';
import { getRandomNumbersBetween } from '../../utils/helpers';

const flatColors = ['#487eb0', '#2ecc71', '#ee5253', '#feca57', '#8c7ae6', '#10ac84', '#2f3640', '#192a56', '#B33771'];

class GooeySubstanceWebComponent extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.config = JSON.parse(this.getAttribute('config'));
    this._shadowRoot.innerHTML = GooeySubstanceHTML(this.config);
    this.primaryColor = new CssVariableColor('--blob-color');

    this.animateConfig = {
      last: Date.now(),
      noOfSeconds: 6,
    }
    this.left = null
    this.init();
  }

  disconnectedCallback() {
    // remove event handlers
    cancelAnimationFrame(this.timerId);
  }

  static get observedAttributes() {
    return ['config'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal != newVal) {
      // render stuffs on attributes update
    }
  }

  // Following are effect specific functions 

  // randomizeColors() {
  //   this.currentTime = Date.now();
  //   if (this.currentTime - this.animateConfig.last >= this.animateConfig.noOfSeconds * 1000) {
  //     this.animateConfig.last = this.currentTime;

  //     // our work
  //     this.primaryColor.value = (flatColors[getRandomNumbersBetween(0, flatColors.length - 1)]);
  //   }
  //   this.timerId = requestAnimationFrame(this.randomizeColors.bind(this));
  // }

  init() {
    switch (this.config.position) {
      case 'left':
        this.left = '33.3%';
        break;
      case 'right':
        this.left = '66.6%';
        break;
    }
    if (this.left) {
      this._shadowRoot.querySelector('.blob-container').style.left = this.left;
    }
    // TODO: Need to debug why this code ignites the GPU
    // if (this.config.randomize) {
    //   this.randomizeColors();
    // }
    this.primaryColor.value = this.config.blobColor;
  }

}

customElements.define('gooey-substance', GooeySubstanceWebComponent);

const GooeySubstance = (props) => {
  let { config, config: { backgroundColor, position } } = props.settings;
  let configStr = JSON.stringify(config);
  let styles = { backgroundColor};
  return (
    <div className="effect-container" style={styles}>
      <gooey-substance config={configStr}></gooey-substance>
    </div>
  );
};

class CssVariableColor {
  constructor(prop) {
    this.prop = prop;
  }
  get value() {
    return getComputedStyle(document.documentElement).getPropertyValue(this.prop).trim();
  }
  set value(hexString) {
    document.documentElement.style.setProperty(this.prop, hexString);
  }
}


export default GooeySubstance;