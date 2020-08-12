<template>
    <div class="popup-class">
        <h5 class="card-title">Create Ledger</h5><hr>
        <div  class="row">
            <div class="col-md-6">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroupPrepend">Name</span>
                        <span v-show="errorMessage==true && !name" class="input-group-text" id="inputGroupPrependSpan">{{$vd.name.$errors[0]}}</span>
                    </div>
                    <input type="text" class="form-control" id="fullName" v-model="name" aria-describedby="name">
                </div>
            </div>
            <div class="col-md-6">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroupPrepend1">Groups</span>
                        <span v-show="errorMessage==true && !groups " class="input-group-text" id="inputGroupPrependSpan">{{$vd.groups.$errors[0]}}</span>
                    </div>
                    <select class="form-control" :required="true" @change="retriveGroups()" v-model="groups">
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
                        <span v-show="errorMessage==true && $vd.mailingName.$errors[0]" class="input-group-text" id="inputGroupPrependSpan">{{$vd.mailingName.$errors[0]}}</span>
                    </div>
                    <input type="text" class="form-control" id="mailingName" v-model="mailingName" >
                </div>
            </div>
            <div class="col-md-6">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroupPrepend3">Address</span>
                        <span v-show="errorMessage==true && $vd.mailingAddress.$errors[0]" class="input-group-text" id="inputGroupPrependSpan">{{$vd.mailingAddress.$errors[0]}}</span>
                    </div>
                    <input type="text" class="form-control" id="mailingName" v-model="mailingAddress" >
                </div>
            </div>
        </div>
        <hr>
        <h6 class="card-title">Tax Registration Details</h6>
        <div style="padding-left: 0px;" class="col-md-6">
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroupPrepend2">PanNo.</span>
                    <span v-show="errorMessage==true && $vd.panNo.$errors[0]" class="input-group-text" id="inputGroupPrependSpan">{{$vd.panNo.$errors[0]}}</span>
                </div>
                <input type="text" class="form-control" id="email" v-model="panNo" >
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

    export default {
      name: 'AddLedger',
      mixins: [VueDaval],
      data () {
        return {
          groups: 'Choose Groups',
          name: '',
          mailingName: '',
          mailingAddress: '',
          panNo: '',
          errorMessage: false,
          groupsList: ''
        }
      },
      vdRules: {
        name: {required: true},
        groups: {required: true},
        mailingName: {required: true},
        mailingAddress: {required: true},
        panNo: {required: true}
      },
      created () {
        this.retriveGroups()
      },
      methods: {
        cancel: function () {
          this.$modal.hideAll()
        },
        show: function () {
          this.$modal.show(Groups,
            {text: 'This text is passed as a property'},
            {draggable: true})
        },
        retriveGroups: function () {
          SH.ajax.callRemote(`http://127.0.0.1:8080/api/groups`, '', 'GET', function (data) {
            if (data) {
              this.groupsList = data
            } else {
              this.groupsList = 'Error Fetching Data'
            }
          }.bind(this))
        },
        save: function () {
          const data = {
            name: this.name,
            mailingName: this.mailingName,
            mailingAddress: this.mailingAddress,
            panNo: this.panNo,
            extraField4: this.groups
          }
          this.$vd.$validate().then(() => {
            SH.ajax.callRemote(`http://127.0.0.1:8080/api/ledgers`, data, 'POST', function (data) {
              if (data) {
                alert('Created Successfully')
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
