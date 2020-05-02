import Vue from "vue";
import echarts from "echarts";
import obj from "@/config/echartConfig/macarons.project.json";

echarts.registerTheme("macarons", obj);

export default echarts;
