<template>
    <div class="popup-class">
        <h5 style="margin-top: 5px;" class="card-title">Inventory Voucher/ Stock Journal Voucher</h5>
        <hr>
        <div class="example-content">
            <div class="row">
                <div class="col-md-1">
                    <h6 style="margin-left: 10px;" class="card-title"><b>Sn</b></h6>
                </div>
                <div class="col-md-3">
                    <h6 style="" class="card-title"><b>Item (Source)</b></h6>
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
                <div class="list-keep scroll-touch" style="height: 135px;width:700px;"
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
                                       @keyup="onCalculateAmount(inventoryVouchers[index].rate,inventoryVouchers[index].quantity,index,'source')"
                                       aria-describedby="currentBalance">
                            </div>
                            <div class="col-md-2" id="padding">
                                <input type="text" class="form-control" id="amount"
                                       @keyup="onChange(inventoryVouchers[index].item,inventoryVouchers[index].quantity,inventoryVouchers[index].rate,inventoryVouchers[index].amount,index,types.voucherNumber,'source')"
                                       v-model="inventoryVouchers[index].amount"
                                       aria-describedby="currentBalance">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div style="margin-left: 50px;" class="col-md-6">
            <div style="width:700px;">
                <span style="margin-left: 300px;background-color: #4fc08d;width:50px;">{{types.inventoryVoucher.srQuantityTotal}}</span>
                <span style="margin-left: 220px;background-color: #4fc08d;width:150px;">{{types.inventoryVoucher.srAmountTotal}}</span>
                <input style="padding: 0px;width:454px;" type="text" class="form-control" id=""
                       v-model="types.srAmountTotal" hidden
                       aria-describedby="currentBalance">
            </div>
        </div>
        <br>
        <div class="example-content">
            <div class="row">
                <div class="col-md-1">
                    <h6 style="margin-left: 10px;" class="card-title"><b>Sn</b></h6>
                </div>
                <div class="col-md-3">
                    <h6 class="card-title"><b>Item (Destination)</b></h6>
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
                <div class="list-keep scroll-touch" style="height: 135px;width:700px;"
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
                                       v-model="inventoryVouchersDes[index].uniqueKey" hidden>
                                <input type="text" class="form-control"
                                       id=""
                                       @change="clearValue(inventoryVouchersDes[index].item,inventoryVouchersDes[index].quantity,inventoryVouchersDes[index].rate,inventoryVouchersDes[index].amount)"
                                       v-model="inventoryVouchersDes[index].item"
                                       aria-describedby="currentBalance">
                            </div>
                            <div class="col-md-2" id="padding">
                                <input type="text" class="form-control"
                                       id="quantity"
                                       v-model="inventoryVouchersDes[index].quantity"
                                       aria-describedby="currentBalance">
                            </div>
                            <div class="col-md-2" id="padding">
                                <input type="text" class="form-control"
                                       id="rate"
                                       @keyup="onCalculateAmount(inventoryVouchersDes[index].rate,inventoryVouchersDes[index].quantity,index,'destination')"
                                       v-model="inventoryVouchersDes[index].rate"
                                       aria-describedby="currentBalance">
                            </div>
                            <div class="col-md-2" id="padding">
                                <input type="text" class="form-control" id="amount"
                                       @keyup="onChange(inventoryVouchersDes[index].item,inventoryVouchersDes[index].quantity,inventoryVouchersDes[index].rate,inventoryVouchersDes[index].amount,index,types.voucherNumber,'destination')"
                                       v-model="inventoryVouchersDes[index].amount"
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
                <div v-show="show" style="width:700px;">
                    <span style="margin-left: 70px;background-color: #4fc08d;width:50px;">{{types.inventoryVoucher.desQuantityTotal}}</span>
                    <span style="margin-left: 200px;background-color: #4fc08d;width:150px;">{{types.inventoryVoucher.desAmountTotal}}</span>
                    <input style="padding: 0px;width:454px;" type="text" class="form-control" id=""
                           v-model="types.desAmountTotal" hidden
                           aria-describedby="currentBalance">
                </div>
                <br>
                <input style="padding: 0px;width:454px;" type="text" class="form-control" id=""
                       v-model="types.voucherNumber" hidden
                       aria-describedby="currentBalance">
                <input style="padding: 0px;width:454px;" type="text" class="form-control" id=""
                       v-model="types.id" hidden
                       aria-describedby="currentBalance">
                <button style="margin-left: 150px;" @click="save()" type="submit" class="btn btn-primary">
                    Save
                </button>
                <button @click="cancel()" type="submit" class="btn btn-primary">Exit</button>
            </div>
        </div>
    </div>
</template>


<script>
    import SH from '../../../backend/backend'

    export default {
      name: 'InventoryVoucher',
      data () {
        return {
          show: false,
          windowHeight: '',
          inventoryVouchers: [{
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: ''
          }],
          inventoryVouchersDes: [{
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: ''
          }, {
            amount: '',
            item: '',
            quantity: '',
            rate: '',
            uniqueKey: ''
          }],
          types: {
            id: '',
            inventoryVoucher: {
              srQuantityTotal: '',
              srAmountTotal: '',
              desQuantityTotal: '',
              desAmountTotal: ''
            }
          },
          referenceNumber: '',
          narration: '',
          grandTotal: 0,
          errorMessage: false,
          inventoryVoucerDetail: ''
        }
      },
      methods: {
        clearValue: function (item, quantity, rate, amount) {
          if (item != null && quantity === '' && rate === '' && amount === '') {
            this.types.id = ''
          } else if (quantity != null && item === '' && rate === '' && amount === '') {
            this.types.id = ''
          }
        },
        onCalculateAmount: function (rate, quantity, index, type) {
          if (type === 'source') { this.inventoryVouchers[index].amount = rate * quantity } else this.inventoryVouchersDes[index].amount = rate * quantity
        },
        onChange (i, q, r, a, uk, rn, id) {
          let item
          if (id === 'source') {
            item = {
              id: this.types.id,
              srAmount: q * r,
              srItem: i,
              srQuantity: q,
              srRate: r,
              uniqueKey: uk,
              voucherNumber: rn,
              extraField: id
            }
          } else {
            item = {
              id: this.types.id,
              desAmount: q * r,
              desItem: i,
              desQuantity: q,
              desRate: r,
              uniqueKey: uk,
              voucherNumber: rn,
              extraField: id
            }
          }
          SH.ajax.callRemote(`http://127.0.0.1:8080/api/inventory-voucher-entries`, item, 'POST', function (data) {
            if (data) {
              this.types = data
              this.show = true
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
            voucherNumber: this.types.voucherNumber,
            narration: this.narration
          }
          SH.ajax.callRemote(`http://127.0.0.1:8080/api/inventory-vouchers`, item, 'PUT', function (data) {
            if (data) {
              this.inventoryVoucerDetail = data
              // this.this.show = true
              this.$emit('close')
            } else {
              this.inventoryVoucerDetail = 'Error Fetching Data'
            }
          }.bind(this))
        }
      }

    }
</script>

<style scoped>
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
