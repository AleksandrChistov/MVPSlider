export interface Idata {
  min?: number
  max?: number
  value?: number
  valueFrom?: number
  valueTo?: number
  step?: number
  showValue?: boolean
  interval?: boolean
  vertical?: boolean
}

export class Model {
  data: Idata

  constructor({
    min = 0, 
    max = 1000,
    value = max / 2,
    valueFrom = min,
    valueTo = (max - min) / 2 + min,
    step = (max - min) / 20,
    showValue = false,
    interval = false,
    vertical = false
  }: Idata) {
    this.data = {min, max, value, valueFrom, valueTo, step, showValue, interval, vertical}
  }

  get(): Idata {
    console.log(this.data);
    
    return this.data;
  }
}