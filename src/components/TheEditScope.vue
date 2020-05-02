<template lang="pug">
div
  div.tools
    Select(v-model="lType" style="width:160px").selecter
      Option(v-for="item in types" :value="item.value" :key="item.value") {{ item.label }}
    Select(v-model="lTerminal" style="width:80px").selecter
      Option(v-for="item,key in terminals"
        :value="item.value"
        :key="key") {{ item.label }}
    div.buttons
      Tooltip(content="上传").buttons
        Upload(action="#" :before-upload="handleUpload")
          Button(icon="ios-cloud-upload-outline" shape="circle")
      Tooltip(content="清空").buttons
        Button(icon="md-refresh" @click.prevent="currentCode=''" shape="circle")
  div#textarea-m
    MonacoEditor(
      :width="editorWidth"
      height="700"
      :theme="lTerminal"
      v-model="currentCode"
      :language="lType").edit_space
</template>
<script>
import { Vue, Component, Watch } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
import MonacoEditor from "monaco-editor-vue";
@Component({
  components: {
    MonacoEditor
  }
})
export default class EditScope extends Vue {
  editorWidth = "";
  currentCode = "";

  @State("userProblemCode")
  stateUserProblemCode;

  @Mutation("setProblemCodeId")
  mutationSetProblemCodeId;

  @Mutation("setProblemCode")
  mutationSetProblemCode;

  @Mutation("setProblemCodeType")
  mutationSetProblemCodeType;

  /**
   * edit配置
   */
  types = [
    {
      value: "c",
      label: "C"
    },
    {
      value: "c++",
      label: "C++"
    },
    {
      value: "java",
      label: "Java"
    }
  ];
  lType = "c";
  terminals = [
    { value: "vs", label: "vs" },
    { value: "vs-dark", label: "vs-dark" },
    { value: "hc-black", label: "hc-black" }
  ];
  lTerminal = "vs";

  @Watch("currentCode")
  changeCode() {
    this.mutationSetProblemCode(this.currentCode);
  }

  @Watch("lType")
  changeLType() {
    this.mutationSetProblemCodeType(this.lType);
  }

  handleUpload(file) {
    const reader = new FileReader();
    if (typeof FileReader === "undefined") {
      this.$Message.error("您的浏览器不支持FileReader接口");
      return false;
    }
    reader.readAsText(file, "utf8");
    reader.onload = () => {
      this.currentCode = reader.result;
    };
    return false;
  }

  mounted() {
    this.editorWidth = document
      .getElementById("textarea-m")
      .offsetWidth.toString();
    window.addEventListener("resize", () => {
      this.editorWidth = document.getElementById("textarea-m").offsetWidth;
    });
  }

  created() {
    this.mutationSetProblemCodeId(this.$route.params.pid);
    this.mutationSetProblemCode("");
    this.mutationSetProblemCodeType(this.lType);
  }

  destroyed() {
    window.removeEventListener("resize", this.resizeEdit);
  }
}
</script>

<style lang="scss" scoped>
.tools {
  .selecter {
    float: left;
  }
  .buttons {
    margin-left: 10px;
  }
}

#textarea-m {
  margin-top: 20px;
}
</style>
