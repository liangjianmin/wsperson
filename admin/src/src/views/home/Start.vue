<template>
  <div>
   <h2>
     Welcome  {{user.session}}
   </h2>
  </div>
</template>
<style scoped>
  h2{
    text-align: left;
    font-size: 40px;
  }
</style>
<script>
  import {mapState} from 'vuex'
    export default {
        name: 'home',
        data() {
            return {};
        },
        computed: mapState({
            user: state => state.user.sessiondata
        }),
        methods: {}
    }
</script>
