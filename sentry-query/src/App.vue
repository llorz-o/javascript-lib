<template>
  <div>
    <!--将表单放在工具栏中-->
    <vxe-form :data="query" @submit="getList" @reset="resetQuery">
      <vxe-form-item field="Ip">
        <template #default>
          <vxe-input v-model="query.Ip" type="text" placeholder="请输入Ip" clearable></vxe-input>
        </template>
      </vxe-form-item>
      <vxe-form-item field="UUID">
        <template #default>
          <vxe-input v-model="query.UUID" type="text" placeholder="请输入UUID" clearable></vxe-input>
        </template>
      </vxe-form-item>
      <vxe-form-item field="SessionUUID">
        <template #default>
          <vxe-input v-model="query.SessionUUID" type="text" placeholder="请输入SessionUUID" clearable></vxe-input>
        </template>
      </vxe-form-item>
      <vxe-form-item field="FlushUUID">
        <template #default>
          <vxe-input v-model="query.FlushUUID" type="text" placeholder="请输入FlushUUID" clearable></vxe-input>
        </template>
      </vxe-form-item>
      <vxe-form-item>
        <template #default>
          <vxe-button type="submit" status="primary" content="查询"></vxe-button>
          <vxe-button type="reset" content="重置"></vxe-button>
        </template>
      </vxe-form-item>
    </vxe-form>

    <vxe-button icon="vxe-icon-question-circle-fill" @click="emulateConsole">模拟控制台日志输出</vxe-button>


    <vxe-table border :data="list" stripe>
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column field="UUID" title="UUID" width="100"></vxe-column>
      <!-- <vxe-column field="Ip" title="Ip" width="110"></vxe-column> -->
      <vxe-column field="SessionUUID" title="SessionUUID" width="110"></vxe-column>
      <vxe-column field="FlushUUID" title="FlushUUID" width="100"></vxe-column>
      <vxe-column title="TimeStamp" width="140">
        <template #default="{ row }">
          <span> {{ new Date(row.TimeStamp).toLocaleString() }}</span>
        </template>
      </vxe-column>
      <!-- <vxe-column field="Date" title="Date"></vxe-column> -->
      <vxe-column title="LogType" width="90">
        <template #default="{ row }">
          <vxe-button v-if="row.Log.type === 'error'" type="text" status="danger" :content="row.Log.type"></vxe-button>
          <vxe-button v-if="row.Log.type === 'console'" type="text" status="info" :content="row.Log.type"></vxe-button>
          <vxe-button v-if="row.Log.type === 'router'" type="text" status="warning" :content="row.Log.type"></vxe-button>
        </template>
      </vxe-column>
      <vxe-column title="Type" width="90">
        <template #default="{ row }">
          {{ row.Log.errorType || row.Log.consoleType }}
        </template>
      </vxe-column>
      <vxe-column field="Log.page" title="LogPage" show-overflow width="180"></vxe-column>
      <vxe-column field="Log.message" title="LogMessage" show-overflow></vxe-column>
      <vxe-column title="Operation" width="150">
        <template #default="{ row }">
          <vxe-button content="拖动窗口调整大小" @click="showDetail(row)">详情</vxe-button>
        </template>
      </vxe-column>
    </vxe-table>

    <vxe-pager align="left" :current-page="query.page" :page-size="query.pageSize" :total="total"
      @page-change="onPageChange">
    </vxe-pager>

    <vxe-modal v-model="visibleDetailModel" width="600" :position="{ top: 200, left: 200 }" mask-closable esc-closable>
      <template #default>
        <div class="detailModel">
          <div class="item" v-for="item in level1" :key="item[0]">
            <div class="label">{{ item[1] }}:</div>
            <div class="value">{{ modelData[item[0]] }}</div>
          </div>
          <div class="log">
            <div class="item" v-for="(v, k) in modelData.Log" :key="k">
              <div class="label">{{ k }}:</div>
              <div class="value">{{ v }}</div>
            </div>
          </div>
        </div>
      </template>
    </vxe-modal>

    <vxe-modal v-model="visibleEmulatorModel" width="1000" :position="{ top: 100, left: 100 }" mask-closable esc-closable>
      <template #default>
        <div class="emulateConsole">
          <template v-for="item in list" :key="item._id">
            <div v-if="item.Log.type === 'error'" class="item error">
              <template v-if="item.Log.errorType === 'source'">
                <div class="message">
                  {{ item.Log.sourceSrc }}
                </div>
              </template>
              <template v-else>
                <div class="message">
                  {{ item.Log.message }}
                </div>
                <div class="stack" v-html="item.Log.stack">
                </div>
              </template>
            </div>
            <div v-else-if="item.Log.type === 'console'" class="item log">
              <div class="args">
                {{ item.Log.args }}
              </div>
            </div>
            <div v-else-if="item.Log.type === 'router'" class="item router">
              <div class="tag">router</div>
              <div class="content">
                [&nbsp;{{ item.Log.from.fullPath }},&nbsp;{{ item.Log.from.name }}&nbsp;] ===>
                [&nbsp;{{ item.Log.to.fullPath }},&nbsp;{{ item.Log.to.name }}&nbsp;]
              </div>
            </div>
            <div v-else class="item log">
              <div class="args">
                未知 {{ item.Log }}
              </div>
            </div>
          </template>
        </div>
      </template>
    </vxe-modal>

  </div>
</template>

<script setup>
import axios from 'axios';
import { reactive, ref } from 'vue';
import { VXETable } from 'vxe-table';

const query = reactive({
  Ip: "",
  UUID: "",
  FlushUUID: "",
  SessionUUID: "594569w9",
  page: 1,
  pageSize: 20,
})
const resetQuery = () => {
  query.Ip = ""
  query.UUID = ""
  query.FlushUUID = ""
  query.SessionUUID = ""
  query.page = 1
  query.pageSize = 20
  getList()
}

const onPageChange = ({ currentPage, pageSize }) => {
  query.page = currentPage
  query.pageSize = pageSize
  getList()
}

const total = ref(0)
const list = ref([])
const getList = async () => {
  const response = await axios.get('http://localhost/pages', {
    params: {
      ...query
    }
  })

  if (response.status === 200) {
    const _list = []
    total.value = response.data.total
    response.data.data.forEach(item => {
      const ClientLogs = JSON.parse(item.ClientLogs)
      ClientLogs.forEach(log => {
        _list.push(Object.assign({}, item, { ClientLogs: undefined, Log: log }))
      })
    })
    list.value = _list
    console.log(_list);
  }
}

getList().catch(err => {
  console.error(err);
})

const visibleDetailModel = ref(false)
const modelData = ref()
const level1 = [
  ['Ip', "IP"],
  ['UUID', "UUID"],
  ['SessionUUID', "SessionUUID"],
  ['FlushUUID', "FlushUUID"],
]
const showDetail = row => {
  visibleDetailModel.value = true
  console.log(row);
  modelData.value = row
}

const visibleEmulatorModel = ref(true)
const emulateConsole = () => {
  if (!(query.UUID || query.SessionUUID || query.FlushUUID || query.Ip)) {
    return VXETable.modal.message({
      content: '请输入任一搜索项', status: 'error'
    })
  }

  visibleEmulatorModel.value = true
}

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.detailModel {
  .item {
    display: flex;
    padding: 5px 0;

    .label {
      font-size: 15px;
      font-weight: 600;
      width: 150px;
      text-align: left;
    }

    .value {
      flex: 1;
    }
  }

  .log {
    .item {
      .label {
        width: 130px;
        padding-left: 20px;
      }
    }
  }
}

.emulateConsole {
  width: 1000px;
  padding-left: 20px;
  background-color: #202124;
  color: #ddd;
  overflow-y: auto;

  .item {
    padding: 2px 0;

    &.error {
      border-top: 1px solid #5c0000;
      border-bottom: 1px solid #5c0000;
      background-color: #290000;

      .message {
        color: #d63500;
      }

      .stack {
        padding-left: 20px;
        color: #d63500;
      }
    }

    &.log {}

    &.router {
      display: flex;
      align-items: center;

      .tag {
        padding: 0 5px;
        color: #fff;
        background-color: rgb(212, 106, 6);
        border-radius: 5px;
        margin-right: 5px;
      }

      .content {
        flex: 1;
      }
    }
  }
}
</style>
