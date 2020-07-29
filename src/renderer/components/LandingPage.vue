<template>
    <div class="login-form">
        <section>
            <div class="avatar">
                <img src="../../renderer/assets/images/avatar-default-icon.png" alt="Avatar">
            </div>
            <h2 class="text-center">Member Login</h2>
            <div class="form-group">
                 <span v-show="errorMessage==true && !username" class="input-group-text"
                       id="inputGroupPrependSpan">{{$vd.username.$errors[0]}}</span>
                <input type="text" class="form-control" name="username" placeholder="Username" v-model="username"
                       required="required">
            </div>
            <div class="form-group">
                   <span v-show="errorMessage==true && !password" class="input-group-text"
                         id="inputGroupPrependSpan">{{$vd.password.$errors[0]}}</span>
                <input type="password" class="form-control" name="password" placeholder="Password" v-model="password"
                       required="required">
            </div>
            <div class="form-group">
                <button @click="login()" class="btn btn-primary btn-lg btn-block">Sign in</button>
            </div>
            <div class="clearfix">
                <label class="pull-left checkbox-inline"><input type="checkbox"> Remember me</label>
                <a href="#" class="pull-right">Forgot Password?</a>
            </div>
        </section>
        <!--        <p class="text-center small">Don't have an account? <button @click="register()">Sign up here!</button></p>-->
    </div>
</template>d

<script>
    import SH from '../backend/backend'
    import VueDaval from 'vue-daval'

    export default {
      name: 'landing-page',
      mixins: [VueDaval],
      components: {},
      data () {
        return {
          username: '',
          password: '',
          userToken: {
            'id_token': ''
          },
          errorMessage: ''
        }
      },
      vdRules: {
        username: {required: true},
        password: {required: true}
      },
      methods: {
        register: function () {
          this.$router.push('/register')
        },
        login: function () {
          const loginData = {
            username: this.username,
            password: this.password
          }
          this.$vd.$validate().then(() => {
            SH.ajax.callRemote(`http://127.0.0.1:8080/api/authenticate`, loginData, 'POST', function (data) {
              if (data) {
                if (data.id_token) {
                  this.userToken = data
                  localStorage.setItem('token', this.userToken.id_token)
                  this.$router.push('/maindashboard')
                } else if (data.AuthenticationException) {
                  alert(data.AuthenticationException)
                } else if (data.status === 401) {
                  alert(data.detail)
                }
              } else {
                alert('Could not connect to server: server is down')
              }
            }.bind(this))
          }
          ).catch(() => {
            this.errorMessage = true
          })
        }
      }
    }
</script>

<style>

</style>
