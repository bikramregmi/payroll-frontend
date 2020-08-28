<template>
    <div>
        <h5 class="card-title">Welcome To Payroll</h5>
        <hr>&nbsp;&nbsp;&nbsp;
        <a href="#" class="btn btn-success">Active Employee</a>
        <a href="#" class="btn btn-primary">{{employeeCount}}</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             <img style="width:45%;" src="../../assets/images/dashboardnew.png">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a href="#" class="btn btn-success">Total Employee</a>
                <a href="#" class="btn btn-primary">{{employeeCount}}</a><br>
    </div>
</template>

<script>
    import SH from '../../backend/backend'
    import {baseApiUrl} from '../../backend/stringConstants'

export default {
      name: 'Home',
      data () {
        return {
          employeeCount: ''
        }
      },
      created () {
        this.getTotalEmployee()
      },
      methods: {
        addNewContact: function () {
          this.$router.push('/addNewContact')
        },
        getTotalEmployee: function () {
          SH.ajax.callRemote(baseApiUrl + `employees/count`, '', 'GET', function (data) {
            this.employeeCount = data
          }.bind(this))
          this.$forceUpdate()
        }
      }
    }
</script>

<style>

</style>
