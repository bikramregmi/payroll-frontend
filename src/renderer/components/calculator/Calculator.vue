<template>
    <div id="calculator">
        <div id="result">
            <div class="row">
               <!-- <div class="col-md-2">
                    <span v-show="currentOp" style="color:black;">{{ currentOp }}</span>

                </div>-->
                <div class="col-md-10">
                    <span style="color:black;">{{valueDisplayed}}</span>
                </div>
            </div>
        </div>
        <div id="pad">
            <div class="btn" v-shortkey="['c']" @shortkey="clear"  id="clear" @click="clear">C</div>
            <div class="btn" v-shortkey="['/']" @shortkey="handleOp('/')" @click="handleOp('/')">/</div>
            <div class="btn" v-shortkey="['7']" @shortkey="handleDigit(7)" @click="handleDigit(7)">7</div>
            <div class="btn" v-shortkey="['8']" @shortkey="handleDigit(8)" @click="handleDigit(8)">8</div>
            <div class="btn" v-shortkey="['9']" @shortkey="handleDigit(9)" @click="handleDigit(9)">9</div>
            <div class="btn" v-shortkey="['*']" @shortkey="handleOp('x')" @click="handleOp('x')">x</div>
            <div class="btn" v-shortkey="['4']" @shortkey="handleDigit(4)" @click="handleDigit(4)">4</div>
            <div class="btn" v-shortkey="['5']" @shortkey="handleDigit(5)" @click="handleDigit(5)">5</div>
            <div class="btn" v-shortkey="['6']" @shortkey="handleDigit(6)" @click="handleDigit(6)">6</div>
            <div class="btn" v-shortkey="['-']" @shortkey="handleOp('-')" @click="handleOp('-')">-</div>
            <div class="btn" v-shortkey="['1']" @shortkey="handleDigit(1)" @click="handleDigit(1)">1</div>
            <div class="btn" v-shortkey="['2']" @shortkey="handleDigit(2)" @click="handleDigit(2)">2</div>
            <div class="btn" v-shortkey="['3']" @shortkey="handleDigit(3)" @click="handleDigit(3)">3</div>
            <div class="btn" v-shortkey="['+']" @shortkey="handleOp('+')" @click="handleOp('+')">+</div>
            <div class="btn" v-shortkey="['.']" @shortkey="handleAppendValue('.')" @click="handleAppendValue('.')">.</div>
            <div id="zero" v-shortkey="['0']" @shortkey="handleDigit(0)" class="btn" @click="handleDigit(0)">0</div>
            <div id="equal" v-shortkey="['=']" @shortkey="handleOp('=')" class="btn" @click="handleOp('=')">=</div>
        </div>
    </div>
</template>

<script>
    export default {
      name: 'Calculator',
      data () {
        return {
          currentValue: 0,
          appendValue: 1,
          savedValue: false,
          currentOp: false
        }
      },
      methods: {
        clear () {
          this.currentValue = 0
          this.savedValue = false
          this.currentOp = false
        },
        handleAppendValue (data) {
          if (data === '.') {
            this.currentValue = this.currentValue + data
            this.appendValue = this.currentValue
          }
        },
        handleDigit (digit) {
          if (this.currentOp === '=') {
            this.savedValue = false
          }
          if (this.currentValue === this.appendValue) {
            this.currentValue = parseFloat(this.currentValue + (digit))
          } else {
            this.currentValue = this.currentValue * 10 + digit
          }
        },
        handleOp (op) {
          if (this.currentOp) {
            this.process()
          } else {
            this.savedValue = this.currentValue
          }
          this.currentValue = 0
          this.currentOp = op
        },
        process () {
          if (this.currentOp === '+') {
            this.savedValue += this.currentValue
          } else if (this.currentOp === '-') {
            this.savedValue -= this.currentValue
          } else if (this.currentOp === 'x') {
            this.savedValue *= this.currentValue
          } else if (this.currentOp === '/') {
            this.savedValue /= this.currentValue
          } else if (this.currentOp === '=' && this.currentValue) {
            this.savedValue = this.currentValue
          }
          this.currentValue = 0
          this.currentOp = false
        }
      },
      computed: {
        valueDisplayed () {
          return this.savedValue
            ? this.currentValue
              ? this.currentValue : this.savedValue
            : this.currentValue
        }
      }
    }
</script>

<style scoped>
    #calculator {
        border: 2px solid #222;
        border-radius: 4px;
        max-width: 350px;
    }

    #result {
        font-size: 42px;
        width: 100%;
        height: 70px;
        box-sizing: border-box;
        display: grid;
        padding: 10px;
        justify-items: end;
        border-bottom: 2px solid #222;
    }

    #pad {
        display: grid;
        grid-template-columns: repeat(4, minmax(60px, 1fr));
        grid-gap: 10px;
        padding: 15px;
    }

    .btn {
        cursor: pointer;
        font-size: 20px;
        display: grid;
        padding: 15px 10px;
        justify-items: center;
        align-items: center;
        color: #FAFAFA;
        border: 1px solid #222;
        border-radius: 4px;
        background: #777;
    }

    #clear {
        background: #4fc08d;
        grid-column: 1/4;
    }

    #zero {
        grid-column: 2/4;
    }

    #equal {
        background: seagreen;
    }
</style>
