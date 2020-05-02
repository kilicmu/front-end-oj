<template lang="pug">
  List(border).status_list
    ListItem.status_list_item
      Row.status_list_title
        Col(span=4) when
        Col(span=3) problem
        Col(span=3) info
        Col(span=3) time
        Col(span=3) memory
        Col(span=3) Language
        Col(span=3) anuther
        Col(span=2) status
    ListItem(v-for="item in stateStatusList" :key="item.id").status_list_item
      Row.status_list_sub
        Col(span=4) 
          Time(:time="item.when" type="datetime")
        Col(span=3)
          a(:href="'/problems/'+item.problem.id") {{item.problem.title}}
        Col(span=3) 
          Tag(color="blue" v-show="item.info_state === 'success'") {{item.info_massage}}
          Tag(color="orange" v-show="item.info_state === 'warring'") {{item.info_massage}} 
          Tag(color="red" v-show="item.info_state === 'error'") {{item.info_massage}} 
        Col(span=3) {{item.time}}
        Col(span=3) {{item.memory}}
        Col(span=3) {{item.language}}
        Col(span=3)
          a(:href="'/user/'+item.anuther").anuther {{item.anuther}}
        Col(span=2) 
          Button(type="text" @click="confirm(item.problem_msg)").show_status_btn
            Icon(type="ios-trending-up").status_icon
          
</template>
<script>
import { Vue, Component, Prop } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
@Component({components: {}})
export default class extends Vue {
  @Prop(Array)
  stateStatusList;
}
</script>
<style lang="scss">
@import "~@/sass/config.scss";
.status_list {
  -webkit-user-select: none;
    -moz-user-select: none;
  &_title {
    width: 100%;
    text-align: center;
    font-size: 14px;
    font-weight: bolder;
  }
  &_sub {
    width: 100%;
    text-align: center;
    font-size: 12px;
    line-height: 26px;
  }
  &_item:nth-child(2n-1) {
    background-color: rgba(231, 231, 231, 0.486);
  }
  &_item:nth-child(2n) {
    background-color: rgb(255, 255, 255);
  }
}

.show_status_btn {
  width: 100%;
  height: 100%;
}

.anuther:hover{
  color: $standard-secondprimary;
}
</style>