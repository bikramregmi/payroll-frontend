<template>
    <div class="popup-class">
        <h5 class="card-title">Edit Product Item</h5><hr>
        <div  class="row">
            <div class="col-md-6">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroupPrepend">Name</span>
                        <span v-show="errorMessage==true && !productItemDetail.name" class="input-group-text" id="inputGroupPrependSpan">{{$vd.productItemDetail.name.$errors[0]}}</span>
                    </div>
                    <input type="text" class="form-control" id="name" v-model="productItemDetail.name" aria-describedby="name">
                </div>
            </div>
            <div class="col-md-6">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroupPrepend1">Group</span>
                        <span v-show="errorMessage==true && !productItemDetail.group " class="input-group-text" id="inputGroupPrependSpan">{{$vd.productItemDetail.group.$errors[0]}}</span>
                    </div>
                    <select class="form-control" :required="true" v-model="productItemDetail.group">
                        <option :selected="true">Choose Groups</option>
                        <option v-for="option in productItemList" v-bind:value="option.group" >{{ option.group }}</option>
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
                        <span v-show="errorMessage==true && !productItemDetail.quantityPerRate " class="input-group-text" id="inputGroupPrependSpan">{{$vd.productItemDetail.quantityPerRate.$errors[0]}}</span>
                    </div>
                    <input type="text" class="form-control" id="quantityPerRate" v-model="productItemDetail.quantityPerRate" ><hr>
                </div>
            </div>
            <div class="col-md-6">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroupPrepend1">Unit</span>
                        <span v-show="errorMessage==true && !productItemDetail.units " class="input-group-text" id="inputGroupPrependSpan">{{$vd.productItemDetail.units.$errors[0]}}</span>
                    </div>
                    <input type="text" class="form-control" id="units" v-model="productItemDetail.units" ><hr>
                </div>
            </div>
        </div>
        <br>
        <div  class="row">
            <div class="col-md-6">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroupPrepend1">Rate</span>
                        <span v-show="errorMessage==true && !productItemDetail.rate " class="input-group-text" id="inputGroupPrependSpan">{{$vd.productItemDetail.rate.$errors[0]}}</span>
                    </div>
                    <input type="text" class="form-control" id="rate" v-model="productItemDetail.rate" ><hr>
                </div>
            </div>
            <div class="col-md-6">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroupPrepend1">Value</span>
                        <span v-show="errorMessage==true && !productItemDetail.value " class="input-group-text" id="inputGroupPrependSpan">{{$vd.productItemDetail.value.$errors[0]}}</span>
                    </div>
                    <input type="text" class="form-control" id="value" v-model="productItemDetail.value" ><hr>
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
      name: 'EditProductItem',
      mixins: [VueDaval],
      props: ['id'],
      data () {
        return {
          errorMessage: false,
          productItemDetail: { name: '',
            group: '',
            quantityPerRate: '',
            units: '',
            rate: '',
            value: ''},
          productItemList: ''
        }
      },
      vdRules: {
        productItemDetail: {
          name: {required: true},
          group: {required: true},
          quantityPerRate: {required: true},
          units: {required: true},
          rate: {required: true},
          value: {required: true}

        }
      },
      created () {
        this.retriveProductGroup()
        this.retriveProductGroups(this.id)
      },
      methods: {
        cancel: function () {
          this.$modal.hideAll()
        },
        retriveProductGroups: function (id) {
          SH.ajax.callRemote(`http://127.0.0.1:8080/api/product-items/${id}`, '', 'GET', function (data) {
            if (data) {
              this.productItemDetail = data
            } else {
              this.productItemDetail = 'Error Fetching Data'
            }
          }.bind(this))
        },
        retriveProductGroup: function () {
          SH.ajax.callRemote(`http://127.0.0.1:8080/api/product-items`, '', 'GET', function (data) {
            if (data) {
              this.productItemList = data
            } else {
              this.productItemList = 'Error Fetching Data'
            }
          }.bind(this))
        },
        save: function (id) {
          const data = {
            id: id,
            name: this.productItemDetail.name,
            group: this.productItemDetail.description,
            quantityPerRate: this.productItemDetail.quantityPerRate,
            units: this.productItemDetail.units,
            rate: this.productItemDetail.rate,
            value: this.productItemDetail.value
          }
          this.$vd.productItemDetail.$validate().then(() => {
            SH.ajax.callRemote(`http://127.0.0.1:8080/api/product-items`, data, 'PUT', function (data) {
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
