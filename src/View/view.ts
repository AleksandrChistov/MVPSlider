import { Ioptions } from '../Model/model'
import { IEventEmitter } from '../Presenter/presenter'

export class View {
  slider: HTMLElement
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

  addChangePositionHandler(emitter: IEventEmitter) {
    let handles = this.slider.querySelectorAll('.mvps-handle');
    handles.forEach(handle => {
      handle.addEventListener('mousedown', (event) => {
        if ((<KeyboardEvent>event).which == 1) {
          emitter.emit('addStartingPositionHandle', {e: event});

          document.onmousemove = (event) => {
            // emit события в Model каждый раз при изменении
            emitter.emit('changePositionHandle', {e: event});
            console.log('Координаты', event);
          };
          document.onmouseup = () => {
            document.onmousemove = document.onmouseup = null;
            // emit события в Model последний раз 
            emitter.emit('changePositionHandle', {e: event});
            console.log('Отписались!');
          };
        }
      });
    });
  }

  getHtml(): string {
    return this.base_html;
  }
}