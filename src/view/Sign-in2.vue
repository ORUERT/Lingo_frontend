<template>
  <div class="content sign-in">
    <div v-if="!onReg.value" class="box">
      <div class="left">
        <div class="block">
          <div class="text">
            <div class="one-text">
              <div>
                <div class="triangle"></div>
                <span class="maos">Maos</span>
              </div>
              <div>platform</div>
              <div>for front-end</div>
              <div>learning</div>
            </div>
            <div class="two-text">
              <div>You will know everything.</div>
              <div>But you will more.</div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="login-box">
          <div class="title">
<!--            <h1 class="h1">Sign In</h1>-->
<!--            <span class="fuck font-regular ">Enter your email and password to sign in</span>-->
          </div>
                    <!-- Sign In Form -->
          <a-form
              id="components-form-demo-normal-login"
              :model="formState"
              class="login-form"
              :rules="rules"
              :hideRequiredMark="true"
              autocomplete="off"
              @finish="onFinish"
              @finishFailed="onFinishFailed"
          >
            <label for="username" class="form-item-label">Email</label>

            <a-form-item
              name ="username"
              id="form-item"
            >
              <a-input
                  v-model:value="formState.username"
                  id="username"
                  class="input"
                  placeholder="Email"
              />
            </a-form-item>
            <label for="password" class="form-item-label">Password</label>

            <a-form-item
                name ="password"
                >
              <a-input-password
                  v-model:value="formState.password"
                  id="password"
                  class="input"
                  placeholder="Password"
              />
            </a-form-item>
            <a-form-item class="mb-10">
              <a-switch id="remember" v-model:checked="formState.rememberMe" /> Remember Me
            </a-form-item>
            <a-form-item>
              <a-button type="primary" block html-type="submit" class="login-form-button login-btn">
                SIGN IN
              </a-button>
            </a-form-item>
          </a-form>
          <!-- / Sign In Form -->
          <div class="other-login">
            <p class="font-regular" @click="switchRegister">Don't have an account? </p>

            <div class="other-login-wrapper">
              <div class="other-login-item">
                <img class="google-login" src="/images/QQ.png" alt="QQLogin">
                <span>Sign in with QQ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
    <div v-if="onReg.value" class="register-box">
      <div class="left">
        <div class="block">
          <div class="text">
            <div class="one-text">
              <div>
                <div class="triangle"></div>
                <span class="maos">Maos</span>
              </div>
              <div>platform</div>
              <div>for front-end</div>
              <div>learning</div>
            </div>
            <div class="two-text">
              <div>You will know everything.</div>
              <div>But you will more.</div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="login-box">
          <div class="title">
            <!--            <h1 class="h1">Sign In</h1>-->
            <!--            <span class="fuck font-regular ">Enter your email and password to sign in</span>-->
          </div>
          <!-- Sign In Form -->
          <a-form
              id="components-form-demo-normal-login"
              :model="formState"
              class="login-form"
              :rules="rules"
              :hideRequiredMark="true"
              autocomplete="off"
              @finish="onRegister"
              @finishFailed="onFinishFailed"
          >
            <label for="username" class="form-item-label">Email</label>

            <a-form-item
                name ="username"
                id="form-item"
            >
              <a-input
                  v-model:value="formState.username"
                  id="username"
                  class="input"
                  placeholder="Email"
              />
            </a-form-item>
            <label for="password" class="form-item-label">Password</label>

            <a-form-item
                name ="password"
            >
              <a-input-password
                  v-model:value="formState.password"
                  id="password"
                  class="input"
                  placeholder="Password"
              />
            </a-form-item>
            <a-form-item>
              <a-button type="primary" block html-type="submit" class="login-form-button login-btn">
                REGISTER
              </a-button>
            </a-form-item>
          </a-form>
          <!-- / Sign In Form -->
          <div class="other-login">

            <div class="other-login-wrapper">
              <div class="other-login-item">
                <img class="google-login" src="/images/QQ.png" alt="QQLogin">
                <span>Sign in with QQ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      </div>
</template>

<script>
import {computed, defineComponent, reactive, ref} from 'vue';
import axios from "@/axios";
import { useStore } from 'vuex';
import {useRouter,useRoute} from "vue-router";
import {message} from "ant-design-vue";

export default defineComponent({
  setup() {
    const [messageApi,contextholder] = message.useMessage();
    const isReg = ref(false);
    const onReg = computed({
      get:()=>isReg,
      set:()=>{
        isReg.value = !isReg.value
      }
    })
    const store = useStore();
    const router = useRouter();
    // const isRegister = reactive({
    //    isReg:false,
    // });
    const formState = reactive({
      username: 'oruert',
      password: '321',
      rememberMe: false,
    });
    const rules = reactive({
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请选择密码', trigger: 'change' }
      ]
    });
    const onFinish = values => {
      console.log('Success:', values.username)

      axios.post('/user/login',values).then(res=>{
        // console.log(res)
        console.log(res.data)
        if(res.data.code === '200'){
          const jwt = res.data.data;
          console.log("jwt",jwt)

          // 把数据共享出去
          store.commit("SET_TOKEN", jwt)
          // 获取
          router.push('/home')
        }else{
          this.$message.error('登录失败')
        }
      }).catch(err=>{
        console.log(err)
      })
    };
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };
    const switchRegister = ()=>{
      isReg.value = !isReg.value;
      console.log(isReg)
    };
    const onRegister = values=>{
      axios.post('/user/register',values).then(res=>{
        // console.log(res)
        console.log(res.data)
        if(res.data.code === '200'){
          messageApi.info('注册成功')
          // this.$message.success('注册成功')
          switchRegister()
        }else{
          this.$message.error('登录失败')
        }
      }).catch(err=>{
        console.log(err)
      })
      console.log(isReg)
    };
    return {
      formState,
      rules,
      onReg,
      onFinish,
      onFinishFailed,
      onRegister,
      switchRegister,
    };
  },
});
</script>

<style scoped>
  @import "../scss/pages/_sign-in2.scss";
</style>