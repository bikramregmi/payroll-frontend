<template>
    <div class="popup-class">
        <h5 class="card-title">Create Unit of Measure</h5><hr>
        <div  class="row">
            <div class="col-md-6">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroupPrepend">Formal Name</span>
                        <span v-show="errorMessage==true && !formalName" class="input-group-text" id="inputGroupPrependSpan">{{$vd.formalName.$errors[0]}}</span>
                    </div>
                    <input type="text" class="form-control" id="name" v-model="formalName" aria-describedby="formalName">
                </div>
            </div>
            <div class="col-md-6">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroupPrepend1">Type</span>
                        <span v-show="errorMessage==true && !type " class="input-group-text" id="inputGroupPrependSpan">{{$vd.type.$errors[0]}}</span>
                    </div>
                    <input type="text" class="form-control" id="type" v-model="type" ><hr>
                </div>
            </div>
        </div>
        <br>
        <div  class="row">
            <div class="col-md-6">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroupPrepend">Symbol</span>
                        <span v-show="errorMessage==true && !symbol" class="input-group-text" id="inputGroupPrependSpan">{{$vd.symbol.$errors[0]}}</span>
                    </div>
                    <input type="text" class="form-control" id="symbol" v-model="symbol" aria-describedby="symbol">
                </div>
            </div>
            <div class="col-md-6">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroupPrepend1">Decimal Place</span>
                        <span v-show="errorMessage==true && !decimalPlaces " class="input-group-text" id="inputGroupPrependSpan">{{$vd.decimalPlaces.$errors[0]}}</span>
                    </div>
                    <input type="text" class="form-control" id="decimalPlaces" v-model="decimalPlaces" ><hr>
                </div>
            </div>
        </div>
        <hr>
        <br>
        <button @click="save()" type="submit" class="btn btn-primary">Submit</button>
        <button v-shortkey="['esc']" @shortkey="cancel()" @click="cancel()" class="btn btn-primary">Cancel</button>
    </div>
</template>

<script>
    import VueDaval from 'vue-daval'
    import SH from '../../../../backend/backend'
    export default {
      name: 'AddUnitMeasure',
      mixins: [VueDaval],
      data () {
        return {
          formalName: '',
          type: '',
          symbol: '',
          decimalPlaces: '',
          errorMessage: false
        }
      },
      vdRules: {
        formalName: {required: true},
        type: {required: true},
        symbol: {required: true},
        decimalPlaces: {required: false}
      },
      methods: {
        cancel: function () {
          this.$emit('close')
        },
        save: function () {
          const data = {
            formalName: this.formalName,
            type: this.type,
            symbol: this.symbol,
            decimalPlaces: this.decimalPlaces
          }
          this.$vd.$validate().then(() => {
            SH.ajax.callRemote(`http://127.0.0.1:8080/api/unit-of-measures`, data, 'POST', function (data) {
              if (data) {
                alert('Added Successfully')
                this.cancel()
              } else {
                alert('error')
              }
            }.bind(this))
          }).catch(() => {
            this.errorMessage = true
          })
        }
      }
    }
</script>

<style scoped>

</style>
