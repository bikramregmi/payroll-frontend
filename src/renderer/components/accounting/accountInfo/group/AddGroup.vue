<template>
    <div class="popup-class">
        <h5 class="card-title">Create Group</h5><hr>
        <div  class="row">
            <div class="col-md-6">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroupPrepend">Name</span>
                        <span v-show="errorMessage==true && !name" class="input-group-text" id="inputGroupPrependSpan">{{$vd.name.$errors[0]}}</span>
                    </div>
                    <input type="text" class="form-control" id="name" v-model="name" aria-describedby="name">
                </div>
            </div>
            <div class="col-md-6">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroupPrepend1">Description</span>
                        <span v-show="errorMessage==true && !description " class="input-group-text" id="inputGroupPrependSpan">{{$vd.description.$errors[0]}}</span>
                    </div>
                    <input type="text" class="form-control" id="description" v-model="description" ><hr>
                </div>
            </div>
        </div>
        <hr>
        <br>
        <button @click="save()" type="submit" class="btn btn-primary">Submit</button>
        <button v-shortkey="['esc']" @shortkey="cancel()" @click="cancel()" class="btn btn-primary">Cancel</button>
    </div>
</template>

<script>
    import VueDaval from 'vue-daval'
    import SH from '../../../../backend/backend'
    export default {
      name: 'AddGroup',
      mixins: [VueDaval],
      data () {
        return {
          name: '',
          description: '',
          errorMessage: false
        }
      },
      vdRules: {
        name: {required: true},
        description: {required: false}
      },
      methods: {
        cancel: function () {
          this.$emit('close')
        },
        save: function () {
          const data = {
            name: this.name,
            description: this.description
          }
          this.$vd.$validate().then(() => {
            SH.ajax.callRemote(`http://127.0.0.1:8080/api/group`, data, 'POST', function (data) {
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
