<template>
    <div class="popup-class">
        <h5 class="card-title"><span style="pointer-events: bounding-box" @click="showForm(item)" v-for="item in types"
                                     v-shortkey="['alt', item.charAt(0).toLowerCase()]" @shortkey="showForm(item)">&nbsp;&nbsp;{{item}}&nbsp;&nbsp;</span>
        </h5>
        <hr>
        <div style="margin-top: 50px;margin-left:100px;" v-show="!show">
            <h6 class="card-title"><b> Accounting Voucher </b></h6>
            <h6 class="card-title"><b> Shortcut Keys ( Alt + Starting Letter) </b></h6>
            <h6 class="card-title"><b> Alt + s-> Sales </b></h6>
            <h6 class="card-title"><b> Alt + b-> Buys </b></h6>
            <h6 class="card-title"><b> Alt + p-> Payment </b></h6>
            <h6 class="card-title"><b> Alt + j-> Journal </b></h6>
            <h6 class="card-title"><b> Alt + r-> Receipt </b></h6>
            <h6 class="card-title"><b> Alt + c-> Contra </b></h6>
        </div>
        <div v-show="show">
            <h6 class="card-title"><b> Accounting Voucher For Type {{formName}}</b></h6>
            <!--            for payment, Receipt, Contra-->
            <div v-show="showPForm">
                <div class="row">
                    <div class="col-md-6">
                        <div class="row">
                            <div class="col-md-3" style="padding-right: 0px;">
                                <h6 class="card-title"><b>Account</b></h6>
                            </div>
                            <div class="col-md-9" style="padding-left: 0px;">
                                <input style="padding: 0;height: 9px;" type="text" class="form-control" id="accountName"
                                       v-model="accountName"
                                       aria-describedby="accountName">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <h6 class="card-title"><b>Current Balance:</b></h6>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <h6 class="card-title"><u><b>Particulars</b></u></h6>
                    </div>
                    <div class="col-md-6">
                        <h6 style="margin-left: 100px;" class="card-title"><u><b>Amount</b></u></h6>
                    </div>
                </div>
                <div class="row">
                    <div class="input-group">
                        <input type="text" class="form-control" id="sheet-class" v-model="particulars"
                               aria-describedby="currentBalance">
                        <input type="text" class="form-control" id="currentBalance" v-model="amount"
                               aria-describedby="currentBalance">
                    </div>
                </div>
                <div class="row">
                    <div class="input-group">
                        <input type="text" class="form-control" id="sheet-class" v-model="particulars"
                               aria-describedby="currentBalance">
                        <input type="text" class="form-control" id="currentBalance" v-model="amount"
                               aria-describedby="currentBalance">
                    </div>
                </div>
                <div class="row">
                    <div class="input-group">
                        <input type="text" class="form-control" id="sheet-class" v-model="particulars"
                               aria-describedby="currentBalance">
                        <input type="text" class="form-control" id="currentBalance" v-model="amount"
                               aria-describedby="currentBalance">
                    </div>
                </div>
                <div class="row">
                    <div class="input-group">
                        <input id="sheet-class" type="text" class="form-control" v-model="particulars"
                               aria-describedby="currentBalance">
                        <input type="text" class="form-control" id="currentBalance" v-model="amount"
                               aria-describedby="currentBalance">
                    </div>
                </div>
            </div>
            <!--            end for payment-->
            <!--            for  sales, Buy-->
            <div v-show="showSForm">
                <div class="row">
                    <div class="col-md-3">
                        <div class="row">
                            <div v-show="showSales" class="col-md-5" style="padding-right: 0px;">
                                <h6 class="card-title"><b>Ref No.</b></h6>
                            </div>
                            <div v-show="showBuy" class="col-md-5" style="padding-right: 0px;">
                                <h6 class="card-title"><b>Supplier Inv No.</b></h6>
                            </div>
                            <div class="col-md-7" style="padding-left: 0px;">
                                <input style="padding: 0;height: 9px;" type="text" class="form-control"
                                       id="accountName"
                                       v-model="accountName"
                                       aria-describedby="accountName">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <h6 class="card-title"><b>Current Balance:</b></h6>
                    </div>
                    <div class="col-md-3" v-show="showSales">
                        <h6 class="card-title"><b>Sales Ledger:</b></h6>
                    </div>
                    <div class="col-md-3" v-show="showBuy">
                        <h6 class="card-title"><b>Purchase Ledger:</b></h6>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3">
                        <h6 class="card-title"><u><b>Item</b></u></h6>
                    </div>
                    <div class="col-md-3">
                        <h6 style="margin-left: 130px;" class="card-title"><u><b>Quantity</b></u></h6>
                    </div>
                    <div class="col-md-3">
                        <h6 style="margin-left: 100px;" class="card-title"><u><b>Rate</b></u></h6>
                    </div>
                    <div class="col-md-3">
                        <h6 style="margin-left: 100px;" class="card-title"><u><b>Amount</b></u></h6>
                    </div>
                </div>
                <div class="row" v-for="(item,index) in page">
                    <div class="input-group"><p style="color: red;"></p>
                        <input type="text" class="form-control" id="sheet-class" v-model="salesVoucherTypes.item"
                               aria-describedby="currentBalance">
                        <input type="text" class="form-control" id="quantity" v-model="salesVoucherTypes.quantity"
                               aria-describedby="currentBalance">
                        <input type="text" class="form-control" id="rate" v-model="salesVoucherTypes.rate"
                               aria-describedby="currentBalance">
                        <input type="text" class="form-control" id="amount" v-model="salesVoucherTypes.amount"
                               aria-describedby="currentBalance">
                        <button @click="test(salesVoucherTypes.amount)">click</button>
                    </div>
                </div>
        <!--        <table>
                    <thead>
                    <tr>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><input type="text" class="form-control" id="sheet-class" v-model="salesVoucherTypes.item"
                                   aria-describedby="currentBalance"></td>
                        <td><input type="text" class="form-control" id="sheet-class" v-model="salesVoucherTypes.item"
                                   aria-describedby="currentBalance"></td>
                        <td><input type="text" class="form-control" id="sheet-class" v-model="salesVoucherTypes.item"
                                   aria-describedby="currentBalance"></td>
                    </tr>
                    </tbody>
                </table>-->
                <!--<div class="row">
                    <div class="input-group">
                        <input type="text" class="form-control" id="sheet-class" v-model="salesVoucherTypes.item"
                               aria-describedby="currentBalance">
                        <input type="text" class="form-control" id="quantity" v-model="salesVoucherTypes.quantity"
                               aria-describedby="currentBalance">
                        <input type="text" class="form-control" id="rate" v-model="salesVoucherTypes.rate"
                               aria-describedby="currentBalance">
                        <input type="text" class="form-control" id="amount" v-model="salesVoucherTypes.amount"
                               aria-describedby="currentBalance">
                    </div>
                </div>
                <div class="row">
                    <div class="input-group">
                        <input type="text" class="form-control" id="sheet-class" v-model="salesVoucherTypes.item"
                               aria-describedby="currentBalance">
                        <input type="text" class="form-control" id="quantity" v-model="salesVoucherTypes.quantity"
                               aria-describedby="currentBalance">
                        <input type="text" class="form-control" id="rate" v-model="salesVoucherTypes.rate"
                               aria-describedby="currentBalance">
                        <input type="text" class="form-control" id="amount" v-model="salesVoucherTypes.amount"
                               aria-describedby="currentBalance">
                    </div>
                </div>
                <div class="row">
                    <div class="input-group">
                        <input type="text" class="form-control" id="sheet-class" v-model="salesVoucherTypes.item"
                               aria-describedby="currentBalance">
                        <input type="text" class="form-control" id="quantity" v-model="salesVoucherTypes.quantity"
                               aria-describedby="currentBalance">
                        <input type="text" class="form-control" id="rate" v-model="salesVoucherTypes.rate"
                               aria-describedby="currentBalance">
                        <input type="text" class="form-control" id="amount" v-model="salesVoucherTypes.amount"
                               aria-describedby="currentBalance">
                    </div>
                </div>-->
            </div>
<!--            start of journal-->
            <div v-show="showJForm">
                <div class="row">
                    <div class="col-md-4">
                        <h6 class="card-title"><u><b>Particulars</b></u></h6>
                    </div>
                    <div class="col-md-4">
                        <h6 style="margin-left: 100px;" class="card-title"><u><b>Debit</b></u></h6>
                    </div>
                    <div class="col-md-4">
                        <h6 style="margin-left: 100px;" class="card-title"><u><b>Credit</b></u></h6>
                    </div>
                </div>
                <div class="row">
                    <div class="input-group">
                        <input type="text" class="form-control" id="sheet-class" v-model="particulars"
                               aria-describedby="currentBalance">
                        <input type="text" class="form-control" id="currentBalance" v-model="amount"
                               aria-describedby="currentBalance">
                        <input type="text" class="form-control" id="currentBalance" v-model="amount"
                               aria-describedby="currentBalance">
                    </div>
                </div>
                <div class="row">
                    <div class="input-group">
                        <input type="text" class="form-control" id="sheet-class" v-model="particulars"
                               aria-describedby="currentBalance">
                        <input type="text" class="form-control" id="currentBalance" v-model="amount"
                               aria-describedby="currentBalance">
                        <input type="text" class="form-control" id="currentBalance" v-model="amount"
                               aria-describedby="currentBalance">
                    </div>
                </div>
                <div class="row">
                    <div class="input-group">
                        <input type="text" class="form-control" id="sheet-class" v-model="particulars"
                               aria-describedby="currentBalance">
                        <input type="text" class="form-control" id="currentBalance" v-model="amount"
                               aria-describedby="currentBalance">
                        <input type="text" class="form-control" id="currentBalance" v-model="amount"
                               aria-describedby="currentBalance">
                    </div>
                </div>
                <div class="row">
                    <div class="input-group">
                        <input id="sheet-class" type="text" class="form-control" v-model="particulars"
                               aria-describedby="currentBalance">
                        <input type="text" class="form-control" id="currentBalance" v-model="amount"
                               aria-describedby="currentBalance">
                        <input type="text" class="form-control" id="currentBalance" v-model="amount"
                               aria-describedby="currentBalance">
                    </div>
                </div>
            </div>
<!--            end of journal-->
            <!--            end of sales-->
            <div class="row">
                <div class="col-md-6">
                    <span style="color: black;" class="form-group">Narration</span>
                    <textarea cols="6" type="text" class="form-control" v-model="narration"
                              aria-describedby="name"></textarea>
                </div>
                <div class="col-md-6">
                    <input style="margin-left: 60px;border: 0" type="text" class="form-control" id="currentBalance"
                           v-model="grandTotal"
                           aria-describedby="currentBalance">
                    <hr>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SH from '../../../backend/backend'
    import VueDaval from 'vue-daval'

    export default {
      name: 'AccountingVoucher',
      mixins: [VueDaval],
      data () {
        return {
          salesVoucherTypes: [{
            rate: 0,
            amount: 0,
            quantity: 0,
            item: ''
          }],
          page: [1, 2],
          types: '',
          formName: '',
          currentBalance: '',
          narration: '',
          particulars: '',
          amount: '',
          accountName: '',
          grandTotal: 0,
          errorMessage: false,
          show: false,
          showPForm: false,
          showSForm: false,
          showJForm: false,
          showSales: false,
          showBuy: false
        }
      },
      vdRules: {
        accountName: {required: true},
        currentBalance: {required: true}
      },
      created () {
        this.retriveTypes()
      },
      methods: {
        retriveTypes: function () {
          SH.ajax.callRemote(`http://127.0.0.1:8080/api/accounting-vouchers/types`, '', 'GET', function (data) {
            if (data) {
              this.types = data
            } else {
              this.types = 'Error Fetching Data'
            }
          }.bind(this))
        },
        test: function (data) {
          alert(data)
        },
        increasePage: function (page) {
          this.page = page + 1
        },
        showForm: function (data) {
          this.show = true
          this.formName = data
          if (data === 'Payment' || data === 'Receipt' || data === 'Contra') {
            this.showPForm = true
            this.showSForm = false
            this.showJForm = false
          } else if (data === 'Sales' || data === 'Buy') {
            if (data === 'Sales') {
              this.showSales = true
              this.showBuy = false
            } else {
              this.showBuy = true
              this.showSales = false
            }
            this.showSForm = true
            this.showJForm = false
            this.showPForm = false
          } else {
            this.showJForm = true
            this.showPForm = false
            this.showSForm = false
          }
        }
      }
    }
</script>

<style scoped>

</style>
