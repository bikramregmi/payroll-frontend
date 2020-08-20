<template>
    <div class="example">
        <!--        <introduction style="color: red" description="Accounting Voucher" />-->
        <div class="example-content">
            <div class="row">
                <div class="col-md-4">
                    <h6>Ref No: </h6>
                    <p style="color: #4fc08d">{{source.item}}</p>
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
            <div class="row">
                <div class="col-md-1">
                    <h6 style="margin-left: 130px;" class="card-title"><u><b>Sn</b></u></h6>
                </div>
                <div class="col-md-3">
                    <h6 style="margin-left: 130px;" class="card-title"><u><b>Item</b></u></h6>
                </div>
                <div class="col-md-3">
                    <h6 style="margin-left: 200px;" class="card-title"><u><b>Quantity</b></u></h6>
                </div>
                <div class="col-md-2">
                    <h6 style="margin-left: 100px;" class="card-title"><u><b>Rate</b></u></h6>
                </div>
                <div class="col-md-3">
                    <h6 style="margin-left: 70px;" class="card-title"><u><b>Amount</b></u></h6>
                </div>
            </div>
            <div>
                <div class="list-keep scroll-touch" style="height: 304px;width:900px;"
                     :data-key="'id'"
                     :estimate-size="100"
                     :item-class="'list-item-keep'">
                    <div class="item-inner" v-for="(item,index) in 10" :set="index=index+1">
                        <div class="row">
                            <div class="col-md-1" style="color: #6a6a6a;padding-right: 2px;">
                                <input style="" type="text" class="form-control" id=""
                                       v-model="index">
                            </div>
                            <div class="col-md-5" style="padding: 0px;">
                                <input style="padding: 0px;width:392px;" type="text" class="form-control" id=""
                                       v-model="salesVoucherTypes[index].item"
                                       aria-describedby="currentBalance">
                            </div>
                            <div class="col-md-2">
                                <input style="padding: 0px;width:149px;" type="text" class="form-control" id="quantity"
                                       v-model="salesVoucherTypes[index].quantity"
                                       aria-describedby="currentBalance">
                            </div>
                            <div class="col-md-2">
                                <input style="padding: 0px;width:150px" type="text" class="form-control" id="rate"
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
                <span style="margin-left: 100px;background-color: #4fc08d;width:50px;">{{types.salesVoucherTypeTotalDTO.quantityTotal}}</span>
                <span style="margin-left: 100px;background-color: #4fc08d;width:50px;">{{types.salesVoucherTypeTotalDTO.rateTotal}}</span>
                <span style="margin-left: 150px;background-color: #4fc08d;width:50px;">{{types.salesVoucherTypeTotalDTO.amountTotal}}</span>
                <input style="padding: 0px;width:454px;" type="text" class="form-control" id=""
                       v-model="types.salesVoucherTypeTotalDTO.amountTotal" hidden
                       aria-describedby="currentBalance">
                </div>
                <br>
                <button style="margin-left: 350px;" @click="save()" type="submit" class="btn btn-primary">Save</button>
                <button @click="save()" type="submit" class="btn btn-primary">Exit</button>
            </div>
        </div>
    </div>
</template>

<script>
    import Item from './Item'
    import genUniqueId from '../../common/gen-unique-id'
    import SH from '../../../../backend/backend'

    const DataItems = []

    export default {
      name: 'keep-state',
      props: {
        source: {
          type: Object,
          default () {
            return {}
          }
        }
      },
      data () {
        return {
          show: false,
          items: DataItems,
          itemComponent: Item,
          accountingVoucerDetail: '',
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
          }],
          types: {
            salesVoucherTypeTotalDTO: {
              quantityTotal: '',
              rateTotal: '',
              amountTotal: ''
            }
          },
          narration: '',
          grandTotal: '',
          referenceNumber: '',
          salesLedger: '',
          currentBalance: ''
        }
      },
      mounted () {
        const TOTAL_COUNT = 10
        let count = TOTAL_COUNT
        while (count--) {
          const index = TOTAL_COUNT - count
          DataItems.push({
            index,
            total: {
              referenceNumber: this.referenceNumber
            },
            id: genUniqueId(index),
            checked: false
          })
        }
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

        .checkbox {
            text-align: center;
            width: 30px;
            height: 30px;
            border: none;
            outline: none;
            appearance: none;
            margin: 0;
        }

        .checkbox {
            background-color: #fff;
            background-repeat: no-repeat;
            background-position: center left;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='-10 -18 100 135'%3E%3Ccircle cx='50' cy='50' r='50' fill='none' stroke='%23ededed' stroke-width='3'/%3E%3C/svg%3E");
        }

        .checkbox:checked {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='-10 -18 100 135'%3E%3Ccircle cx='50' cy='50' r='50' fill='none' stroke='%23c28ce2' stroke-width='3'/%3E%3Cpath fill='%239b4dca' d='M72 25L42 71 27 56l-4 4 20 20 34-52z'/%3E%3C/svg%3E");
        }
    }
</style>
