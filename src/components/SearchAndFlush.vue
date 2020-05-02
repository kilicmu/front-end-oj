
<template lang="pug">
    div#flush_and_search
      Input(v-model="searchVal"
        id="search"
        search="search"
        placeholder="关键词"
        style="width: 200px"
        maxlength="10"
        @on-enter="searchFn")
      Button(type="primary" @click="flush").flush
        Icon(type="md-refresh" )
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class SearchAndFlush extends Vue {
  searchVal = "";
  @Prop({ type: Function })
  flushFn;

  @Prop({ type: Function })
  searchFn;

  flush() {
    this.searchVal = "";
    this.flushFn();
  }
}
</script>
<style lang="scss" scoped>
.flush {
  margin-left: 10px;
}
</style>