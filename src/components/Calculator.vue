<template>
  <div style="display:flex;">
    <div class="calculator">
      <div class="display"> {{ current }}</div>
      <div @click="displayGraph()" class=" zero btn">GRAPH</div>
      <div @click="appendNumber('x')" class="one btn">x</div>
      <div @click="clear" class="btn">C</div>
      <div @click="openParenth('(')" class="btn">(</div>
      <div @click="closeParenth(')')" class="btn">)</div>
      <div @click="operand('/')" class="operator">/</div>
      <div @click="appendNumber('7')" class="btn">7</div>
      <div @click="appendNumber('8')" class="btn">8</div>
      <div @click="appendNumber('9')" class="btn">9</div>
      <div @click="operand('*')" class="operator">*</div>
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
    <div class="chart-container" style="position: relative; height:40vh; width:50vw;margin:auto;">
      <canvas id="myChart"></canvas>
    </div>
  </div>
</template>

<script>
var Chart = require('chart.js')

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
      if (this.operandAllowed || ((this.current === '0' || this.lastchar === '(') && value === '-')) {
        if (this.current === '0') this.current = '-'
        else {
          this.current = this.current + value
        }
        this.countDotinCurrentNb = 0
        this.lastchar = value
      }
    },
    appendNumber: function (value) {
      if (value === 'x' && this.xAllowed) {
        this.lastchar = value
        if (this.current !== '0') {
          if (!this.current.includes('Y = ')) {
            this.current = `Y = ${this.current}${value}`
          } else this.current = `${this.current}${value}`
        } else {
          this.current = `Y = ${value}`
        }
      } else if (this.numberAllowed && value !== 'x') {
        this.lastchar = value
        if (this.current !== '0') {
          if (value === 'x' && !this.current.includes('Y = ')) {
            this.current = `Y = ${this.current}${value}`
          } else this.current = `${this.current}${value}`
        } else {
          this.current = `${value}`
        }
      }
    },
    displayResult: function () {
      if (!this.current.includes('Y')) this.current = this.comput(this.current, 0)
    },
    displayGraph: function () {
      if (!this.current.includes('Y = ')) {
        this.current = `Y = ${this.current}`
      }
      this.createGraph()
    },
    opposite: function (str) {
      let newWord = ''
      let i = 0
      while (str[i]) {
        if (str[i] === '-' && str[i + 1] && str[i + 1] === '-') {
          newWord = newWord + '-'
          i++
        } else if (str[i] === '-') {
          newWord = newWord + '+'
        } else if (str[i] === '+') {
          newWord = newWord + '-'
        } else {
          newWord = newWord + str[i]
        }
        i++
      }
      return newWord
    },
    comput: function (word, neutralElement) {
      let characters = [')', '+', '-', '/', '*']
      let i = 0
      if (!word || word === '') return neutralElement
      while (characters[i]) {
        let ind = word.indexOf(characters[i])
        if (ind !== -1) {
          if (i === 0) {
            let lastOpenParenthesis = word.substr(0, ind).lastIndexOf('(')
            if (lastOpenParenthesis !== -1) {
              return this.comput(word.substr(0, lastOpenParenthesis) + this.comput(word.substr(lastOpenParenthesis + 1, ind - lastOpenParenthesis - 1)) + word.substr(ind + 1, word.length - ind), 0)
            } else return 0
          }
          if (i === 1) {
            return this.comput(word.substr(0, ind), 0) + this.comput(word.substr(ind + 1, word.length), 0)
          } else if (i === 2 && word[ind - 1] !== '*') {
            // break
            return this.comput(word.substr(0, ind), 0) - this.comput(this.opposite(word.substr(ind, word.length)), 0)
          } else if (i === 3) {
            return this.comput(word.substr(0, ind), 1) / this.comput(word.substr(ind + 1, word.length), 1)
          } else if (i === 4) {
            return this.comput(word.substr(0, ind), 1) * this.comput(word.substr(ind + 1, word.length), 1)
          }
        }
        i++
      }
      return parseFloat(word)
    },
    createGraph () {
      let abscisses = ['(-100)', '(-90)', '(-80)', '(-70)', '(-60)', '(-50)', '(-40)', '(-30)', '(-20)', '(-10)', '0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100']
      let dataLine = []
      let expr
      let i = 0
      while (i < abscisses.length) {
        expr = (this.current.replace('Y = ', '')).replace('x', abscisses[i])
        dataLine[i] = this.comput(expr)
        i++
      }
      var ctx = document.getElementById('myChart').getContext('2d')
      let myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['-100', '-90', '-80', '-70', '-60', '-50', '-40', '-30', '-20', '-10', '0', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100'],
          datasets: [{
            label: 'Graph y = f(x)',
            data: dataLine,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      })
      console.log(myChart)
    }
  },
  computed: {
    operandAllowed: function () {
      if (this.current !== '0' && !this.operations.includes(this.lastchar) && this.lastchar !== '(') return true
      return false
    },
    numberAllowed: function () {
      return this.lastchar !== ')' && this.lastchar !== 'x'
    },
    xAllowed: function () {
      return (this.lastchar === '(' || this.operations.includes(this.lastchar)) || this.current === '0'
    },
    openParenthesisAllowed: function () {
      if (this.operations.includes(this.lastchar) || this.current === '0' || this.lastchar === '(') {
        if (this.lastchar !== 'x') return true
      }
      return false
    },
    closeParenthesisAllowed: function () {
      if (this.openParenthesis > 0 && !this.operations.includes(this.lastchar)) return true
      return false
    },
    dotAllowed: function () {
      if (!this.operations.includes(this.lastchar) && !this.parenthesis.includes(this.lastchar) && this.countDotinCurrentNb === 0 && this.lastchar !== 'x') return true
      return false
    }
  }
}
</script>

<style scoped>
.calculator{
  /* margin: 0 auto; */
  margin-left:10%;
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

.one{
  grid-column: 3/5;
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
