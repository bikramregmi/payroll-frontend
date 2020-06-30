<template>
    <div class="page d-md-flex">
        <div class="ulp_sidebar">
            <div class="ulp_sidebarwrapper">
                <nav class="navbar navbar-expand-lg navbar-light ulp_navbar" aria-label="header menu">
                    <button class="sidebar_toggler navbar-toggler" type="button" data-toggle="collapse"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </nav>

                <!-- Menu Items-->
                <div class="card-body">
                    <div class="ulp_menu_group" role="navigation" aria-label="efiling menu">
                        <ul class="list-group menu-group menu_wrapper system-border">
                            <li class="list-group-item">
                                <RouterLink to="/dashboard" class="nav-group-item"><span class="icon icon-home"></span>
                                    <img class=''>Dashboard
                                </RouterLink>
                            </li>
                            <li class="list-group-item">
                                <RouterLink to="/addEmployee" class="nav-group-item"><span
                                        class="icon icon-download"></span>
                                    <img class=''>Add Employee
                                </RouterLink>
                            </li>
                            <li class="list-group-item">
                                <RouterLink to="/listEmployeeDetails" class="nav-group-item"><span
                                        class="icon icon-folder"></span>
                                    <img src=''>List Employee
                                </RouterLink>
                            </li>
                            <li class="list-group-item">
                                <RouterLink to="/generatePayroll" class="nav-group-item"><span
                                        class="icon icon-folder"></span>
                                    <img class=''>Generate Payroll
                                </RouterLink>
                            </li>
                            <li class="list-group-item">
                                <RouterLink to="/dashboard" class="nav-group-item"><span class="icon icon-tools"></span>
                                    <img class=''>Documentation
                                </RouterLink>
                            </li>
                        </ul>
                        <br>
                        <hr>
                        <br>
                        <div class="doc">
                            <button @click="logout()" class="btn-danger">Log Out</button>
                            <br>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex-fill d-flex flex-column rightbodywrapper">
            <div class='rightbody container-fluid-sm container-md'>
                <div class='rightbody_inside'>
                    <RouterView/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
      name: 'Home',
      methods: {
        addNewContact: function () {
          this.$router.push('/addNewContact')
        },
        logout: function () {
          this.$router.push('/logout')
        }
      }
    }
</script>

