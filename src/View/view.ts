import { Idata } from '../Model/model'

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

  constructor(data: Idata, slider: HTMLElement) {
    this.slider = slider;

    this.sliderStyle = {
      mvpsLine: '',
      mvpsBar: '',
      mvpsHandle: '',
      mvpsLabel: '',
      mvpsMax: ''
    };

    this.updateView(data);
  }

  updateView(data: Idata) {
    if (data.vertical) {
      this.slider.classList.add('mvps', 'mvps_vertical');
      this.slider.style.height = data.height + 'px'; 
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
      ${this.barLeft}:${(data.value - data.min) / (data.max - data.min) * 100}%
    `;
    this.handleAndLabelFrom = `
      ${this.barLeft}:${(data.valueFrom - data.min) / (data.max - data.min) * 100}%
    `;
    this.handleAndLabelTo = `
      ${this.barLeft}:${(data.valueTo - data.min) / (data.max - data.min) * 100}%
    `;

    this.handle_html = `
    <span class='mvps-handle${this.sliderStyle.mvpsHandle}' 
      style='${this.handleAndLabel};${this.barTop}'>
    </span>`

    this.lable_html = `
    <span class='mvps-label${this.sliderStyle.mvpsLabel}' style=${this.handleAndLabel}>
      ${data.value}
    </span>`

    this.handleInterval_html = `
      <span class='mvps-handle mvps-handle-from${this.sliderStyle.mvpsHandle}' 
        style='${this.handleAndLabelFrom};${this.barTop}'>
      </span>
      <span class='mvps-handle mvps-handle-to${this.sliderStyle.mvpsHandle}' 
        style='${this.handleAndLabelTo};${this.barTop}'>
      </span>
    `
    this.lableInterval_html = `
      <span class='mvps-label mvps-label-from${this.sliderStyle.mvpsLabel}' 
        style=${this.handleAndLabelFrom}>${data.valueFrom}
      </span>
      <span class='mvps-label mvps-label-to${this.sliderStyle.mvpsLabel}' 
        style=${this.handleAndLabelTo}>${data.valueTo}
      </span>
    `

    if (data.interval && data.showValue) {
      this.other_html = this.handleInterval_html + this.lableInterval_html;
      this.barWidthNumber = (data.valueTo - data.valueFrom) / (data.max - data.min) * 100;
      this.barLeftNumber = (data.valueFrom - data.min) / (data.max - data.min) * 100;
    } else if (data.interval && !data.showValue) {
      this.other_html = this.handleInterval_html;
      this.barWidthNumber = (data.valueTo - data.valueFrom) / (data.max - data.min) * 100;
      this.barLeftNumber = (data.valueFrom - data.min) / (data.max - data.min) * 100;
    } else if (!data.interval && data.showValue) {
      this.other_html = this.handle_html + this.lable_html;
      this.barWidthNumber = (data.value - data.min) / (data.max - data.min) * 100;
      this.barLeftNumber = 0;
    } else {
      this.other_html = this.handle_html;
      this.barWidthNumber = (data.value - data.min) / (data.max - data.min) * 100;
      this.barLeftNumber = 0;
    }
    
    this.base_html = `
      <span class='mvps-line${this.sliderStyle.mvpsLine}'></span>
      <span class='mvps-min'>${data.min}</span>
      <span class='mvps-max${this.sliderStyle.mvpsMax}'>${data.max}</span>
      <span class='mvps-bar${this.sliderStyle.mvpsBar}' 
        style='${this.barLeft}:${this.barLeftNumber}%;${this.barWidth}:${this.barWidthNumber}%'>
      </span>
      ${this.other_html}
    `
  }

  getHtml() {
    return this.base_html;
  }


}