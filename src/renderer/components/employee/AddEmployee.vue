<template>
    <div>
        <h5 class="card-title">Add New Employee</h5><hr>
            <div class="row">
                <div class="col-md-6">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend">FullName</span>
                            <span v-show="errorMessage==true && !fullName" class="input-group-text" id="inputGroupPrependSpan">{{$vd.fullName.$errors[0]}}</span>
                        </div>
                        <input type="text" class="form-control" id="fullName" v-model="fullName" aria-describedby="fullName">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend1">Ecode</span>
                            <span v-show="errorMessage==true && !eCode " class="input-group-text" id="inputGroupPrependSpan">{{$vd.eCode.$errors[0]}}</span>
                        </div>
                        <input type="text" class="form-control" id="eCode" v-model="eCode" ><hr>
                    </div>
                </div>
            </div>
           <br>
            <div class="row">
                <div class="col-md-6">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend2">Email</span>
                            <span v-show="errorMessage==true && $vd.email.$errors[0]" class="input-group-text" id="inputGroupPrependSpan">{{$vd.email.$errors[0]}}</span>
                        </div>
                        <input type="text" class="form-control" id="email" v-model="email" >
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend3">Description</span>
                        </div>
                        <input type="text" class="form-control" id="description" >
                        <div class="invalid-feedback">
                            Please choose a Description.
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <button @click="addNewEmployee()" type="submit" class="btn btn-primary">Submit</button>
            <button @click="cancel()" class="btn btn-primary">Cancel</button>
        </div>
</template>

<script>
    import SH from '../../backend/backend'
    import VueDaval from 'vue-daval'
    import {baseApiUrl} from '../../backend/stringConstants'
export default {
      name: 'AddEmployee',
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
          this.$router.push('/dashboard')
        },
        addNewEmployee: function () {
          const data = {
            fullName: this.fullName,
            description: this.description,
            email: this.email,
            eCode: this.eCode
          }
          this.$vd.$validate().then(() => {
            SH.ajax.callRemote(baseApiUrl + `employees`, data, 'POST', function (data) {
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
