<template lang="pug">
div
  Card.user_card
    Card.user_panel
      Button(type="text" v-show="changeAble" @click.prevent="showChangeUserMsg = true").user_msg_change
        Icon(type="ios-brush-outline")
      div.avatar
        img(:src="stateUser.headPic" alt="avatar")
      h2.user_name {{stateUser.name}}
      div.user_description
        p {{stateUser.description}}
        strong 来自于：
        span {{stateUser.from.province.value}}省 {{stateUser.from.value}}市 {{stateUser.from.value}}县
      div.visit_site
        button(@click="visitBlog").blog_btn Visit Blog
      div.user_footer
        span(v-for="item in stateUser.tags") {{item.value}}
    change-user-msg(:show.sync="showChangeUserMsg" v-on:close-change-msg="closeModal").edit_modal
    
</template>
<script>
import { Vue, Component, Watch } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
import ChangeUserMsg from "@/components/TheChangeUserMsg.vue";

@Component({components: {
  "change-user-msg":ChangeUserMsg
}})
export default class extends Vue {
  showChangeUserMsg = false;
  @State("user")
  stateUser;

  changeAble = false;
  
  @Watch("stateUser.isLogin")
  function (pre) {
     this.changeAble = this.stateUser.isLogin;
  }

  visitBlog(){
    window.location.href = this.stateUser.blogUrl;
  }

  closeModal(res){
    this.showChangeUserMsg = res;
  }

  created() {
    if(this.stateUser.isLogin){
      if(this.stateUser.name===this.$route.params.uname){
        this.changeAble=true;
      }
    }
    
    this.$on("closeChangeUserMsg", (msg)=>{
      console.log(msg);
      this.showChangeUserMsg = msg;
    })
  }

  

}
</script>
<style lang="scss">
@import "~@/sass/config.scss";
.user {
  &_card {
    background: linear-gradient(141deg, #0fb8ad 0%, #76f1ff 51%, #2cb5e8 75%);
    height: 800px;
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
  }
  &_msg_change {
    position: absolute;
    right: 0;
    top: 10px;
    right: 10px;
    outline: none;
  }
  &_panel {
    width: 600px;
    height: 300px;
    border-radius: 10px;
    padding: 50px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .avatar {
      background-color: rgb(230, 230, 230);
      border-radius: 50%;
      left: 50%;
      top: -25%;
      transform: translate(-50%, 0);
      overflow: hidden;
      position: absolute;
      height: 150px;
      width: 150px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  &_name {
    width: 100%;
    text-align: center;
    font-weight: bold;
    font-size: 16px;
    margin-top: 20px;
    color: $standard-title;
  }
  &_description {
    margin-top: 10px;
    text-align: center;
  }
}
.user_panel:hover {
  box-shadow: rgba(204, 204, 204, 0.699) 5px 5px 25px;
}
.visit_site {
  margin-top: 10px;
  width: 100%;
  text-align: center;
  button {
    height: 40px;
    width: 140px;
    background: linear-gradient(141deg, #0fb8ad 0%, #2cb5e8 51%, #76f1ff 75%);
    border-radius: 5px;
    border: none;
    color: #fff;
    font-weight: bolder;
  }
  button:hover {
    cursor: pointer;
  }
}

.user_footer {
  width: 100%;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  display: flex;
  margin-top: 30px;
  span {
    cursor: pointer;
    color: darken($standard-disabled, 30%);
  }
}

.user_footer span::before {
  content: "#";
}

.user_change_msg {
  margin-bottom: 12px;
  p {
    font-size: 14px;
    height: 28px;
  }
}


.blog_btn{
  position: relative;
  overflow: hidden;
}

.blog_btn::before{
  content: '';
  width: 23px;
  height: 40px;
  background-color: rgba(236, 236, 236, 0.219);
  -webkit-filter: blur(100);
  filter: blur(100);
  display: inline-block;
  position: absolute;
  top: 0;
  left: -50px;
  transform: skew(-55deg); 
  transition: all .5s;
  pointer-events:none;
  
}

.blog_btn:hover::before{
  left: 170px;
}
</style>

