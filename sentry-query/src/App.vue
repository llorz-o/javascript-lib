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
      <vxe-form-item field="LogType">
        <template #default>
          <vxe-select v-model="query.LogType" placeholder="日志类型" clearable>
            <vxe-option v-for="num in ['error', 'console', 'router', 'device']" :key="num" :value="num"
              :label="`LogType：${num}`"></vxe-option>
          </vxe-select>
        </template>
      </vxe-form-item>
      <vxe-form-item>
        <template #default>
          <vxe-button type="submit" status="primary" content="查询"></vxe-button>
          <vxe-button type="reset" content="重置"></vxe-button>
          <vxe-button icon="vxe-icon-question-circle-fill" @click="emulateConsole">模拟控制台日志输出</vxe-button>
        </template>
      </vxe-form-item>
    </vxe-form>

    <vxe-table border :data="list" :row-config="{ height: 30 }" size="mini" stripe max-height="600px">
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column field="UUID" title="UUID" width="100">
        <template #default="{ row }">
          <vxe-button type="text" status="primary" :content="row.UUID"
            @click="(query.UUID = row.UUID) && getList()"></vxe-button>
        </template>
      </vxe-column>
      <vxe-column field="SessionUUID" title="SessionUUID" width="110">
        <template #default="{ row }">
          <vxe-button type="text" status="primary" :content="row.SessionUUID"
            @click="(query.SessionUUID = row.SessionUUID) && getList()"></vxe-button>
        </template>
      </vxe-column>
      <vxe-column field="FlushUUID" title="FlushUUID" width="100">
        <template #default="{ row }">
          <vxe-button type="text" status="primary" :content="row.FlushUUID"
            @click="(query.FlushUUID = row.FlushUUID) && getList()"></vxe-button>
        </template>
      </vxe-column>
      <vxe-column title="TimeStamp" width="150">
        <template #default="{ row }">
          <span> {{ new Date(row.TimeStamp).toLocaleString() }}</span>
        </template>
      </vxe-column>
      <!-- <vxe-column field="Date" title="Date"></vxe-column> -->
      <vxe-column title="LogType" width="90">
        <template #default="{ row }">
          <vxe-button v-if="row.Log.type === 'error'" type="text" status="danger" :content="row.Log.type"></vxe-button>
          <vxe-button v-else-if="row.Log.type === 'console'" type="text" status="info"
            :content="row.Log.type"></vxe-button>
          <vxe-button v-else-if="row.Log.type === 'router'" type="text" status="warning"
            :content="row.Log.type"></vxe-button>
          <vxe-button v-else-if="row.Log.type === 'device'" type="text" status="primary"
            :content="row.Log.type"></vxe-button>
          <vxe-button v-else type="text" :content="row.Log.type"></vxe-button>
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
          <vxe-button size="mini" content="拖动窗口调整大小" @click="showDetail(row)">详情</vxe-button>
        </template>
      </vxe-column>
    </vxe-table>

    <vxe-pager align="left" :current-page="query.page" :page-size="query.pageSize" :total="total"
      @page-change="onPageChange">
    </vxe-pager>

    <vxe-modal v-model="visibleDetailModel" title="错误详情" width="800" :position="{ top: 100, left: 700 }" mask-closable
      esc-closable>
      <template #default>
        <div class="detailModel">
          <div class="item" v-for="item in level1" :key="item[0]">
            <div class="label">{{ item[1] }}:</div>
            <div class="value">{{ modelData[item[0]] }}</div>
          </div>
          <div class="log">
            <div class="item" v-for="(v, k) in modelData.Log" :key="k">
              <div class="label">{{ k }}:</div>
              <div class="value">
                <template v-if="k === 'deviceInfo'">
                  {{ JSON.parse(v) }}
                </template>
                <template v-else>
                  {{ v }}
                </template>
              </div>
            </div>
          </div>
        </div>
      </template>
    </vxe-modal>

    <vxe-modal v-model="visibleEmulatorModel" title="日志输出" width="1300" :position="{ top: 50, left: 50 }" mask-closable
      esc-closable>
      <template #default>
        <div class="emulateConsole" v-if="visibleEmulatorModel">
          <template v-for="(item, index) in list" :key="item._id">
            <div v-if="item.Log.type === 'error'" class="item error">
              <template v-if="item.Log.errorType === 'source'">
                <div class="message">
                  GET {{ item.Log.sourceSrc }}
                  <span class="tagname">
                    {{ item.Log.sourceTagName }}
                  </span>
                  <span class="id" v-if="item.Log.sourceId">
                    #{{ item.Log.sourceId }}
                  </span>
                  <span class="class" v-if="item.Log.sourceClassName">
                    .{{ item.Log.sourceClassName }}
                  </span>
                </div>
              </template>
              <template v-else>
                <div class="message">
                  {{ item.Log.message }}
                  <template>
                    <span class="filename" v-if="item.Log.filename">
                      {{ item.Log.filename }}
                    </span>
                  </template>
                  <template>
                    <span class="lineno" v-if="item.Log.lineno">
                      :{{ item.Log.lineno }}
                    </span>
                  </template>
                  <template>
                    <span class="colno" v-if="item.Log.colno">
                      :{{ item.Log.colno }}
                    </span>
                  </template>
                </div>
                <div class="stack" v-html="item.Log.stack">
                </div>
              </template>
            </div>
            <div v-else-if="item.Log.type === 'console'" class="item console">
              <div class="args">
                <template v-for="(span, index) in parseLogArgs(item.Log.args)" :key="index">
                  <span class="string" v-if="checkType(span) === 'string'">
                    {{ span }}
                  </span>
                  <span class="boolean" v-if="checkType(span) === 'boolean'">
                    {{ span }}
                  </span>
                  <span class="number" v-if="checkType(span) === 'number'">
                    {{ span }}
                  </span>
                  <span class="null" v-if="checkType(span) === 'null'">
                    {{ span }}
                  </span>
                  <span class="object" v-if="checkType(span) === 'object'">
                    Object &nbsp;
                    <ObjectLog :data="span" />
                  </span>
                  <span class="array" v-if="checkType(span) === 'array'">
                    {{ span }}
                  </span>
                </template>
              </div>
            </div>
            <div v-else-if="item.Log.type === 'router'" class="item router">
              <div class="tag">router</div>
              <div class="content">
                [&nbsp;{{ item.Log.from.fullPath }},&nbsp;{{ item.Log.from.name }}&nbsp;] ===>
                [&nbsp;{{ item.Log.to.fullPath }},&nbsp;{{ item.Log.to.name }}&nbsp;]
              </div>
            </div>
            <div v-else-if="item.Log.type === 'device'" class="item device">
              设备信息 &nbsp;
              <ObjectLog :data="JSON.parse(item.Log.deviceInfo)" />
            </div>
            <div v-else class="item log">
              <div class="args">
                未知 {{ item.Log }}
              </div>
            </div>
            <div class="flush" v-if="(list[index + 1] || {}).FlushUUID !== item.FlushUUID">
              用户刷新页面 {{ new Date(item.TimeStamp).toLocaleString() }}
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
import ObjectLog from './components/ObjectLog.vue'

const query = reactive({
  Ip: "",
  UUID: "",
  FlushUUID: "",
  SessionUUID: "",
  LogType: "",
  page: 1,
  pageSize: 20,
})
const resetQuery = () => {
  query.Ip = ""
  query.UUID = ""
  query.FlushUUID = ""
  query.SessionUUID = ""
  query.LogType = ""
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
      const ClientLogs = item.ClientLogs.map(item => {
        const result = { ...item, ...JSON.parse(item.details) }
        Reflect.deleteProperty(result, 'details')
        Reflect.deleteProperty(result, '_id')
        return result
      })
      ClientLogs.forEach(log => {
        const result = Object.assign({}, item, { ClientLogs: undefined, Log: log })
        Reflect.deleteProperty(result, 'ClientLogs')
        _list.push(result)
      })
    })
    list.value = _list.filter(item => {
      if (query.LogType) return item.Log.type === query.LogType
      else return true
    })
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
  modelData.value = row
}

const visibleEmulatorModel = ref(false)
const emulateConsole = () => {
  if (!(query.UUID || query.SessionUUID || query.FlushUUID || query.Ip)) {
    return VXETable.modal.message({
      content: '请输入UUID,SessionUUID,FlushUUID,Ip 任一搜索项', status: 'error'
    })
  }

  visibleEmulatorModel.value = true
}


const parseLogArgs = (args) => {
  if (args) {
    try {
      return JSON.parse(args).map(data => {
        try {
          return JSON.parse(data)
        } catch (error) {
          return data
        }
      })
    } catch (error) {
      console.error("parse item.Log.args", error);
      return []
    }
  }
  return []
}

const checkType = (v) => typeof (v)
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
  width: 1250px;
  padding: 0 10px;
  background-color: #202124;
  color: #ddd;
  overflow-y: auto;
  max-height: 600px;

  .flush {
    text-align: center;
    background-color: #3e8bff;
    font-weight: 700;
    font-size: 18px;
  }

  .item {
    padding: 2px 10px;

    &.device {
      display: flex;
    }

    &.error {
      border-top: 1px solid #5c0000;
      border-bottom: 1px solid #5c0000;
      background-color: #290000;

      .message {
        display: flex;
        color: #d63500;

        .filename {
          margin-left: auto;
          color: #3e8bff;
        }

        .lineno,
        .colno {
          color: #7099c2;
        }

        .tagname {
          color: #3e8bff;
          margin-left: auto;
        }

        .id {
          color: #ff5f68;
        }

        .class {
          color: #dae904;
        }
      }

      .stack {
        padding-left: 20px;
        color: #d63500;
      }
    }

    &.console {
      .args {
        display: flex;

        span {
          margin-right: 5px;

          &.object {
            color: #3e8bff;
            display: flex;
          }
        }
      }
    }

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
