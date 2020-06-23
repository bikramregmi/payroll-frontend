<template>
    <div>
        <main>
            <h5 class="card-title">Welcome To Payroll</h5><hr>
            <div class="right-side">
                <div class="doc">
                    <div class="title">Payroll</div>
                    <p>
                       Get All Employee Details.
                    </p>
                    <button @click="addNewContact()">Add New Employee</button><br><br>
                </div>
                <div class="doc">
                    <div class="title alt">Other Documentation</div>
                    <button class="alt" @click="open('https://electron.atom.io/docs/')">Help</button>
                    <button class="alt" @click="open('https://vuejs.org/v2/guide/')">About Us</button>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
  export default {
    name: 'Home',
    methods: {
      addNewContact: function () {
        this.$router.push('/addNewContact')
      }
    }
  }
</script>

<style>

</style>
