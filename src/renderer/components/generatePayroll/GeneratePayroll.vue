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
            <div class="col-md-6">
                <input style="width:300px;" class="form-control" type="text" v-model="keyboard" placeholder="Search"
                       aria-label="Search">
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
        <paginate v-show="response.length>5"
                  v-model="page"
                  :click-handler="getPayrollMonth"
                  :container-class="'pagination'"
                  :page-class="'page-item'"
                  :pageLinkClass="'page-link-item'"
                  :page-count="page+1"
        >
        </paginate>
    </div>
</template>

<script>
    import SH from '../../backend/backend'
    import {baseApiUrl} from '../../backend/stringConstants'

export default {
      name: 'GeneratePayroll',
      data () {
        return {
          response: '',
          resp: '',
          salaryMonth: '',
          salaryTotal: '',
          page: 1,
          keyboard: ''
        }
      },
      created () {
        this.getPayrollMonth()
      },
      methods: {
        generatePayroll: function () {
          let mon = ''
          const d = new Date()
          const month = new Intl.DateTimeFormat('en').format(d)
          switch (month) {
            case 1 :
              mon = 'Mangsir'
              break
            case 2 :
              mon = 'Poush'
              break
            case 3 :
              mon = 'Margh'
              break
            case 4 :
              mon = 'Falgun'
              break
            case 5 :
              mon = 'Chaitra'
              break
            case 6 :
              mon = 'Baisakh'
              break
            case 7 :
              mon = 'Jestha'
              break
            case 8 :
              mon = 'Ashad'
              break
            case 9 :
              mon = 'Sharawn'
              break
            case 10 :
              mon = 'Bhadra'
              break
            case 11 :
              mon = 'Ashoj'
              break
            case 12 :
              mon = 'Kartik'
          }
    
          alert(mon)

          const data = {
            salaryMonth: mon
          }

          SH.ajax.callRemote(baseApiUrl + `payroll-generates`, data, 'POST', function (data) {
            this.resp = data
          }.bind(this))
        },
        getPayrollMonth: function () {
          const paginationQuery = {
            page: this.page - 1,
            size: 4,
            sort: 'desc'
          }
          SH.ajax.callRemote(baseApiUrl + `payroll-generates?` + 'page=' + paginationQuery.page + '&size=' + paginationQuery.size + '&sort=' + paginationQuery.sort, '', 'GET', function (data) {
            this.response = data
          }.bind(this))
        }
      }
    }
</script>

<style scoped>

</style>
