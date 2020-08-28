<template>
    <div>
        <h5 class="card-title">Update Employee Information</h5>
        <hr>
        <input type="text" class="form-control" id="id" v-model="employeeInformation.id" aria-describedby="id"
               hidden>
        <div>
            <div class="row">
                <div class="col-md-6">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend">DOB</span>
                            <span v-show="errorMessage==true && !employeeInformation.dob" class="input-group-text"
                                  id="inputGroupPrependSpan">{{$vd.employeeInformation.dob.$errors[0]}}</span>
                        </div>
                        <input type="text" class="form-control" id="dob" v-model="employeeInformation.dob"
                               aria-describedby="dob"
                        >
                        <div class="invalid-feedback">
                            Please choose a Dob.
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend1">Gender</span>
                            <span v-show="errorMessage==true && !employeeInformation.gender" class="input-group-text"
                                  id="inputGroupPrependSpan">{{$vd.employeeInformation.gender.$errors[0]}}</span>
                        </div>
                        <input type="text" class="form-control" id="gender" v-model="employeeInformation.gender">
                    </div>
                </div>
            </div>
            <br>
            <div class="row">
                <div class="col-md-6">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend2">Parent Name</span>
                            <span v-show="errorMessage==true && !employeeInformation.parentName"
                                  class="input-group-text" id="inputGroupPrependSpan">{{$vd.employeeInformation.parentName.$errors[0]}}</span>
                        </div>
                        <input type="text" class="form-control" id="parentName"
                               v-model="employeeInformation.parentName">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend3">Blood Group</span>
                            <span v-show="errorMessage==true && !employeeInformation.bloodGroup"
                                  class="input-group-text" id="inputGroupPrependSpan">{{$vd.employeeInformation.bloodGroup.$errors[0]}}</span>
                        </div>
                        <input type="text" class="form-control" id="bloodGroup"
                               v-model="employeeInformation.bloodGroup">
                    </div>
                </div>
            </div>
            <br>
            <div class="row">
                <div class="col-md-6">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend4">Address Line 1</span>
                            <span v-show="errorMessage==true && !employeeInformation.addressline1"
                                  class="input-group-text" id="inputGroupPrependSpan">{{$vd.employeeInformation.addressline1.$errors[0]}}</span>
                        </div>
                        <input type="text" class="form-control" id="addressLine1"
                               v-model="employeeInformation.addressline1">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend5">Address Line 2</span>
                        </div>
                        <input type="text" class="form-control" id="addressLine2"
                               v-model="employeeInformation.addressline2">
                        <div class="invalid-feedback">
                            Please choose a Address Line 2.
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <div class="row">
                <div class="col-md-6">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend6">Phone Number</span>
                        </div>
                        <input type="text" class="form-control" id="phoneNumber"
                               v-model="employeeInformation.phoneNumber">
                        <div class="invalid-feedback">
                            Please choose a Phone Number.
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend7">Mobile Number</span>
                            <span v-show="errorMessage==true && !employeeInformation.mobileNumber"
                                  class="input-group-text" id="inputGroupPrependSpan">{{$vd.employeeInformation.mobileNumber.$errors[0]}}</span>
                        </div>
                        <input type="text" class="form-control" id="mobileNumber"
                               v-model="employeeInformation.mobileNumber">
                    </div>
                </div>
            </div>
            <br>
            <div class="row">
                <div class="col-md-6">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend8">Parent Contact Number</span>
                            <span v-show="errorMessage==true && !employeeInformation.emergencyContactNumber"
                                  class="input-group-text" id="inputGroupPrependSpan">{{$vd.employeeInformation.emergencyContactNumber.$errors[0]}}</span>
                        </div>
                        <input type="text" class="form-control" id="emergencyContactNumber"
                               v-model="employeeInformation.emergencyContactNumber">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend9">Joining Date</span>
                            <span v-show="errorMessage==true && !employeeInformation.joiningDate"
                                  class="input-group-text" id="inputGroupPrependSpan">{{$vd.employeeInformation.joiningDate.$errors[0]}}</span>
                        </div>
                        <input type="text" class="form-control" id="joiningDate"
                               v-model="employeeInformation.joiningDate">
                    </div>
                </div>
            </div>
            <br>
            <div class="row">
                <div class="col-md-6">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend10">Designation</span>
                            <span v-show="errorMessage==true && !employeeInformation.designation"
                                  class="input-group-text" id="inputGroupPrependSpan">{{$vd.employeeInformation.designation.$errors[0]}}</span>
                        </div>
                        <input type="text" class="form-control" id="designation"
                               v-model="employeeInformation.designation">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend11">Pan Number</span>
                            <span v-show="errorMessage==true && !employeeInformation.panNumber" class="input-group-text"
                                  id="inputGroupPrependSpan">{{$vd.employeeInformation.panNumber.$errors[0]}}</span>
                        </div>
                        <input type="text" class="form-control" id="panNumber" v-model="employeeInformation.panNumber">
                    </div>
                </div>
            </div>
            <br>

            <!-- <div class="row">
                 <div class="col-md-6">
                     <div class="input-group">
                         <div class="input-group-prepend">
                             <span class="input-group-text" id="inputGroupPrepend12">Document Number</span>
                         </div>
                         <input type="text" class="form-control" id="documentNumber" v-model="employeeInformation.documentNumber" >
                         <div class="invalid-feedback">
                             Please choose a Document Number.
                         </div>
                     </div>
                 </div>
                 <div class="col-md-6">
                     <div class="input-group">
                         <div class="input-group-prepend">
                             <span class="input-group-text" id="inputGroupPrepend13">Extra Field</span>
                         </div>
                         <input type="text" class="form-control" id="extraField" v-model="employeeInformation.extraField" >
                         <div class="invalid-feedback">
                             Please choose a Extra Field.
                         </div>
                     </div>
                 </div>
             </div>-->
            <button @click="updateEmployee()" type="submit" class="btn btn-primary">Submit</button>
            <button @click="cancel()" class="btn btn-primary">Cancel</button>
        </div>
    </div>
</template>

<script>
    import SH from '../../backend/backend'
    import VueDaval from 'vue-daval'
    import {baseApiUrl} from '../../backend/stringConstants'

export default {
      name: 'UpdateEmployeeInformation',
      mixins: [VueDaval],
      data () {
        return {
          id: this.$route.params.id,
          employeeInformation: {
            dob: '',
            gender: '',
            parentName: '',
            bloodGroup: '',
            addressline1: '',
            addressline2: '',
            mobileNumber: '',
            joiningDate: '',
            designation: '',
            emergencyContactNumber: '',
            panNumber: ''
          },
          errorMessage: false
        }
      },
      created () {
        this.getUpdatedEmployee(this.id)
      },
      vdRules: {
        employeeInformation: {
          dob: {required: true},
          gender: {required: true},
          parentName: {required: true},
          bloodGroup: {required: true},
          addressline1: {required: true},
          mobileNumber: {required: true},
          joiningDate: {required: true},
          designation: {required: true},
          emergencyContactNumber: {required: true},
          panNumber: {required: true}
        }
      },
      methods: {
        cancel: function () {
          this.$router.push('/listEmployeeDetails')
        },
        updateEmployee: function () {
          const updatedData = {
            employeeId: this.id,
            dob: this.employeeInformation.dob,
            gender: this.employeeInformation.gender,
            bloodGroup: this.employeeInformation.bloodGroup,
            isMarried: true,
            parentName: this.employeeInformation.parentName,
            addressline1: this.employeeInformation.addressline1,
            addressline2: this.employeeInformation.addressline2,
            phoneNumber: this.employeeInformation.phoneNumber,
            mobileNumber: this.employeeInformation.mobileNumber,
            emergencyContactNumber: this.employeeInformation.emergencyContactNumber,
            joiningDate: this.employeeInformation.joiningDate,
            designation: this.employeeInformation.designation,
            panNumber: this.employeeInformation.panNumber,
            documentNumber: this.employeeInformation.documentNumber,
            extraField: this.employeeInformation.extraField,
            id: this.employeeInformation.id
          }
          this.$vd.employeeInformation.$validate().then(() => {
            if (updatedData.id == null) {
              SH.ajax.callRemote(baseApiUrl + `employee-informations`, updatedData, 'POST', function (data) {
                this.$router.push('/listEmployeeDetails')
              }.bind(this))
            } else {
              SH.ajax.callRemote(baseApiUrl + `employee-informations`, updatedData, 'PUT', function (data) {
                this.employee = data
                this.$router.push('/listEmployeeDetails')
              }.bind(this))
            }
          }).catch(() => {
            this.errorMessage = true
          })
        },

        getUpdatedEmployee: function (id) {
          SH.ajax.callRemote(baseApiUrl + `employee-informations/${id}`, '', 'GET', function (data) {
            this.employeeInformation = data
          }.bind(this))
          this.$forceUpdate()
        }
      }
    }
</script>

<style scoped>

</style>
