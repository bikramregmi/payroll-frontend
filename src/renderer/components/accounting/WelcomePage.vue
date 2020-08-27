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
<!--        shortcut keys-->
        <button hidden v-shortkey="['alt','f1']" @shortkey="addCompany()"></button>
        <button hidden v-shortkey="['alt','f2']" @shortkey="openAccountingVoucher()"></button>
        <button hidden v-shortkey="['alt','f3']" @shortkey="openInventoryVoucher()"></button>
<!--        <button hidden v-shortkey="['esc']" @shortkey="cancel()"></button>-->
<!--        <button hidden v-shortkey="['esc']" @shortkey="cancel()"></button>-->

    </div>
</template>

<script>
    import SH from '../../backend/backend'
    import VueFileToolbarMenu from 'vue-file-toolbar-menu/src/Bar/Bar'
    import Dashboard from '../accounting/Dashboard'
    import ListLedger from './accountInfo/ledger/listLedger'
    import ListVoucherType from './accountInfo/voucherType/ListVoucherType'
    import ListGroup from './accountInfo/group/ListGroup'
    import ListGroups from './accountInfo/groups/ListGroups'
    import ListProductGroup from './inventoryInfo/productGroups/ListProductGroup'
    import ListProductItem from './inventoryInfo/productItems/ListProductItem'
    import ListUnitMeasures from './inventoryInfo/unitMeasures/ListUnitMeasure'
    import AccountingVoucher from '../accounting/accountingVoucher/AccountingVoucher'
    import InventoryVoucher from '../accounting/inventoryVoucher/InventoryVoucher'

    export default {
      name: 'WelcomePage',
      components: {VueFileToolbarMenu, Dashboard},
      data () {
        return {
          happy: true,
          id: this.$route.params.id,
          checkCompany: {},
          checkAllCompany: {}
        }
      },
      created () {
        this.retrieveAllCompany()
      },
      computed: {
        my_menu () {
          return [
            {
              text: 'Company',
              menu: [
                {
                  text: 'Create Company', click: () => this.addCompany()
                },
                {
                  text: 'Select Company',
                  click: () => {
                    this.$router.push('/listCompany')
                  }
                }
              ]
            },
            {
              text: 'Masters',
              disabled: !this.checkCompany.extraField,
              menu: [
                {
                  text: 'Account Info',
                  disabled: !this.checkCompany.extraField,
                  menu: [
                    {text: 'Group', click: () => this.show('Group')},
                    {text: 'Groups', click: () => this.show('Groups')},
                    {text: 'Ledger', click: () => this.show('Ledger')},
                    {text: 'Voucher Type', click: () => this.show('VoucherType')}
                  ]
                },
                {
                  text: 'Inventory Info',
                  disabled: !this.checkCompany.extraField,
                  menu: [
                    {
                      text: 'Product Groups',
                      disabled: !this.checkCompany.extraField,
                      click: () => this.show('ProductGroups')
                    },
                    {
                      text: 'Product Items',
                      disabled: !this.checkCompany.extraField,
                      click: () => this.show('ProductItems')
                    },
                    {
                      text: 'Units of measures',
                      disabled: !this.checkCompany.extraField,
                      click: () => this.show('UnitMeasures')
                    },
                    {
                      text: 'Voucher Type',
                      disabled: !this.checkCompany.extraField,
                      click: () => this.show('VoucherType')
                    }

                  ]
                }
              ]
            },
            {
              text: 'Transactions',
              disabled: !this.checkCompany.extraField,
              menu: [
                {
                  text: 'Acc Voucher',
                  click: () => this.openAccountingVoucher()
                },
                {
                  text: 'Inv Voucher',
                  click: () => this.openInventoryVoucher()
                }
              ]
            },
            {
              text: 'Entries',
              disabled: !this.checkCompany.extraField

            },
            {
              text: 'Report',
              disabled: !this.checkCompany.extraField

            },
            {
              text: 'Printing',
              disabled: !this.checkCompany.extraField

            },
            {
              text: 'Help',
              disabled: !this.checkCompany.extraField

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
            this.$modal.show(ListLedger,
              {text: 'This text is passed as a property'},
              {draggable: true})
          } else if (data === 'Groups') {
            this.$modal.show(ListGroups,
              {text: 'This text is passed as a property'},
              {draggable: true})
          } else if (data === 'VoucherType') {
            this.$modal.show(ListVoucherType,
              {text: 'This text is passed as a property'},
              {draggable: true})
          } else if (data === 'Group') {
            if (data === 'createGroup') {
              this.$modal.show(ListGroups,
                {draggable: true})
            } else {
              this.$modal.show(ListGroup,
                {draggable: true})
            }
          } else if (data === 'ProductGroups') {
            this.$modal.show(ListProductGroup,
              {draggable: true})
          } else if (data === 'ProductItems') {
            this.$modal.show(ListProductItem,
              {draggable: true})
          } else if (data === 'UnitMeasures') {
            this.$modal.show(ListUnitMeasures,
              {draggable: true})
          }
        },
        addCompany: function () {
          this.$router.push('/addCompany')
        },
        openAccountingVoucher: function () {
          this.$modal.show(AccountingVoucher,
            {text: 'This text is passed as a property'},
            {draggable: true})
        },
        openInventoryVoucher: function () {
          this.$modal.show(InventoryVoucher,
            {draggable: true})
        },
        retrieveCompany: function (id) {
          SH.ajax.callRemote(`http://127.0.0.1:8080/api/companies/${id}`, '', 'GET', function (data) {
            this.checkCompany = data
          }.bind(this))
        },
        retrieveAllCompany: function () {
          SH.ajax.callRemote(`http://127.0.0.1:8080/api/companies`, '', 'GET', function (data) {
            this.checkAllCompany = data
            for (let i = 0; i < this.checkAllCompany.length; i++) {
              if (this.checkAllCompany[i].extraField) {
                this.retrieveCompany(this.checkAllCompany[i].id)
              }
            }
          }.bind(this))
        }
      }
    }
</script>

<style scoped>

</style>
