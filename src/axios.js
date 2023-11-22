import axios from 'axios'
import router from './router'
import store from './store'

const initAxios = axios.create({
    baseURL: "http://localhost:8082",
    timeout: 50000,
    responseType:'json',
})

// 前置拦截
// initAxios.interceptors.request.use(config => {
//   return config
// })

initAxios.interceptors.response.use((response) => {
    let res = response.data;

    console.log("=================")
    console.log(res)
    console.log("=================")
    if (res.code === '200') {
        return response
    }else if(res.code === '401') {
        store.commit("REMOVE_INFO")
        router.push("/login")
    } else {
      // Element.Message.error('错了哦，这是一条错误消息', {duration: 3 * 1000})
      return Promise.reject(response.data.msg)
    }
  },
    (error) => {
    // console.log(error)
        if(error.response.data.code === '1002'){
            console.log('token过期2')

            router.push('/login')
        }
    // Element.Message.error(error.message, {duration: 3 * 1000})
    return Promise.reject(error)
  }
)
export default initAxios