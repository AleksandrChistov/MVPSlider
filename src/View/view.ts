import { Ioptions, Idata } from '../Model/model'
import { IEventEmitter } from '../Presenter/presenter'

export class View {
  slider: HTMLElement
  handleTo: HTMLElement
  handleFrom?: HTMLElement
  bar?: HTMLElement
  base_html: string
  other_html: string
  handle_html: string
  lable_html: string
  handleInterval_html: string
  lableInterval_html: string
  handleAndLabel: string
  handleAndLabelFrom: string
  handleAndLabelTo: string
  barLeft: string
  barWidth: string
  barTop: string
  barLeftNumber: number
  barWidthNumber: number
  sliderStyle: {
    mvpsLine: string
    mvpsBar: string
    mvpsHandle: string
    mvpsLabel: string
    mvpsMax: string
  }

  constructor(options: Ioptions, slider: HTMLElement) {
    this.slider = slider;

    this.sliderStyle = {
      mvpsLine: '',
      mvpsBar: '',
      mvpsHandle: '',
      mvpsLabel: '',
      mvpsMax: ''
    };

    this.renderView(options);
  }

  renderView(options: Ioptions): void {
    if (options.vertical) {
      this.slider.classList.add('mvps', 'mvps_vertical');
      this.slider.style.height = options.height + 'px'; 
      this.barLeft = 'bottom';
      this.barWidth = 'height';
      this.barTop = '';
      this.sliderStyle.mvpsLine = ' mvps-line_vertical';
      this.sliderStyle.mvpsBar = ' mvps-bar_vertical';
      this.sliderStyle.mvpsHandle = ' mvps-handle_vertical';
      this.sliderStyle.mvpsLabel = ' mvps-label_vertical';
      this.sliderStyle.mvpsMax = ' mvps-max_vertical';
    } else {
      this.slider.classList.add('mvps');
      this.barLeft = 'left';
      this.barWidth = 'width';
      this.barTop = 'top: 0';
    }

    this.handleAndLabel = `
      ${this.barLeft}:${(options.value - options.min) / (options.max - options.min) * 100}%
    `;
    this.handleAndLabelFrom = `
      ${this.barLeft}:${(options.valueFrom - options.min) / (options.max - options.min) * 100}%
    `;
    this.handleAndLabelTo = `
      ${this.barLeft}:${(options.valueTo - options.min) / (options.max - options.min) * 100}%
    `;

    this.handle_html = `
    <span class='mvps-handle${this.sliderStyle.mvpsHandle}' data-value='value' 
      style='${this.handleAndLabel};${this.barTop}'>
    </span>`

    this.lable_html = `
    <span class='mvps-label${this.sliderStyle.mvpsLabel}' style=${this.handleAndLabel}>
      ${options.value}
    </span>`

    this.handleInterval_html = `
      <span class='mvps-handle mvps-handle-from${this.sliderStyle.mvpsHandle}' 
        data-value='valueFrom' style='${this.handleAndLabelFrom};${this.barTop}'>
      </span>
      <span class='mvps-handle mvps-handle-to${this.sliderStyle.mvpsHandle}' 
        data-value='valueTo' style='${this.handleAndLabelTo};${this.barTop}'>
      </span>
    `
    this.lableInterval_html = `
      <span class='mvps-label mvps-label-from${this.sliderStyle.mvpsLabel}' 
        style=${this.handleAndLabelFrom}>${options.valueFrom}
      </span>
      <span class='mvps-label mvps-label-to${this.sliderStyle.mvpsLabel}' 
        style=${this.handleAndLabelTo}>${options.valueTo}
      </span>
    `

    if (options.interval && options.showValue) {
      this.other_html = this.handleInterval_html + this.lableInterval_html;
      this.barWidthNumber = (options.valueTo - options.valueFrom) / (options.max - options.min) * 100;
      this.barLeftNumber = (options.valueFrom - options.min) / (options.max - options.min) * 100;
    } else if (options.interval && !options.showValue) {
      this.other_html = this.handleInterval_html;
      this.barWidthNumber = (options.valueTo - options.valueFrom) / (options.max - options.min) * 100;
      this.barLeftNumber = (options.valueFrom - options.min) / (options.max - options.min) * 100;
    } else if (!options.interval && options.showValue) {
      this.other_html = this.handle_html + this.lable_html;
      this.barWidthNumber = (options.value - options.min) / (options.max - options.min) * 100;
      this.barLeftNumber = 0;
    } else {
      this.other_html = this.handle_html;
      this.barWidthNumber = (options.value - options.min) / (options.max - options.min) * 100;
      this.barLeftNumber = 0;
    }
    
    this.base_html = `
      <span class='mvps-line${this.sliderStyle.mvpsLine}'></span>
      <span class='mvps-min'>${options.min}</span>
      <span class='mvps-max${this.sliderStyle.mvpsMax}'>${options.max}</span>
      <span class='mvps-bar${this.sliderStyle.mvpsBar}' 
        style='${this.barLeft}:${this.barLeftNumber}%;${this.barWidth}:${this.barWidthNumber}%'>
      </span>
      ${this.other_html}
    `
  }

  updateView(data: Idata) {
    this.handleAndLabel = `${(data.value - data.min) / (data.max - data.min) * 100}%`;

    if (data.valueString === 'value') {
      this.handleTo.style.left = this.handleAndLabel;
      this.bar.style.width = this.handleAndLabel;
    } 

    if (data.valueString === 'valueFrom') {
      this.handleFrom.style.bottom = this.handleAndLabel;
      this.bar.style.height = (data.valueTo - data.valueFrom) / (data.max - data.min) * 100 + '%';
      this.bar.style.bottom = (data.valueFrom - data.min) / (data.max - data.min) * 100 + '%';
    }

    if (data.valueString === 'valueTo') {
      this.handleTo.style.bottom = this.handleAndLabel;
      this.bar.style.height = (data.valueTo - data.valueFrom) / (data.max - data.min) * 100 + '%';
      this.bar.style.bottom = (data.valueFrom - data.min) / (data.max - data.min) * 100 + '%';
    }

    this.handleAndLabelTo = `
      ${this.barLeft}:${(data.valueTo - data.min) / (data.max - data.min) * 100}%
    `;
    console.log(data.value);
  }

  addChangePositionHandler(emitter: IEventEmitter) {
    this.bar = this.slider.querySelector('.mvps-bar');
    this.handleTo = this.slider.querySelector('.mvps-handle-to');

    if (this.handleTo) {
      this.addEventListener(emitter, this.handleTo);
      this.handleFrom = this.slider.querySelector('.mvps-handle-from');
      this.addEventListener(emitter, this.handleFrom);
    } else {
      this.handleTo = this.slider.querySelector('.mvps-handle');
      this.addEventListener(emitter, this.handleTo);
    }
  }

  addEventListener(emitter: IEventEmitter, handle: HTMLElement) {
    handle.addEventListener('mousedown', (event) => {
      if (event.which == 1) {
        emitter.emit('addStartingPositionHandle', {e: event});

        document.onmousemove = (event) => {
          // emit события в Model каждый раз при изменении
          emitter.emit('changeValue', {e: event, emitter});
          console.log('Координаты', event);
        };

        document.onmouseup = (event) => {
          document.onmousemove = document.onmouseup = null;
          // emit события в Model последний раз 
          emitter.emit('changeValue', {e: event, emitter});
          console.log('Отписались!');
        };
      }
    });
  }

  getHtml(): string {
    return this.base_html;
  }
}