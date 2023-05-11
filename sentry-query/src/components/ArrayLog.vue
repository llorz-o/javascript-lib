<template>
    <details class="array" v-if="data">
        <summary>{{ createSummary(data) }}</summary>
        <div class="item" v-for="(v, k) in data" :key="k">
            <span class="key">
                {{ k }}:
            </span>
            <span class="value">
                <template v-if="Array.isArray(v)">
                    <ArrayLog :data="v" />
                </template>
                <template v-else-if="v === null">
                    null
                </template>
                <template v-else-if="v === undefined">
                    undefined
                </template>
                <template v-else-if="checkType(v) === 'object'">
                    <ObjectLog :data="v" />
                </template>
                <template v-else>
                    {{ v }}
                </template>
            </span>
        </div>
    </details>
</template>

<script setup>
import ObjectLog from './ObjectLog.vue'
import ArrayLog from './ArrayLog.vue'
import { defineProps } from 'vue'
defineProps({
    data: Array
})

const checkType = (v) => typeof (v)
const createSummary = v => {
    const str = JSON.stringify(v)
    if (str.length > 60) return `${str.slice(0, 60)} ...]`
    return str
}
</script>

<style lang="scss">
details.object {
    color: #3e8bff;

    .item {
        display: flex;

        .value {
            flex: 1;
            color: #ff5f68;
        }
    }
}
</style>