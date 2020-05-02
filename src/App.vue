<template lang="pug">
  div.layout
    Layout
      Header#header
      Breadcrumb(:style="{margin: '40px'}")
      Content(:style="{padding: '0 150px'}")
        transition(mode="out-in")
          router-view
      Footer.layout-footer-center 2019 &copy; hrbustOJ
    BackTop
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Header from "@/components/TheHeader.vue";

@Component({
  components: {
    Header
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import "~@/sass/config.scss";
@import "~@/sass/animations.scss";
@include switch-animation;

#header {
  width: 100%;
  top: 0;
  min-width: 1300px !important;
  z-index: 999;
  position: fixed;
}

.layout {
  border: $standard-border;
  background: $standard-background-color;
  position: relative;
  border-radius: 0.25rem;
  min-width: 1300px !important;
  overflow: hidden;
  &-footer-center {
    text-align: center;
  }
}
.ivu-layout-content {
  min-width: 1300px;
}

.ivu-poptip-body-content {
  overflow: hidden !important;
}
</style>
