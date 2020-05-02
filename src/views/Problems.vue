<template lang="pug">
    Row(type="flex" justify="center" align="top").code-row-bg
      Col(span="18")
        Card.problem_left_card
          div.title
            strong Problem List:
            div.title_tags
              SearchAndFlush(:searchFn="searchFn" :flushFn="flushFn")#flush_and_search
            ProblemList(:problems="problems").question_list
            Page(
              show-elevator
              :current.sync="stateProblemList.currentPage"
              :page-size="stateProblemList.onePageContent"
              placement="top"
              :total="stateProblemList.max"
              @on-change="turnPage"
            ).page_li
        //- Spin(size="large" fix v-if="!show_problems_list")
      Col(span="6")
        div.right_cards
          Card.right_card_1
            p(slot="title") 您的进度
            ProblemsProcess.process
          Card.right_card_2
            p(slot="title") 头条
            p Content of card
          Card.right_card_3      
            p(slot="title") 标签
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import ProblemList from "@/components/TheProblemsList.vue";
import SearchAndFlush from "@/components/SearchAndFlush.vue";
import ProblemsProcess from "@/components/TheProblemsProcess.vue";
import { State, Mutation } from "vuex-class";

@Component({
  components: {
    ProblemList,
    SearchAndFlush,
    ProblemsProcess
  }
})
export default class Problems extends Vue {
  problems = [];

  @State("problemList")
  stateProblemList;

  @Mutation("setProblemList")
  mutationSetProblemList;

  @Mutation("setProblemListPage")
  mutationSetProblemListPage;

  @Mutation("setProblemListSearchValue")
  mutationSetProblemListSearchValue;

  turnPage(pageNo) {
    window.scrollTo(0, 0);
    this.$api.asyncRequireList("ProblemList",15, pageNo, this.stateProblemList.searchVal).then(res => {
      this.mutationSetProblemList(res);
    });
  }

  created() {
    this.mutationSetProblemListSearchValue('');
    this.$api.asyncRequireList("ProblemList",15).then(res => {
      this.mutationSetProblemList(res);
    }).catch(e=>{
      this.$prompt("系统繁忙哦","error")
    });
  }

  flushFn() {
    this.mutationSetProblemListSearchValue('');
    this.$api.asyncRequireList("ProblemList",15).then(res => {
      this.mutationSetProblemList(res);
    });
  }

  searchFn(e) {
    this.mutationSetProblemListSearchValue(e.target.value)
    this.$api
      .asyncRequireList("ProblemList",15,1,this.stateProblemList.searchVal)
      .then(res => {
        this.mutationSetProblemList(res);
      });
  }
}
</script>

<style lang="scss" scoped>
@import "~@/sass/config.scss";
.problem_left_card {
  position: relative;
  height: 1050px;
}

.topic {
  font-weight: bolder;
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: $standard-border;
}

.title {
  strong {
    font-size: 20px;
    color: $standard-title;
  }
  &_tags {
    position: absolute;
    top: 60px;
    left: 20px;
    right: 20px;
  }
}

.question_list {
  margin-top: 70px;
  text-align: center;
  border: false;
  width: 100%;
}

.right_cards {
  margin-left: 10px;
  @for $i from 2 through 3 {
    .right_card_#{$i} {
      margin-top: 5px;
    }
  }
}

.page_li {
  bottom: 60px;
  right: 40px;
  position: absolute;
}
#flush_and_search {
  float: right;
}

#title {
  text-align: left;
}
</style>
