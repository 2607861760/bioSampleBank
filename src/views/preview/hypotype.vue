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
            padding:0 10px;
            height: 600px;
            color: #fff;
              &>div{
                  width: 100%;
                  height: 550px;
                  background: #f3f3f3;
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
        <span>本院科室样本统计</span>
      </div>
      <div class="process-inner">
          <div class="process-time">
              <span>癌肿：</span>
               <el-select v-model="ctype" placeholder="选择癌肿">
                <el-option
                    v-for="item in ctypelist"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
              </el-select>
              <el-button size="middle" type="primary" style="margin:0 10px 0 20px;">确定</el-button>
              <el-button size="middle" @click="reset">重置</el-button>
          </div>
          <div class="process-cont">
              <div class="process-chart">
                  <div id='charts'></div>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
// 引入基本模板
let echarts = require("echarts");
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
            title:['髓样癌','粘液腺癌','腺癌','印戒细胞癌','高级别神经内分泌癌','鳞状细胞癌','腺鳞癌','未分化癌','其他','癌，不能分类'],
            ctypelist:[
                {
                    name:'结直肠癌',
                    id:2
                },
                {
                    name:'乳腺癌',
                    id:3
                },
            ]
        }
    },
    methods:{
        drawPie(id,title,data,indata) {
            let myChart = echarts.init(document.getElementById(id));
            myChart.setOption({
                tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        data:title
    },
    series: [
        {
            name:'访问来源',
            type:'pie',
            selectedMode: 'single',
            radius: [0, '30%'],

            label: {
                normal: {
                    position: 'inner'
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:indata
        },
        {
            name:'访问来源',
            type:'pie',
            radius: ['40%', '55%'],
            label: {
                normal: {
                    formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                    backgroundColor: '#eee',
                    borderColor: '#aaa',
                    borderWidth: 1,
                    borderRadius: 4,
                    rich: {
                        a: {
                            color: '#999',
                            lineHeight: 22,
                            align: 'center'
                        },
                        hr: {
                            borderColor: '#aaa',
                            width: '100%',
                            borderWidth: 0.5,
                            height: 0
                        },
                        b: {
                            fontSize: 16,
                            lineHeight: 33
                        },
                        per: {
                            color: '#eee',
                            backgroundColor: '#334455',
                            padding: [2, 4],
                            borderRadius: 2
                        }
                    }
                }
            },
            data:data
        }
    ]
            });
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
        let data=[
                {value:335, name:'髓样癌'},
                {value:310, name:'粘液腺癌'},
                {value:234, name:'腺癌'},
                {value:135, name:'印戒细胞癌'},
                {value:1048, name:'高级别神经内分泌癌'},
                {value:251, name:'鳞状细胞癌'},
                {value:147, name:'腺鳞癌'},
                {value:102, name:'未分化癌'},
                {value:102, name:'其他'},
                {value:102, name:'癌，不能分类'},
            ],
            indata=[
                {value:335, name:'髓样癌',selected:true},
                {value:310, name:'粘液腺癌'},
                {value:234, name:'腺癌'},
            ];
        this.drawPie('charts',this.title,data,indata)
    }
};
</script>


