<style lang="scss" scoped>
@import "../../base/css/base-var.scss";
.process {
  background: #fff;
  border-radius: 6px;
  overflow: hidden;
  .process-inner{
      padding:20px;
      .process-cont{
          margin-top:20px;
          .process-chart{
             height: 600px;
             padding:20px 10px;
             &>div{
                 float: left;
             }
             &>div+div{
                 margin-left: 30px;
             }
             .chart-left{
                 width:400px;
             }
             .chart-right{
                 width: 1100px;
             }
             .chart-title{
                width: 100%;
                text-align: center;
                font-size: 20px;
                font-weight: bold;
             }
             #ageChart,#sexChart{
                 width:100%;
                 height: 240px;
                 margin-top:10px;
             }
             #patientChart{
                 width:100%;
                 height: 490px;
                 margin-top:10px;
             }
          }
      }
  }
}
.title {
  padding: 20px;
  font-weight: bold;
  font-size: 18px;
  text-align: left;
  & > i.el-icon-biosign {
    font-size: 20px;
    color: $maincolor;
  }
}
.el-button--primary {
  background-color: $maincolor;
  border-color: $maincolor;
}
</style>

<template>
  <div class="contant">
    <div class="process">
      <div class="title">
        <i class="iconfont el-icon-biosign"></i>
        <span>本院科室样本统计</span>
      </div>
      <div class="process-inner">
          <div class="process-time">
              <span>时间段：</span>
              <el-date-picker size="middle" v-model="starttime" type="date" placeholder="选择日期"></el-date-picker>
              <span style="padding:0 10px;">到</span>
              <el-date-picker size="middle" v-model="endtime" type="date" placeholder="选择日期"></el-date-picker>
              <el-button size="middle" type="primary" style="margin:0 10px 0 20px;">确定</el-button>
              <el-button size="middle">重置</el-button>
          </div>
          <div class="process-cont">
              <div>
                  <el-radio-group v-model="radio">
                    <el-radio :label="1">近三个月</el-radio>
                    <el-radio :label="2">近六个月</el-radio>
                    <el-radio :label="3">近六个月</el-radio>
                    <el-radio :label="4">全部</el-radio>
                </el-radio-group>
              </div>
              <div class="process-chart">
                  <div class="chart-left">
                      <div class="chart-title">病人年龄段分布（总人数：{{agetotal}}）</div>
                      <div id='ageChart'></div>
                      <div id='sexChart'></div>
                      <div class="chart-title">病人性别分布（总人数：{{sextotal}}）</div>
                  </div>
                  <div class="chart-right">
                      <div class="chart-title">病人数统计（总人数：{{agetotal}}）</div>
                      <div id='patientChart'></div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
// 引入基本模板
let echarts = require("echarts");
require("echarts/lib/chart/line");
require("echarts/lib/chart/pie");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
export default {
    data(){
        return{
            radio:0,
            starttime:'',
            endtime:'',
            agetotal:0,
            sextotal:0,
            charts:[
                {
                    label:'病人年龄段分布（总人数：XXX）',
                },
                {
                    label:'病人年龄段分布（总人数：XXX）'
                }
            ]
        }
    },
    methods:{
        drawZhu(id,title,data){
            let myChart=echarts.init(document.getElementById(id));
            myChart.setOption({
                xAxis: {
                type: 'category',
                data: title
                },
                yAxis: {
                    type: 'value'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#283b56'
                        }
                    }
                },
                series: [{
                    data: data,
                    type: 'bar',
                    center: ['50%', '50%'],
                }]
            })
        },
        drawPie(id,tdata,ddata,total) {
            let myChart = echarts.init(document.getElementById(id));
            myChart.setOption({
                backgroundColor: '#2c343c',
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                visualMap: {
                    show: false,
                    min: 80,
                    max: 600,
                    inRange: {
                        colorLightness: [0, 1]
                    }
                },
                series : [
                    {
                        type:'pie',
                        radius : '55%',
                        center: ['50%', '50%'],
                        data:ddata.sort(function (a, b) { return a.value - b.value; }),
                        roseType: 'radius',
                        label: {
                            normal: {
                                textStyle: {
                                    color: 'rgba(255, 255, 255, 0.3)'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                lineStyle: {
                                    color: 'rgba(255, 255, 255, 0.3)'
                                },
                                smooth: 0.2,
                                length: 10,
                                length2: 20
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#c23531',
                                shadowBlur: 200,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },

                        animationType: 'scale',
                        animationEasing: 'elasticOut',
                        animationDelay: function (idx) {
                            return Math.random() * 200;
                        }
                    }
                ]
            })
        },
        drawPic(lists,title){
            lists.forEach((item,index)=>{
                let id="charts-"+(index+1),
                total=0;
                item.value.forEach(items=>{
                    total+=items.value;
                })
                this.drawPie(id,title,item.value,total)
            })
        }
    },
    mounted(){
        let agetitle=['0-10岁','10-20岁','20-30岁','30-40岁','40-50岁','50-60岁','60-70岁','70-80岁','80-90岁','≥90岁'],
        ageList=[
            {value:335, name:'0-10岁'},
            {value:310, name:'10-20岁'},
            {value:274, name:'20-30岁'},
            {value:235, name:'30-40岁'},
            {value:400, name:'40-50岁'},
            {value:400, name:'50-60岁'},
            {value:400, name:'60-70岁'},
            {value:400, name:'70-80岁'},
            {value:400, name:'80-90岁'},
            {value:400, name:'≥90岁'},
        ],
        sextitle=['男','女'],
        sexList=[
            {value:335, name:'男'},
            {value:310, name:'女'},
        ],
        ageLists=[];
        ageList.forEach(item=>{
            this.agetotal+=item.value;
            ageLists.push(item.value)
        })
        sexList.forEach(item=>{
            this.sextotal+=item.value
        })
        this.drawPie('ageChart',agetitle,ageList)
        this.drawPie('sexChart',sextitle,sexList)
        this.drawZhu('patientChart',agetitle,ageLists)
    }
};
</script>


