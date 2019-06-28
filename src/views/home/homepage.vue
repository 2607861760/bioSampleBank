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
              :class="index==lineNum?'line-active':''"
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
export default {
  data() {
    return {
      lineNum: 0,
      titleList: [
        {
          name: "肺癌",
          number: 56,
          trend: false,
          icon: "iconfont el-icon-biolung",
          rightclass: "biolung"
        },
        {
          name: "结直肠癌",
          number: 823,
          trend: true,
          icon: "iconfont el-icon-biocolorectum",
          rightclass: "biocolorectum"
        },
        {
          name: "乳腺癌",
          number: 120,
          trend: true,
          icon: "iconfont el-icon-biobreast",
          rightclass: "biobreast"
        },
        {
          name: "胃癌",
          number: 16,
          trend: false,
          icon: "iconfont el-icon-biogastric",
          rightclass: "biogastric"
        },
        {
          name: "膀胱癌",
          number: 86,
          trend: false,
          icon: "iconfont el-icon-biocarcinoma",
          rightclass: "biocarcinoma"
        }
      ],
      lineList: [
        {
          name: "近一年",
          number: 328,
          trend: false
        },
        {
          name: "近六个月",
          number: 780,
          trend: true
        },
        {
          name: "近三个月",
          number: 256,
          trend: true
        }
      ]
    };
  },
  methods: {
    drawLine() {
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
            data: [
              "2018-08",
              "2018-09",
              "2018-10",
              "2018-11",
              "2018-12",
              "2019-01",
              "2019-02"
            ]
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
            data: [120, 132, 101, 134, 90, 230, 210]
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
            data: [220, 182, 191, 234, 290, 330, 310]
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
            data: [150, 232, 201, 154, 190, 330, 410]
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
            data: [320, 332, 301, 334, 390, 330, 320]
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
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      });
    },
    drawPie(total) {
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
        title:{
          text:total,
          subtext: '总数据量',
          x: 'center',
                    y: 'center',
                    textStyle:{
                        color:'#fff',
                        fontSize:40,
                        fontWeight:'bold',
                    }
        },
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
            data: [
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
          }
        ]
      });
    }
  },
  mounted() {
    this.drawLine();
    this.drawPie();
  }
};
</script>

