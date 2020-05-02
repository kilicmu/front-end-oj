<template lang="pug">
div.root
  img(:src="src" alt="头像").head_preview
  Upload(
    action="http://127.0.0.1:3000/api/uploadHeadPic"
    accept="image/*"
    :on-success="handleSuccessful"
    :show-upload-list="false"
    ).upload_btn
    Button(icon="ios-camera").upload_btn
</template>
<script>
import { Vue, Component, Prop } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";

@Component({components: {}})
export default class extends Vue {
  @Prop(String)
  src;

  handleSuccessful(resp, file, fileList){
    this.$emit('change-head-pic', `${this.$serverAddress}${resp.file}`);
    this.$prompt("上传成功", "success");
  }
  
}
</script>
<style lang="scss" scoped>
.root{
  width: 100px;
  height: 100px;
  position: relative;

  .head_preview{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid rgb(202, 202, 202);
    
    position: absolute;
    top: 0;
}

.upload_btn{
  width: 100px;
  height: 100px;
  background-color: none;
  border-radius: 50%;
  position: absolute;
  top: 0;
  z-index: 999;
  background-color:rgb(187, 187, 187);
  color: rgb(36, 36, 36);
  opacity: 0;
  transition: all .5s;
}

.upload_btn:hover{
  border: none;
  opacity: .6;
}
}

</style>