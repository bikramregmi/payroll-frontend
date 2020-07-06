<template>
    <div>
        <h5 class="card-title">Generate Payroll Of All Employees</h5>
        <hr>
        <div class="row">
            <div class="col-md-6">
                <div v-show="resp" class="alert alert-danger alert-dismissible fade show">All employees payroll of this
                    month is saved
                </div>
                <button v-show="response" class="btn btn-warning" @click="generatePayroll()">Generate Payroll</button>
            </div>
          <!--  <div class="col-md-9">
                <span class="alert alert-danger">Payroll is generated every end of the month</span>
            </div>-->
        </div>
        <hr>
        <div class="row">
            <div class="col-md-6">
                <h5 class="card-title">Payroll History</h5>
            </div>
            <div class="col-md-6" >
                <input style="width:300px;" class="form-control" type="text" v-model="keyboard" placeholder="Search" aria-label="Search">
<!--                <button @click="getPayrollMonth()">Search</button>-->
            </div>
        </div>
        <div class="row">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th scope="col">SN</th>
                    <th scope="col">Full Name</th>
                    <th scope="col">Ecode</th>
                    <th scope="col">Status</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,itemIndex) in response">
                    <th scope="row">{{itemIndex+1}}</th>
                    <td v-for="itm in item.employee">{{itm.fullName}}</td>
                    <td v-for="itm in item.employee">{{itm.eCode}}</td>
                    <td>Generated</td>
                </tr>
                </tbody>
            </table>
        </div>
        <paginate
                v-model="page"
                :click-handler="getPayrollMonth"
                :container-class="'pagination'"
                :page-class="'page-item'"
                :pageLinkClass="'page-link-item'"
                :page-count="1"
        >
        </paginate>
    </div>
</template>

<script>
    import SH from '../../backend/backend'

    export default {
      name: 'GeneratePayroll',
      data () {
        return {
          response: '',
          resp: '',
          salaryMonth: '',
          salaryTotal: '',
          page: 0,
          keyboard: ''
        }
      },
      created () {
        this.getPayrollMonth()
      },
      methods: {
        generatePayroll: function () {
          const data = {
            salaryMonth: 'Jestha'
          }
          SH.ajax.callRemote(`http://127.0.0.1:8080/api/payroll-generates`, data, 'POST', function (data) {
            this.resp = data
          }.bind(this))
        },
        getPayrollMonth: function () {
          const paginationQuery = {
            page: this.page - 1,
            size: 4,
            sort: 'desc'
          }
          SH.ajax.callRemote(`http://127.0.0.1:8080/api/payroll-generates?` + 'page=' + paginationQuery.page + '&size=' + paginationQuery.size + '&sort=' + paginationQuery.sort, '', 'GET', function (data) {
            this.response = data
          }.bind(this))
        }
      }
    }
</script>

<style scoped>

</style>
