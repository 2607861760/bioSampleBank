<style lang="scss" scoped>
@import "../../base/css/base-var.scss";
.contant {
  width: 100%;
  .home-title {
    width: 100%;
    display: flex;
    & > div {
      float: left;
      flex: 1;
      height: 130px;
      background: #fff;
      border-radius: 6px;
      display: flex;
      padding: 20px;
      box-sizing: border-box;
      .title-left,
      .title-right {
        float: left;
      }
      .title-left {
        flex: 2;
        text-align: left;
        p {
          font-size: 16px;
          line-height: 28px;
        }
        div {
          font-size: 36px;
          font-weight: bold;
          line-height: 60px;
          i {
            vertical-align: middle;
            font-size: 20px;
          }
          .el-icon-bioup {
            color: $upcolor;
          }
          .el-icon-biodown {
            color: $maincolor;
          }
        }
      }
      .title-right {
        flex: 1;
        & > div {
          width: 65px;
          height: 65px;
          border-radius: 50%;
          margin: 10px auto;
          text-align: center;
          i {
            font-size: 40px;
            vertical-align: middle;
            margin-top: 18px;
            color: #fff;
          }
        }
        & > div.biolung {
          i {
            font-size: 50px;
            margin-top: 10px;
          }
          background: #2f4056;
        }
        & > div.biocolorectum {
          background: #ff5722;
        }
        & > div.biobreast {
          background: #f7b824;
        }
        & > div.biogastric {
          background: #009688;
        }
        & > div.biocarcinoma {
          background: #01aaed;
        }
      }
    }
    & > div + div {
      margin-left: 20px;
    }
  }
  .home-echarts {
    margin-top: 20px;
    min-height: 600px;
    text-align: center;
    display: flex;
    & > div {
      float: left;
      background: #fff;
      border-radius: 6px;
      padding: 20px;
      .ecahrt-title {
        height: 50px;
        text-align: left;
        line-height: 50px;
        font-weight: bold;
        font-size: 18px;
        i {
          font-size: 24px;
          vertical-align: middle;
          color: $maincolor;
          margin-top: 5px;
        }
      }
      .echart-main {
        width: 100%;
        height: 510px;
        padding: 15px 30px;
        box-sizing: border-box;
        .line-title {
          width: 100%;
          height: 85px;
          display: flex;
          & > div {
            flex: 1;
            float: left;
            box-sizing: border-box;
            border-left: 1px solid #ddd;
            p {
              font-size: 14px;
              line-height: 28px;
              margin-top: 15px;
            }
            span {
              font-weight: bold;
              font-size: 28px;
            }
            i {
              font-size: 20px;
            }
            .el-icon-bioup {
              color: $upcolor;
            }
            .el-icon-biodown {
              color: $maincolor;
            }
          }
          & > div:first-of-type {
            border-left: 1px solid rgba($color: #000000, $alpha: 0);
          }
          & > div:hover,
          .line-active {
            background: #ddd;
          }
        }
        #linecharts {
          width: 100%;
          height: 425px;
        }
      }
      #piecharts {
        width: 100%;
        height: 510px;
      }
    }
    & > div + div {
      margin-left: 20px;
    }
    .linechart {
      flex: 2.5;
    }
    .piechart {
      flex: 1;
    }
  }
}
</style>

<template>
  <div class="contant">
    <div class="home-title">
      <div v-for="(item,index) in titleList" :key="index">
        <div class="title-left">
          <p>{{item.name}}</p>
          <div>
            {{item.number}}
            <i v-if="item.trend" class="iconfont el-icon-bioup"></i>
            <i v-else class="iconfont el-icon-biodown"></i>
          </div>
        </div>
        <div class="title-right">
          <div :class="item.rightclass">
            <i :class="item.icon"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="home-echarts">
      <div class="linechart">
        <div class="ecahrt-title">
          <i class="iconfont el-icon-bioline"></i>
          <span>数据录入情况</span>
        </div>
        <div class="echart-main">
          <div class="line-title">
            <div
              v-for="(item,index) in lineList"
              :key="index"
              :class="item.active?'line-active':''"
              @click="lineChange(item,index)"
            >
              <p>{{item.name}}</p>
              <div>
                <span>{{item.number}}</span>
                <i v-if="item.trend" class="iconfont el-icon-bioup"></i>
                <i v-else class="iconfont el-icon-biodown"></i>
              </div>
            </div>
          </div>
          <div id="linecharts"></div>
        </div>
      </div>
      <div class="piechart">
        <div class="ecahrt-title">
          <i class="iconfont el-icon-biopie"></i>
          <span>各癌种占比</span>
        </div>
        <div id="piecharts"></div>
      </div>
    </div>
  </div>
</template>
<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/line");
require("echarts/lib/chart/pie");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
import {common} from 'api/index.js';
export default {
  data() {
    return {
      lineNum: 0,
      titleList: [
        {
          name: "肺癌",
          number: 0,
          trend: false,
          icon: "iconfont el-icon-biolung",
          rightclass: "biolung"
        },
        {
          name: "结直肠癌",
          number: 0,
          trend: true,
          icon: "iconfont el-icon-biocolorectum",
          rightclass: "biocolorectum"
        },
        {
          name: "乳腺癌",
          number: 0,
          trend: true,
          icon: "iconfont el-icon-biobreast",
          rightclass: "biobreast"
        },
        {
          name: "胃癌",
          number: 0,
          trend: false,
          icon: "iconfont el-icon-biogastric",
          rightclass: "biogastric"
        },
        {
          name: "膀胱癌",
          number: 0,
          trend: false,
          icon: "iconfont el-icon-biocarcinoma",
          rightclass: "biocarcinoma"
        }
      ],
      lineList: [
        {
          name: "近一年",
          number: 0,
          trend: false,
          active:true,
        },
        {
          name: "近六个月",
          number: 0,
          trend: true,
          active:false,
        },
        {
          name: "近三个月",
          number: 0,
          trend: true,
          active:false,
        }
      ],
      allData:{}
    };
  },
  methods: {
    drawLine(data) {
      let myChart = echarts.init(document.getElementById("linecharts"));
      myChart.setOption({
        legend: {
          top: "30px",
          data: ["肺癌", "结直肠癌", "乳腺癌", "胃癌", "膀胱癌"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false,
            data: data.timeData
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "肺癌",
            type: "line",
            stack: "总量",
            itemStyle: {
              color: "#7e6fff"
            },
            areaStyle: {
              color: "#7e6fff"
            },
            data: data.c1
          },
          {
            name: "结直肠癌",
            type: "line",
            stack: "总量",
            itemStyle: {
              color: "#4ecc48"
            },
            areaStyle: {
              color: "#4ecc48"
            },
            data: data.c2
          },
          {
            name: "乳腺癌",
            type: "line",
            stack: "总量",
            itemStyle: {
              color: "#5797fc"
            },
            areaStyle: {
              color: "#5797fc"
            },
            data: data.c3
          },
          {
            name: "胃癌",
            type: "line",
            stack: "总量",
            itemStyle: {
              color: "#ffcc29"
            },
            areaStyle: {
              color: "#ffcc29"
            },
            data: data.c4
          },
          {
            name: "膀胱癌",
            type: "line",
            stack: "总量",
            itemStyle: {
              color: "#f37070"
            },
            areaStyle: {
              color: "#f37070"
            },
            data: data.c5
          }
        ]
      });
    },
    drawPie(total,data) {
      let myChart = echarts.init(document.getElementById("piecharts"));
      myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "horizontal",
          left: "center",
          bottom: "50px",
          data: ["肺癌", "结直肠癌", "乳腺癌", "胃癌", "膀胱癌"]
        },
        // title:{
          // text:total,
        //   subtext: '总数据量',
        //   x: 'center',
        //             y: 'center',
        //             textStyle:{
        //                 color:'#fff',
        //                 fontSize:40,
        //                 fontWeight:'bold',
        //             }
        // },
        color:['#7e6fff','#4ecc48','#5797fc','#ffcc29','#f37070'],
        series: [
          {
            name: "",
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
            data: data
          }
        ]
      });
    },
    getIndex(){
      common.getIndex().then((res)=>{
        let pieData=[];
        this.titleList.map(item=>{
          res.data.c.forEach(element => {
            let obj={}
            if(element.ctype==1 &&　item.name=='肺癌'){
              item.number=element.num
              obj['name']=item.name;
              obj['value']=item.number;
              pieData.push(obj)
            }else if(element.ctype==2 &&　item.name=='结直肠癌'){
              item.number=element.num
              obj['name']=item.name;
              obj['value']=item.number;
              pieData.push(obj)
            }else if(element.ctype==3 &&　item.name=='乳腺癌'){
              item.number=element.num
              obj['name']=item.name;
              obj['value']=item.number;
              pieData.push(obj)
            }else if(element.ctype==4 &&　item.name=='胃癌'){
              item.number=element.num
              obj['name']=item.name;
              obj['value']=item.number;
              pieData.push(obj)
            }else if(element.ctype==5 &&　item.name=='膀胱癌'){
              item.number=element.num
              obj['name']=item.name;
              obj['value']=item.number;
              pieData.push(obj)
            }
          });
        });
        this.drawPie(0,pieData);
        this.allData=this.dataFliter(res.data.t);
        this.drawLine(this.allData)
        this.lineList[0].number=res.data.total;
        this.lineList[1].number=res.data.total6;
        this.lineList[2].number=res.data.total3;
      })
    },
    lineChange(item,index){
      this.lineList.map((items,indexs)=>{
        items.active=false;
        if(index==indexs){
          items.active=true;
        }
      })
      if(index==0){
        this.drawLine(this.allData);
      }else if(index==1){
        let obj={}
        for (const key in this.allData) {
          if (this.allData.hasOwnProperty(key)) {
            obj[key]=this.allData[key].slice(-6)
          }
        }
        console.log(obj)
        this.drawLine(obj)
      }else if(index==2){
        let obj={}
        for (const key in this.allData) {
          if (this.allData.hasOwnProperty(key)) {
            obj[key]=this.allData[key].slice(-3)
          }
        }
        this.drawLine(obj)
      }
    },
    dataFliter(data){
      let timeData=[],
      c1=[],
      c2=[],
      c3=[],
      c4=[],
      c5=[];
      data[0].list.forEach(item=>{
        timeData.push(item.timeSlot)
      })
      data.forEach(item=>{
        if(item.ctype==1){
          item.list.forEach(items=>{
            c1.push(items.num)
          })
        }
        if(item.ctype==2){
          item.list.forEach(items=>{
            c2.push(items.num)
          })
        }
        if(item.ctype==3){
          item.list.forEach(items=>{
            c3.push(items.num)
          })
        }
        if(item.ctype==4){
          item.list.forEach(items=>{
            c4.push(items.num)
          })
        }
        if(item.ctype==5){
          item.list.forEach(items=>{
            c5.push(items.num)
          })
        }
      })
      let dataobj={
        timeData:timeData,
        c1:c1,
        c2:c2,
        c3:c3,
        c4:c4,
        c5:c5
      }
      return dataobj
    }
  },
  created() {
    // this.drawLine();
    // this.drawPie();
    this.getIndex()
  }
};
</script>

