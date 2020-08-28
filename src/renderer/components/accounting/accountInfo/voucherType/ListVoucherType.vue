<template>
    <div>
        <h5 id="list-group-design" class="card-title">List of Voucher Types</h5>
        <hr>
        <button @click="openPopup()" class="btn btn-primary m-1">Add New Voucher Type</button>
        <div class="row">
            <div class="col-lg-12 ">
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,itemIndex) in voucherTypes">
                        <th scope="row">{{itemIndex+1}}</th>
                        <td>{{item.name}}</td>
                        <td>
                            <button v-shortkey="['esc']" @shortkey="cancel()" @click="edit(item.id)" type="submit" class="btn btn-secondary">Edit</button>
                            <button v-shortkey="['esc']" @shortkey="cancel()" @click="deleteItem(item.id)" type="submit" class="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <paginate v-show="voucherTypes.length>2"
                  v-model="page"
                  :click-handler="retriveVoucherType"
                  :container-class="'pagination'"
                  :page-class="'page-item'"
                  :pageLinkClass="'page-link-item'"
                  :page-count="page+1"
        >
        </paginate>
        <div v-show="voucherTypes.length<1">
            <p style="color:black;margin-left: 10px;">Data Not Available</p>
            <paginate
                    v-model="page"
                    :click-handler="retriveVoucherType"
                    :container-class="'pagination'"
                    :page-class="'page-item'"
                    :pageLinkClass="'page-link-item'"
                    :page-count="page+1"
            >
            </paginate>
        </div>
    </div>
</template>

<script>
    import EditVoucherType from '../../accountInfo/voucherType/EditVoucherType'
    import AddVoucherType from '../../accountInfo/voucherType/AddVoucherType'
    import SH from '../../../../backend/backend'
    import {baseApiUrl} from '../../../../backend/stringConstants'
export default {
      name: 'ListVoucherType',
      data () {
        return {
          voucherTypes: '',
          text: '',
          page: 1,
          queryCount: null,
          previousPage: 1,
          itemsPerPage: 3
        }
      },
      created () {
        this.retriveVoucherType()
      },
      methods: {
        cancel: function () {
          this.$emit('close')
        },
        edit: function (id) {
          this.$modal.show(EditVoucherType,
            {id: id},
            {draggable: true})
        },
        deleteItem: function (id) {
          SH.ajax.callRemote(baseApiUrl + `voucher-types/${id}`, '', 'DELETE', function (data) {
            alert('Deleted Successfully')
            this.cancel()
          }.bind(this))
        },
        openPopup: function () {
          this.$modal.show(AddVoucherType,
            {draggable: true})
        },
        retriveVoucherType: function (pageNum) {
          const paginationQuery = {
            page: pageNum - 1,
            size: this.itemsPerPage,
            sort: 'desc'
          }
          SH.ajax.callRemote(baseApiUrl + `voucher-types?` + 'page=' + paginationQuery.page + '&size=' + paginationQuery.size + '&sort=' + paginationQuery.sort, '', 'GET', function (data) {
            if (data) {
              this.voucherTypes = data
            } else {
              this.voucherTypes = 'Error Fetching Data'
            }
          }.bind(this))
        }
      }
    }
</script>

<style scoped>

</style>
