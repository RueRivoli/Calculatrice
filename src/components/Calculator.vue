<template>
  <div class="calculator">
    <div class="display"> {{ current }}</div>
    <div @click="parenthesis('(')" class="btn">(</div>
    <div @click="parenthesis(')')" class="btn">)</div>
    <div class="btn"></div>
    <div class="btn"></div>
    <div @click="clear" class="btn">C</div>
    <div @click="sign" class="btn">+/-</div>
    <div @click="pourcent" class="btn">%</div>
    <div @click="operand('/')" class="operator">/</div>
    <div @click="append('7')" class="btn">7</div>
    <div @click="append('8')" class="btn">8</div>
    <div @click="append('9')" class="btn">9</div>
    <div @click="operand('x')" class="operator">x</div>
    <div @click="append('4')" class="btn">4</div>
    <div @click="append('5')" class="btn">5</div>
    <div @click="append('6')" class="btn">6</div>
    <div @click="operand('-')"  class="operator">-</div>
    <div @click="append('1')" class="btn">1</div>
    <div @click="append('2')" class="btn">2</div>
    <div @click="append('3')" class="btn">3</div>
    <div @click="operand('+')" class="operator">+</div>
    <div @click="append('0')" class="zero btn">0</div>
    <div @click="dot()" class="btn">.</div>
    <div @click="comput('=')" class="operator">=</div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      operator: '',
      current: '0',
      isLastCharNumber: true,
      isOperandAllowed: false,
      openParenthesis: 0,
      isDotAllowed: true
    }
  },
  methods: {
    dot: function () {
      console.log(this.isDotAllowed)
      console.log(this.isLastCharNumber)
      if (this.current === '0') this.current = '0.'
      else if (this.isLastCharNumber && this.isDotAllowed) this.current = `${this.current}.`
      this.isDotAllowed = false
    },
    clear: function () {
      this.current = '0'
      this.previous = '0'
      this.isDotAllowed = true
    },
    parenthesis: function (value) {
      if (this.current === '0' && value === '(') {
        this.current = `${value}`
        this.isDotAllowed = true
        this.isOperandAllowed = false
        this.isLastCharNumber = false
        this.openParenthesis++
      } else if (!this.isLastCharNumber && value === '(') {
        this.current = `${this.current}${value}`
        this.isOperandAllowed = false
        this.isLastCharNumber = false
        this.isDotAllowed = true
        this.openParenthesis++
      } else if (this.isLastCharNumber && value === ')' && this.openParenthesis > 0) {
        this.current = `${this.current}${value}`
        this.isOperandAllowed = true
        this.isLastCharNumber = false
        this.isDotAllowed = true
        this.openParenthesis--
      }
    },
    operand: function (value) {
      if (this.current === '0' && value === '-') {
        this.current = `${value}`
        this.isLastCharNumber = false
        this.isOperandAllowed = false
        this.isDotAllowed = true
      }
      if (this.isOperandAllowed) {
        this.current = `${this.current}${value}`
        this.isLastCharNumber = false
        this.isOperandAllowed = false
        this.isDotAllowed = true
      }
    },
    append: function (value) {
      this.isLastCharNumber = true
      this.isOperandAllowed = true
      if (this.current !== '0') this.current = `${this.current}${value}`
      else {
        this.current = `${value}`
      }
    },
    sign: function () {
      if (this.current !== '0') {
        this.current = this.current.charAt(0) === '-' ? this.current.slice(1) : `-${this.current}`
      }
    },
    pourcent: function (value) {
      this.current = `${parseFloat(this.current) / 100}`
    },
    comput: function (c) {
      if (c === '=') {
        let res = this.calculateResult(this.current)
        this.current = res
        console.log('---->' + res)
      }
    },
    calculateResult: function (word) {
      console.log(word)
      let operations = [')', '+', '-', '/', 'x']
      let i = 0
      if (!word) return 0
      while (operations[i]) {
        console.log('I - ' + i)
        // console.log(operations[i])
        let ind = word.indexOf(operations[i])
        console.log('OCCURENCE')
        console.log(operations[i])
        console.log(ind)
        if (ind !== -1) {
          if (i === 0) {
            let lastOpenParenthesis = word.lastIndexOf('(', word.substr(0, ind))
            if (lastOpenParenthesis !== -1) {
              return this.calculateResult(word.substr(0, lastOpenParenthesis) + toString(this.calculateResult(word.substr(lastOpenParenthesis + 1, ind - lastOpenParenthesis - 1))) + word.substr(ind + 1, word.length))
            } else return 0
          }
          if (i === 1) {
            return this.calculateResult(word.substr(0, ind)) + this.calculateResult(word.substr(ind + 1, word.length))
          }
          else if (i === 2) {
            return this.calculateResult(word.substr(0, ind)) - this.calculateResult(word.substr(ind + 1, word.length))
          }
          else if (i === 3) {
            return this.calculateResult(word.substr(0, ind)) / this.calculateResult(word.substr(ind + 1, word.length))
          }
          else if (i === 4) {
            return this.calculateResult(word.substr(0, ind)) * this.calculateResult(word.substr(ind + 1, word.length))
          }
        }
        i++
      }
      return parseFloat(word)
    }
  }
}
</script>

<style scoped>
.calculator{
  margin: 0 auto;
  width: 400px;
  font-size: 40px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(40px, auto);
}

.display{
  grid-column: 1/5;
  background-color: #333;
  color:white;
}

.zero{
  grid-column: 1/3;
}

.btn{
  background-color: #eee;
  border: 1px solid #999;
}

.operator{
  background-color: orange;
  color: white;
  border: 1px solid #999;
}
</style>
