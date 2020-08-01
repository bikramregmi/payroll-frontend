<template>
    <div>
        <h5 class="card-title">Add New Company</h5>
        <hr>
        <h6 class="card-title">Company Information</h6>
        <div class="row">
            <div class="col-md-4">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span v-show="errorMessage==false || companyName" class="input-group-text" id="inputGroupPrepend">Name</span>
                        <span v-show="errorMessage==true && !companyName" class="input-group-text"
                              id="inputGroupPrependSpan">{{$vd.companyName.$errors[0]}}</span>
                    </div>
                    <input type="text" class="form-control" id="fullName" v-model="companyName"
                           aria-describedby="companyName">
                </div>
            </div>
            <div class="col-md-4">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span v-show="errorMessage==false || address" class="input-group-text" id="inputGroupPrepend1">Address</span>
                        <span v-show="errorMessage==true && !address " class="input-group-text"
                              id="inputGroupPrependSpan">{{$vd.address.$errors[0]}}</span>
                    </div>
                    <input type="text" class="form-control" id="address" v-model="address">
                    <hr>
                </div>
            </div>
            <div class="col-md-4">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span v-show="errorMessage==false || email" class="input-group-text" id="inputGroupPrepend1">Email</span>
                        <span v-show="errorMessage==true && !email " class="input-group-text"
                              id="inputGroupPrependSpan">{{$vd.email.$errors[0]}}</span>
                    </div>
                    <input type="text" class="form-control" id="email" v-model="email">
                    <hr>
                </div>
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col-md-6">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span v-show="errorMessage==false || fy" class="input-group-text" id="inputGroupPrepend2">F.Y Beginning From</span>
                        <span v-show="errorMessage==true && $vd.fy.$errors[0]" class="input-group-text"
                              id="inputGroupPrependSpan">{{$vd.fy.$errors[0]}}</span>
                    </div>
                    <input type="text" class="form-control" id="fy" v-model="fy">
                </div>
            </div>
            <div class="col-md-6">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span v-show="errorMessage==false || bookDate" class="input-group-text" id="inputGroupPrepend3">Books Start From</span>
                        <span v-show="errorMessage==true && $vd.bookDate.$errors[0]" class="input-group-text"
                              id="inputGroupPrependSpan">{{$vd.bookDate.$errors[0]}}</span>
                    </div>
                    <input type="text" class="form-control" id="description" v-model="bookDate">
                </div>
            </div>
        </div>
        <hr>
        <h6 class="card-title">Currency Information</h6>
        <div class="row">
            <div class="col-md-4">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span v-show="errorMessage==false || currencySymbol" class="input-group-text" id="inputGroupPrepend">Symbol</span>
                        <span v-show="errorMessage==true && !currencySymbol" class="input-group-text"
                              id="inputGroupPrependSpan">{{$vd.currencySymbol.$errors[0]}}</span>
                    </div>
                    <input type="text" class="form-control" id="currencySymbol" v-model="currencySymbol"
                           aria-describedby="currencySymbol">
                </div>
            </div>
            <div class="col-md-4">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span v-show="errorMessage==false || currencyString" class="input-group-text" id="inputGroupPrepend1">String</span>
                        <span v-show="errorMessage==true && !currencyString " class="input-group-text"
                              id="inputGroupPrependSpan">{{$vd.currencyString.$errors[0]}}</span>
                    </div>
                    <input type="text" class="form-control" id="currencyString" v-model="currencyString">
                    <hr>
                </div>
            </div>
            <div class="col-md-4">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span v-show="errorMessage==false || currencySubString" class="input-group-text" id="inputGroupPrepend1">SubString</span>
                        <span v-show="errorMessage==true && !currencySubString " class="input-group-text"
                              id="inputGroupPrependSpan">{{$vd.currencySubString.$errors[0]}}</span>
                    </div>
                    <input type="text" class="form-control" id="currencySubString" v-model="currencySubString">
                    <hr>
                </div>
            </div>
        </div>
        <hr>
        <h6 class="card-title">GST/VAT Information</h6>
        <div class="row">
            <div class="col-md-4">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span v-show="errorMessage==false || dealerType" class="input-group-text" id="inputGroupPrepend">Dealer Type</span>
                        <span v-show="errorMessage==true && !dealerType" class="input-group-text"
                              id="inputGroupPrependSpan">{{$vd.dealerType.$errors[0]}}</span>
                    </div>
                    <input type="text" class="form-control" id="dealerType" v-model="dealerType"
                           aria-describedby="dealerType">
                </div>
            </div>
            <div class="col-md-4">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span v-show="errorMessage==false || taxRate" class="input-group-text" id="inputGroupPrepend1">Tax-Rate</span>
                        <span v-show="errorMessage==true && !taxRate " class="input-group-text"
                              id="inputGroupPrependSpan">{{$vd.taxRate.$errors[0]}}</span>
                    </div>
                    <input type="text" class="form-control" id="taxRate" v-model="taxRate">
                    <hr>
                </div>
            </div>
            <div class="col-md-4">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroupPrepend1">Type</span>
                    </div>
                    <input type="text" class="form-control" id="type" v-model="type">
                    <hr>
                </div>
            </div>
        </div>
        <hr>
        <button @click="addNewEmployee()" type="submit" class="btn btn-primary">Submit</button>
        <button v-shortkey="['esc']" @shortkey="cancel()" @click="cancel()" class="btn btn-primary">Cancel</button>
    </div>
</template>

<script>
    import SH from '../../../backend/backend'
    import VueDaval from 'vue-daval'

    export default {
      name: 'AddCompany',
      mixins: [VueDaval],
      data () {
        return {
          companyName: '',
          address: '',
          email: '',
          fy: '',
          bookDate: '',
          currencySymbol: '',
          currencyString: '',
          currencySubString: '',
          dealerType: '',
          taxRate: '',
          type: '',
          errorMessage: false
        }
      },
      vdRules: {
        email: {required: true, type: 'email', regexp: /\S+@\S+\.\S+/},
        companyName: {required: true},
        address: {required: true},
        fy: {required: true},
        bookDate: {required: true},
        currencySymbol: {required: true},
        currencyString: {required: true},
        currencySubString: {required: true},
        dealerType: {required: true},
        taxRate: {required: true}
      },
      methods: {
        cancel: function () {
          this.$router.push('/ADashboard')
        },
        addNewEmployee: function () {
          const data = {
            companyName: this.companyName,
            email: this.email,
            address: this.address,
            strFy: this.fy,
            strBookDate: this.bookDate,
            currencySymbol: this.currencySymbol,
            currencyString: this.currencyString,
            currencySubString: this.currencySubString,
            dealerType: this.address,
            taxRate: this.taxRate
          }
          this.$vd.$validate().then(() => {
            SH.ajax.callRemote(`http://127.0.0.1:8080/api/companies`, data, 'POST', function (data) {
              if (data.responseStatus === 'SUCCESS') {
                alert(data.message)
                this.$router.push('/listCompany')
              } else {
                alert(data.message)
              }
            }.bind(this))
          }).catch(() => {
            this.errorMessage = true
          })
        }
      }
    }
</script>

<style scoped>

</style>

