<template>
    <div class="popup-class">
        <h5 class="card-title">Create VoucherType</h5><hr>
        <div  class="row">
            <div class="col-md-6">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroupPrepend">Name</span>
                        <span v-show="errorMessage==true && !name" class="input-group-text" id="inputGroupPrependSpan">{{$vd.name.$errors[0]}}</span>
                    </div>
                    <input type="text" class="form-control" id="fullName" v-model="name" aria-describedby="fullName">
                </div>
            </div>
            <div class="col-md-6">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroupPrepend1">Voucher Type</span>
                        <span v-show="errorMessage==true && !type " class="input-group-text" id="inputGroupPrependSpan">{{$vd.type.$errors[0]}}</span>
                    </div>
                    <input type="text" class="form-control" id="eCode" v-model="type" ><hr>
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
                        <span v-show="errorMessage==true && method" class="input-group-text" id="inputGroupPrependSpan">{{$vd.method.$errors[0]}}</span>
                    </div>
                    <input type="text" class="form-control" id="email" v-model="method" >
                </div>
            </div>
            <div class="col-md-6">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroupPrepend3">Naration</span>
                    </div>
                    <input type="text" class="form-control" id="description" v-model="description" >
                    <div class="invalid-feedback">
                        Please choose a Description.
                    </div>
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
      name: 'AddVoucherType',
      mixins: [VueDaval],
      data () {
        return {
          name: '',
          type: '',
          method: '',
          description: '',
          errorMessage: false
        }
      },
      vdRules: {
        name: {required: true},
        type: {required: true},
        method: {required: true},
        description: {required: false}
      },
      methods: {
        cancel: function () {
          this.$emit('close')
        },
        save: function () {
          const data = {
            name: this.name,
            type: this.type,
            method: this.method,
            description: this.description
          }
          this.$vd.$validate().then(() => {
            SH.ajax.callRemote(`http://127.0.0.1:8080/api/voucher-types`, data, 'POST', function (data) {
              if (data.responseStatus === 'SUCCESS') {
                alert(data.message)
                this.$router.push('/listEmployeeDetails')
              } else {
                alert(data.message)
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
