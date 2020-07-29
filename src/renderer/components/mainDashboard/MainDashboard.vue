<template>
    <div class="main">
        <div class="row">
            <div class="col-lg-5">
                <button @click="check('pa')" type="button" class="btn btn-primary">Payroll System</button>
            </div>
            <div class="col-lg-5">
                <button @click="check('as')" type="button" class="btn btn-warning">Accounting System</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
      name: 'MainDashboard',
      methods: {
        check: function (data) {
          if (data === 'pa') {
            this.$router.push('/dashboard')
          } else { this.$router.push('/ADashboard') }
        }
      }
    }
</script>

<style scoped>

</style>
