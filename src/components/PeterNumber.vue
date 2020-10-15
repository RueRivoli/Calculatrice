<template>
  <el-row>
      <el-col :span="8" :offset="8">
         <el-form ref="number" name="number" :model="number" :rules="rulesNumber" label-width="120px">
            <el-form-item label="Number" prop="peterNumber">
                <el-input name="peterNumber" placeholder="Number" size="mini" v-model="number.peterNumber"></el-input>
            </el-form-item>
             <el-form-item label="Result">
                <el-input placeholder="Result" size="mini" v-model="number.highestNb"></el-input>
            </el-form-item>
            <el-row v-if="performance" style="height:20px;margin-bottom:20px;">{{ performance }} milliseconds.</el-row>
            <el-button type="primary" size="mini" @click="find">Find</el-button>
            <el-button type="danger" size="mini" @click="clear">Clean</el-button>
        </el-form>
  </el-col>
  </el-row>
</template>

<script>
export default {
  data: function () {
    return {
      number: {
        peterNumber: null,
        highestNb: null
      },
      rulesNumber: {
        peterNumber: [
          { required: true, message: 'Please input a number', trigger: 'blur' },
          { pattern: '^[0-9]+$', message: 'Please input a number', trigger: 'blur' },
          { min: 0, max: 18, message: 'The number has to be under 10^18', trigger: 'blur' }
        ]
      },
      performance: ''
    }
  },
  methods: {
    clear: function () {
      this.number.peterNumber = null
      this.number.highestNb = null
    },
    find: function () {
      this.$refs['number'].validate((valid) => {
        if (valid) {
          var t0 = performance.now()
          this.number.highestNb = this.comput(this.number.peterNumber, 0, 0, 0)
          var t1 = performance.now()
          this.performance = Math.round((t1 - t0) * 100000) / 100000
        }
      })
    },
    comput: function (number, indice, lastChiffre, nbTry) {
      let len = number.length
      if (indice === len) {
        if (nbTry <= number) return nbTry
        return 0
      } else {
        let chif = 9
        while (chif >= lastChiffre) {
          let newTry = nbTry * 10 + chif
          let res = this.comput(number, indice + 1, chif, newTry)
          if (res > 0) return res
          chif--
        }
      }
    }
  },
  computed: {

  }
}
</script>

<style scoped>
.calculator{
  margin: 0 auto;
  width: 400px;
  font-size: 40px;
}

.display{
  background-color: #333;
  color:grey;
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
