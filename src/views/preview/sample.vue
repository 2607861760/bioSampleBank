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
              display: flex;
            flex-wrap: wrap;
            padding:0 10px;
            height: 600px;
            overflow-y: scroll;
            color: #fff;
              &>div{
                  width: 310px;
                  height: 400px;
                  background: #333;
                  border-radius: 5px;
                  margin-top:10px;
                  margin-left:10px; 
                  .chart-title{
                    margin: 10px;
                    border: 1px solid #206ca5;
                    border-radius: 6px;
                    text-align: center;
                    font-size: 20px;
                    font-weight: bold;
                    line-height: 50px;
                    height: 50px;
                  }
                  .charts{
                      height:330px;
                  }
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
        <span>本院样本亚型统计</span>
      </div>
      <div class="process-inner">
          <div class="process-time">
              <span>时间段：</span>
              <el-date-picker size="middle" v-model="starttime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
              <span style="padding:0 10px;">到</span>
              <el-date-picker size="middle" v-model="endtime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
              <el-button size="middle" type="primary" style="margin:0 10px 0 20px;">确定</el-button>
              <el-button size="middle">重置</el-button>
          </div>
          <div class="process-cont">
              <div>
                  <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="癌肿" name="1"></el-tab-pane>
                    <el-tab-pane label="标本类型" name="2"></el-tab-pane>
                  </el-tabs>
              </div>
              <div class="process-chart">
                  <div v-for='(item,index) in charts' :key='index'>
                      <div class="chart-title">{{item.label}}</div>
                      <div :id='"charts-"+(index+1)' class="charts"></div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/pie");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
export default {
    data(){
        return{
            starttime:'',
            endtime:'',
            activeName:'1',
            charts:[
                {
                    label:'信息科',
                    value:[
                        {
                            value: 335,
                            name: "肺癌",
                        },
                        {
                            value: 310,
                            name: "结直肠癌",
                        },
                        {
                            value: 234,
                            name: "乳腺癌",
                        },
                        {
                            value: 135,
                            name: "胃癌",
                        },
                        {
                            value: 1548,
                            name: "膀胱癌",
                        }
                    ]
                },
                {
                    label:'病理科',
                    value:[
                        {
                            value: 335,
                            name: "肺癌",
                        },
                        {
                            value: 310,
                            name: "结直肠癌",
                        },
                        {
                            value: 234,
                            name: "乳腺癌",
                        },
                        {
                            value: 135,
                            name: "胃癌",
                        },
                        {
                            value: 1548,
                            name: "膀胱癌",
                        }
                    ]
                },
                {
                    label:'乳腺科',
                    value:[
                        {
                            value: 335,
                            name: "肺癌",
                        },
                        {
                            value: 310,
                            name: "结直肠癌",
                        },
                        {
                            value: 234,
                            name: "乳腺癌",
                        },
                        {
                            value: 135,
                            name: "胃癌",
                        },
                        {
                            value: 1548,
                            name: "膀胱癌",
                        }
                    ]
                },
                {
                    label:'结直肠外科',
                    value:[
                        {
                            value: 335,
                            name: "肺癌",
                        },
                        {
                            value: 310,
                            name: "结直肠癌",
                        },
                        {
                            value: 234,
                            name: "乳腺癌",
                        },
                        {
                            value: 135,
                            name: "胃癌",
                        },
                        {
                            value: 1548,
                            name: "膀胱癌",
                        }
                    ]
                },
                {
                    label:'中医科',
                    value:[
                        {
                            value: 335,
                            name: "肺癌",
                        },
                        {
                            value: 310,
                            name: "结直肠癌",
                        },
                        {
                            value: 234,
                            name: "乳腺癌",
                        },
                        {
                            value: 135,
                            name: "胃癌",
                        },
                        {
                            value: 1548,
                            name: "膀胱癌",
                        }
                    ]
                },
                {
                    label:'泌尿外科',
                    value:[
                        {
                            value: 335,
                            name: "肺癌",
                        },
                        {
                            value: 310,
                            name: "结直肠癌",
                        },
                        {
                            value: 234,
                            name: "乳腺癌",
                        },
                        {
                            value: 135,
                            name: "胃癌",
                        },
                        {
                            value: 1548,
                            name: "膀胱癌",
                        }
                    ]
                },
                {
                    label:'胸外科',
                    value:[
                        {
                            value: 335,
                            name: "肺癌",
                        },
                        {
                            value: 310,
                            name: "结直肠癌",
                        },
                        {
                            value: 234,
                            name: "乳腺癌",
                        },
                        {
                            value: 135,
                            name: "胃癌",
                        },
                        {
                            value: 1548,
                            name: "膀胱癌",
                        }
                    ]
                },
                {
                    label:'内科',
                    value:[
                        {
                            value: 335,
                            name: "肺癌",
                        },
                        {
                            value: 310,
                            name: "结直肠癌",
                        },
                        {
                            value: 234,
                            name: "乳腺癌",
                        },
                        {
                            value: 135,
                            name: "胃癌",
                        },
                        {
                            value: 1548,
                            name: "膀胱癌",
                        }
                    ]
                },
                {
                    label:'肝胆外科',
                    value:[
                        {
                            value: 335,
                            name: "肺癌",
                        },
                        {
                            value: 310,
                            name: "结直肠癌",
                        },
                        {
                            value: 234,
                            name: "乳腺癌",
                        },
                        {
                            value: 135,
                            name: "胃癌",
                        },
                        {
                            value: 1548,
                            name: "膀胱癌",
                        }
                    ]
                },
                {
                    label:'妇科',
                    value:[
                        {
                            value: 335,
                            name: "肺癌",
                        },
                        {
                            value: 310,
                            name: "结直肠癌",
                        },
                        {
                            value: 234,
                            name: "乳腺癌",
                        },
                        {
                            value: 135,
                            name: "胃癌",
                        },
                        {
                            value: 1548,
                            name: "膀胱癌",
                        }
                    ]
                },
            ],
            bcharts:[
                {
                    label:'信息科',
                    value:[
                        {
                            value: 335,
                            name: "细胞学标本",
                        },
                        {
                            value: 310,
                            name: "穿刺活检",
                        },
                        {
                            value: 234,
                            name: "术中冰冻",
                        },
                        {
                            value: 135,
                            name: "术后组织",
                        },
                        {
                            value: 1548,
                            name: "其他",
                        }
                    ]
                },
                {
                    label:'病理科',
                    value:[
                        {
                            value: 335,
                            name: "细胞学标本",
                        },
                        {
                            value: 310,
                            name: "穿刺活检",
                        },
                        {
                            value: 234,
                            name: "术中冰冻",
                        },
                        {
                            value: 135,
                            name: "术后组织",
                        },
                        {
                            value: 1548,
                            name: "其他",
                        }
                    ]
                },
                {
                    label:'乳腺科',
                    value:[
                        {
                            value: 335,
                            name: "细胞学标本",
                        },
                        {
                            value: 310,
                            name: "穿刺活检",
                        },
                        {
                            value: 234,
                            name: "术中冰冻",
                        },
                        {
                            value: 135,
                            name: "术后组织",
                        },
                        {
                            value: 1548,
                            name: "其他",
                        }
                    ]
                },
                {
                    label:'结直肠外科',
                    value:[
                        {
                            value: 335,
                            name: "细胞学标本",
                        },
                        {
                            value: 310,
                            name: "穿刺活检",
                        },
                        {
                            value: 234,
                            name: "术中冰冻",
                        },
                        {
                            value: 135,
                            name: "术后组织",
                        },
                        {
                            value: 1548,
                            name: "其他",
                        }
                    ]
                },
                {
                    label:'中医科',
                    value:[
                        {
                            value: 335,
                            name: "细胞学标本",
                        },
                        {
                            value: 310,
                            name: "穿刺活检",
                        },
                        {
                            value: 234,
                            name: "术中冰冻",
                        },
                        {
                            value: 135,
                            name: "术后组织",
                        },
                        {
                            value: 1548,
                            name: "其他",
                        }
                    ]
                },
                {
                    label:'泌尿外科',
                    value:[
                        {
                            value: 335,
                            name: "细胞学标本",
                        },
                        {
                            value: 310,
                            name: "穿刺活检",
                        },
                        {
                            value: 234,
                            name: "术中冰冻",
                        },
                        {
                            value: 135,
                            name: "术后组织",
                        },
                        {
                            value: 1548,
                            name: "其他",
                        }
                    ]
                },
                {
                    label:'胸外科',
                    value:[
                        {
                            value: 335,
                            name: "细胞学标本",
                        },
                        {
                            value: 310,
                            name: "穿刺活检",
                        },
                        {
                            value: 234,
                            name: "术中冰冻",
                        },
                        {
                            value: 135,
                            name: "术后组织",
                        },
                        {
                            value: 1548,
                            name: "其他",
                        }
                    ]
                },
                {
                    label:'内科',
                    value:[
                        {
                            value: 335,
                            name: "细胞学标本",
                        },
                        {
                            value: 310,
                            name: "穿刺活检",
                        },
                        {
                            value: 234,
                            name: "术中冰冻",
                        },
                        {
                            value: 135,
                            name: "术后组织",
                        },
                        {
                            value: 1548,
                            name: "其他",
                        }
                    ]
                },
                {
                    label:'肝胆外科',
                    value:[
                        {
                            value: 335,
                            name: "细胞学标本",
                        },
                        {
                            value: 310,
                            name: "穿刺活检",
                        },
                        {
                            value: 234,
                            name: "术中冰冻",
                        },
                        {
                            value: 135,
                            name: "术后组织",
                        },
                        {
                            value: 1548,
                            name: "其他",
                        }
                    ]
                },
                {
                    label:'妇科',
                    value:[
                        {
                            value: 335,
                            name: "细胞学标本",
                        },
                        {
                            value: 310,
                            name: "穿刺活检",
                        },
                        {
                            value: 234,
                            name: "术中冰冻",
                        },
                        {
                            value: 135,
                            name: "术后组织",
                        },
                        {
                            value: 1548,
                            name: "其他",
                        }
                    ]
                },
            ],
            title:['乳腺癌','结直肠癌','结直肠癌','胃癌','膀胱癌'],
            btitle:['细胞学标本','穿刺活检','术中冰冻','术后组织','其他']
        }
    },
    methods:{
        handleClick(val){
            if(val.name==1){
                this.drawPic(this.charts,this.title)
            }else if(val.name==2){
                this.drawPic(this.bcharts,this.btitle)
            }
        },
        drawPie(id,tdata,ddata,total) {
            if(ddata.length>0){
            let myChart = echarts.init(document.getElementById(id));
            myChart.setOption({
                
                title: {
                    text: total,
                    // subtext: total,
                    x: 'center',
                    y: 'center',
                    textStyle:{
                        color:'#fff',
                        fontSize:40,
                        fontWeight:'bold',
                    }
                },
                color:['#5797fc','#4ecc48','#7e6fff','#ffcc29','#f37070'],
                tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                orient: "vertical",
                left: "20px",
                bottom: "20px",
                data: tdata,
                textStyle:{
                    color:'#fff'
                }
                },
                series: [
                {
                    name: "",
                    type: "pie",
                    radius: ["50%", "70%"],
                    center: ['50%', '40%'],
                    avoidLabelOverlap: false,
                    label: {
                    normal: {
                        show: false,
                    },
                    },
                    labelLine: {
                    normal: {
                        show: false
                    }
                    },
                    data: ddata
                }
                ]
            });
        }
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
        this.drawPic(this.charts,this.title)
        // this.charts.forEach((item,index)=>{
        //     let id="charts-"+(index+1),
        //     total=0;
        //     item.value.forEach(items=>{
        //         total+=items.value;
        //     })
        //     this.drawPie(id,tdata,item.value,total)
        // })
    }
};
</script>


