export interface Idata {
  value?: number
  valueFrom?: number
  valueTo?: number
  showValue?: boolean
  min?: number
  max?: number
  step?: number
  vertical?: boolean
  interval?: boolean
}

export class Model {
  data: Idata

  constructor(data: Idata) {
    this.data = {
      value: data.value || 0,
      valueFrom: data.value || 0,
      valueTo: data.value || 0,
      showValue: data.showValue || false,
      min: data.min || 0,
      max: data.max || 1000,
      step: data.step || 50,
      vertical: data.vertical || false,
      interval: data.interval || false
    }
  }

  get(): Idata {
    return this.data;
  }
}