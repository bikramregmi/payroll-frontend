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
                                    <img class=''>Add Company
                                </RouterLink>
                            </li>
                            <li class="list-group-item">
                                <RouterLink to="/listEmployeeDetails" class="nav-group-item"><span
                                        class="icon icon-folder"></span>
                                    <img src=''>List Company
                                </RouterLink>
                            </li>
                            <li class="list-group-item">
                                <RouterLink to="/dashboard" class="nav-group-item"><span class="icon icon-tools"></span>
                                    <img class=''>Documentation
                                </RouterLink>
                            </li>
                        </ul>
                        <hr>
                        <div class="doc">
                            <button @click="getProfile()" class="btn-info">My Profile</button>
                            <br><br>
                            <button @click="switchTo()" class="btn-info">Switch</button>
                            <br><br>
                            <button @click="logout()" class="btn-danger">Log Out</button>
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
      name: 'WelcomePage',
      methods: {
        addNewContact: function () {
          this.$router.push('/addNewContact')
        },
        logout: function () {
          localStorage.removeItem('token')
          this.$router.push('/logout')
        },
        getProfile: function () {
          this.$router.push(`/profile`)
        },
        switchTo: function () {
          this.$router.push(`/maindashboard`)
        }
      }
    }
</script>

<style scoped>

</style>
