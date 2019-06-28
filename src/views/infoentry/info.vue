<style lang="scss" scoped>
@import "../../base/css/base-var.scss";
.process {
  background: #fff;
  border-radius: 6px;
  overflow: hidden;
  .process-inner {
    width: 80%;
    margin: 20px auto;
    display: flex;
    height: 70px;
    & > div {
      flex: 1;
      float: left;
      text-align: center;
      height: 100%;
      .process-icon {
        width: 42px;
        height: 42px;
        margin: auto;
        i {
          font-size: 40px;
        }
      }
      p {
        font-size: 14px;
      }
    }
    .acprocess {
      color: $maincolor;
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
.process-main {
  margin-top: 20px;
}
</style>

<template>
  <div class="contant">
    <div class="process">
      <div class="title">
        <i class="iconfont el-icon-biosign"></i>
        <span>相关流程</span>
      </div>
      <div class="process-inner">
        <div
          v-for="(item,index) in processList"
          :key="index"
          :class="currentNum>=index+1?'acprocess':''"
          @click="processChange(item,index)"
        >
          <div class="process-icon">
            <i :class="item.icon"></i>
          </div>
          <p>{{item.name}}</p>
        </div>
      </div>
    </div>
    <div class="process-main">
      <component :is="currentView"></component>
    </div>
  </div>
</template>
<script>
import historyInfo from'./infos/historyInfo';
export default {
  data() {
    return {
        currentView:"basicInfo",
        currentNum:0,
      processList: [
        {
          name: "患者信息",
          icon: "iconfont el-icon-biopatientinfo",
          type: "basicInfo",
        },
        {
          name: "病史信息",
          icon: "iconfont el-icon-biomenus",
          type: "historyInfo"
        },
        {
          name: "检查诊断",
          icon: "iconfont el-icon-biocase",
          type: "diagnoseInfo"
        },
        {
          name: "治疗信息",
          icon: "iconfont el-icon-bioinstruments",
          type: "treatInfo"
        },
        {
          name: "随访信息",
          icon: "iconfont el-icon-biousers",
          type: "followInfo"
        },
        {
          name: "样本库",
          icon: "iconfont el-icon-biomenus",
          type: "sampleInfo"
        }
      ],
      entryState:0
    };
  },
  methods: {
    processChange(item,index) {
      if(this.currentNum>index || this.entryState>index){
        this.currentView = item.type;
      }
    },
    entryStatefilter(num){
      let obj={
        type:'',
        num:0
      };
      if(num==1 || num==0){
        obj.type='basicInfo';
        obj.num=1;
      }else if(num==14){
        obj.type='basicInfo';
        obj.num=6;
      }else if(num>=2 && 4>num){
        obj.type='historyInfo';
        obj.num=2;
      }else if(num>=4 && 8>num){
        obj.type='diagnoseInfo';
        obj.num=3;
      }else if(num>=8 && 11>num){
        obj.type='treatInfo';
        obj.num=4;
      }else if(num>=11 && 12>num){
        obj.type='followInfo';
        obj.num=5;
      }else{
        obj.type='sampleInfo';
        obj.num=6;
      }
      return obj
    }
  },
  created() {
    if(this.$store.state.entryState!=null){
      let obj=this.entryStatefilter(this.$store.state.entryState);
      this.$store.state.tabState=obj.num;
      this.currentView=obj.type;
    }else{
      this.currentView = this.$route.query.type;
    }
    this.currentNum=this.$store.state.tabState;
  },
  watch: {
    currentView:function(newVal, oldVal) {
        this.$router.push({
                    path: "/infoentry/addpatient",
                    query: {
                        type: newVal
                    }
                })
        
    },
    $route(newVal, old) {
        this.currentView = this.$route.query.type;
        this.currentNum=this.$store.state.tabState;
    }
  },
  components: {
    basicInfo: resolve => require(["./infos/basicInfo"], resolve),
    historyInfo:resolve => require(["./infos/historyInfo"], resolve),
    diagnoseInfo: resolve => require(["./infos/diagnoseInfo"], resolve),
    treatInfo: resolve => require(["./infos/treatInfo"], resolve),
    followInfo: resolve => require(["./infos/followInfo"], resolve),
    sampleInfo: resolve => require(["./infos/sampleInfo"], resolve)
  }
};
</script>

