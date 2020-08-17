<template>
    <div class="popup-class">
        <h5 class="card-title">Create Unit of Measure</h5><hr>
        <div  class="row">
            <div class="col-md-6">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroupPrepend">Formal Name</span>
                        <span v-show="errorMessage==true && !unitMeasureDetail.formalName" class="input-group-text" id="inputGroupPrependSpan">{{$vd.unitMeasureDetail.formalName.$errors[0]}}</span>
                    </div>
                    <input type="text" class="form-control" id="name" v-model="unitMeasureDetail.formalName" aria-describedby="formalName">
                </div>
            </div>
            <div class="col-md-6">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroupPrepend1">Type</span>
                        <span v-show="errorMessage==true && !unitMeasureDetail.type " class="input-group-text" id="inputGroupPrependSpan">{{$vd.unitMeasureDetail.type.$errors[0]}}</span>
                    </div>
                    <input type="text" class="form-control" id="type" v-model="unitMeasureDetail.type" ><hr>
                </div>
            </div>
        </div>
        <br>
        <div  class="row">
            <div class="col-md-6">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroupPrepend">Symbol</span>
                        <span v-show="errorMessage==true && !unitMeasureDetail.symbol" class="input-group-text" id="inputGroupPrependSpan">{{$vd.unitMeasureDetail.symbol.$errors[0]}}</span>
                    </div>
                    <input type="text" class="form-control" id="symbol" v-model="unitMeasureDetail.symbol" aria-describedby="symbol">
                </div>
            </div>
            <div class="col-md-6">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroupPrepend1">Decimal Place</span>
                        <span v-show="errorMessage==true && !unitMeasureDetail.decimalPlaces " class="input-group-text" id="inputGroupPrependSpan">{{$vd.unitMeasureDetail.decimalPlaces.$errors[0]}}</span>
                    </div>
                    <input type="text" class="form-control" id="decimalPlaces" v-model="unitMeasureDetail.decimalPlaces" ><hr>
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
      name: 'EditUnitMeasure',
      mixins: [VueDaval],
      props: ['id'],
      data () {
        return {
          errorMessage: false,
          unitMeasureDetail: {
            formalName: '',
            type: '',
            symbol: '',
            decimalPlaces: '',
            errorMessage: false
          }
        }
      },
      vdRules: {
        unitMeasureDetail: {
          formalName: {required: true},
          type: {required: true},
          symbol: {required: true},
          decimalPlaces: {required: false}
        }
      },
      created () {
        this.retriveUnitOfMeasure(this.id)
      },
      methods: {
        cancel: function () {
          this.$emit('close')
        },
        retriveUnitOfMeasure: function (id) {
          SH.ajax.callRemote(`http://127.0.0.1:8080/api/unit-of-measures/${id}`, '', 'GET', function (data) {
            if (data) {
              this.unitMeasureDetail = data
            } else {
              this.unitMeasureDetail = 'Error Fetching Data'
            }
          }.bind(this))
        },
        save: function () {
          const data = {
            id: this.id,
            formalName: this.unitMeasureDetail.formalName,
            type: this.unitMeasureDetail.type,
            symbol: this.unitMeasureDetail.symbol,
            decimalPlaces: this.unitMeasureDetail.decimalPlaces
          }
          this.$vd.unitMeasureDetail.$validate().then(() => {
            SH.ajax.callRemote(`http://127.0.0.1:8080/api/unit-of-measures`, data, 'PUT', function (data) {
              if (data) {
                alert('Edited Successfully')
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
