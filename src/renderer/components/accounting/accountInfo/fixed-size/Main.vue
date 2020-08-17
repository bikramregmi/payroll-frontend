<template>
    <div class="example">
        <introduction style="color: red" description="Accounting Voucher" />
        <div class="example-content">
            <input type="text" class="form-control" id="sheet-class" v-model="referenceNumber"
                   aria-describedby="currentBalance">
            <div class="row">
                <div class="col-md-3">
                    <h6 style="margin-left: 130px;" class="card-title"><u><b>Item</b></u></h6>
                </div>
                <div class="col-md-3">
                    <h6 style="margin-left: 130px;" class="card-title"><u><b>Quantity</b></u></h6>
                </div>
                <div class="col-md-2">
                    <h6 style="margin-left: 100px;" class="card-title"><u><b>Rate</b></u></h6>
                </div>
                <div class="col-md-3">
                    <h6 style="margin-left: 100px;" class="card-title"><u><b>Amount</b></u></h6>
                </div>
            </div>
            <div v-show="isShowView">
                <virtual-list class="list-keep scroll-touch"
                              :data-key="'id'"
                              :data-sources="items"
                              :data-component="itemComponent"

                              :estimate-size="10"
                              :item-class="'list-item-keep'"
                />
            </div>

            <codeblock v-show="!isShowView" />
        </div>
    </div>
</template>

<script>
    import Item from './Item'
    import Code from './Code'

    // import { Random } from '../../common/mock'
    import genUniqueId from '../../common/gen-unique-id'
    import { TAB_TYPE, DEFAULT_TAB } from '../../common/const'

    const TOTAL_COUNT = 10

    const DataItems = []
    let count = TOTAL_COUNT
    while (count--) {
      const index = TOTAL_COUNT - count
      DataItems.push({
        // index,
        name: '1234',
        id: genUniqueId(index)
        // checked: false
      })
    }
    export default {
      name: 'keep-state',

      components: {
        codeblock: Code
      },

      data () {
        return {
          referenceNumber: '',
          items: DataItems,
          itemComponent: Item,
          isShowView: DEFAULT_TAB === TAB_TYPE.VIEW
        }
      },
      methods: {
        /* onTabChange (type) {
          this.isShowView = type === TAB_TYPE.VIEW
        } */
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
</style>
