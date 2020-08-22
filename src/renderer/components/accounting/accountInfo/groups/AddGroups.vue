<template>
    <div class="popup-class">
        <h5 class="card-title">Create Groups</h5><hr>
        <div  class="row">
            <div class="col-md-5">
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
                        <span class="input-group-text" id="inputGroupPrepend1">Group</span>
                        <span v-show="errorMessage==true && !group " class="input-group-text" id="inputGroupPrependSpan">{{$vd.group.$errors[0]}}</span>
                    </div>
                    <select class="form-control" :required="true" @change="retriveGroup()" v-model="group">
                        <option :selected="true">Choose Group</option>
                        <option v-for="option in groupList" v-bind:value="option.name" >{{ option.name }}</option>
                    </select>                </div>
            </div>
        </div>
        <hr>
        <h6 class="card-title">Options</h6>
        <div style="padding-left: 0px;" class="col-md-6">
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroupPrepend2">Yes/No</span>
                    <span v-show="errorMessage==true && $vd.options.$errors[0]" class="input-group-text" id="inputGroupPrependSpan">{{$vd.options.$errors[0]}}</span>
                </div>
                <input type="text" class="form-control" id="options" v-model="options" >
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
    export default {
      name: 'AddGroups',
      mixins: [VueDaval],
      data () {
        return {
          name: '',
          group: 'Choose Group',
          options: '',
          errorMessage: false,
          groupList: ''
        }
      },
      vdRules: {
        name: {required: true},
        group: {required: true},
        options: {required: false}
      },
      created () {
        this.retriveGroup()
      },
      methods: {
        cancel: function () {
          this.$emit('close')
        },
        retriveGroup: function () {
          SH.ajax.callRemote(`http://127.0.0.1:8080/api/group`, '', 'GET', function (data) {
            if (data) {
              this.groupList = data
            } else {
              this.groupList = 'Error Fetching Data'
            }
          }.bind(this))
        },
        save: function () {
          const data = {
            name: this.name,
            group: this.group,
            options: this.options
          }
          this.$vd.$validate().then(() => {
            SH.ajax.callRemote(`http://127.0.0.1:8080/api/groups`, data, 'POST', function (data) {
              if (data) {
                alert('Added Successfully')
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
