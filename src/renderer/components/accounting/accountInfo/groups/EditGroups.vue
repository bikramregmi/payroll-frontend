<template>
        <div class="popup-class">
            <h5 class="card-title">Edit Groups</h5>
            <hr>
            <div class="row">
                <div class="col-md-6">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend">Name</span>
                            <!--                        <span v-show="errorMessage==true && !groupDetail.name" class="input-group-text" id="inputGroupPrependSpan">{{$vd.groupDetail.name.$errors[0]}}</span>-->
                        </div>
                        <input type="text" class="form-control" id="fullName" v-model="groupDetail.name"
                               aria-describedby="name">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend1">Group</span>
                            <!--                        <span v-show="errorMessage==true && !groupDetail.group " class="input-group-text" id="inputGroupPrependSpan">{{$vd.groupDetail.group.$errors[0]}}</span>-->
                        </div>{{groupDetail}}
                        <select class="form-control" :required="true" @change="retriveGroup()"
                                v-model="groupDetail.group">
                            <option :selected="true">Choose Group</option>
                            <option v-for="option in groupList" v-bind:value="option.name">{{ option.name }}</option>
                        </select></div>
                </div>
            </div>
            <hr>
            <h6 class="card-title">Options</h6>
            <!-- <div style="padding-left: 0px;" class="col-md-5">
                 <div class="input-group">
                     <div class="input-group-prepend">
                         <span class="input-group-text" id="inputGroupPrepend2">Yes/No</span>
                         <span v-show="errorMessage==true && $vd.groupDetail.options.$errors[0]" class="input-group-text" id="inputGroupPrependSpan">{{$vd.groupDetail.options.$errors[0]}}</span>
                     </div>
                     <input type="text" class="form-control" id="options" v-model="groupDetail.options" >
                 </div>
             </div>-->
            <br>
            <button @click="save(id)" type="submit" class="btn btn-primary">Submit</button>
            <button v-shortkey="['esc']" @shortkey="cancel()" @click="cancel()" class="btn btn-primary">Cancel</button>
        </div>
</template>

<script>
    import VueDaval from 'vue-daval'
    import SH from '../../../../backend/backend'
    import {baseApiUrl} from '../../../../backend/stringConstants'

export default {
      name: 'EditGroups',
      mixins: [VueDaval],
      props: ['id'],
      data () {
        return {
          name: '',
          group: 'Choose Group',
          options: '',
          errorMessage: false,
          groupDetail: {},
          groupList: ''
        }
      },
      vdRules: {
        groupDetail: {
          name: {required: true},
          group: {required: true},
          options: {required: false}
        }
      },
      created () {
        this.retriveGroup()
        this.retriveGroups(this.id)
      },
      methods: {
        cancel: function () {
          this.$emit('close')
        },
        retriveGroups: function (id) {
          SH.ajax.callRemote(baseApiUrl + `group/${id}`, '', 'GET', function (data) {
            if (data) {
              this.groupDetail = data
            } else {
              this.groupDetail = 'Error Fetching Data'
            }
          }.bind(this))
        },
        retriveGroup: function () {
          SH.ajax.callRemote(baseApiUrl + `group`, '', 'GET', function (data) {
            if (data) {
              this.groupList = data
            } else {
              this.groupList = 'Error Fetching Data'
            }
          }.bind(this))
        },
        save: function (id) {
          const data = {
            id: id,
            name: this.groupDetail.name,
            group: this.groupDetail.group,
            options: this.groupDetail.options
          }
          this.$vd.groupDetail.$validate().then(() => {
            SH.ajax.callRemote(baseApiUrl + `groups`, data, 'PUT', function (data) {
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
