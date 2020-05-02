<template lang="pug">
  div( style='{width: 500px;}')#app
    div(ref="main" style="width: 500px; height:500px;")
    HR(style="FILTER: alpha(opacity=10,finishopacity=0,style=3);" width="100%" size="2")
</template>
<script>
import { Vue, Component, Prop } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
@Component({components: {}})
export default class extends Vue {

  @Prop(String)
  statusMsg;

  success= 0
  fail= 0
  timeout= 0
  memoryout= 0
  others= 0

  drawChart() {
      // 基于准备好的dom，初始化echarts实例

      const statusChart = this.$echarts.init(
        // document.getElementById("main"),
        this.$refs.main,
        "walden"
      );
      window.onresize = function() {
        statusChart.resize();
      };
      // 指定图表的配置项和数据
      const option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: 10,
          data: ["AC", "FAIL", "TIME OUT", "MEMORY OUT", "OTHERS"]
        },
        series: [
          {
            name: "data",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: this.success, name: "AC" },
              { value: this.fail, name: "FAIL" },
              { value: this.timeout, name: "TIME OUT" },
              { value: this.memoryout, name: "MEMORY OUT" },
              { value: this.others, name: "OTHERS" }
            ]
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      statusChart.setOption(option);
    }
  created() {
    this.success = this.statusMsg.success;
    this.fail = this.statusMsg.fail;
    this.timeout = this.statusMsg.timeout;
    this.memoryout = this.statusMsg.memoryout;
    this.others = this.statusMsg.others;
  }
  mounted() {
    this.drawChart();
  }
}
</script>
<style lang="scss">
</style>