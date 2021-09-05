# v-print

> 使用 vue 的指令实现布局打印

## 快速运行

### 1. 安装

```bash
npm install --save @sugaz/v-print
```

### 2. 使用

```js
import Vue from "vue";
import VPrint from "@sugaz/v-print";

Vue.use(VPrint);
```

```html
<!-- 绑定到要触发元素 -->
<template>
  <main id="block">
    <p>打印这些内容</p>
  </main>
  <button v-print="id">打 印</button>
</template>

<script>
export default {
  data() {
    return {
      id: "block"
    }
  }
}
<script>
```

### 参数
参数是 节点的id 或者 对象(内容如下)

| Param | Type | Describe | default | Version |
| :------: | :------: | :------: | :------: | :-----: |
| id | sting | 节点的id | "" | | |
| extraHead | string | 附加在head标签上的额外元素,使用逗号分隔 | | |
| extraCss | string | 额外的css逗号分隔 | | |
| popTitle | string | iframe的title | | |
| addPrintCss | string | iframe的style | |
| endCallback | Function | 打印后的回调 | |