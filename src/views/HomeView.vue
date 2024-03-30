<template>
  <div class="common-layout">
    <el-container style="height: 100%">
      <el-header class="header">面(O_O)?</el-header>
      <el-container style="height: 100%">
        <!--侧边栏暂时搁置-->
        <el-aside width="200px" class="aside" v-if="false">
          <div>
            <el-button type="primary">+ 新建对话</el-button>
          </div>
          <div class="aside-history">
            <el-input placeholder="搜索历史记录"></el-input>
          </div>
          <div class="aside-today-history">
            我是当天历史记录
          </div>
          <div class="aside-two-days-history">
            我是过去两天历史记录
          </div>
        </el-aside>
        <el-container>
          <el-main class="main">
            <div class="main-content">
              <el-card class="main-content-card-welcome" v-if="aiHistoryList.length===0 && userHistoryList.length===0">
                👏🏻👏🏻👏🏻🎉🎉🎉
              </el-card>
              <el-card class="main-content-history" v-else>
                <div class="main-content-history-user" v-for="(item,index) in userHistoryList" :key="index">
                  <span>{{ item.content }}</span>
                  <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                </div>
                <div class="main-content-history-ai" v-for="(item,index) in aiHistoryList" :key="index">
                  <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                  <span>{{ item.content }}</span>
                </div>
              </el-card>
            </div>

            <el-footer class="footer">
              <el-input
                v-model="textValue"
                class="footer-input"
                type="text"
                placeholder="请输入问题"
              >
              </el-input>
              <el-button :type="textValue?'primary':'info'" class="footer-button" :icon="Promotion"
                         @click="sendMessage" :disabled="!textValue"></el-button>
            </el-footer>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { tongYiApi } from '@/api'
import { ref } from 'vue'
// Promotion 图标
import { Promotion } from '@element-plus/icons-vue'


// 要展示数据的数组，数组里面是数据对象
interface historyListItem {
  content: string
}

const userHistoryList = ref<historyListItem[]>([])
const aiHistoryList = ref<historyListItem[]>([])
// 输入的文本内容
const textValue = ref<string>('')
const askTongYiApi = async () => {
  const params = {
    'model': 'qwen-turbo',
    'input': {
      'messages': [
        {
          'role': 'system',
          'content': 'You are a helpful assistant.'
        },
        {
          'role': 'user',
          'content': textValue.value
        }
      ]
    },
    'parameters': {
      'result_format': 'message'
    }
  }

  // 发送请求
  const res = await tongYiApi(params)
  return res
}

// 发送消息
const sendMessage = () => {
  userHistoryList.value.push({
    content: textValue.value
  })
  askTongYiApi().then(res => {
    const data = res.data
    console.log(res)
    console.log(data)
    if (res.status === 200) {
      aiHistoryList.value.push({
        content: data.output.choices[0].message.content
      })
      textValue.value = ''
      console.log(aiHistoryList.value.length)
    }
  })
}
</script>

<style scoped lang="scss">
.common-layout {
  height: 100%;
}

.header, .main {
  background: #F7F8FC;
}

.header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
}

.main {
  height: calc(100% - 20px);
  border-radius: 32px;
  margin: 0 20px;

  .main-content {
    width: 100%;
    height: calc(100% - 60px);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .main-content-card-welcome {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 20%;
    border-radius: 16px;
  }

  .main-content-history {
    width: 100%;

    .main-content-history-user {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    .main-content-history-ai {
      display: flex;
      align-items: center;
    }
  }
}

.aside {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  .aside-history {
    margin-bottom: 20px;
  }

  .aside-today-history {
    margin-bottom: 20px;
  }

  .aside-two-days-history {
    margin-bottom: 20px;
  }

  .aside-history, .aside-today-history, .aside-two-days-history {
    width: 100%;
    height: 100px;
    background: #ffffff;
    border-radius: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

}

.footer {
  position: relative;
  height: 60px;
  background: #ffffff;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;

  .footer-input {
    border-radius: 16px;
  }

  .footer-button {
    position: absolute;
    right: 1%;
  }

  :deep(.el-input__inner) {
    height: 60px;
  }

}
</style>