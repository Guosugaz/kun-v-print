<template>
  <div>
    <button v-print="printObj">打印1</button>
    <div id="myMain">
      <p>
        在此前的专访中，制作团队Motive也曾经说过，《死亡空间：重制版》既不是对这款IP的全面重做的“重启作”，也不是仅进行分辨率提升与运行优化的“重置版”。它是“重制版”，也就是在新引擎中从头开始重建所有内容——但保留这些令原作如此之特别的元素。但每个人坚持的重制项目的“第一要务”就是尊重原版游戏的遗产。
      </p>
      <h3>重制版与原版对比：</h3>
      <img
        src="https://desk-fd.zol-img.com.cn/t_s720x360c5/g6/M00/03/0E/ChMkKWDZLXSICljFAC1U9uUHfekAARQfgG_oL0ALVUO515.jpg"
        alt=""
      />
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        printObj: {
          id: "myMain"
        },
        show: true
      };
    }
  };
</script>
