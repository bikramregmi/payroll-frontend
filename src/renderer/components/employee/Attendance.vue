<template>
    <div>
        <h5 class="card-title">Update Employee Information</h5>
        <hr>
        <input type="text" class="form-control" id="id" aria-describedby="id" v-model="attendance.id"
               hidden>
        <div>
            <div class="row">
                <div v-show="!showDiv" class="col-md-6">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend">Check In</span>
                            <span v-show="errorMessage==true && !attendance.checkInDate" class="input-group-text"
                                  id="inputGroupPrependSpan">{{$vd.attendance.checkInDate.$errors[0]}}</span>
                        </div>
                        <!--                        <vue-timepicker format="hh:mm A"></vue-timepicker>-->
                        <input type="text" class="form-control" id="checkIn" v-model="attendance.checkInDate"
                               aria-describedby="checkIn" placeholder="HH:MM">
                    </div>
                </div>
                <div v-show="showDiv" class="col-md-6">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend">Check In</span>
                            <span v-show="errorMessage==true && !attendance.checkInDate" class="input-group-text"
                                  id="inputGroupPrependSpan">{{$vd.attendance.checkInDate.$errors[0]}}</span>
                        </div>
                        <!--                        <vue-timepicker format="hh:mm A"></vue-timepicker>-->
                        <input style="cursor: not-allowed;" type="text" class="form-control" id="checkIn" v-model="attendance.checkInDate"
                               aria-describedby="checkIn" placeholder="HH:MM" disabled>
                    </div>
                </div>
                <div v-show="!showDiv" class="col-md-6">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend1">Checkout</span>
                        </div>
                        <input style="cursor: not-allowed;" type="text" class="form-control" id="gender" v-model="attendance.checkOutDate"
                               placeholder="HH:MM" disabled>
                    </div>
                </div>
                <div v-show="showDiv" class="col-md-6">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend1">Checkout</span>
                        </div>
                        <input type="text" class="form-control" id="gender" v-model="attendance.checkOutDate"
                               placeholder="HH:MM">
                    </div>
                </div>
            </div>
            <br>
            <div class="row">
                <div class="col-md-6">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend2">Employee Code</span>
                        </div>
                        <span v-show="errorMessage==true && !attendance.employeeCode" class="input-group-text"
                              id="inputGroupPrependSpan">{{$vd.attendance.employeeCode.$errors[0]}}</span>
                        <input type="text" class="form-control" id="parentName"
                               v-model="attendance.employeeCode">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend3">Remarks</span>
                        </div>
                        <input type="text" class="form-control" id="bloodGroup"
                               v-model="attendance.description">
                    </div>
                </div>
            </div>
            <br>
            <br>
            <button @click="updateAttendance()" type="submit" class="btn btn-primary">Submit</button>
            <button @click="cancel()" class="btn btn-primary">Cancel</button>
        </div>
        <div>
            <hr>
            <h5 class="card-title">Employee Present Today</h5>
            <hr>
            <div class="row" v-for="(item) in todayAttendance">
                <div style="color:black;">&emsp;{{item.employeeFullName}}</div>&nbsp;
                <span style="color: #4fc08d;cursor: pointer;" @click="checkout(item.id)">&nbsp;Checkout&nbsp;</span>
            </div>
        </div>
    </div>
</template>

<script>
    import VueDaval from 'vue-daval'
    import SH from '../../backend/backend'
    import VueTimepicker from 'vue2-timepicker'

    export default {
      name: 'attendance',
      components: {VueTimepicker},
      mixins: [VueDaval],
      data () {
        return {
          attendance: {
            checkInDate: '',
            checkOutDate: '',
            checkOut: '',
            description: '',
            employeeCode: ''
          },
          errorMessage: '',
          todayAttendance: '',
          employeeFullName: '',
          showDiv: false
        }
      },
      vdRules: {
        attendance: {
          checkInDate: {required: true},
          employeeCode: {required: true}
        }
      },
      created () {
        this.getTodayAttendance()
      },
      methods: {
        cancel: function () {
          this.$router.push('/listEmployeeDetails')
        },
        checkout: function (id) {
          this.showDiv = true
          SH.ajax.callRemote(`http://127.0.0.1:8080/api/attendances/current/${id}`, '', 'GET', function (data) {
            this.attendance = data
          }.bind(this))
        },
        getTodayAttendance: function () {
          SH.ajax.callRemote(`http://127.0.0.1:8080/api/attendances/current`, '', 'GET', function (data) {
            this.todayAttendance = data
          }.bind(this))
        },
        updateAttendance: function () {
          const d = new Date()
          const ye = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(d)
          const mo = new Intl.DateTimeFormat('en', {month: '2-digit'}).format(d)
          const da = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(d)
          const n = `${ye}-${mo}-${da}`
          this.$vd.attendance.$validate().then(() => {
            const updatedData = {
              employeeCode: this.attendance.employeeCode,
              checkInDate: n + 'T' + this.attendance.checkInDate + ':00.00Z',
              description: this.attendance.description,
              id: this.attendance.id
            }
            if (updatedData.id == null) {
              SH.ajax.callRemote(`http://127.0.0.1:8080/api/attendances`, updatedData, 'POST', function (data) {
                this.attendance = data
                alert(data.title)
                this.$router.push('/listEmployeeDetails')
              }.bind(this))
            } else {
              const updatedData = {
                employeeCode: this.attendance.employeeCode,
                checkInDate: n + 'T' + this.attendance.checkInDate + ':00.00Z',
                checkOutDate: n + 'T' + this.attendance.checkOutDate + ':00.00Z',
                description: this.attendance.description,
                id: this.attendance.id
              }
              SH.ajax.callRemote(`http://127.0.0.1:8080/api/attendances`, updatedData, 'PUT', function (data) {
                this.employee = data
                this.$router.push('/listEmployeeDetails')
              }.bind(this))
            }
          }
          ).catch(() => {
            this.errorMessage = true
          })
          this.$forceUpdate()
        }
      }
    }
</script>

<style scoped>

</style>
