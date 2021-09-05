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
