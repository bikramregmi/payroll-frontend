<template>
    <div>
        <h5 class="card-title">Employee Salary</h5>
        <hr>
        <div class='divider-clear'/>
        <input type="text" class="form-control" id="id" v-model="employeeSalary.id" aria-describedby="id"
               hidden>
        <div>
            <div class="row">
                <div class="col-md-6">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend">Basic Salary</span>
                            <span v-show="errorMessage==true && !employeeSalary.basicSalary" class="input-group-text"
                                  id="inputGroupPrependSpan">{{$vd.employeeSalary.basicSalary.$errors[0]}}</span>
                        </div>
                        <input type="text" class="form-control" id="basicSalary" v-model="employeeSalary.basicSalary"
                               aria-describedby="basicSalary">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend1">Allowance</span>
                            <span v-show="errorMessage==true && !employeeSalary.allowance" class="input-group-text"
                                  id="inputGroupPrependSpan">{{$vd.employeeSalary.allowance.$errors[0]}}</span>
                        </div>
                        <input type="text" class="form-control" id="allowance" v-model="employeeSalary.allowance">
                    </div>
                </div>
            </div>
            <br>
            <div class="row">
                <div class="col-md-6">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend2">OT</span>
                        </div>
                        <input type="text" class="form-control" id="ot" v-model="employeeSalary.ot">
                        <div class="invalid-feedback">
                            Please choose a OT.
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend3">Bonus</span>
                        </div>
                        <input type="text" class="form-control" id="bonus" v-model="employeeSalary.bonus">
                        <div class="invalid-feedback">
                            Please choose a Bonus.
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <div class="row">
                <div class="col-md-6">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend4">Description</span>
                        </div>
                        <input type="text" class="form-control" id="description" v-model="employeeSalary.description">
                        <div class="invalid-feedback">
                            Please choose a Description.
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend5">Tax</span>
                        </div>
                        <input type="text" class="form-control" id="tax" v-model="employeeSalary.tax">
                        <div class="invalid-feedback">
                            Please choose a Tax.
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <div class="row">
                <div class="col-md-6">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend6">PF</span>
                        </div>
                        <input type="text" class="form-control" id="pf" v-model="employeeSalary.pf">
                        <div class="invalid-feedback">
                            Please choose a PF.
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend6">Extra</span>
                        </div>
                        <input type="text" class="form-control" id="extra" v-model="employeeSalary.extra">
                        <div class="invalid-feedback">
                            Please choose a Extra.
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <button @click="updateSalary()" type="submit" class="btn btn-primary">Submit</button>
            <button @click="cancel()" class="btn btn-primary">Cancel</button>
        </div>
    </div>
</template>

<script>
    import SH from '../../backend/backend'
    import VueDaval from 'vue-daval'
    import {baseApiUrl} from '../../backend/stringConstants'

export default {
      name: 'EmployeeSalary',
      mixins: [VueDaval],
      data () {
        return {
          id: this.$route.params.id,
          // employeeSalary: [],
          errorMessage: false,
          employeeSalary: {
            basicSalary: '',
            allowance: ''
          }
        }
      },
      vdRules: {
        employeeSalary: {
          basicSalary: {required: true},
          allowance: {required: true}
        }
      },
      created () {
        this.getUpdatedSalary(this.id)
      },
      methods: {
        cancel: function () {
          this.$router.push('/listEmployeeDetails')
        },
        updateSalary: function () {
          const updatedData = {
            employeeId: this.id,
            basicSalary: this.employeeSalary.basicSalary,
            allowance: this.employeeSalary.allowance,
            ot: this.employeeSalary.ot,
            bonus: this.employeeSalary.bonus,
            description: this.employeeSalary.description,
            tax: this.employeeSalary.tax,
            pf: this.employeeSalary.pf,
            extra: this.employeeSalary.extra,
            id: this.employeeSalary.id

          }
          this.$vd.employeeSalary.$validate().then(() => {
            if (updatedData.id == null) {
              SH.ajax.callRemote(baseApiUrl + `employee-salaries`, updatedData, 'POST', function (data) {
                this.$router.push('/listEmployeeDetails')
              }.bind(this))
            } else {
              SH.ajax.callRemote(baseApiUrl + `employee-salaries`, updatedData, 'PUT', function (data) {
                this.employee = data
                this.$router.push('/listEmployeeDetails')
              }.bind(this))
            }
          }
          ).catch(() => {
            this.errorMessage = true
          })
          this.$forceUpdate()
        },
        getUpdatedSalary: function (id) {
          SH.ajax.callRemote(baseApiUrl + `employee-salaries/${id}`, '', 'GET', function (data) {
            this.employeeSalary = data
          }.bind(this))
          this.$forceUpdate()
        }
      }
    }
</script>

<style scoped>

</style>
