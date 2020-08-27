<template>
    <div class="popup-class">
        <h5 class="card-title"><span style="pointer-events: bounding-box" @click="showForm(item)" v-for="item in type"
                                     v-shortkey="['alt', item.charAt(0).toLowerCase()]" @shortkey="showForm(item)">&nbsp;&nbsp;{{item}}&nbsp;&nbsp;</span>
        </h5>
        <hr>
        <div style="margin-top: 50px;margin-left:100px;" v-show="!show">
            <h6 class="card-title"><b> Accounting Voucher
            </b></h6>
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
                <div class="example-content">
                    <div class="row">
                        <div class="col-md-4">
                            <h6>Account: </h6>
                            <input type="text" class="form-control" id="sheet-class" v-model="referenceNumber"
                                   aria-describedby="referenceNumber">
                        </div>
                        <div class="col-md-4">
                            <h6 class="card-title">Current Balance: </h6>
                            <input type="text" class="form-control" id="sheet-class" v-model="currentBalance"
                                   aria-describedby="currentBalance">
                        </div>
                    </div>
                    <div class="row" v-if="windowHeight>600">
                        <div class="col-md-1">
                            <h6 style="margin-left: 10px;" class="card-title"><b>Sn</b></h6>
                        </div>
                        <div class="col-md-6">
                            <h6 style="margin-left: 10px;" class="card-title"><b>Particulars</b></h6>
                        </div>
                        <div class="col-md-4">
                            <h6 class="card-title"><b>Amount</b></h6>
                        </div>
                    </div>
                    <div class="row" v-else>
                        <div class="col-md-1">
                            <h6 style="margin-left: 10px;" class="card-title"><b>Sn</b></h6>
                        </div>
                        <div class="col-md-6">
                            <h6 style="margin-left: 10px;" class="card-title"><b>Particulars</b></h6>
                        </div>
                        <div class="col-md-4">
                            <h6 class="card-title"><b>Amount</b></h6>
                        </div>
                    </div>
                    <div>
                        <div class="list-keep scroll-touch" style="height: 200px;width:700px;"
                             :data-key="'id'"
                             :estimate-size="100"
                             :item-class="'list-item-keep'">
                            <div class="item-inner" v-for="(item,index) in 20" :set="index=index+1">
                                <div class="row">
                                    <input type="text" class="form-control"
                                           v-model="types.id" hidden>
                                    <div class="col-md-1" style="color: #6a6a6a;padding-right: 0px;">
                                        <input style="padding-right: 6px;" type="text" class="form-control" id=""
                                               disabled v-model="index">
                                    </div>
                                    <div class="col-md-7" id="padding">
                                        <input type="text" class="form-control"
                                               @change="clearSomeValue(inventoryVouchers[index].item,inventoryVouchers[index].amount)"
                                               v-model="inventoryVouchers[index].item"
                                               aria-describedby="currentBalance">
                                    </div>
                                    <div class="col-md-4" id="padding">
                                        <input type="text" class="form-control"
                                               id="amount"
                                               @change="onSomeChange(inventoryVouchers[index].item,'','','', inventoryVouchers[index].amount,index,referenceNumber)"
                                               v-model="inventoryVouchers[index].amount"
                                               aria-describedby="amount">
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
                            <span style="margin-left: 60px;background-color: #4fc08d;width:150px;">{{types.salesVoucherTypeTotalDTO.amountTotal}}</span>
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
            <!--            end for payment-->
            <!--            for  sales, Buy-->
            <div v-show="showSForm">
                <div class="example">
                    <div class="example-content">
                        <div class="row">
                            <div class="col-md-4">
                                <h6 v-show="showSales">Ref No: </h6>
                                <h6 v-show="showBuy">Invoice No: </h6>
                                <input type="text" class="form-control" id="sheet-class" v-model="referenceNumber"
                                       aria-describedby="referenceNumber">
                            </div>
                            <div class="col-md-4">
                                <h6 class="card-title">Current Balance: </h6>
                                <input type="text" class="form-control" id="sheet-class" v-model="currentBalance"
                                       aria-describedby="currentBalance">
                            </div>
                        </div>
                        <div class="row" v-if="windowHeight>600">
                            <div class="col-md-1">
                                <h6 style="margin-left: 10px;" class="card-title"><b>Sn</b></h6>
                            </div>
                            <div class="col-md-3">
                                <h6 style="margin-left: 90px;" class="card-title"><b>Item</b></h6>
                            </div>
                            <div class="col-md-1">
                                <h6 style="margin-left: 100px;" class="card-title"><b>Quantity</b></h6>
                            </div>
                            <div class="col-md-1">
                                <h6 style="margin-left: 140px;" class="card-title"><b>Rate</b></h6>
                            </div>
                            <div class="col-md-3">
                                <h6 style="margin-left: 190px;" class="card-title"><b>Amount</b></h6>
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
                                <h6 style="margin-left: 190px;" class="card-title"><b>Amount</b></h6>
                            </div>
                        </div>
                        <div>
                            <div class="list-keep scroll-touch" style="height: 200px;width:700px;"
                                 :data-key="'id'"
                                 :estimate-size="100"
                                 :item-class="'list-item-keep'">
                                <div class="item-inner" v-for="(item,index) in 20" :set="index=index+1">
                                    <div class="row">
                                        <input type="text" class="form-control"
                                               v-model="types.id" hidden>
                                        <div class="col-md-1" style="color: #6a6a6a;padding-right: 0px;">
                                            <input style="padding-right: 6px;" type="text" class="form-control" id=""
                                                   disabled
                                                   v-model="index">
                                        </div>
                                        <div class="col-md-5" id="padding">
                                            <input type="text" class="form-control"
                                                   value="index"
                                                   v-model="inventoryVouchers[index].uniqueKey" hidden>
                                            <input type="text" class="form-control"
                                                   id=""
                                                   @change="clearValue(inventoryVouchers[index].item,inventoryVouchers[index].quantity,inventoryVouchers[index].rate,inventoryVouchers[index].amount)"
                                                   v-model="inventoryVouchers[index].item"
                                                   aria-describedby="currentBalance">
                                        </div>
                                        <div class="col-md-2" id="padding">
                                            <input type="text" class="form-control"
                                                   id="quantity"
                                                   v-model="inventoryVouchers[index].quantity"
                                                   aria-describedby="currentBalance">
                                        </div>
                                        <div class="col-md-2" id="padding">
                                            <input type="text" class="form-control"
                                                   id="rate"
                                                   v-model="inventoryVouchers[index].rate"
                                                   aria-describedby="currentBalance">
                                        </div>
                                        <div class="col-md-2" id="padding">
                                            <input type="text" class="form-control" id="amount"
                                                   @keyup="onChange(inventoryVouchers[index].item,inventoryVouchers[index].quantity,inventoryVouchers[index].rate,inventoryVouchers[index].amount,index,referenceNumber)"
                                                   v-model="inventoryVouchers[index].amount"
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
                                <span style="margin-left: 60px;background-color: #4fc08d;width:150px;">{{types.salesVoucherTypeTotalDTO.amountTotal}}</span>
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
                <div class="example-content">
                    <div class="row">
                        <div class="col-md-4">
                            <h6>No: </h6>
                            <input type="text" class="form-control" id="sheet-class" v-model="referenceNumber"
                                   aria-describedby="referenceNumber">
                        </div>
                        <div class="col-md-4">
                            <h6 class="card-title">Date: </h6>
                            <input type="text" class="form-control" id="sheet-class" v-model="currentBalance"
                                   aria-describedby="currentBalance">
                        </div>
                    </div>
                    <div class="row" v-if="windowHeight>600">
                        <div class="col-md-1">
                            <h6 style="margin-left: 10px;" class="card-title"><b>Sn</b></h6>
                        </div>
                        <div class="col-md-5">
                            <h6 style="margin-left: 10px;" class="card-title"><b>Particulars</b></h6>
                        </div>
                        <div class="col-md-3">
                            <h6 class="card-title"><b>Debit</b></h6>
                        </div>
                        <div class="col-md-3">
                            <h6 class="card-title"><b>Credit</b></h6>
                        </div>
                    </div>
                    <div class="row" v-else>
                        <div class="col-md-1">
                            <h6 style="margin-left: 10px;" class="card-title"><b>Sn</b></h6>
                        </div>
                        <div class="col-md-5">
                            <h6 style="margin-left: 10px;" class="card-title"><b>Particulars</b></h6>
                        </div>
                        <div class="col-md-3" >
                            <h6 style="margin-left: 50px;" class="card-title"><b>Debit</b></h6>
                        </div>
                        <div class="col-md-3">
                            <h6 class="card-title"><b>Credit</b></h6>
                        </div>
                    </div>
                    <div>
                        <div class="list-keep scroll-touch" style="height: 200px;width:700px;"
                             :data-key="'id'"
                             :estimate-size="100"
                             :item-class="'list-item-keep'">
                            <div class="item-inner" v-for="(item,index) in 20" :set="index=index+1">
                                <div class="row">
                                    <input type="text" class="form-control"
                                           v-model="types.id" hidden>
                                    <div class="col-md-1" style="color: #6a6a6a;padding-right: 0px;">
                                        <input style="padding-right: 6px;" type="text" class="form-control" id=""
                                               disabled v-model="index">
                                    </div>
                                    <div class="col-md-7" id="padding">
                                        <input type="text" class="form-control"
                                               id=""
                                               @change="clearSomeValue(inventoryVouchers[index].item,inventoryVouchers[index].debit)"
                                               v-model="inventoryVouchers[index].item"
                                               aria-describedby="currentBalance">
                                    </div>
                                    <div class="col-md-2" id="padding">
                                        <input type="text" class="form-control"
                                               id="debit"
                                               @change="onSomeChange(inventoryVouchers[index].item,currentBalance,inventoryVouchers[index].debit,inventoryVouchers[index].credit,'',index,referenceNumber)"
                                               v-model="inventoryVouchers[index].debit"
                                               aria-describedby="debit">
                                    </div>
                                    <div class="col-md-2" id="padding">
                                        <input type="text" class="form-control"
                                               id="credit"
                                               @change="onSomeChange(inventoryVouchers[index].item,currentBalance,inventoryVouchers[index].debit,inventoryVouchers[index].credit,'',index,referenceNumber)"
                                               v-model="inventoryVouchers[index].credit"
                                               aria-describedby="credit">
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
                            <span style="margin-left: 60px;background-color: #4fc08d;width:150px;">{{types.salesVoucherTypeTotalDTO.amountTotal}}</span>
                            <input style="padding: 0px;width:454px;" type="text" class="form-control" id=""
                                   v-model="types.salesVoucherTypeTotalDTO.amountTotal" hidden
                                   aria-describedby="currentBalance">
                        </div>
                        <div v-show="showJournal">
                            <span v-show="types.salesVoucherTypeTotalDTO.debitTotal" style="margin-left: 180px;background-color: #4fc08d;width:50px;">{{types.salesVoucherTypeTotalDTO.debitTotal}}</span>
                            <span v-show="!types.salesVoucherTypeTotalDTO.debitTotal" style="margin-left: 180px;background-color: #4fc08d;width:50px;">0</span>
                            <span v-show="types.salesVoucherTypeTotalDTO.creditTotal" style="margin-left: 80px;background-color: #4fc08d;width:50px;">{{types.salesVoucherTypeTotalDTO.creditTotal}}</span>
                            <span v-show="!types.salesVoucherTypeTotalDTO.creditTotal" style="margin-left: 80px;background-color: #4fc08d;width:50px;">0</span>
                            <input style="padding: 0px;width:454px;" type="text" class="form-control" id=""
                                   v-model="types.salesVoucherTypeTotalDTO.debitTotal" hidden
                                   aria-describedby="debitTotal">
                            <input style="padding: 0px;width:454px;" type="text" class="form-control" id=""
                                   v-model="types.salesVoucherTypeTotalDTO.creditTotal" hidden
                                   aria-describedby="creditTotal">
                        </div>

                        <br>
                        <button style="margin-left: 150px;" @click="save()" type="submit" class="btn btn-primary">
                            Save
                        </button>
                        <button @click="cancel()" type="submit" class="btn btn-primary">Exit</button>
                    </div>
                </div>
            </div>
            <!--            end of journal-->
        </div>
        <button hidden v-shortkey="['esc']" @shortkey="cancel()"></button>
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
          inventoryVouchers: [{
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: '',
            debit: '',
            credit: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: '',
            debit: '',
            credit: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: '',
            debit: '',
            credit: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: '',
            debit: '',
            credit: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: '',
            debit: '',
            credit: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: '',
            debit: '',
            credit: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: '',
            debit: '',
            credit: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: '',
            debit: '',
            credit: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: '',
            debit: '',
            credit: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: '',
            debit: '',
            credit: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: '',
            debit: '',
            credit: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: '',
            debit: '',
            credit: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: '',
            debit: '',
            credit: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: '',
            debit: '',
            credit: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: '',
            debit: '',
            credit: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: '',
            debit: '',
            credit: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: '',
            debit: '',
            credit: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: '',
            debit: '',
            credit: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: '',
            debit: '',
            credit: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: '',
            debit: '',
            credit: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: '',
            debit: '',
            credit: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: '',
            debit: '',
            credit: ''
          }],
          types: {
            id: '',
            salesVoucherTypeTotalDTO: {
              quantityTotal: '',
              rateTotal: '',
              amountTotal: '',
              debitTotal: '',
              creditTotal: ''
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
          showBuy: false,
          showPayment: false,
          showReceipt: false,
          showContra: false,
          showJournal: false
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
      },
      methods: {
        calculateAmount: function (quantity, rate, index) {
          if (rate != null) {
            this.inventoryVouchers[index].amount = quantity * rate
          }
        },
        clearValue: function (item, quantity, rate, amount) {
          if (item != null && quantity === '' && rate === '' && amount === '') {
            this.types.id = ''
          } else if (quantity != null && item === '' && rate === '' && amount === '') {
            this.types.id = ''
          }
        },
        clearSomeValue: function (particulars, amount) {
          if (particulars != null && amount === '') {
            this.types.id = ''
          }
        },
        onChange (i, q, r, a, uk, rn) {
          const item = {
            id: this.types.id,
            amount: q * r,
            item: i,
            quantity: q,
            rate: r,
            uniqueKey: uk,
            referenceNumber: rn,
            voucherType: ''
          }
          if (this.showSales === true) {
            item.voucherType = 'Sales'
          } else if (this.showBuy === true) {
            item.voucherType = 'Buy'
          }
          SH.ajax.callRemote(`http://127.0.0.1:8080/api/sales-voucher-types`, item, 'POST', function (data) {
            if (data) {
              this.types = data
              this.show = true
            } else {
              this.types = 'Error Fetching Data'
            }
            this.$forceUpdate()
          }.bind(this))
        },
        onSomeChange (p, d, de, cr, a, uk, rn) {
          alert('45678ghj')
          const item = {
            id: this.types.id,
            item: p,
            extraField: d,
            debit: de,
            credit: cr,
            amount: a,
            uniqueKey: uk,
            referenceNumber: rn,
            voucherType: ''
          }
          if (this.showPayment === true) {
            item.voucherType = 'Payment'
          } else if (this.showReceipt === true) {
            item.voucherType = 'Receipt'
          } else if (this.showContra === true) {
            item.voucherType = 'Contra'
          } else {
            item.voucherType = 'Journal'
          }
          SH.ajax.callRemote(`http://127.0.0.1:8080/api/sales-voucher-types`, item, 'POST', function (data) {
            if (data) {
              this.types = data
              if (data.voucherType === 'Journal') {
                this.showJournal = true
              } else {
                this.show = true
              }
            } else {
              this.types = 'Error Fetching Data'
            }
            this.$forceUpdate()
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
            creditTotal: this.types.salesVoucherTypeTotalDTO.creditTotal,
            debitTotal: this.types.salesVoucherTypeTotalDTO.debitTotal,
            narration: this.narration,
            accountingVoucherType: ''
          }
          if (this.showSales === true) {
            item.accountingVoucherType = 'Sales'
          } else if (this.showBuy === true) {
            item.accountingVoucherType = 'Buy'
          } else if (this.showReceipt === true) {
            item.accountingVoucherType = 'Receipt'
          } else if (this.showPayment === true) {
            item.accountingVoucherType = 'Payment'
          } else if (this.showContra === true) {
            item.accountingVoucherType = 'Contra'
          } else {
            item.accountingVoucherType = 'Journal'
          }
          SH.ajax.callRemote(`http://127.0.0.1:8080/api/accounting-vouchers`, item, 'POST', function (data) {
            if (data) {
              this.accountingVoucerDetail = data
              // this.this.show = true
              this.$emit('close')
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
        showForm: function (data) {
          this.show = true
          this.formName = data
          if (data === 'Payment' || data === 'Receipt' || data === 'Contra') {
            if (data === 'Payment') {
              this.showPayment = true
              this.showReceipt = false
              this.showContra = false
              this.showBuy = false
              this.showSales = false
            } else if (data === 'Receipt') {
              this.showPayment = false
              this.showReceipt = true
              this.showContra = false
              this.showBuy = false
              this.showSales = false
            } else {
              this.showPayment = false
              this.showReceipt = false
              this.showContra = true
              this.showBuy = false
              this.showSales = false
            }
            this.showPForm = true
            this.showSForm = false
            this.showJForm = false
          } else if (data === 'Sales' || data === 'Buy') {
            if (data === 'Sales') {
              this.showSales = true
              this.showBuy = false
              this.showReceipt = false
              this.showContra = false
              this.showPayment = false
            } else {
              this.showBuy = true
              this.showSales = false
              this.showReceipt = false
              this.showContra = false
              this.showPayment = false
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

<style lang="less">
    .selects {
        margin-bottom: 1em;
        font-size: 14px;
    }

    .list-keep {
        width: 100%;
        height: 500px;
        border: 2px solid;
        border-radius: 3px;
        overflow-y: auto;
        border-color: dimgray;

        .list-item-keep {
            display: flex;
            align-items: center;
            padding: 0 1em;
            height: 60px;
            border-bottom: 1px solid;
            border-color: lightgray;
        }
    }

    .item-inner {
        position: relative;
        display: flex;
        align-items: center;

        .index {
            margin-right: 1em;
        }

        .name {
            margin-left: 1em;
            cursor: pointer;
            user-select: none;
        }
    }

</style>
