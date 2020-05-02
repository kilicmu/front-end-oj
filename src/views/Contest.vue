<template lang="pug">
  Row
    Col(span="16")
      Card.l_card
        strong Contest List:
        div.tool_line
          search-and-flush(:searchFn="searchFn" :flushFn="flushFn")#flush_and_search
        transition(name="flash")
          contest-list(:contestList="stateContestList.content").contest_list
        Page(
          :current.sync="stateContestList.currentPage"
          :total="stateContestList.max"
          :page_size="stateContestList.onePageContent"
          @on-change="turnPage"
          class="contest_page")
    Col(span="8")
      div.r_card
        Card(:to="stateContestingState.contestingURL" v-show="stateContestingState.isContesting").r_card_1_true
          div.info
            p 您有正在进行的比赛 
            p 点击快速加入
          img(src="~@/images/fire.png")
        Card(v-show="!stateContestingState.isContesting").r_card_1_false
          div(v-show="!stateContestingState.isContesting").info
            p 暂时没有比赛哦 
            p 休息一下吧！
        div.r_card_2
          Card.card
            strong 公告 
            div(v-html="stateContestAnnouncement").annoucement
              

</template>
<script>
import { Vue, Component } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
import ContestList from "@/components/TheContestList.vue";
import SearchAndFlush from "@/components/SearchAndFlush.vue";
@Component({
  components: {
    "search-and-flush":SearchAndFlush,
    "contest-list":ContestList
  }
})
export default class extends Vue {
  @State("contestList")
  stateContestList;

  @State("contestingState")
  stateContestingState;

  @State("contestAnnouncement")
  stateContestAnnouncement;

  @Mutation("setContestList")
  mutationSetContestList;

  @Mutation("setContestingState")
  mutationSetContestingState;

  @Mutation("setContestListPage")
  mutationSetContestListPage;

  @Mutation("setContestAnnouncement")
  mutationSetContestAnnouncement;

  @Mutation("setContestListSearchValue")
  mutationSetContestListSearchValue;

  initContestList() {
    this.mutationSetContestListSearchValue('');
    Promise.all([
      this.$api.getContestingState(),
      this.$api.asyncRequireList("ContestList", 10),
      this.$api.getContestAnnouncement()
    ])
      .then(res => {
        this.mutationSetContestingState(res[0]);
        this.mutationSetContestList(res[1]);
        this.mutationSetContestAnnouncement(res[2]);
      })
      .catch(e => {
       this.$prompt("系统繁忙哦","error"); 
      });
  }

  turnPage(pageNo) {
    window.scrollTo(0, 0);
    this.$api.asyncRequireList("ContestList",10, pageNo, this.stateContestList.searchVal).then(res => {
      this.mutationSetContestList(res);
    });
  }

  flushFn() {
    this.initContestList();
  }

  searchFn(e) {
    this.mutationSetContestListSearchValue(e.target.value)
    this.$api
      .asyncRequireList("ContestList",10,1,this.stateContestList.searchVal)
      .then(res => {
        this.mutationSetContestList(res);
      });
  }

  created() {
    this.initContestList();
  }
}
</script>
<style lang="scss" scoped>
@import "~@/sass/config.scss";
@import "~@/sass/animations.scss";
@include flash-animation;
@include switch-list-animation;

@mixin contest_card($which, $font-color, $color) {
  margin-left: 5px;

  &_1_#{$which} {
    height: 10.625rem;
    border-radius: 10px;
    background-image: linear-gradient(to bottom, lighten($color, 20%), $color);
    overflow: hidden;
    min-width: 200px;
    position: relative;
    z-index: 0;

    img {
      width: 14.875rem;
      height: 12.75rem;
      left: 0;
      bottom: 0;
      position: absolute;
      z-index: -1;
    }

    p {
      color: $font-color;
    }

    p:nth-child(1) {
      font-size: 1.5rem;
      width: 100%;
      float: left;
    }

    p:nth-child(2) {
      font-size: 1rem;
      margin-top: 4.5rem;
      margin-right: 20px;
      float: right;
    }
  }
}

.tool_line {
  width: 100%;
  #flush_and_search {
    float: right;
    margin-top: 10px;
  }
}

.l_card {
  margin-right: 5px;
  height: 1100px;
  position: relative;

  .contest_list {
    margin-top: 45px;
  }
  .contest_page {
    position: absolute;
    right: 20px;
    bottom: 20px;
  }

  strong {
    font-size: 20px;
    color: $standard-title;
  }
}

.r_card {
  @include contest_card("true", rgba(255, 255, 255, 0.767), #ff3c00);
  @include contest_card("false", rgba(31, 31, 31, 0.815), #b3b3b3);
  -webkit-user-select: none;
  -moz-user-select: none;
  &_2 {
    margin-top: 30px;
    position: relative;

    .circle_head {
      background: url("~@/images/plate.png") no-repeat scroll left center/ 100px
        100px;
      height: 100px;
      width: 100px;
      top: -50px;
      left: 50%;
      margin-left: -50px;
      position: absolute;
      border-radius: 50%;
      z-index: 900;
    }

    .card {
      width: 100%;
      height: 420px;
      position: relative;

      strong {
        color: $standard-context;
        font-size: 24px;
      }

      rank-li {
        margin-top: 200px;
        position: absolute;
      }

      .rank_page {
        margin-top: 10px;
        bottom: 20px;
        right: 20px;
        position: absolute;
      }
    }
  }
  .annoucement {
    text-overflow: ellipsis;
  }

  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
}
</style>
