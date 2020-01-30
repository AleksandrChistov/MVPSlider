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
  height?: number
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
    vertical = false,
    height = 500
  }: Idata) {
    this.data = {
      min, 
      max, 
      value, 
      valueFrom, 
      valueTo, 
      step, 
      showValue, 
      interval, 
      vertical, 
      height
    }
  }

  get(): Idata {
    console.log(this.data);
    
    return this.data;
  }
}