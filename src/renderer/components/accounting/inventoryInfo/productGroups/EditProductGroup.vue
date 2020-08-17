<template>
        <div class="popup-class">
            <h5 class="card-title">Edit Product Group</h5>
            <hr>
            <div class="row">
                <div class="col-md-6">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend">Name</span>
                            <span v-show="errorMessage==true && !groupDetail.name" class="input-group-text"
                                  id="inputGroupPrependSpan">{{$vd.groupDetail.name.$errors[0]}}</span>
                        </div>
                        <input type="text" class="form-control" id="name" v-model="groupDetail.name"
                               aria-describedby="name">
                    </div>
                </div>
                <!--  <div class="col-md-6">
                      <div class="input-group">
                          <div class="input-group-prepend">
                              <span class="input-group-text" id="inputGroupPrepend">Group</span>
                              <span v-show="errorMessage==true && !group" class="input-group-text" id="inputGroupPrependSpan">{{$vd.group.$errors[0]}}</span>
                          </div>
                          <input type="text" class="form-control" id="group" v-model="groupDetail.group" aria-describedby="group">
                      </div>
                  </div>-->
                <div class="col-md-6">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupPrepend1">Description</span>
                        </div>
                        <input type="text" class="form-control" id="quantity" v-model="groupDetail.description">
                        <hr>
                    </div>
                </div>
            </div>
            <hr>
            <button @click="save(id)" type="submit" class="btn btn-primary">Submit</button>
            <button v-shortkey="['esc']" @shortkey="cancel()" @click="cancel()" class="btn btn-primary">Cancel</button>
        </div>
</template>

<script>
    import VueDaval from 'vue-daval'
    import SH from '../../../../backend/backend'

    export default {
      name: 'EditProductGroup',
      mixins: [VueDaval],
      props: ['id'],
      data () {
        return {
          groupDetail: {
            name: '',
            group: '',
            description: ''
          },
          errorMessage: false,
          groupList: ''
        }
      },
      vdRules: {
        groupDetail: {
          name: {required: true},
          group: {required: false},
          description: {required: false}
        }
      },
      created () {
        this.retriveProductGroups(this.id)
      },
      methods: {
        cancel: function () {
          this.$emit('close')
        },
        retriveProductGroups: function (id) {
          SH.ajax.callRemote(`http://127.0.0.1:8080/api/product-groups/${id}`, '', 'GET', function (data) {
            if (data) {
              this.groupDetail = data
            } else {
              this.groupDetail = 'Error Fetching Data'
            }
          }.bind(this))
        },
        save: function (id) {
          const data = {
            id: id,
            name: this.groupDetail.name,
            group: this.groupDetail.description,
            options: this.groupDetail.options
          }
          this.$vd.groupDetail.$validate().then(() => {
            SH.ajax.callRemote(`http://127.0.0.1:8080/api/product-groups`, data, 'PUT', function (data) {
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
