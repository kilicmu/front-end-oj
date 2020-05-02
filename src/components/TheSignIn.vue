<style lang="scss" scoped></style>

<template lang="pug">
  Form(ref="formInline" :model="loginForm" :rules="loginRule" v-if="signIn").login_form
    FormItem(prop="username")
      Input(type="text" v-model="loginForm.username" placeholder="用户名/email")
        Icon(type="ios-person-outline" slot="prepend")
    FormItem(prop="password")
      Input(type="password" v-model="loginForm.password" placeholder="密码")
        Icon(type="ios-lock-outline" slot="prepend")
    FormItem
      Button(type="primary" style="width:100%" @click="login") Sign in 
  
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";
import { Mutation } from 'vuex-class';
import {loginRule} from "@/config/index";
import {throttle} from "@/utils/publicUtils";
@Component
export default class SignIn extends Vue {
  @Prop({ type: Boolean })
  signIn;

  loginRule = loginRule;

  @Mutation("setToken")
  mutationSetToken;

  loginForm = {
    username: "",
    password: ""
  };

  login = throttle(this.loginTmp, 2000);

  loginTmp(){
    if(
     this.loginForm.username.length >=6 ||
     this.loginForm.username.length<=26 || 
     this.loginForm.password.length >=6 || 
     this.loginForm.password.length<=26
     ){
       this.$prompt("用户名密码不能为空哦", "warning")
      return;
    }
    this.$api.login(this.loginForm).then(res=>{
      console.log(res);
    }).catch(
      e=>{
         this.$prompt(e);
      }
    )
  }

}
</script>
