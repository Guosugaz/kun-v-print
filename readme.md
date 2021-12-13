# vue 局部打印

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
  <button @click="handlePrint">打 印</button>
</template>

<script>
export default {
  methods: {
    handlePrint() {
      this.$VPrint.print("block");
    }
  }
}
<script>
```

### 参数

print(id: string, options: Option)

### Otpions:

|    Param    |  Type  |                 Describe                  | default | Version |
| :---------: | :----: | :---------------------------------------: | :-----: | :-----: |
|  extraHead  | string | 附加在 head 标签上的额外元素,使用逗号分隔 |         |         |
|  extraCss   | string |            额外的 css 逗号分隔            |         |         |
|  popTitle   | string |              iframe 的 title              |         |         |
| addPrintCss | string |              iframe 的 style              |         |
