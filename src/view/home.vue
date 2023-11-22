<template>
  <div class="top">

    <div class="navigation">
      <div class="nv">
        <div class="logo">
          Lingo
        </div>
        <div class="nev-items">
          <div class="top-item">
            <span class="top-text">Home</span>
          </div>
          <div class="top-item">
            <span class="top-text">Register</span>
          </div>
          <div class="top-item">
            <span class="top-text">Contact Us</span>
          </div>
          <div class="top-item">
            <span class="top-text">Help</span>
          </div>
        </div>

      </div>

    </div>
  </div>
  <div class="bot">
    <div class="chat">
      <a-button type="text" @click="toggleChatWindow">
        <template #icon>
          <message-outlined :style="{fontSize: '30px', color:'#ffffff'}" />
        </template>
      </a-button>
    </div>
  </div>
  <ChatWindow v-if="showChatWindow"></ChatWindow>

<!--  <login></login>-->
  <word-card :refresh="getUserData"></word-card>
</template>

<script>
import { MessageOutlined } from '@ant-design/icons-vue';
import ChatWindow from "../view/ChatWindow";
import WordCard from "@/view/WordCard";
import axios from "@/axios";
export default {
  components: {
    MessageOutlined,
    ChatWindow,
    WordCard,
  },
  name: "home",
  data(){
    return {
      showChatWindow: false
    }
  },
  methods:{
    getUserData(getData){
      axios.get('/user/getUserData',{
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res=>{
        this.$store.commit('SET_USERINFO',res.data.data)
        // console.log(res.data.data)
        if(getData){
          getData();
        }
        console.log(this.$store.state.token)
        console.log(this.$store.state.userInfo.glossary)
      }).catch(err=>{
        // console.log(err)
        // if(err.response.data.code === '1002'){
        //   console.log('token过期')
        //   this.$router.push('/login')
        // }
      })
    },
    toggleChatWindow() {
      this.showChatWindow = !this.showChatWindow; // 切换窗口的显示和隐藏状态
    }
  },
  mounted:function (){
    this.getUserData()
  },
}
</script>

<style scoped>
@import "../scss/pages/_home.scss";
</style>