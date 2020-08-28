<template>
    <div>
        <h5 id="list-group-design" class="card-title">List of Group</h5>
        <hr>
                 <button class="btn btn-primary m-1" @click="openPopup()" >Add New Group</button>
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
                    <tr v-for="(item,itemIndex) in group">
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
        <paginate v-show="group.length>2"
                  v-model="page"
                  :click-handler="retriveGroup"
                  :container-class="'pagination'"
                  :page-class="'page-item'"
                  :pageLinkClass="'page-link-item'"
                  :page-count="page+1"
        >
        </paginate>
        <div v-show="group.length<1">
            <p style="color:black;margin-left: 10px;">Data Not Available</p>
            <paginate
                    v-model="page"
                    :click-handler="retriveGroup"
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
    import Group from '../../accountInfo/group/AddGroup'
    import SH from '../../../../backend/backend'
    import EditGroup from '../../accountInfo/group/EditGroup'
    import {baseApiUrl} from '../../../../backend/stringConstants'
    export default {
      name: 'ListGroup',
      data () {
        return {
          group: '',
          text: '',
          page: 1,
          queryCount: null,
          previousPage: 1,
          itemsPerPage: 3
        }
      },
      created () {
        this.retriveGroup()
      },
      methods: {
        cancel: function () {
          this.$emit('close')
        },
        edit: function (id) {
          this.$modal.show(EditGroup,
            {id: id},
            {draggable: true})
        },
        deleteItem: function (id) {
          SH.ajax.callRemote(baseApiUrl + `group/${id}`, '', 'DELETE', function (data) {
            alert('Deleted Successfully')
            this.cancel()
          }.bind(this))
        },
        openPopup: function () {
          this.$modal.show(Group,
            {draggable: true})
        },
        retriveGroup: function (pageNum) {
          const paginationQuery = {
            page: pageNum - 1,
            size: this.itemsPerPage,
            sort: 'desc'
          }
          SH.ajax.callRemote(baseApiUrl + `group?` + 'page=' + paginationQuery.page + '&size=' + paginationQuery.size + '&sort=' + paginationQuery.sort, '', 'GET', function (data) {
            if (data) {
              this.group = data
            } else {
              this.group = 'Error Fetching Data'
            }
          }.bind(this))
        }
      }
    }
</script>

<style scoped>

</style>
