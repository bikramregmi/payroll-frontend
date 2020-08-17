<template>
<!--    <modal name="my-modal">-->
        <div class="popup-class">
            <h5 class="card-title">Create VoucherType</h5>
            <hr>
            <div class="row">
                <div class="col-md-6">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend">Name</span>
                            <span v-show="errorMessage==true && !voucherTypeDetail.name" class="input-group-text"
                                  id="inputGroupPrependSpan">{{$vd.voucherTypeDetail.name.$errors[0]}}</span>
                        </div>
                        <input type="text" class="form-control" id="fullName" v-model="voucherTypeDetail.name"
                               aria-describedby="fullName">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend1">Voucher Type</span>
                            <span v-show="errorMessage==true && !voucherTypeDetail.type " class="input-group-text"
                                  id="inputGroupPrependSpan">{{$vd.voucherTypeDetail.type.$errors[0]}}</span>
                        </div>
                        <input type="text" class="form-control" id="eCode" v-model="voucherTypeDetail.type">
                        <hr>
                    </div>
                </div>
            </div>
            <hr>
            <h6 class="card-title">Voucher Details</h6>
            <div class="row">
                <div class="col-md-6">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend2">Dates</span>
                            <span v-show="errorMessage==true && !voucherTypeDetail.method" class="input-group-text"
                                  id="inputGroupPrependSpan">{{$vd.voucherTypeDetail.method.$errors[0]}}</span>
                        </div>
                        <input type="text" class="form-control" id="email" v-model="voucherTypeDetail.method">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend3">Narration</span>
                        </div>
                        <input type="text" class="form-control" id="description"
                               v-model="voucherTypeDetail.description">
                    </div>
                </div>
            </div>
            <hr>
            <br>
            <button @click="save()" type="submit" class="btn btn-primary">Submit</button>
            <button v-shortkey="['esc']" @shortkey="cancel()" @click="cancel()" class="btn btn-primary">Cancel</button>
        </div>
<!--    </modal>-->
</template>

<script>
    import VueDaval from 'vue-daval'
    import SH from '../../../../backend/backend'

    export default {
      name: 'EditVoucherType',
      mixins: [VueDaval],
      props: ['id', 'my-modal'],
      data () {
        return {
          voucherTypeDetail: {
            name: '',
            type: '',
            method: '',
            description: ''
          },
          errorMessage: false
        }
      },
      vdRules: {
        voucherTypeDetail: {
          name: {required: true},
          type: {required: true},
          method: {required: true},
          description: {required: false}
        }
      },
      methods: {
        cancel: function () {
          this.$emit('close')
        },
        retriveVoucherType: function (id) {
          SH.ajax.callRemote(`http://127.0.0.1:8080/api/voucher-types/${id}`, '', 'GET', function (data) {
            if (data) {
              this.voucherTypeDetail = data
            } else {
              this.voucherTypeDetail = 'Error Fetching Data'
            }
          }.bind(this))
        },
        save: function () {
          const data = {
            id: this.id,
            name: this.voucherTypeDetail.name,
            type: this.voucherTypeDetail.type,
            method: this.voucherTypeDetail.method,
            description: this.voucherTypeDetail.description
          }
          this.$vd.$validate().then(() => {
            SH.ajax.callRemote(`http://127.0.0.1:8080/api/voucher-types`, data, 'PUT', function (data) {
              if (data) {
                alert(`Edit Successfully`)
                this.$emit('close')
              } else {
                alert('Error')
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
