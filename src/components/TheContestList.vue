<template lang="pug">
div#l_tmp
  List.contest_l
    ListItem(border size="large" v-for="contest in contestList" :key="contest.id") 
      div.contest_l_icon
      div.contest_l_sub
        a(:href="contest.contestURL").contest_l_sub_title {{contest.contestName}}
        Tag(type="dot" :color="contest.contestState" class="contest_l_sub_status") running
        Icon(type="md-calendar")
        Time(class="contest_l_sub_time" :time="contest.contestDate" type="datetime")
        Time(class="contest_l_sub_time" :time="contest.contestDate" type="datetime")
        Poptip(:title="contest.contestName" :content="contest.contestInfo" placement="right")
          a
            Icon(type="ios-alert-outline").contest_l_sub_io
        Icon(type="ios-alert-outline")
  
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class ContestList extends Vue {
  @Prop(Array)
  contestList;
}
</script>

<style lang="scss" scoped>
@import "~@/sass/config.scss";
#l_tmp {
  height: 1100px;
  position: relative;
}
.contest_l {
  &_icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: url("~@/images/medals.png") no-repeat scroll left center/ 40px;
  }

  &_sub {
    width: 100%;
    margin-left: 10px;
    position: relative;
    &_title {
      font-size: 18px;
      display: block;
      padding: 10px 0;
      color: $standard-info;
    }
    &_title:hover {
      color: $standard-primary;
    }
    &_time {
      font-size: 12px;
      margin-left: 10px;
      display: inline;
    }
    &_io {
      margin-left: 10px;
    }
    &_status {
      right: 0;
      top: 15px;
      position: absolute;
    }
  }
}
</style>
