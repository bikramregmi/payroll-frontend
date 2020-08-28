<template>
    <div>
        <div class="item-inner">
            <!--            <div class="row" v-for="(item,index) in page">-->
            <div class="input-group"><p style="color: red;">{{source.narration}}{{source.referenceNumber}}{{source.salesLedger}}{{source.currentBalance}}</p>
                <input type="text" class="form-control" id="sheet-class" v-model="inventoryVouchers.item"
                       aria-describedby="currentBalance">
                <input type="text" class="form-control" id="quantity" v-model="inventoryVouchers.quantity"
                       aria-describedby="currentBalance">
                <input type="text" class="form-control" id="rate" v-model="inventoryVouchers.rate"
                       aria-describedby="currentBalance">
                <input type="text" class="form-control" id="amount"
                       @change="onChange(inventoryVouchers.item,inventoryVouchers.quantity,inventoryVouchers.rate,inventoryVouchers.amount,source.name)"
                       v-model="inventoryVouchers.amount"
                       aria-describedby="currentBalance">
                <!--                    <button @click="test(inventoryVouchers.amount)">click</button>-->
                <!--                </div>-->
            </div>
            <!--            <input class="text" @change="onChange" type="text"/>-->
            <!--            <span style="color: greenyellow" class="name" @click="onClickName">{{ source.name }}</span>-->
        </div>
        <div style="color: red"   :data-sources="items"
             :data-component="itemComponent">{{types.salesVoucherTypeTotalDTO.quantityTotal}}</div>
    </div>
</template>

<script>
    // import mixins from './mixins'
    import SH from '../../../../backend/backend'
    import ItemComponent from '../item'
    import Main from './Main'
    import {baseApiUrl} from '../../../../backend/stringConstants'
const DataItems = []

    export default {
      name: 'keep-state-item',
      components: {ItemComponent},
      // mixins: [mixins],
      data () {
        return {
          items: DataItems,
          itemComponent: Main,
          // page: [1, 2, 3, 4, 5, 6, 7, 8],
          inventoryVouchers: {
            amount: '',
            item: '',
            quantity: '',
            rate: ''
          },
          data: '',
          hell: 'welcom',
          referenceNumber: '',
          total: '',
          types: {
            salesVoucherTypeTotalDTO: {
              quantityTotal: '',
              rateTotal: '',
              amountTotal: ''
            }
          }
        }
      },
      props: {
        source: {
          type: Object,
          default () {
            return {}
          }
        }},
      methods: {
        onChange (i, q, r, a, rn) {
          alert(i + q + r + a)
          const item = {
            amount: a,
            item: i,
            quantity: q,
            rate: r,
            referenceNumber: rn
          }
          SH.ajax.callRemote(baseApiUrl + `sales-voucher-types`, item, 'POST', function (data) {
            if (data) {
              this.types = data
              alert(this.types.item)
              DataItems.push({
                item: this.types.item
              })
            } else {
              this.types = 'Error Fetching Data'
            }
          }.bind(this))
        },

        onClickName () {
          // this.dispatch('keep-state', 'checkBoxValueChange', this.source.id, !this.source.checked)
        }
      }
    }
</script>

<style lang="less" scoped>
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
