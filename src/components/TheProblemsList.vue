<template lang="pug">
   List.question_list
    div.topic
      Row
        Col(span="2")
          Icon(type="md-done-all")
        Col(span="2") #
        Col(span="8")#title Title
        Col(span="4") Total
        Col(span="4") AC Rate
        Col(span="4") Level
    //- div(:questions="questions")#a_line
    Row(v-for="item in stateProblemList.content" :key="item.id" style="{weight:100%}")#a_li
      Col(span="2" class="col")
        Icon(type="md-done-all" v-if="item.pass")
        Icon(type="md-lock" v-else="item.pass")
      Col(span="2").col {{item.id}}
      Col(span="8").col
        Button(type="text" id="position" :to="'/problems/'+item.id").title_button {{item.title}}
      Col(span="4").col {{item.acceptance}}
      Col(span="4").col {{item.level}}
      Col(span="4").col
        a
          Tag(color="success" class="tag" v-if="item.level === 1") Easy
          Tag(color="warning" class="tag" v-if="item.level === 2") Medium
          Tag(color="error" class="tag" v-if="item.level === 3") Hard
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
@Component
export default class ProblemsList extends Vue {
  @Prop(Array)
  problems;

  @State("problemList")
  stateProblemList;

  @State("user")
  stateUser;

  @Mutation("setProblemList")
  mutationSetProblemList;
}
</script>

<style lang="scss" scoped>
@import "~@/sass/config.scss";
.question_list {
  font-size: 14px;
  width: 100%;
  text-align: center;
}

.topic {
  font-weight: bolder;
}

#title {
  text-align: left;
}

#a_li {
  height: 100%;
  padding-top: 8px;
  padding-bottom: 8px;
  line-height: 32px;
  text-align: center;
  border-bottom: 1px solid rgba(163, 163, 163, 0.397);
}

#position {
  width: 100%;
  padding-left: 0;
  text-align: left;
}

.tag {
  text-align: center;
  font-size: 12px;
}
</style>
