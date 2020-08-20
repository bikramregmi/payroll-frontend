<template>
    <div class="popup-class">
        <h5 class="card-title"><span style="pointer-events: bounding-box" @click="showForm(item)" v-for="item in type"
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
                <div class="example">
                    <div class="example-content">
                        <div class="row">
                            <div class="col-md-4">
                                <h6>Ref No: </h6>
                                <input type="text" class="form-control" id="sheet-class" v-model="referenceNumber"
                                       aria-describedby="referenceNumber">
                            </div>
                            <div class="col-md-4">
                                <h6 class="card-title">Current Balance: </h6>
                                <input type="text" class="form-control" id="sheet-class" v-model="currentBalance"
                                       aria-describedby="currentBalance">
                            </div>
                            <div class="col-md-4">
                                <h6 class="card-title">Sales Ledger: </h6>
                                <input type="text" class="form-control" id="sheet-class" v-model="salesLedger"
                                       aria-describedby="salesLedger">
                            </div>
                        </div>
                        <div class="row" v-if="windowHeight>700">
                            <div class="col-md-1">
                                <h6 style="margin-left: 10px;" class="card-title"><b>Sn</b></h6>
                            </div>
                            <div class="col-md-3">
                                <h6 style="margin-left: 90px;" class="card-title"><b>Item</b></h6>
                            </div>
                            <div class="col-md-1">
                                <h6 class="card-title"><b>Quantity</b></h6>
                            </div>
                            <div class="col-md-1">
                                <h6 style="margin-left: 30px;" class="card-title"><b>Rate</b></h6>
                            </div>
                            <div class="col-md-3">
                                <h6 style="margin-left: 50px;" class="card-title"><b>Amount</b></h6>
                            </div>
                        </div>
                        <div class="row" v-else>
                            <div class="col-md-1">
                                <h6 style="margin-left: 10px;" class="card-title"><b>Sn</b></h6>
                            </div>
                            <div class="col-md-3">
                                <h6 style="margin-left: 130px;" class="card-title"><b>Item</b></h6>
                            </div>
                            <div class="col-md-1">
                                <h6 style="margin-left: 90px;" class="card-title"><b>Quantity</b></h6>
                            </div>
                            <div class="col-md-1">
                                <h6 style="margin-left: 140px;" class="card-title"><b>Rate</b></h6>
                            </div>
                            <div class="col-md-3">
                                <h6 style="margin-left: 180px;" class="card-title"><b>Amount</b></h6>
                            </div>
                        </div>
                        <div>
                            <div class="list-keep scroll-touch" style="height: 200px;width:700px;"
                                 :data-key="'id'"
                                 :estimate-size="100"
                                 :item-class="'list-item-keep'">
                                <div class="item-inner" v-for="(item,index) in 20" :set="index=index+1">
                                    <div class="row">
                                        <div class="col-md-1" style="color: #6a6a6a;padding-right: 2px;">
                                            <input style="padding-right: 6px;" type="text" class="form-control" id=""
                                                   disabled
                                                   v-model="index">
                                        </div>
                                        <div class="col-md-5" style="padding: 0px;">
                                            <input style="padding: 0px;width:392px;" type="text" class="form-control"
                                                   id=""
                                                   v-model="salesVoucherTypes[index].item"
                                                   aria-describedby="currentBalance">
                                        </div>
                                        <div class="col-md-2">
                                            <input style="padding: 0px;width:149px;" type="text" class="form-control"
                                                   id="quantity"
                                                   v-model="salesVoucherTypes[index].quantity"
                                                   aria-describedby="currentBalance">
                                        </div>
                                        <div class="col-md-2">
                                            <input style="padding: 0px;width:150px" type="text" class="form-control"
                                                   id="rate"
                                                   v-model="salesVoucherTypes[index].rate"
                                                   aria-describedby="currentBalance">
                                        </div>
                                        <div class="col-md-2">
                                            <input style="padding: 0px;" type="text" class="form-control" id="amount"
                                                   @change="onChange(salesVoucherTypes[index].item,salesVoucherTypes[index].quantity,salesVoucherTypes[index].rate,salesVoucherTypes[index].amount,referenceNumber)"
                                                   v-model="salesVoucherTypes[index].amount"
                                                   aria-describedby="currentBalance">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <span style="color: black;" class="form-group">Narration</span>
                            <textarea cols="4" type="text" class="form-control" v-model="narration"
                                      aria-describedby="narration"></textarea>
                        </div>

                        <div style="margin-left: 50px;" class="col-md-6">
                            <div v-show="show">
                                <span style="margin-left: 80px;background-color: #4fc08d;width:50px;">{{types.salesVoucherTypeTotalDTO.quantityTotal}}</span>
                                <span style="margin-left: 80px;background-color: #4fc08d;width:50px;">{{types.salesVoucherTypeTotalDTO.rateTotal}}</span>
                                <span style="margin-left: 60px;background-color: #4fc08d;width:50px;">{{types.salesVoucherTypeTotalDTO.amountTotal}}</span>
                                <input style="padding: 0px;width:454px;" type="text" class="form-control" id=""
                                       v-model="types.salesVoucherTypeTotalDTO.amountTotal" hidden
                                       aria-describedby="currentBalance">
                            </div>
                            <br>
                            <button style="margin-left: 150px;" @click="save()" type="submit" class="btn btn-primary">
                                Save
                            </button>
                            <button @click="cancel()" type="submit" class="btn btn-primary">Exit</button>
                        </div>
                    </div>
                </div>
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
          show: false,
          accountingVoucerDetail: '',
          windowHeight: '',
          type: '',
          salesVoucherTypes: [{
            amount: '',
            item: '',
            quantity: '',
            rate: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: ''
          }],
          types: {
            salesVoucherTypeTotalDTO: {
              quantityTotal: '',
              rateTotal: '',
              amountTotal: ''
            }
          },
          referenceNumber: '',
          salesLedger: '',
          formName: '',
          currentBalance: '',
          narration: '',
          particulars: '',
          amount: '',
          accountName: '',
          grandTotal: 0,
          errorMessage: false,
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
      mounted () {
        window.addEventListener('resize', () => {
          this.windowHeight = window.innerHeight
        })
        /* const TOTAL_COUNT = 10
                    let count = TOTAL_COUNT
                    while (count--) {
                      const index = TOTAL_COUNT - count
                      DataItems.push({
                        index,
                        total: {
                          referenceNumber: this.referenceNumber
                        },
                        checked: false
                      })
                    } */
      },
      methods: {
        onChange (i, q, r, a, rn) {
          const item = {
            amount: a,
            item: i,
            quantity: q,
            rate: r,
            referenceNumber: rn
          }
          SH.ajax.callRemote(`http://127.0.0.1:8080/api/sales-voucher-types`, item, 'POST', function (data) {
            if (data) {
              this.types = data
              this.show = true
            } else {
              this.types = 'Error Fetching Data'
            }
          }.bind(this))
        },
        cancel: function () {
          this.$emit('close')
        },
        save: function () {
          const item = {
            accountName: this.referenceNumber,
            currentBalance: this.currentBalance,
            salesLedger: this.salesLedger,
            grandTotal: this.types.salesVoucherTypeTotalDTO.amountTotal,
            narration: this.narration,
            accountingVoucherType: 'Sales'
          }
          SH.ajax.callRemote(`http://127.0.0.1:8080/api/accounting-vouchers`, item, 'POST', function (data) {
            if (data) {
              this.accountingVoucerDetail = data
              this.show = true
            } else {
              this.accountingVoucerDetail = 'Error Fetching Data'
            }
          }.bind(this))
        },
        retriveTypes: function () {
          SH.ajax.callRemote(`http://127.0.0.1:8080/api/accounting-vouchers/types`, '', 'GET', function (data) {
            if (data) {
              this.type = data
            } else {
              this.type = 'Error Fetching Data'
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
