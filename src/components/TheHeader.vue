<template lang="pug">
nav
  Menu(mode="horizontal" :theme="theme1" :active-name="isActive").head
    div.school_icon
      div.icon
    h1.school_name
    div.menu-group
      MenuItem(name="home" to="/")
        Icon(type="ios-home")
        span Home 
      MenuItem(name="problems" to="/problems")
        Icon(type="md-code") 
        span Problems
      MenuItem(name="contest" to="/contest")
        Icon(type="md-trophy") 
        span Contest
      MenuItem(name="status" to="/status")
        Icon(type="md-stats") 
        span Status
      MenuItem(name="rank" to="/rank")
        Icon(type="ios-people")
        span Rank
      Submenu(name="about")
        template(slot="title")
          Icon(type="ios-menu") 
          span About
        MenuGroup(title="about")
          MenuItem(name="about_notice") 关于
          MenuItem(name="about_developer") 提意见
        MenuGroup(title="who")
          MenuItem(name="who_am_i")
      div.user-do
        span(class="ivu-avatar ivu-avatar-circle ivu-avatar-icon").user-ico
          i(class="ivu-icon ivu-icon-ios-person")
        button(type="button" @click="clearCoversionAndShow('signIn')" class="ivu-btn ivu-btn-text ivu-btn-large").sign-btn Sign in 
        Dropdown#login
          a(href="javascript:void(0)")
            Icon(type="ios-arrow-down")
          DropdownMenu(slot="list")
            DropdownItem(@click="clearCoversionAndShow('changePasswd')").drop_down_item 修改密码
            DropdownItem(divided) 退出登录
      Modal(v-model="showConversion" title="Welcome" width="400" mask-closable)
        SignIn(:signIn="showContent.signIn")
        SignUp(:signUp="showContent.signUp")
        ChangePassword(:changePasswd="showContent.changePasswd")
        div(slot='footer' v-if="showContent.signIn")
          a(style="float:left" @click="clearCoversionAndShow('changePasswd')") forget password
          a(@click="clearCoversionAndShow('signUp')") create a account
        div(slot='footer' v-if="showContent.signUp" style="text-align:center")
          span already have account?
          a(@click="clearCoversionAndShow('signIn')" style="margin-left:10px") sign in
        div(slot='footer' v-if="showContent.changePasswd" style="text-align:center")
          span No account yet?
          a(@click="clearCoversionAndShow('signUp')" style="margin-left:10px") create a account
</template>

<script>
import { Vue, Component, Watch } from "vue-property-decorator";
import SignIn from "@/components/TheSignIn.vue";
import SignUp from "@/components/TheSignUp.vue";
import ChangePassword from "@/components/TheChangePasswd.vue";

@Component({
  components: {
    SignIn,
    SignUp,
    ChangePassword
  }
})
export default class TheHeader extends Vue {
  show = false;
  theme1 = "light";
  w = "1600";
  isActive = "home";
  showConversion = false;
  showContent = {
    signIn: false,
    signUp: false,
    changePasswd: false
  };

  clearCoversionAndShow(target) {
    this.showConversion = true;
    for (const k in this.showContent) {
      this.showContent[k] = false;
    }
    Object.keys(this.showContent).includes(target)
      ? (this.showContent[target] = true)
      : null;
  }

  @Watch("$route.path")
  changeActive() {
    const path = window.location.pathname;
    const patt = new RegExp("/([A-Z]*)", "i");
    const act = patt.exec(path)[1];
    if (act === "") {
      this.isActive = "home";
    } else {
      this.isActive = patt.exec(path)[1];
    }
  }

  created() {
    this.changeActive();
  }
}
</script>

<style lang="scss" scoped>
.school_icon {
  margin-left: 30px;
  width: 50px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  float: left;
  .icon {
    margin-top: 5px;
    background: url("~@/images/logo.png") no-repeat;
    background-size: 100%;
    width: 100%;
    height: 60px;
  }
}

.head {
  width: 100%;
  min-width: 1300px;
  box-shadow: 2px 2px 2px #adadad79;
}

.menu-group {
  float: right;
}

.user-do {
  margin-right: 60px;
  display: inline;
}

.school_name {
  float: left;
  margin-top: 3px;
  margin-left: 20px;
  height: 60px;
  font-size: 24px;
  font-family: "Courier New", Courier, monospace;
  text-align: center;
  color: rgba(54, 54, 54, 0.507);
}
</style>
