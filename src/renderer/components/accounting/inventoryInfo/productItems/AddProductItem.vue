<template>
    <div class="popup-class">
        <h5 class="card-title">Create Product Item</h5><hr>
        <div  class="row">
            <div class="col-md-6">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroupPrepend">Name</span>
                        <span v-show="errorMessage==true && !name" class="input-group-text" id="inputGroupPrependSpan">{{$vd.name.$errors[0]}}</span>
                    </div>
                    <input type="text" class="form-control" id="name" v-model="name" aria-describedby="name">
                </div>
            </div>
            <div class="col-md-6">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroupPrepend1">Product Group</span>
                        <span v-show="errorMessage==true && !group " class="input-group-text" id="inputGroupPrependSpan">{{$vd.group.$errors[0]}}</span>
                    </div>
                    <select class="form-control" :required="true" v-model="group">
                        <option :selected="true">Choose Group</option>
                        <option v-for="option in groupsList" v-bind:value="option.id" >{{ option.name }}</option>
                    </select>
                    <hr>
                    <button hidden v-shortkey="['ctrl','k']" @shortkey="show()" class="btn btn-primary"></button>
                </div>
            </div>
        </div>
        <br>
        <div  class="row">
            <div class="col-md-6">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroupPrepend1">Quantity Per Rate</span>
                        <span v-show="errorMessage==true && !quantityPerRate " class="input-group-text" id="inputGroupPrependSpan">{{$vd.quantityPerRate.$errors[0]}}</span>
                    </div>
                    <input type="text" class="form-control" id="quantityPerRate" v-model="quantityPerRate" ><hr>
                </div>
            </div>
            <div class="col-md-6">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroupPrepend1">Unit</span>
                        <span v-show="errorMessage==true && !units " class="input-group-text" id="inputGroupPrependSpan">{{$vd.units.$errors[0]}}</span>
                    </div>
                    <input type="text" class="form-control" id="units" v-model="units" ><hr>
                </div>
            </div>
        </div>
        <br>
        <div  class="row">
            <div class="col-md-6">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroupPrepend1">Rate</span>
                        <span v-show="errorMessage==true && !rate " class="input-group-text" id="inputGroupPrependSpan">{{$vd.rate.$errors[0]}}</span>
                    </div>
                    <input type="text" class="form-control" id="rate" v-model="rate" ><hr>
                </div>
            </div>
            <div class="col-md-6">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroupPrepend1">Value</span>
                        <span v-show="errorMessage==true && !value " class="input-group-text" id="inputGroupPrependSpan">{{$vd.value.$errors[0]}}</span>
                    </div>
                    <input type="text" class="form-control" id="value" v-model="value" ><hr>
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
      name: 'AddProductItem',
      mixins: [VueDaval],
      data () {
        return {
          name: '',
          group: 'Choose Group',
          quantityPerRate: '',
          units: '',
          rate: '',
          value: '',
          errorMessage: false,
          groupsList: ''
        }
      },
      vdRules: {
        name: {required: true},
        group: {required: true},
        quantityPerRate: {required: true},
        units: {required: true},
        rate: {required: true},
        value: {required: true}
      },
      created () {
        this.retriveProductGroup()
      },
      methods: {
        cancel: function () {
          this.$emit('close')
        },
        retriveProductGroup: function () {
          SH.ajax.callRemote(`http://127.0.0.1:8080/api/product-groups`, '', 'GET', function (data) {
            if (data) {
              this.groupsList = data
            } else {
              this.groupsList = 'Error Fetching Data'
            }
          }.bind(this))
        },
        save: function () {
          const data = {
            name: this.name,
            groupId: this.group,
            quantityPerRate: this.quantityPerRate,
            units: this.units,
            rate: this.rate,
            value: this.value
          }
          this.$vd.$validate().then(() => {
            SH.ajax.callRemote(`http://127.0.0.1:8080/api/product-items`, data, 'POST', function (data) {
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
