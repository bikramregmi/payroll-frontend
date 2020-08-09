<template>
    <div>
        <h5 class="card-title">Welcome To Accounting System</h5>
        <hr>&nbsp;&nbsp;&nbsp;
        <div class="row" >
            <div class="col-md-7">
            <img style="height: 70%; margin-left: 80px;" src="../../../../src/renderer/assets/images/img.png" alt="logo">
            </div>
            <div class="card-body-custom">
                <div class="col-md-4">
                    <h6 style="width:200px;margin-top: 5px;" class="card-title"><b><u >Shortcut Keys</u></b></h6>
                    <h6 style="color: black;width:170px;">Press Esc to Cancel</h6>
                </div>
            </div>
        </div>
        <button hidden v-shortkey="['esc']" @shortkey="cancel()" class="btn btn-primary"></button>
    </div>
</template>

<script>
    export default {
      name: 'Dashboard',
      data () {
        return {
          account: '',
          result: ''
        }
      },
      methods: {
        cancel: function () {
          this.result = 'empty'
        }
      }
    }
</script>

<style scoped>

</style>
