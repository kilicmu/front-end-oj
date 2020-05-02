<template lang="pug">
  Card.state_card
    strong Status
      div.status_flash_search
        search-and-flush(:searchFn="searchFn" :flushFn="flushFn").search_and_flush
        i-switch(v-model="onlySelf" size="large" @on-change="_switch").status_flash_search_switch
          span(slot="close") all
          span(slot="open") self
    transition(name="flash")
      status-list(:stateStatusList="stateStatusList.content").status_list
    //- Spin(size="large" fix v-if="!show_list")
    Page(
      show-elevator
      :current.sync="stateStatusList.currentPage"
      :page-size="stateStatusList.onePageContent"
      placement="top"
      :total="stateStatusList.max"
      @on-change="turnPage").status_list_page

</template>
<script>
import { Vue, Component } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
import SearchAndFlush from "@/components/SearchAndFlush.vue";
import StatusList from "@/components/TheStatusList.vue";
import StatusChart from "@/components/TheStatusChart.vue"

@Component({components: {
  "search-and-flush":SearchAndFlush,
  "status-list":StatusList,
  "status-chart":StatusChart
}})
export default class extends Vue {
  onlySelf = false
  @State("user")
  stateUser

  @State("statusList")
  stateStatusList;

  @Mutation("setStatusList")
  mutationSetStatusList;

  @Mutation("setStatusListPage")
  mutationSetStatusListPage;

  @Mutation("setStatusListSearchValue")
  mutationSetStatusListSearchValue;

  turnPage(pageNo) {
    this.$api.asyncRequireList("StatusList", 12, pageNo,this.stateStatusList.searchVal, this.onlySelf).then(res => {
      this.mutationSetStatusList(res);
      window.scrollTo(0,0)
    }).catch(_=>{
      this.$prompt("服务器繁忙哦")
    });
  }

  flushFn() {
    this.mutationSetStatusListSearchValue('')
    this.onlySelf=false;
    this.$api.asyncRequireList("StatusList", 12,1, this.stateStatusList.searchVal, this.onlySelf).then(res => {
      this.mutationSetStatusList(res);
    }).catch(_=>{
      this.$prompt("服务器繁忙哦")
    });
  }

  searchFn(e) {
    this.mutationSetStatusListSearchValue(e.target.value)
    this.$api
      .asyncRequireList("StatusList",12,1,this.stateStatusList.searchVal, this.onlySelf)
      .then(res => {
        this.mutationSetStatusList(res);
      }).catch(_=>{
      this.$prompt("服务器繁忙哦")
    });
  }

  _switch(statu){
    this.onlySelf = statu;
    this.$api
      .asyncRequireList("StatusList",12,1,this.stateStatusList.searchVal, this.onlySelf)
      .then(res => {
        this.mutationSetStatusList(res);
      }).catch(_=>{
      this.$prompt("服务器繁忙哦")
    });
  }

  created(){
    this.$api.asyncRequireList("StatusList",12).then(res=>{
      this.mutationSetStatusList(res);
    }).catch(_=>{
      this.$prompt("服务器繁忙哦")
    })
  }
}
</script>
<style lang="scss">
@import "~@/sass/config.scss";
@import "~@/sass/animations.scss";
@include flash-animation;
.state_card {
  height: 870px;
  width: 100%;
  position: relative;
  strong {
    font-size: 20px;
    color: $standard-title;
  }
  .status_flash_search {
    position: absolute;
    right: 20px;
    top: 50px;
    .search_and_flush{
      float: right;
    }
    .status_flash_search_switch{
      top: 8px;
      right: 10px;
      float: right;
    }
    
  }
  .status_list {
    margin-top: 50px;
    &_page {
      position: absolute;
      right: 30px;
      bottom: 30px;
    }
  }
}
</style>