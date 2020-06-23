<template>
    <div class="login-form">
        <section>
            <div class="avatar">
                <img src="../../renderer/assets/images/avatar-default-icon.png" alt="Avatar">
            </div>
            <h2 class="text-center">Member Login</h2>
            <div class="form-group">
                <input type="text" class="form-control" name="username" placeholder="Username" v-model="username" required="required">
            </div>
            <div class="form-group">
                <input type="password" class="form-control" name="password" placeholder="Password" v-model="password" required="required">
            </div>
            <div class="form-group">
                <button @click="login()" class="btn btn-primary btn-lg btn-block">Sign in</button>
            </div>
            <div class="clearfix">
                <label class="pull-left checkbox-inline"><input type="checkbox"> Remember me</label>
                <a href="#" class="pull-right">Forgot Password?</a>
            </div>
    </section>
        <p class="text-center small">Don't have an account? <button @click="register()">Sign up here!</button></p>
    </div>
</template>

<script>
    import SH from '../backend/backend'
    export default {
      name: 'landing-page',
      components: {},
      data () {
        return {
          username: '',
          password: '',
          userToken: {
            'id_token': ''
          }
        }
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
          SH.ajax.callRemote(`http://127.0.0.1:8080/api/authenticate`, loginData, 'POST', function (data) {
            if (data.id_token) {
              this.userToken = data
              this.$router.push('/dashboard')
            } else if (data.AuthenticationException) {
              alert(data.AuthenticationException)
            } else {
              alert(data.message)
            }
          }.bind(this))
        }
      }
    }
</script>

<style>

</style>
