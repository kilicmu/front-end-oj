<template lang="pug">
div
  Card.root
    h1.problem_title # {{stateProblemInfo.title}}
    Divider(type="vertical")
    Tag(color="success" v-if="stateProblemInfo.difficuly === 1") Easy
    Tag(color="warning" v-if="stateProblemInfo.difficuly === 2") Medium
    Tag(color="error" v-if="stateProblemInfo.difficuly === 3") Hard
    Tag(color="geekblue" v-if="stateProblemInfo.isPass") AC
    Poptip(placement="bottom-end" width="300" style="{white-space: normal;float: right;}")
      Button(type="text")
        Icon(type="ios-menu")
      div(slot="content")
        Card.lcard
          p.info Info:
          p id:
            span {{stateProblemInfo.id}}
          p limit_time:
            span {{stateProblemInfo.limitTime}}
          p limit_memory: 
            span {{stateProblemInfo.limitMemory}}
          p from:
            span {{stateProblemInfo.from}}
          p information: 
            span {{stateProblemInfo.information}}
    p.introduce Introduce:
    span.problem_introduce_t {{stateProblemInfo.introduce}}
    Divider
    p.io_introduce In:
    span.problem_introduce_t {{stateProblemInfo.in}}
    p.io_introduce Out:
    span.problem_introduce_t {{stateProblemInfo.out}}
    div#temp
  Row(v-for="item in stateProblemInfo.demo" :key="item.id")
    Card.demo_card
      Tooltip(content="copy demo in" class="circle_button" id="copyIt").copy_btn
        Button(icon="ios-copy-outline" @click="doCopy(item.in)" shape="circle")
      p.demo_introduce In Demo &nbsp;{{item.id}}:
      span.problem_introduce {{item.in}}
      p.demo_introduce Out Demo&nbsp;{{item.id}}:
      span.problem_introduce {{item.out}}
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
@Component
export default class ProblemInfo extends Vue {
  @State("problemInfo")
  stateProblemInfo;

  doCopy(textIn) {
    this.$copyText(textIn).then(
      e => {
        this.$Message.success("copy success");
      },
      e => {
        this.$Message.error("bad copy");
      }
    );
  }
}
</script>
<style lang="scss" scoped>
@import "~@/sass/config.scss";
.root {
  position: relative;
  height: 100%;
  .problem_title {
    color: $standard-primary;
    font-size: 24px;
    -webkit-user-select: none;
    -moz-user-select: none;
    display: inline;
  }
}

.lcard {
  -webkit-user-select: none;
  -moz-user-select: none;
  .info {
    color: $standard-title;
    font-size: 20px;
    font-weight: bolder;
  }
  p {
    font-weight: bolder;
    margin-top: 7px;
    text-overflow: ellipsis;
  }
  span {
    font-weight: lighter;
    float: right;
    -webkit-user-select: none;
    -moz-user-select: none;
  }
}

.introduce {
  color: $standard-info;
  margin-top: 30px;
  font-size: 20px;
  -webkit-user-select: none;
  -moz-user-select: none;
}

.problem_introduce_t {
  color: $standard-context;
  text-indent: 20px;
}

.io_introduce {
  font-size: 16px;
  color: $standard-secondprimary;
  font-weight: bolder;
  -webkit-user-select: none;
  -moz-user-select: none;
}

.demo_card {
  margin-top: 5px;
}

.demo_introduce {
  color: $standard-info;
  font-size: 16px;
  -webkit-user-select: none;
  -moz-user-select: none;
  &:nth-of-type(1) {
    margin-top: 10px;
  }
  &:nth-of-type(2) {
    margin-top: 20px;
  }
}

.copy_btn {
  float: right;
}
</style>
