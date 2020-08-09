<template>
    <div>
        <h5 class="card-title">List Of All Employees</h5>
        <hr>
        <!--         <button class="btn btn-primary m-1" v-on:click="addNewServiceContact('new')">Add New Contact</button>-->
        <div class="row">
            <div class="col-lg-12 ">
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">SN</th>
                        <th scope="col">Full Name</th>
                        <th scope="col">eCode</th>
                        <th scope="col">Email</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,itemIndex) in employee">
                        <th scope="row">{{itemIndex+1}}</th>
                        <td>{{item.fullName}}</td>
                        <td>{{item.eCode}}</td>
                        <td>{{item.email}}</td>
                        <td>
                            <button @click="updateEmployeeInformation(item.id)" type="submit" class="btn btn-info">
                                Update
                            </button>
                        </td>
                        <td>
                            <button @click="createSalary(item.id)" type="submit" class="btn btn-primary">Salary</button>
                        </td>
                        <td>
                            <button @click="deleteEmployee(item.id)" type="submit" class="btn btn-danger">Delete
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <paginate v-show="employee.length>2"
                v-model="page"
                :click-handler="getAllEmployees"
                :container-class="'pagination'"
                :page-class="'page-item'"
                :pageLinkClass="'page-link-item'"
                :page-count="page+1"
        >
        </paginate>
    </div>
</template>


<script>
    import SH from '../../backend/backend'

    export default {
      name: 'ListEmployeeDetails',
      data () {
        return {
          employee: [],
          itemsPerPage: 5,
          queryCount: null,
          previousPage: 1,
          page: 1
        }
      },
      created () {
        this.getAllEmployees()
      },
      methods: {
        getAllEmployees: function (pageNum) {
          const paginationQuery = {
            page: pageNum - 1,
            size: this.itemsPerPage,
            sort: 'desc'
          }
          SH.ajax.callRemote(`http://127.0.0.1:8080/api/employees?` + 'page=' + paginationQuery.page + '&size=' + paginationQuery.size + '&sort=' + paginationQuery.sort, '', 'GET', function (data) {
            this.employee = data
          }.bind(this))
          this.$forceUpdate()
        },
        updateEmployeeInformation: function (id) {
          this.$router.push(`/updateEmployeeInformation/${id}`)
        },
        createSalary: function (id) {
          this.$router.push(`/employeeSalary/${id}`)
        },
        deleteEmployee: function (id) {
          SH.ajax.callRemote(`http://127.0.0.1:8080/api/employees/${id}`, '', 'DELETE', function (data) {
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
