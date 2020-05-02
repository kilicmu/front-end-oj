<style lang="scss" scoped>
.r_card {
  margin-left: 10px;
  .button_group {
    float: right;
  }
}

#give_up_button {
  margin-right: 10px;
}
</style>
<template lang="pug">
    Row
      Col(span="10")
        ProblemInfo 
      Col(span="14")
        Card.r_card
          div.button_group
            Button(type="warning" id="give_up_button" @click.prevent="isGiveUp=true") GIVE UP
            Button(type="success" @click.prevent="subit") SUBMIT
            Modal(v-model="isGiveUp" title="提示" @on-ok="giveUp")
              p 确认要放弃吗?
          EditScope.edit_scope
        
</template>
<script>
import { Vue, Component } from "vue-property-decorator";
import MonacoEditor from "monaco-editor-vue";
import ProblemInfo from "@/components/TheProblemInfo.vue";
import EditScope from "@/components/TheEditScope.vue";
import {throttle} from "@/utils/publicUtils";
import { State, Mutation } from "vuex-class";

@Component({
  components: {
    ProblemInfo,
    MonacoEditor,
    EditScope
  }
})
export default class Answer extends Vue {
  @State("user")
  stateUser;

  @State("userProblemCode")
  stateUserProblemCode;

  @Mutation("setProblemCode")
  mutationSetProblemCode;

  isGiveUp = false;

  subit = throttle(this.submit, 2000);
  
  submit(){
    if(!this.stateUser.isLogin){
    this.$prompt("请先登录", "warning");
    return ;
    }
    this.$api
      .submitProblem(this.stateUserProblemCode)
      .then(res => {
        //TODO after answer submit
        this.$prompt("提交成功","success");
        window.location.href=`/postedProblem/${res.user}/${res.problemId}`;
      })
      .catch(err => {
       this.$prompt("系统繁忙哦","error"); 
      });
   }

  handleTabsAdd() {
    this.tabs++;
  }

  handleUpload(file) {
    const reader = new FileReader();
    if (typeof FileReader === "undefined") {
      this.$Message.error("您的浏览器不支持FileReader接口");
      return false;
    }
    reader.readAsText(file, "utf8");
    reader.onload = () => {
      this.mutationSetProblemCode(reader.result);
    };
    return false;
  }

  giveUp() {
    window.location.href = "/problems";
  }


  mounted() {
    this.editorWidth = document
      .getElementById("textarea-m")
      .offsetWidth.toString();
    window.onresize = () => {
      this.editorWidth = document
        .getElementById("textarea-m")
        .offsetWidth.toString();
    };
  }
}

</script>
