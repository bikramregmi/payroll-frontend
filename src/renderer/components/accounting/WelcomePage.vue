<template>
    <div>
        <div>
            <vue-file-toolbar-menu :content="my_menu"/>
        </div>
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
                                    <RouterLink to="/ADashboard" class="nav-group-item"><span
                                            class="icon icon-home"></span>
                                        <img class=''>Dashboard
                                    </RouterLink>
                                </li>
                                <li class="list-group-item">
                                    <RouterLink to="/dashboard" class="nav-group-item"><span
                                            class="icon icon-tools"></span>
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
    </div>
</template>

<script>
    import VueFileToolbarMenu from 'vue-file-toolbar-menu'
    import Dashboard from '../accounting/Dashboard'
    import Ledger from '../accounting/accountInfo/AddLedger'
    import Groups from '../accounting/accountInfo/AddGroups'
    import VoucherType from '../accounting/accountInfo/AddVoucherType'

    export default {
      name: 'WelcomePage',
      components: {VueFileToolbarMenu, Dashboard},
      data () {
        return {happy: true}
      },
      computed: {
        my_menu () {
          return [
            {text: 'Company',
              menu: [
                {text: 'Create Company', click: () => this.$router.push('/addCompany')
                },
                {text: 'Select Company',
                  click: () => {
                    this.happy = false
                    this.$router.push('/listCompany')
                  }}
              ]},
            {
              text: 'Masters',
              disabled: this.happy,
              active: this.happy,
              menu: [
                {text: 'Account Info',
                  disabled: this.happy,
                  menu: [
                    {text: 'Ledger', click: () => this.show('Ledger')},
                    {text: 'Voucher Type', click: () => this.show('VoucherType')},
                    {text: 'Groups', click: () => this.show('Groups')}
                  ] },
                {text: 'Inventory Info',
                  disabled: this.happy,
                  menu: [
                    {text: 'Product Groups',
                      disabled: this.happy,
                      click: () => this.show('Ledger')},
                    {text: 'Product Items',
                      disabled: this.happy,
                      click: () => this.show('VoucherType')},
                    {text: 'Units of measures',
                      disabled: this.happy,
                      click: () => this.show('Groups')},
                    {text: 'Voucher Type',
                      disabled: this.happy,
                      click: () => this.show('VoucherType')}

                  ] }
              ]},
            {text: 'Entries',
              disabled: this.happy

            },
            {text: 'Report',
              disabled: this.happy

            },
            {text: 'Printing',
              disabled: this.happy

            },
            {text: 'Help',
              disabled: this.happy

            }
          ]
        }
      },
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
        },
        show: function (data) {
          if (data === 'Ledger') {
            this.$modal.show(Ledger,
              {text: 'This text is passed as a property'},
              {draggable: true})
          } else if (data === 'Groups') {
            this.$modal.show(Groups,
              {text: 'This text is passed as a property'},
              {draggable: true})
          } else if (data === 'VoucherType') {
            this.$modal.show(VoucherType,
              {text: 'This text is passed as a property'},
              {draggable: true})
          }
        },
        hide: function () {
          this.$modal.hide('my-first-modal')
        }
      }
    }
</script>

<style scoped>

</style>
