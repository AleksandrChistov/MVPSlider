import { Idata } from '../Model/model'

export class View {
  base_html: string
  other_html: string
  handle_html: string
  lable_html: string
  handleInterval_html: string
  lableInterval_html: string
  barWidth: number
  barLeft: number

  constructor(data: Idata) {
    this.handle_html = `
      <span class='mvps-handle' 
        style='left:${(data.value - data.min) / (data.max - data.min) * 100}%'>
      </span>
    `
    this.lable_html = `
      <span class='mvps-label' 
        style='left:${(data.value - data.min) / (data.max - data.min) * 100}%'>${data.value}
      </span>
    `
    this.handleInterval_html = `
      <span class='mvps-handle mvps-handle-from' 
        style='left:${(data.valueFrom - data.min) / (data.max - data.min) * 100}%'>
      </span>
      <span class='mvps-handle mvps-handle-to' 
        style='left:${(data.valueTo - data.min) / (data.max - data.min) * 100}%'>
      </span>
    `
    this.lableInterval_html = `
      <span class='mvps-label mvps-label-from' 
        style='left:${(data.valueFrom - data.min) / (data.max - data.min) * 100}%'>${data.valueFrom}
      </span>
      <span class='mvps-label mvps-label-to' 
        style='left:${(data.valueTo - data.min) / (data.max - data.min) * 100}%'>${data.valueTo}
      </span>
    `

    if (data.interval && data.showValue) {
      this.other_html = this.handleInterval_html + this.lableInterval_html;
      this.barWidth = (data.valueTo - data.valueFrom) / (data.max - data.min) * 100;
      this.barLeft = (data.valueFrom - data.min) / (data.max - data.min) * 100;
    } else if (data.interval && !data.showValue) {
      this.other_html = this.handleInterval_html;
      this.barWidth = (data.valueTo - data.valueFrom) / (data.max - data.min) * 100;
      this.barLeft = (data.valueFrom - data.min) / (data.max - data.min) * 100;
    } else if (!data.interval && data.showValue) {
      this.other_html = this.handle_html + this.lable_html;
      this.barWidth = (data.value - data.min) / (data.max - data.min) * 100;
      this.barLeft = 0;
    } else {
      this.other_html = this.handle_html;
      this.barWidth = (data.value - data.min) / (data.max - data.min) * 100;
      this.barLeft = 0;
    }
    
    this.base_html = `
      <div class='mvps'>
        <span class='mvps-line'></span>
        <span class='mvps-min'>${data.min}</span>
        <span class='mvps-max'>${data.max}</span>
        <span class='mvps-bar' 
          style='left:${this.barLeft}%;width:${this.barWidth}%'>
        </span>
        ${this.other_html}
      </div>
    `
  }

  getHtml() {
    return this.base_html;
  }
}