<template>
  <div class="common-layout">
    <el-container style="height: 100%">
      <el-header class="header">面</el-header>
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
              我是主体内容
            </div>
            <el-footer class="footer">Footer</el-footer>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { tongYiApi } from '@/api'

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
          'content': '华为怎么样'
        }
      ]
    },
    'parameters': {
      'result_format': 'message'
    }
  }

  // 发送请求
  const res = await tongYiApi(params).then((res) => {
    console.log('res', res)
    return res
  })
}
</script>

<style scoped>
.common-layout {
  height: 100%;
}

.header, .main {
  background: #F7F8FC;
}

.header {
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
  background: #ffffff;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>