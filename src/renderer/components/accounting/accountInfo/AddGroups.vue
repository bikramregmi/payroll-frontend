<template>
    <div style="margin-left: 30px;margin-top: 10px;">
        <h5 class="card-title">Create Groups</h5><hr>
        <div  class="row">
            <div class="col-md-5">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroupPrepend">Name</span>
                        <span v-show="errorMessage==true && !fullName" class="input-group-text" id="inputGroupPrependSpan">{{$vd.fullName.$errors[0]}}</span>
                    </div>
                    <input type="text" class="form-control" id="fullName" v-model="fullName" aria-describedby="fullName">
                </div>
            </div>
            <div class="col-md-5">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroupPrepend1">Group</span>
                        <span v-show="errorMessage==true && !eCode " class="input-group-text" id="inputGroupPrependSpan">{{$vd.eCode.$errors[0]}}</span>
                    </div>
                    <input type="text" class="form-control" id="eCode" v-model="eCode" ><hr>
                </div>
            </div>
        </div>
        <hr>
        <h6 class="card-title">Options</h6>
        <div style="padding-left: 0px;" class="col-md-5">
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroupPrepend2">Yes/No</span>
                    <span v-show="errorMessage==true && $vd.email.$errors[0]" class="input-group-text" id="inputGroupPrependSpan">{{$vd.email.$errors[0]}}</span>
                </div>
                <input type="text" class="form-control" id="email" v-model="email" >
            </div>
        </div>
        <br>
        <button @click="save()" type="submit" class="btn btn-primary">Submit</button>
        <button v-shortkey="['esc']" @shortkey="cancel()" @click="cancel()" class="btn btn-primary">Cancel</button>
    </div>
</template>

<script>
    import VueDaval from 'vue-daval'
    import SH from '../../../backend/backend'
    export default {
      name: 'AddGroups',
      mixins: [VueDaval],
      data () {
        return {
          email: '',
          eCode: '',
          fullName: '',
          errorMessage: false
        }
      },
      vdRules: {
        email: {required: true, type: 'email', regexp: /\S+@\S+\.\S+/},
        eCode: {required: true},
        fullName: {required: true}
      },
      methods: {
        cancel: function () {
          this.$modal.hideAll()
        },
        save: function () {
          const data = {
            fullName: this.fullName,
            description: this.description,
            email: this.email,
            eCode: this.eCode
          }
          this.$vd.$validate().then(() => {
            SH.ajax.callRemote(`http://127.0.0.1:8080/api/employees`, data, 'POST', function (data) {
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
