<template lang="pug">
  Form(ref="formInline" :model="signUpForm" :rules="signUpRule" v-if="signUp").login_form
    FormItem(prop="user")
      Input(type="text" v-model="signUpForm.user" placeholder="username")
        Icon(type="ios-person-outline" slot="prepend")
    FormItem(prop="email")
      Input(type="text" v-model="signUpForm.email" placeholder="email")
        Icon(type="ios-person-outline" slot="prepend")
    FormItem(prop="password")
      Input(type="password" v-model="signUpForm.password" placeholder="password")
        Icon(type="ios-lock-outline" slot="prepend")
    FormItem
      Button(type="primary" style="width:100%") Sign up
</template>

<script>
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class SignUp extends Vue {
  @Prop({ type: Boolean, default: false })
  signUp;

  signUpForm = {
    user: "",
    email: "",
    password: ""
  };

  signUpRule = {
    user: [
      {
        required: true,
        message: "Please fill in the user name",
        trigger: "blur"
      }
    ],
    email: [
      {
        required: true,
        message: "Please fill in the email",
        trigger: "blur"
      },
      {
        type: "email",
        message: "Please enter the correct email",
        trigger: "blur"
      }
    ],
    password: [
      {
        required: true,
        message: "Please fill in the password.",
        trigger: "blur"
      },
      {
        type: "string",
        min: 6,
        message: "The password length cannot be less than 6 bits",
        trigger: "blur"
      }
    ]
  };
}
</script>

<style scoped></style>
