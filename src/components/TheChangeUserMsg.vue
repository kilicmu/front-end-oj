<template lang="pug">
  Modal(v-model="show" width="440" :closable="false" :mask="false").edit_modal
    p(slot="header") {{stateUser.name}}：请修改您的个人信息
    div
      Form(:model="dynamicUser")
        FormItem()
          RoundUploadableHeadPic(
            :src="dynamicUser.headPic"
            v-on:change-head-pic="changeHeadPic"
          ).head_pic
        FormItem().user_change_msg
          p 邮箱:
          Input(v-model="dynamicUser.mail" maxlength="30" show-word-limit)
        FormItem().user_change_msg
          p 签名:
          Input(type="textarea" v-model="dynamicUser.description" maxlength="100" show-word-limit)
        FormItem().user_change_msg
          p 居住地:
          div.select_group
            Select(
              v-model="showOption.province"
              label-in-value 
              v-on:on-change="provinceChanged"
              ).from_selector
              Option(
                v-for="(item, key) in showOption.provinceOptions"
                :value="item.id"
                :key="key"
                ) {{item.name}}
            Select(
              v-model="showOption.city"
              label-in-value 
              v-on:on-change="cityChanged"
              ).from_selector
              Option(
                v-for="(item, key) in showOption.cityOptions"
                :value="item.id"
                :key="key"
                ) {{item.name}}
            Select(
              v-model="showOption.county"
              v-on:on-change="countyChanged"
              label-in-value 
              ).from_selector
              Option(
                v-for="(item, key) in showOption.countyOptions"
                :value="item.id"
                :key="key"
                ) {{item.name}}
            
        FormItem().user_change_msg
          p 博客地址:
          Input(v-model="dynamicUser.blogUrl" maxlength="100" show-word-limit)
        p 标签:  
        FormItem(
          v-for="(item,index) in dynamicUser.tags"
          :key="index"
          :label="'tag'+index"
          v-model="item.value"
          ).user_change_msg
          Row
            Col(span="16")
              Input(type="text" v-model="item.value" placeholder="你的自定义标签" maxlength="6" show-word-limit)
            Col(span="4" offset="1")
              Button(@click="handleRemove(index)") delete
        FormItem()
          Row
            Col(span="12")
              Button(type="dashed" long @click="handleAdd" icon="md-add") 添加标签 
    div(slot="footer") 
      Button(type="primary" @click="submit") 确认修改
      Button(@click="closeModal") 取消

</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
import { valueHasEmpty } from "@/utils/checkValue.ts";
import {mailReg} from "@/config/index";
import {updateUserMsg} from "@/utils/formUtils";
import RoundUploadableHeadPic from "@/components/RoundUploadableHeadPic.vue";

@Component({
  components:{
    RoundUploadableHeadPic
}})
export default class ChangeUserMsg extends Vue {
  @Prop(Boolean)
  show;

  @State("user")
  stateUser;

  dynamicUser={
    mail:'',
    description:'',
    from:{
      province:{
        id: "",
        label: ""
      },
      city:{
        id: "",
        label: ""
      },
      county:{
        id: "",
        label: ""
      },
    },
    headPic:'',
    blogUrl:'',
    tags:[]
  };

  showOption = {
    province:"",
    city :"",
    county : "",
    provinceOptions:[],
    cityOptions:[],
    countyOptions:[]
  }

  regionJson = {
    provinceJson: [],
    cityJson:{},
    countyJson:{}
  }
  updateSelector = true;

  @Mutation("changeUserMsg")
  mutationChangeUserMsg;

  initDynamicUser(){
    updateUserMsg(this.dynamicUser, this.stateUser)
    this.showOption.province = this.dynamicUser.from.province.id;
    this.showOption.city = this.dynamicUser.from.city.id;
    this.showOption.county = this.dynamicUser.from.county.id;
  }

  created() {
    this.initDynamicUser();
    this.$api.getRegionJson().then(res=>{
      this.regionJson.provinceJson = res.provinceJson;
      this.regionJson.cityJson = res.cityJson;
      this.regionJson.countyJson = res.countyJson;
      
      this.showOption.provinceOptions = this.regionJson.provinceJson;
      this.showOption.cityOptions = this.dynamicUser.from.province.id===""?[]:this.regionJson.cityJson[this.showOption.province];
      this.showOption.countyOptions = this.dynamicUser.from.city.id===""?[]:this.regionJson.cityJson[this.showOption.city];
    }).catch(e=>{
      this.$prompt("无法获取城市数据");
    })
  }

  provinceChanged(res){
    if(!res){
      return;
    }
    this.dynamicUser.from.province.id = res.value;
    this.dynamicUser.from.province.label = res.label;
    this.showOption.cityOptions = this.regionJson.cityJson[res.value];
    this.showOption.countyOptions = [];
    this.showOption.city="";
    this.showOption.county = "";
  }

  cityChanged(res){
    if(!res){
      return;
    }
    this.dynamicUser.from.city.id = res.value;
    this.dynamicUser.from.city.label = res.label;
    this.showOption.countyOptions = this.regionJson.countyJson[res.value];
    this.showOption.county = "";
  }

  changeHeadPic(res){
    console.log(res);
    this.dynamicUser.headPic = res;
  }

  countyChanged(res){
    if(!res){
      return;
    }
    this.dynamicUser.from.county.id = res.value;
    this.dynamicUser.from.county.label = res.label;

  }

  handleAdd() {
      if (this.dynamicUser.tags.length > 2) {
        this.$prompt("最大标签上限为3", "warring");
        return;
      }
      this.dynamicUser.tags.push({
        value: "",
        empty: false
      });
    }

  handleRemove(index) {
    this.dynamicUser.tags.splice(index, 1);
  }

  submit(){
    if (!mailReg.test(this.dynamicUser.mail)) {
        this.$prompt("邮箱格式有误");
        return;
      }
    //检查标签是否存在空标签
    if (valueHasEmpty(this.dynamicUser.tags)) {
      this.$prompt("标签不可为空");
      return;
    }
    
    this.$api
      .postUserMsg(this.dynamicUser)
      .then(res => {
        this.mutationChangeUserMsg(res);
        this.$prompt("修改成功", "success");
        this.closeModal();
      }).catch(e => {
        this.$prompt("无法修改数据，请稍后");
      });
    
    
  }

  

  closeModal(){
    this.initDynamicUser();
    this.$emit('close-change-msg', false);
  }

  beforeDestroy() {
    this.closeModal();
  }

  
}
</script>

<style lang="scss">
.head_pic{
  margin: 0 auto;
}

.edit_modal{
  min-width: 440px;
}

.select_group{
  justify-content: space-between;
  display: flex;
}

.from_selector{
  width:130px;
}
</style>