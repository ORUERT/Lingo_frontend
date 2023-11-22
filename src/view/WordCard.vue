<template>
  <div v-if="!showDetailWindow && !showFinishWindow" class="content home">
    <div class="left">
      <a-typography-title v-bind:content="word">{{curword.word}}<label v-if="curword.phonetic">/</label> {{curword.phonetic}}</a-typography-title>
      <img class = "sound" @click="handlePlay('audio')" src="../assets/sound.jpg" alt="sound"/>
      <audio id="audio"  hidden></audio>
    </div>
    <div class="right">
      <div class="card-grid">
        <div class="card" :style="{ 'background-image': 'url(' + prop[0].url + ')','background-size': 'cover' }" @click="prop[0].method">
          <a-typography-text class="definition"  v-bind:content="prop[0].definition"></a-typography-text>
        </div>
        <div class="card" :style="{ 'background-image': 'url(' + prop[1].url + ')','background-size': 'cover' }" @click="prop[1].method">
          <a-typography-text class="definition" v-bind:content="prop[1].definition"></a-typography-text>

        </div>
        <div class="card" :style="{ 'background-image': 'url(' + prop[2].url + ')','background-size': 'cover' }" @click="prop[2].method">
          <a-typography-text class="definition" v-bind:content="prop[2].definition"></a-typography-text>

        </div>
        <div class="card" :style="{ 'background-image': 'url(' + prop[3].url + ')','background-size': 'cover' }" @click="prop[3].method">
          <a-typography-text class="definition" v-bind:content="prop[3].definition"></a-typography-text>
        </div>
      </div>

    </div>
  </div>
  <div v-if="showDetailWindow" class="detail-window">
    <div class="left">
      <div>
        <div class ></div>
        <div class="word">{{word}}</div>
        <div>音标</div>
        <div>{{curword.definition}}</div>

      </div>
      <div class="phrase">
        <div v-if="curword.phrase">
          <div v-html="highlightedPhrase(curword.phrase)"></div>
        </div>
        <div>{{curword.phraseExplain}}</div>
      </div>
      <div>
        <a-button @click="switchDetailWindow">Next</a-button>
      </div>
    </div>
    <div class="right">
      <div class="image"
           v-if="curword.phraseImage !== undefined"
           :style="{ 'background-image': 'url(http://localhost:8082/static/'+this.imagesPath+'/' + curword.phraseImage + ')', 'background-size': 'cover' }">
      </div>
    </div>
  </div>
  <div v-if="showFinishWindow" class="finish-window">
    <div class="left">
      <div>
        <a-typography-text>恭喜完成当前项</a-typography-text>
      </div>
      <div>
        <a-button @click="swishFinishWindow">Next</a-button>
      </div>
    </div>
    <div class="right">
      <div class="image"
           v-if="curword.phraseImage"
           :style="{ 'background-image': 'url(http://localhost:8082/static/'+this.imagesPath+'/' + curword.phraseImage + ')', 'background-size': 'cover' }">
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/axios";
export default {
  name: "WordCard",
  data(){
    return {
      showChatWindow: false,
      showDetailWindow: false,
      showFinishWindow: false,
      tableId:2,
      word: '',
      curword:{},
      res:{},
      count:0,
      audioSource:'https://api.vvhan.com/api/song?txt=',
      prop: [
        {definition:'',url:'',word:''},
        {definition:'',url:'',word:''},
        {definition:'',url:'',word:''},
        {definition:'',url:'',word:''},
      ]
    }
  },
  computed:{
    imagesPath: function () {
      if(this.tableId===1){
        return 'en_images_1';
      }else if(this.tableId===2){
        return 'jp_images';
      }
    }
  },
  mounted:function (){
    this.refresh(this.getData)
  },
  props:['refresh'],
  methods:{
    handlePlay(id) {
      document.getElementById(id).setAttribute('src',this.audioSource+this.curword.word)
      document.getElementById(id).play()
    },
    toggleChatWindow() {
      this.showChatWindow = !this.showChatWindow; // 切换窗口的显示和隐藏状态
    },
    getData(addition = 0){
      this.count = 0
      axios.get('/wordApply/'+this.tableId+'/'+(parseInt(this.$store.state.userInfo.glossary[this.tableId-1])+1+addition),{
        headers: {
          "Authorization": this.$store.state.token
        }
      }).then(res=>{
        // console.log(res.data.data[this.count].definition_image)
        this.res = res.data.data
        console.log("refresh data",this.res)
        this.fillPage()
        // console.log(this.prop[0].url)
      }).catch(err=>{
        console.log(err)
      })
    },
    fillPage(){
      this.curword = this.res[this.count]
      // console.log(this.res)
      this.word = this.res[this.count].word
      let numbers = [];

      while (numbers.length < 4) {
        let randomNumber = Math.floor(Math.random() * (9 + 1));
        if (!numbers.includes(randomNumber)&&this.res[randomNumber].word !== this.word) {
          numbers.push(randomNumber);
        }
      }

      // console.log(numbers)
      for(let i = 0;i<4;i++){
        this.prop[i].definition = this.res[numbers[i]].definition
        this.prop[i].word = this.res[numbers[i]].word
        this.prop[i].url = 'http://localhost:8082/'+'static/'+this.imagesPath+'/'+this.res[numbers[i]].phraseImage
        this.prop[i].method = this.getOnError
      }
      let j = Math.floor(Math.random() * 4);
      this.prop[j].definition = this.res[this.count].definition
      this.prop[j].word = this.res[this.count].word
      this.prop[j].url = 'http://localhost:8082/'+'static/'+this.imagesPath+'/'+this.res[this.count].phraseImage
      this.prop[j].method = this.getOnSuccess
    },
    getOnSuccess(){
      this.count ++
      console.log('success')
      if(this.count === 10){
        // console.log("total",(parseInt(this.$store.state.userInfo.glossary[0])+1))
        axios.get('/wordFinish/'+this.tableId+'/'+(parseInt(this.$store.state.userInfo.glossary[this.tableId-1])+1), {
          headers: {
            "Authorization": localStorage.getItem("token")
          }
        }).then(res=>{
          // console.log(res)
          if(res.data.code === '200'){
            this.$message.success('完成')
            this.getData(10)
            this.showFinishWindow= !this.showFinishWindow
          }else{
            console.log("insert error")
          }
        }).catch(err=>{
          console.log(err)
        })
      }else{
        this.fillPage()
      }
    },
    getOnError(){
      // this.count ++
      this.switchDetailWindow()
      console.log('error')
    },
    highlightedPhrase() {
      return this.curword.phrase.replace(
          new RegExp(this.curword.word, "g"),
          '<span class="highlight">' + this.curword.word + '</span>'
      );
    },
    switchDetailWindow(){
      this.showDetailWindow = !this.showDetailWindow
    },
    swishFinishWindow(){
      this.showFinishWindow = !this.showFinishWindow
    }
  },
}
</script>

<style scoped>
@import "../scss/pages/_word-card.scss";
</style>