<template>
    <div>
            <h5 class="card-title">List Of All Employees</h5>
            <!--         <button class="btn btn-primary m-1" v-on:click="addNewServiceContact('new')">Add New Contact</button>-->
            <div class="row">
                <div class="col-lg-12 " >
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
                            <td><button @click="updateEmployeeInformation(item.id)" type="submit" class="btn btn-info">Update</button></td>
                            <td><button @click="createSalary(item.id)" type="submit" class="btn btn-primary">Salary</button></td>
                            <td><button @click="deleteEmployee(item.id)" type="submit" class="btn btn-danger">Delete</button></td>
                        </tr>
                        </tbody>
                    </table>
                </div >
            </div>
        </div>
</template>

<script>
    import SH from '../../backend/backend'
    export default {
      name: 'ListEmployeeDetails',
      data () {
        return {
          employee: []
        }
      },
      created () {
        this.getAllEmployees()
      },
      methods: {
        getAllEmployees: function () {
          SH.ajax.callRemote(`http://127.0.0.1:8080/api/employees`, '', 'GET', function (data) {
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
          SH.ajax.callRemote(`http://127.0.0.1:8080/api/employees/id=${id}`, '', 'DELETE', function (data) {
            alert(data.message)
          })
          // window.location.reload()
        }
      }
    }
</script>

<style scoped>

</style>
