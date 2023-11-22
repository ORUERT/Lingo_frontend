<template>
  <div  style="padding: 10px; margin-bottom: 50px">
    <a-row >
      <a-col class="chat-col" :span="16">
        <div class="chat-box">
          <div class="chat-title">
            Web聊天室（{{this.nickname}}）
          </div>
          <div class="chat-content" >
            <div class="message-box" id="scroll-box">
              <div class="scroll_content">
                <ul class="list">
                  <li v-for="(item, index) in messages" :key="index">
                    <div :class="{ self: item.self }" class>
                      <div class="nickname" v-if="item.self">{{ this.nickname }}</div>
                      <div class="nickname" v-else>teacher</div>
                      <img
                          src="../assets/logo.png"
                          class="avatar"
                          width="30"
                          height="30"
                          @click="handlerAddFrind(item.sender)"
                      />
                      <div class="text">
                        <span v-html="item.content" />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="chat-input">
            <a-input-group >
              <a-input class="chat-a-input" v-model:value="text" size="small">
                <template #suffix>
                  <div class="icon-wrapper">
                  <message-outlined :style="{fontSize: '20px', color:'#000000'}" v-if="text.length > 0" @click="onck" />
                  <message-outlined
                      :style="{ fontSize: '20px', color: '#AAAAAA' }"
                      v-show="text.length === 0"
                  />
                    </div>
                </template>
              </a-input>
            </a-input-group>
          </div>

        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { MessageOutlined  } from '@ant-design/icons-vue';
import axios from "@/axios";
import {defineComponent} from "vue";
// import request from "@/utils/request";
// let socket;
export default defineComponent( {
  components: {
    MessageOutlined
  },

  data() {
    return {
      user: {},
      isCollapse: false,
      nickname: '',
      text: "",
      messages: [],
      content: ''
    }
  },
  computed: {
    isTextEmpty() {
      return this.text.length === 0; // 判断文本是否为空
    }
  },
  created() {
    this.init()
  },
  methods: {
    onck() {
      if(!this.isTextEmpty){
        this.messages.push({self:true, content: this.text})
        this.text = ''
        this.send()
      }

    },
    send() {
        // 组装待发送的消息 json
        // {"from": "zhang", "to": "admin", "text": "聊天文本"}
      let temptext = this.messages.at(-1)
      console.log(temptext)
      let message = {self:true, content: temptext.content}
      axios.post('/message',message,{
        headers:{
          'Content-Type':'application/json',
          'Authorization':localStorage.getItem('token')
        }
      }).then(res=>{
        if(res.data.code === '200'){
          console.log(res.data)
          // 构建消息内容，本人消息
          this.messages.push({self:false,content:res.data.data})
        }else{
          this.messages.pop()
          //create error message
          // this.$message.error('登录失败')
        }
      }).catch(err=>{
        this.messages.pop()
        console.log(err)
      })
    },
    init() {
      this.user = sessionStorage.getItem("userInfo") ? JSON.parse(sessionStorage.getItem("userInfo")) : {}
      this.nickname = this.user.nickname;
    }
  }
})
</script>
<style>
@import "../scss/pages/_chat.scss";
</style>
