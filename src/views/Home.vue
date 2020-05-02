<template lang="pug">
    Card
      div(style="height: 34rem" clearfix)
        div(style="position: relative")
          img(src="~@/images/header-background.jpg" width="100%" height="100%")#bck_pic
          img(src="~@/images/header-teamwork1.svg" v-if="randnum===1")#header_teamwork
          img(src="~@/images/header-teamwork2.svg" v-if="randnum===2")#header_teamwork
          img(src="~@/images/header-teamwork3.svg" v-if="randnum===3")#header_teamwork
          div#info
            h2 An OJ platform
            p You can learn the algorithm here
            p And of course, we're going to take your problem solving information,you can we're going to show you the data with other people           
            Button(type="primary"
              :append="bAppend"
              shape="circle"
              class="start_to_problems"
              to="/problems") start
            Button(shape="circle"
              :append="bAppend"
              class="start_to_problems"
              style="margin-left: 3.75rem") news
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
@Component
export default class Home extends Vue {
  bAppend = false;
  picUrl = "~@/images/header-teamwork";
  randnum = 1;
}
</script>

<style lang="scss">
#bck_pic {
  position: absolute;
  width: 100%;
  height: 34rem;
  right: 0;
  top: 0;
}
#header_teamwork {
  position: absolute;
  width: 22rem;
  height: 400px;
  right: 12rem;
  top: 9rem;
}

#info {
  position: absolute;
  top: 10rem;
  left: 2rem;
  width: 26rem;
  h2 {
    font-weight: bolder;
    font-size: 28px;
    color: rgba(0, 163, 212, 0.911);
  }
  p {
    font-size: 16px;
  }
  p:nth-of-type(1) {
    margin-top: 30px;
  }
  p:nth-of-type(2) {
    margin-top: 10px;
  }
}

.start_to_problems {
  margin-top: 2rem;
  width: 8rem;
  height: 38px;
  font-size: 16px;
  line-height: 38px !important;
  text-align: center;
}
</style>
