<template>
    <div>
        <h5 class="card-title">List of all Companies</h5>
        <hr>
        <!--         <button class="btn btn-primary m-1" v-on:click="addNewServiceContact('new')">Add New Contact</button>-->
        <div class="row">
            <div class="col-lg-12 ">
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">SN</th>
                        <th scope="col">Company Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,itemIndex) in company">
                        <th scope="row">{{itemIndex+1}}</th>
                        <td>{{item.companyName}}</td>
                        <td>
                            <button v-show="!item.extraField" @click="selectCompany(item.id,'select')" type="submit" class="btn btn-info">
                                Select
                            </button>
                            <button v-show="item.extraField" @click="selectCompany(item.id,'unselect')" type="submit" class="btn btn-info">
                                Unselect
                            </button>
                        </td>
                        <td>
                            <button v-shortkey="['esc']" @shortkey="cancel()" @click="deleteCompany(item.id)" type="submit" class="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <paginate v-show="company.length>5"
                  v-model="page"
                  :click-handler="getAllCompanies"
                  :container-class="'pagination'"
                  :page-class="'page-item'"
                  :pageLinkClass="'page-link-item'"
                  :page-count="page+1"
        >
        </paginate>
    </div>
</template>


<script>
    import SH from '../../../backend/backend'
    import {baseApiUrl} from '../../../backend/stringConstants'

    export default {
      name: 'ListCompany',
      data () {
        return {
          company: [],
          itemsPerPage: 5,
          queryCount: null,
          previousPage: 1,
          page: 1,
          companySelected: false,
          checkCompany: ''
        }
      },
      created () {
        this.getAllCompanies()
      },
      methods: {
        cancel: function () {
          this.$router.push(`/ADashboard`)
        },
        selectCompany (id, status) {
          this.companySelected = true
          if (status === 'select') {
            this.selectedCompany = true
          } else { this.selectedCompany = '' }
          SH.ajax.callRemote(baseApiUrl + `companies/selectedCompany?id=${id}&selectedCompany=${this.selectedCompany}`, '', 'PUT', function (data) {
          })
          location.reload()
        },
        getAllCompanies: function (pageNum) {
          const paginationQuery = {
            page: pageNum - 1,
            size: this.itemsPerPage,
            sort: 'desc'
          }
          SH.ajax.callRemote(baseApiUrl + `companies?` + 'page=' + paginationQuery.page + '&size=' + paginationQuery.size + '&sort=' + paginationQuery.sort, '', 'GET', function (data) {
            this.company = data
          }.bind(this))
          this.$forceUpdate()
        },
        updateCompanyInformation: function (id) {
          this.$router.push(`/updateEmployeeInformation/${id}`)
        },
        deleteCompany: function (id) {
          SH.ajax.callRemote(baseApiUrl + `companies/${id}`, '', 'DELETE', function (data) {
            location.reload()
            alert('Successfully Deleted')
          })
        }
      }
    }
</script>

<style>
    .pagination {
        display: inline-block;
        padding-left: 0;
        margin: 20px 0;
        border-radius: 4px;
    }

    .pagination > li {
        display: inline;
    }

    .pagination > li > a,
    .pagination > li > span {
        position: relative;
        float: left;
        padding: 6px 12px;
        margin-left: -1px;
        line-height: 1.42857143;
        color: #337ab7;
        text-decoration: none;
        background-color: #fff;
        border: 1px solid #337ab7;
    }
</style>
