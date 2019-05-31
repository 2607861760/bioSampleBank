<style lang="scss" scoped>
@import "../../../base/css/base-var.scss";
.basic {
  background: #fff;
  border-radius: 6px;
  overflow: hidden;
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
  .basic-inner {
    padding: 0 45px 20px;
    .basic-main {
      padding: 20px;
      height: 500px;
      overflow-y: scroll;
    }
    .basic-tab {
      text-align: center;
    }
  }
}
.el-input,
.el-select,
.el-date-editor {
  width: 350px;
}
// .el-date-editor{
// width: 350px !important;
// }
.el-button--primary {
  background-color: $maincolor;
  border-color: $maincolor;
}
.el-input__prefix {
  right: 5px;
  color: $maincolor;
}
.el-input--prefix .el-input__inner {
  padding-left: 15px;
}
.submit.el-button--primary {
    background-color: $btncolor;
    border-color: $btncolor;
  }
</style>
<template>
  <div class="basic">
    <div class="title">
      <i class="iconfont el-icon-biosign"></i>
      <span>样本库</span>
    </div>
    <div class="basic-inner">
      <div class="basic-tab">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="样本库" name="sample"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="basic-main">
        <div v-if="activeName=='sample'">
          <el-form ref="form" :model="sampleform" label-width="150px" label-position="left">
            <el-form-item label="是否留样本：">
              <el-radio-group v-model="sampleform.issample">
                <el-radio label="0" value="0">是</el-radio>
                <el-radio label="1" value="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="样品编号：">
              <el-input v-model="sampleform.samnum"></el-input>
            </el-form-item>
            <el-form-item label="样品来源：">
              <el-input v-model="sampleform.samsource"></el-input>
            </el-form-item>
            <el-form-item label="样本日期：">
              <el-date-picker type="date" placeholder="yyyy/mm/dd" v-model="sampleform.samdate"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <span>
              <el-button type="primary" @click="saveSample" size="medium" v-if='ssave'>保存</el-button>
              <el-button size="medium" v-else>编辑</el-button>
              </span>
              <el-button type="primary" @click="submit" size="medium" class="submit">提交</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {infoentry} from 'api/index.js';
export default {
  data() {
    return {
      activeName: "sample",
      ssave:true,
      sampleform: {
      }
    };
  },
  methods: {
    handleClick() {},
    saveSample() {
      this.sampleform['pid']=this.$store.state.patientid;
      infoentry.saveBank(this.sampleform).then((res)=>{
        if(res.returnCode==0){
          this.$store.state.entryState=13;
          this.ssave=false;
        }
      })
      
    },
    submit(){

    },
    bankInfo(){
      let obj={
        id:this.$store.state.patientid
      }
      infoentry.bankInfo(obj).then((res)=>{
        if(res.returnCode==0){
          this.basicform=res.data;
        }
      })
    },
  },
  created() {
    if(this.$store.state.entryState!=null){
      if(this.$store.state.entryState>12){
        this.ssave=false;
        this.bankInfo()
      }
    }
  }
};
</script>