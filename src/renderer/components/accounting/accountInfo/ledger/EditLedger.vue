<template>
    <div class="popup-class">
        <h5 class="card-title">Edit Ledger</h5><hr>
        <div  class="row">
            <div class="col-md-6">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroupPrepend">Name</span>
                        <span v-show="errorMessage==true && !ledgerDetail.name" class="input-group-text" id="inputGroupPrependSpan">{{$vd.ledgerDetail.name.$errors[0]}}</span>
                    </div>
                    <input type="text" class="form-control" id="fullName" v-model="ledgerDetail.name" aria-describedby="name">
                </div>
            </div>
            <div class="col-md-6">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroupPrepend1">Groups</span>
                        <span v-show="errorMessage==true && !ledgerDetail.extraField4 " class="input-group-text" id="inputGroupPrependSpan">{{$vd.ledgerDetail.groups.$errors[0]}}</span>
                    </div>
                    <select class="form-control" :required="true" v-model="ledgerDetail.extraField4">
                        <option :selected="true">Choose Groups</option>
                        <option v-for="option in groupsList" v-bind:value="option.name" >{{ option.name }}</option>
                    </select>
                    <hr>
                    <button hidden v-shortkey="['ctrl','k']" @shortkey="show()" class="btn btn-primary"></button>
                </div>
            </div>
        </div>
        <hr>
        <h6 class="card-title">Mailing Address</h6>
        <div class="row">
            <div class="col-md-6">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroupPrepend2">Name</span>
                        <span v-show="errorMessage==true && !ledgerDetail.mailingName" class="input-group-text" id="inputGroupPrependSpan">{{$vd.ledgerDetail.mailingName.$errors[0]}}</span>
                    </div>
                    <input type="text" class="form-control" id="mailingName" v-model="ledgerDetail.mailingName" >
                </div>
            </div>
            <div class="col-md-6">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroupPrepend3">Address</span>
                        <span v-show="errorMessage==true && !ledgerDetail.mailingAddress" class="input-group-text" id="inputGroupPrependSpan">{{$vd.ledgerDetail.mailingAddress.$errors[0]}}</span>
                    </div>
                    <input type="text" class="form-control" id="mailingName" v-model="ledgerDetail.mailingAddress" >
                </div>
            </div>
        </div>
        <hr>
        <h6 class="card-title">Tax Registration Details</h6>
        <div style="padding-left: 0px;" class="col-md-6">
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroupPrepend2">PanNo.</span>
                    <span v-show="errorMessage==true && !ledgerDetail.panNo" class="input-group-text" id="inputGroupPrependSpan">{{$vd.ledgerDetail.panNo.$errors[0]}}</span>
                </div>
                <input type="text" class="form-control" id="email" v-model="ledgerDetail.panNo" >
            </div>
        </div>
        <br>
        <button @click="save()" type="submit" class="btn btn-primary">Submit</button>
        <button v-shortkey="['esc']" @shortkey="cancel()" @click="cancel()" class="btn btn-primary">Cancel</button>
    </div>
</template>

<script>
    import VueDaval from 'vue-daval'
    import SH from '../../../../backend/backend'
    import Groups from '../groups/AddGroups'
    import {baseApiUrl} from '../../../../backend/stringConstants'
export default {
      name: 'EditLedger',
      mixins: [VueDaval],
      props: ['id'],

      data () {
        return {
          ledgerDetail: {
            groups: 'Choose Groups',
            name: '',
            mailingName: '',
            mailingAddress: '',
            panNo: '',
            extraField4: ''
          },
          errorMessage: false,
          groupsList: ''
        }
      },
      vdRules: {
        ledgerDetail: {
          name: {required: true},
          extraField4: {required: true},
          mailingName: {required: true},
          mailingAddress: {required: true},
          panNo: {required: true}
        }
      },
      created () {
        this.retriveGroups()
        this.retriveLedger(this.id)
      },
      methods: {
        cancel: function () {
          this.$emit('close')
        },
        show: function () {
          this.$modal.show(Groups,
            {text: 'This text is passed as a property'},
            {draggable: true})
        },
        retriveGroups: function () {
          SH.ajax.callRemote(baseApiUrl + `groups`, '', 'GET', function (data) {
            if (data) {
              this.groupsList = data
            } else {
              this.groupsList = 'Error Fetching Data'
            }
          }.bind(this))
        },
        retriveLedger: function (id) {
          SH.ajax.callRemote(baseApiUrl + `ledgers/${id}`, '', 'GET', function (data) {
            if (data) {
              this.ledgerDetail = data
            } else {
              this.ledgerDetail = 'Error Fetching Data'
            }
          }.bind(this))
        },
        save: function () {
          const data = {
            id: this.id,
            name: this.ledgerDetail.name,
            mailingName: this.ledgerDetail.mailingName,
            mailingAddress: this.ledgerDetail.mailingAddress,
            panNo: this.ledgerDetail.panNo,
            extraField4: this.ledgerDetail.extraField4
          }
          this.$vd.ledgerDetail.$validate().then(() => {
            SH.ajax.callRemote(baseApiUrl + `ledgers`, data, 'PUT', function (data) {
              if (data) {
                alert('Edited Successfully')
                this.cancel()
              } else {
                alert('error')
              }
            }.bind(this))
          }).catch(() => {
            this.errorMessage = true
          })
        }
      }
    }
</script>

<style scoped>

</style>
