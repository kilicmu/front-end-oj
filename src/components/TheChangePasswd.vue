<template lang="pug">
  Form(ref="formInline" :model="changePasswordForm" :rules="changePasswordRule" v-if="changePasswd" inline).login_form
    FormItem(prop="user").change_password_userinput
      Input(type="text" v-model="changePasswordForm.user" placeholder="username/email")
        Icon(type="ios-person-outline" slot="prepend")
    FormItem(prop="checkCode").change_password_code
      Input(type="text" v-model="changePasswordForm.checkCode" placeholder="check code" )
    FormItem.change_password_send
      Button(type="info" style="width:100%" @click="sendCode") send
    FormItem.change_password_confirm
      Button(type="primary" style="width:100%") confirm 
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";
import { checkIt } from "@/utils/buttonUtils.ts";

@Component
export default class SignIn extends Vue {
  @Prop({ type: Boolean, default: false })
  changePasswd;
  /**
   * 修改密码信息记录，user为用户名，checkCode为校验码
   */
  changePasswordForm = {
    user: "",
    checkCode: ""
  };
  /**
   * 处理输入内容的正则
   */
  changePasswordRule = {
    user: [
      {
        required: true,
        message: "Please fill in the user name",
        trigger: "blur"
      }
    ],
    checkCode: [
      {
        required: true,
        message: "Please fill in the check code.",
        trigger: "blur"
      }
    ]
  };

  sendCode(e) {
    const inter = checkIt(e.target, 3, "resend");
    this.$once("hook:beforeDestory", () => {
      if (inter) {
        clearInterval(inter);
      }
    });
  }
}
</script>

<style lang="scss">
.change_password {
  &_userinput {
    width: 100%;
  }
  &_confirm {
    width: 100%;
  }
  &_code {
    width: 220px;
    float: left;
  }
  &_send {
    width: 125px;
    float: right;
  }
}
</style>
