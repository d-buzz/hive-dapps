import { isValidEmail } from '~/helpers/validators'

export const getValuePosNegClass = {
  methods: {
    getValuePosNegClass(value) {
      let result = ''
      if (value && value >= 1) {
        result = 'is-positive'
      } else if (value && value < 1) {
        result = 'is-negative'
      }
      return result
    }
  }
}

export const formatToUnits = {
  methods: {
    formatToUnits(number, precision = 2) {
      const abbrev = ['', 'k', 'm', 'b', 't'];
      const unrangifiedOrder = Math.floor(Math.log10(Math.abs(number)) / 3)
      const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ))
      const suffix = abbrev[order];
    
      return (number / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }
  }
}

export const validateEmail = {
  methods: {
    validateEmail() {
      let isValid = false
      if (this.email.length > 0) {
        isValid = isValidEmail(this.email)
      } else {
        isValid = false
      }
      this.emailIsValid = isValid
    }
  }
}