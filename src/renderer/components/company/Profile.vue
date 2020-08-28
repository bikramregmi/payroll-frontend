<template>
    <div>
        <div style="color:black;">
        </div>
        <h5 class="card-title">Company Profile</h5>
        <hr>
        <div class="row">
            <div class="col-md-6">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroupPrepend">Login</span>
                        <span v-show="errorMessage==true && !currentUser.login" class="input-group-text"
                              id="inputGroupPrependSpan">{{$vd.currentUser.login.$errors[0]}}</span>
                    </div>
                    <input type="text" class="form-control" id="login" v-model="currentUser.login"
                           aria-describedby="login" disabled>
                </div>
            </div>
            <div class="col-md-6">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroupPrepend1">First Name</span>
                        <span v-show="errorMessage==true && !currentUser.firstName " class="input-group-text"
                              id="inputGroupPrependSpan">{{$vd.currentUser.firstName.$errors[0]}}</span>
                    </div>
                    <input type="text" class="form-control" id="firstName" v-model="currentUser.firstName">
                    <hr>
                </div>
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col-md-6">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroupPrepend2">Last Name</span>
                    </div>
                    <input type="text" class="form-control" id="lastName" v-model="currentUser.lastName">
                </div>
            </div>
            <div class="col-md-6">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroupPrepend3">Email</span>
                    </div>
                    <span v-show="errorMessage==true && !currentUser.email " class="input-group-text"
                          id="inputGroupPrependSpan">{{$vd.currentUser.email.$errors[0]}}</span>
                    <input type="text" class="form-control" id="email" v-model="currentUser.email">

                </div>
            </div>
        </div>
        <br>
        <button @click="updateProfile()" type="submit" class="btn btn-primary">Update</button>
        <button @click="cancel()" class="btn btn-primary">Cancel</button>
    </div>

</template>

<script>
    import SH from '../../backend/backend'
    import VueDaval from 'vue-daval'
    import {baseApiUrl} from '../../backend/stringConstants'

export default {
      name: 'Profile',
      mixins: [VueDaval],
      data () {
        return {
          currentUser: {
            login: '',
            firstName: '',
            lastName: '',
            email: ''
          },
          errorMessage: ''
        }
      },
      created () {
        this.companyProfile(this.$route.params.login)
      },
      vdRules: {
        currentUser: {
          login: {required: true},
          firstName: {required: true},
          email: {required: true}
        }
      },
      methods: {
        companyProfile: function () {
          SH.ajax.callRemote(baseApiUrl + `account`, '', 'GET', function (data) {
            this.currentUser = data
          }
            .bind(this))
        },
        cancel: function () {
          this.$router.push('/dashboard')
        },
        updateProfile: function () {
          this.$vd.currentUser.$validate().then(() => {
            const date = {
              login: this.currentUser.login,
              firstName: this.currentUser.firstName,
              lastName: this.currentUser.lastName,
              email: this.currentUser.email
            }
            SH.ajax.callRemote(baseApiUrl + `account`, date, 'POST', function (data) {
              alert('Company Profile Updated')
            })
          }).catch(() => {
            this.errorMessage = true
          })
        }
      }
    }
</script>

<style scoped>

</style>
