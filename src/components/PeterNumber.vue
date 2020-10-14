<template>
  <el-row>
      <el-col :span="8" :offset="8">
         <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="Number">
                <el-input placeholder="Number" size="mini" v-model="number"></el-input>
            </el-form-item>
             <el-form-item label="Result">
                <el-input placeholder="Result" size="mini" v-model="highestNb"></el-input>
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
      number: '0',
      highestNb: '0',
      performance: ''
    }
  },
  methods: {
    clear: function () {
      this.number = '0'
      this.highestNb = '0'
    },
    find: function () {
      var t0 = performance.now();
      this.highestNb = this.comput(this.number, 0, 0, 0)
      var t1 = performance.now()
      this.performance = (t1 - t0)
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
