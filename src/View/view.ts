import { Idata } from '../Model/model'

export class View {
  base_html: string
  other_html: string

  constructor(data: Idata) {
    if (data.interval) {
      this.other_html = `
        <span class='mvps-handle-from'></span>
        <span class='mvps-handle-to'></span>
        <span class='mvps-label-from'>${data.valueFrom}</span>
        <span class='mvps-label-to'>${data.valueTo}</span>
      `
    } else {
      this.other_html = `
        <span class='mvps-handle'></span>
        <span class='mvps-label'>${data.value}</span>
      `
    }
    
    this.base_html = `
      <div class='mvps'>
        <span class='mvps-line'></span>
        <span class='mvps-min'>${data.min}</span>
        <span class='mvps-max'>${data.max}</span>
        <span class='mvps-bar'></span>
        ${this.other_html}
      </div>
    `

  }

  getHtml() {
    return this.base_html;
  }
}