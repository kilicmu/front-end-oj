<template lang="pug">
Row
  Col(
    span="16"
  )
    Card
      header.header 测试名
      p.contest_check_info 这是测试的简介
  Col(
    span="8"
  )



</template>
<script>
import { Vue, Component } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
@Component({components: {}})
export default class extends Vue {
}
</script>
<style lang="scss" scoped>
@import "~@/sass/config.scss";
.header{
  color: $standard-title;
  font-weight: bolder;
  font-size: 20px;
}
</style>