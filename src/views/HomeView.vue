<template>
    <el-button @click="askTongYiApi">测试</el-button>
</template>

<script setup lang="ts">
import {tongYiApi} from "@/api";

const askTongYiApi = async ()=> {
  const params = {
    "model": "qwen-turbo",
    "input":{
      "messages":[
        {
          "role": "system",
          "content": "You are a helpful assistant."
        },
        {
          "role": "user",
          "content": "华为怎么样"
        }
      ]
    },
    "parameters": {
      "result_format": "message"
    }
  }

  // 发送请求
  const res = await tongYiApi(params).then((res)=>{
    console.log('res',res)
    return res
  })
}
</script>

<style scoped>

</style>