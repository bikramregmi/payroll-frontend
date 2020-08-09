<template>

    <div>
        <h5 id="list-group-design" class="card-title">List of Ledgers</h5>
        <hr>
        <button @click="openPopup()" class="btn btn-primary m-1">Add New Ledger</button>
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
                    <tr v-for="(item,itemIndex) in ledgers">
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
        <paginate v-show="ledgers.length>2"
                  v-model="page"
                  :click-handler="retriveLedger"
                  :container-class="'pagination'"
                  :page-class="'page-item'"
                  :pageLinkClass="'page-link-item'"
                  :page-count="page+1"
        >
        </paginate>
        <div v-show="ledgers.length<1">
            <p style="color:black;margin-left: 10px;">Data Not Available</p>
            <paginate
                    v-model="page"
                    :click-handler="retriveLedger"
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
    import EditLedger from '../../accountInfo/ledger/EditLedger'
    import AddLedger from '../../accountInfo/ledger/AddLedger'
    import SH from '../../../../backend/backend'
    export default {
      name: 'ListLedger',
      data () {
        return {
          ledgers: '',
          text: '',
          page: 1,
          queryCount: null,
          previousPage: 1,
          itemsPerPage: 3
        }
      },
      created () {
        this.retriveLedger()
      },
      methods: {
        cancel: function () {
          this.$modal.hideAll()
        },
        edit: function (id) {
          this.$modal.show(EditLedger,
            {id: id},
            {draggable: true})
        },
        deleteItem: function (id) {
          SH.ajax.callRemote(`http://127.0.0.1:8080/api/ledgers/${id}`, '', 'DELETE', function (data) {
            alert('Deleted Successfully')
            this.cancel()
          }.bind(this))
        },
        openPopup: function () {
          this.$modal.show(AddLedger,
            {draggable: true})
        },
        retriveLedger: function (pageNum) {
          const paginationQuery = {
            page: pageNum - 1,
            size: this.itemsPerPage,
            sort: 'desc'
          }
          SH.ajax.callRemote(`http://127.0.0.1:8080/api/ledgers?` + 'page=' + paginationQuery.page + '&size=' + paginationQuery.size + '&sort=' + paginationQuery.sort, '', 'GET', function (data) {
            if (data) {
              this.ledgers = data
            } else {
              this.ledgers = 'Error Fetching Data'
            }
          }.bind(this))
        }
      }
    }
</script>

<style scoped>

</style>
