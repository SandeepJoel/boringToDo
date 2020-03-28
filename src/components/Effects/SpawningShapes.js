import React from 'react';
import { getRandomNumbersBetween, debounce } from '../../utils/helpers';
import { hexToRgb, drawPolygon } from '../../utils/canvas-helpers';

class SpawningShapesWebComponent extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this._shadowRoot.innerHTML = `
      <style>
        canvas {
          position: absolute;
        }
      </style>
      <canvas id='canvas-007'></canvas>
    `;
    this.config = JSON.parse(this.getAttribute('config'));
    this.canvas = this._shadowRoot.getElementById('canvas-007');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.allParticles = [];
    this.particleMinRadius = 20;
    this.particleMaxRadius = 25;
    this.fpsInterval = null;
    this.now = null;
    this.then = null;
    this.elapsed = null;
    this.bgColor = hexToRgb(this.config.backgroundColor);
    this.spread = this.config.spread === 'medium' ? 500 : 1000;
    this.horizontalPosition = null;
    switch (this.config.position) {
      case 'right':
        this.horizontalPosition = 2 / 3;
      break;
      case 'left':
        this.horizontalPosition = 1 / 3.3;
      break;
      case 'center':
        this.horizontalPosition = 1 / 2;
      break;
    }

    this.init();
    window.addEventListener('resize', this.resizeHandler);
  }

  disconnectedCallback() {
    // remove event handlers
    cancelAnimationFrame(this.timerId);
    cancelAnimationFrame(this.timerId2);
    window.removeEventListener('resize', this.resizeHandler);
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

  // initialize the timer variables and start the animation
  startAnimating(fps) {
    this.fpsInterval = 1000 / fps;
    this.then = Date.now();
    this.addParticles();
    this.particlesSpread();
  }

  // the animation loop calculates time elapsed since the last loop
  // and only draws if your specified fps interval is achieved
  addParticles() {
    // request another frame
    this.timerId = requestAnimationFrame(this.addParticles.bind(this));
    // calc elapsed time since last loop
    this.now = Date.now();
    this.elapsed = this.now - this.then;
    // if enough time has elapsed, draw the next frame
    if (this.elapsed > this.fpsInterval) {
      // Get ready for next frame by setting then=now, but also adjust for your
      // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
      this.then = this.now - (this.elapsed % this.fpsInterval);
      // Put your drawing code here
      this.allParticles.push(
        new particles(
          this.canvas.width * (this.horizontalPosition),
          (this.canvas.height / 2 - 50),
          getRandomNumbersBetween(this.particleMinRadius, this.particleMaxRadius),
          this.spread,
          this.config.particleColor
        )
      );
    }
  }

  particlesSpread() {
    let c = this.canvas.getContext('2d');
    // to get trail effect
    hexToRgb(this.config.backgroundColor);
    c.fillStyle = `rgba(${this.bgColor.r}, ${this.bgColor.g}, ${this.bgColor.b}, 0.1)`;
    c.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // use below code to disable trail effect;
    // c.clearRect(0, 0, window.innerWidth, window.innerHeight);

    this.allParticles.forEach((element, index) => {
      element.update(c);
      if (element.ttl <= 1) {
        this.allParticles.splice(index, 1);
      }
    });
    this.timerId2 = requestAnimationFrame(this.particlesSpread.bind(this));
  }

  resizeHandler() {
    // check inside this inside function is not working
    debounce(function(){
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }, 1000)
  }

  init() {
    this.startAnimating(3.5);
  }

}

customElements.define('spawning-shapes', SpawningShapesWebComponent);

const SpawningShapes = (props) => {
  let { config } = props.settings;
  let configStr = JSON.stringify(config);
  return (
    <spawning-shapes config={configStr}></spawning-shapes>
  );
};

function particles(x, y, r, spread, color) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.sides = getRandomNumbersBetween(3, 5);
  this.velocity = {
    x: getRandomNumbersBetween(-10, 10) / 10,
    y: getRandomNumbersBetween(-10, 10) / 10
  };
  this.ttl = spread;
  this.rotation = getRandomNumbersBetween(0, 360) * (Math.PI / 180);
  this.rotationOffset = Math.random() > 0.5 ? 0.01 : -0.01;
  this.opacity = 1;
  this.color = hexToRgb(color);
}

particles.prototype.update = function (context) {
  this.y += this.velocity.y;
  this.x += this.velocity.x;
  this.ttl -= 1;
  this.rotation += this.rotationOffset;
  this.opacity -= 1 / this.ttl;
  this.draw(context);
}

particles.prototype.draw = function (context) {
  // for polygons
  drawPolygon(context, this.x, this.y, this.r, this.sides, this.rotation, this.color, this.opacity, 'stroke');
}


export default SpawningShapes;