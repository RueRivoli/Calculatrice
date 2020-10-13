<template>
  <div class="calculator">
    <div class="display"> {{ current }}</div>
    <div @click="clear" class="btn">C</div>
    <div @click="openParenth('(')" class="btn">(</div>
    <div @click="closeParenth(')')" class="btn">)</div>
    <div @click="operand('/')" class="operator">/</div>
    <div @click="appendNumber('7')" class="btn">7</div>
    <div @click="appendNumber('8')" class="btn">8</div>
    <div @click="appendNumber('9')" class="btn">9</div>
    <div @click="operand('*')" class="operator">x</div>
    <div @click="appendNumber('4')" class="btn">4</div>
    <div @click="appendNumber('5')" class="btn">5</div>
    <div @click="appendNumber('6')" class="btn">6</div>
    <div @click="operand('-')"  class="operator">-</div>
    <div @click="appendNumber('1')" class="btn">1</div>
    <div @click="appendNumber('2')" class="btn">2</div>
    <div @click="appendNumber('3')" class="btn">3</div>
    <div @click="operand('+')" class="operator">+</div>
    <div @click="appendNumber('0')" class="zero btn">0</div>
    <div @click="dot()" class="btn">.</div>
    <div @click="displayResult()" class="operator">=</div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      lastchar: '0',
      operations: ['+', '-', '*', '/'],
      parenthesis: ['(', ')'],
      openParenthesis: 0,
      countDotinCurrentNb: 0,
      current: '0'
    }
  },
  methods: {
    dot: function () {
      if (this.dotAllowed) {
        this.lastchar = '.'
        this.current = `${this.current}.`
        this.countDotinCurrentNb++
      }
    },
    clear: function () {
      this.current = '0'
      this.lastchar = '0'
      this.openParenthesis = 0
      this.countDotinCurrentNb = 0
    },
    openParenth: function () {
      if (this.openParenthesisAllowed) {
         this.lastchar = '('
         this.countDotinCurrentNb = 0
         this.openParenthesis++
        if (this.current === '0') this.current = '('
        else this.current = this.current + '('
      }
    },
    closeParenth: function () {
      if (this.closeParenthesisAllowed) {
        this.openParenthesis--
        this.lastchar = ')'
        this.current = this.current + ')'
        this.countDotinCurrentNb = 0
      }
    },
    operand: function (value) {
      if (this.operandAllowed || (this.current === '0' && value === '-')) {
        if (this.current === '0') this.current = '-'
        else {
          this.current = this.current + value
        }
         this.countDotinCurrentNb = 0
         this.lastchar = value
      }
    },
    appendNumber: function (value) {
      if (this.numberAllowed) {
        this.lastchar = value
        if (this.current !== '0') this.current = `${this.current}${value}`
        else {
          this.current = `${value}`
        }
      }
    },
    displayResult: function () {
        this.current = this.comput(this.current)
      },
    comput: function (word) {
      let characters = [')', '+', '-', '/', '*']
      let i = 0
      if (!word || word === '') return 0
      while (characters[i]) {
        let ind = word.indexOf(characters[i])
        if (ind !== -1) {
          if (i === 0) {
            let lastOpenParenthesis = word.substr(0, ind).lastIndexOf('(')
            if (lastOpenParenthesis !== -1) {
              console.log('(')
              console.log('index : ' + ind)
              console.log('last Open Parenthesis : ' + lastOpenParenthesis)
              console.log('LES 3 EXPRESSIONS ==>')
              console.log('partie 1 --- ' + word.substr(0, lastOpenParenthesis))
              console.log('partie 2 --- ' + word.substr(lastOpenParenthesis + 1, ind - lastOpenParenthesis - 1))
              console.log('partie 3 --- ' + word.substr(ind + 1, word.length - ind))
              return this.comput(word.substr(0,lastOpenParenthesis) + this.comput(word.substr(lastOpenParenthesis + 1, ind - lastOpenParenthesis - 1)) + word.substr(ind + 1, word.length - ind))
            } else return 0
          }
          if (i === 1) {
            return this.comput(word.substr(0, ind)) + this.comput(word.substr(ind + 1, word.length))
          }
          else if (i === 2) {
            return this.comput(word.substr(0, ind)) - this.comput(word.substr(ind + 1, word.length))
          }
          else if (i === 3) {
            return this.comput(word.substr(0, ind)) / this.comput(word.substr(ind + 1, word.length))
          }
          else if (i === 4) {
            return this.comput(word.substr(0, ind)) * this.comput(word.substr(ind + 1, word.length))
          }
        }
        i++
      }
      return parseFloat(word)
    }
  },
  computed: {
    operandAllowed: function () {
      if ( this.current !== '0' && !this.operations.includes(this.lastchar) && this.lastchar !== '(') return true
      return false

    },
    numberAllowed: function () {
      return this.lastchar !== ')'
    },
    openParenthesisAllowed: function () {
      if (this.operations.includes(this.lastchar) || this.current === '0' || this.lastchar === '(') return true
      return false
    },
    closeParenthesisAllowed: function () {
      if (this.openParenthesis > 0 && !this.operations.includes(this.lastchar)) return true
      return false
    },
    dotAllowed: function () {
      if (!this.operations.includes(this.lastchar) && !this.parenthesis.includes(this.lastchar) && this.countDotinCurrentNb === 0) return true
      return false
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
