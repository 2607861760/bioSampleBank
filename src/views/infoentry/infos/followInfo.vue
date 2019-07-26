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
.el-button--primary,.el-button--primary:focus, .el-button--primary:hover{
  background-color: $maincolor !important;
  border-color: $maincolor !important;
}
.el-input__prefix{
    right:5px;
    color: $maincolor;
}
.el-input--prefix .el-input__inner{
  padding-left: 15px;
}
</style>
<template>
  <div class="basic">
    <div class="title">
      <i class="iconfont el-icon-biosign"></i>
      <span>随访信息</span>
    </div>
    <div class="basic-inner">
      <div class="basic-tab">
        <el-tabs v-model="activeName">
          <el-tab-pane label="随访信息" name="follow"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="basic-main">
        <div v-if="activeName=='follow'">
          <el-form
            ref="form"
            :model="followform"
            label-width="150px"
            label-position="left"
          >
          <el-form-item label="是否随访：">
              <el-radio-group v-model="followform.isfollowup">
                <el-radio :label="0" :value='0'>是</el-radio>
                <el-radio :label="1" :value='1'>否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="随访时间：">
              <el-date-picker
                type="date"
                placeholder="yyyy/mm/dd"
                v-model="followform.followdate"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="随访方式：">
              <el-select v-model="followform.followway" placeholder="请选择...">
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in followwaylist" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="生存状态：">
              <el-radio-group v-model="followform.existence">
                <el-radio :label="0" :value='0'>生存</el-radio>
                <el-radio :label="1" :value='1'>死亡</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="生存分析：">
              <el-checkbox-group v-model="liveanallist">
              <p>
                <el-checkbox label="0" value='0'>OS</el-checkbox>
                <el-input v-model="followform.os" placeholder="请输入"></el-input>
              </p>
              <p>
                <el-checkbox label="1" value='1'>PFS</el-checkbox>
                 <el-input v-model="followform.pfs" placeholder="请输入"></el-input>
              </p>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="死亡日期：">
              <el-date-picker
                type="date"
                placeholder="yyyy/mm/dd"
                v-model="followform.diedate"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="是否复发：">
              <el-radio-group v-model="followform.isrec">
                <el-radio :label="0" :value='0'>是</el-radio>
                <el-radio :label="1" :value='1'>否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="复发日期：">
              <el-date-picker
                type="date"
                placeholder="yyyy/mm/dd"
                v-model="followform.recdate"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="肿瘤进展情况：">
              <el-select v-model="followform.progress" placeholder="请选择...">
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in progresslist" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否转移：">
              <el-radio-group v-model="followform.istransfer">
                <el-radio :label="0" :value='0'>是</el-radio>
                <el-radio :label="1" :value='1'>否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="转移日期：">
              <el-date-picker
                type="date"
                placeholder="yyyy/mm/dd"
                v-model="followform.transferdate"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="转移部位：">
              <el-select v-model="followform.transferbw" placeholder="请选择...">
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in transferbwlist" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="随访信息：" >
              <el-input v-model="followform.followinfo"></el-input>
            </el-form-item>
            <el-form-item label="随访结论：" >
              <el-input v-model="followform.followresult"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveFollow" size="medium" v-if='fsave'>保存</el-button>
              <el-button size="medium" @click="updateFollowUp" v-else>编辑</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {infoentry,dict} from 'api/index.js';
import {sortRule,getTabListByState} from "../../../base/js/common.js";
export default {
  data() {
    return {
      activeName: "follow",
      fsave:true,
      liveanallist:[],
      followform: {
      },
      followwaylist:[],
      progresslist:[],
      transferbwlist:[]
    };
  },
  methods: {
    searchItem(name,type=null) {
      let obj = {
        itemValue: name,
        itype: this.$store.state.cancerid
      };
      if(type!==null){
        obj.itype=type
      }
      dict.searchItem(obj).then((res)=>{
        if(res.returnCode==0){
          res.data.sort(sortRule)
          switch(name){
            case 'followway':
              this.followwaylist=res.data;
              break;
            case 'progress':
              this.progresslist=res.data;
              break;
            case 'transferbw':
              this.transferbwlist=res.data;
              break;
            case 'unfocusass':
              this.unfocusasslist=res.data;
              break;
            case 'allass':
              this.allasslist=res.data;
              break;
            case 'reactsource':
              this.reactsourcelist=res.data;
              break;
            case 'stoxic':
              this.stoxiclist=res.data;
              break;
            case 'changes':
              this.changeslist=res.data;
              break;
            case 'badevent':
              this.badeventlist=res.data;
              break;
          }
        }
      })
    },
    saveFollow() {
      this.followform['pid']=this.$store.state.patientid;
      infoentry.saveFollowUp(this.followform).then((res)=>{
        if(res.returnCode==0){
          this.$store.state.entryState=12;
          this.$store.state.tabState=6;
          this.$router.push({
            path: "/infoentry/addpatient",
            query: {
              type: "sampleInfo"
            }
          });
        }else{
          this.$message.error(res.msg);
        }
        
      })
      
    },
    followUpInfo(){
      let obj={
        pid:this.$store.state.patientid
      }
      infoentry.followUpInfo(obj).then((res)=>{
        if(res.returnCode==0){
          if(res.data!=null){
            this.followform=res.data;
            if(this.followform.os!=null && this.followform.os!=''){
              this.liveanallist.push('0')
            }else{
              this.liveanallist = this.liveanallist.filter(function(item) {
                return item != "0"
             });
            }
            if(this.followform.pfs!=null && this.followform.pfs!=''){
              this.liveanallist.push('1')
            }else{
              this.liveanallist = this.liveanallist.filter(function(item) {
                return item != "1"
             });
            }
          }
        }else{
          this.$message.error(res.msg);
        }
      })
    },
    updateFollowUp(){
      infoentry.updateFollowUp(this.followform).then((res)=>{
        if(res.returnCode==0){
          this.$message({
            message: '修改成功！',
            type: 'success'
          });
          this.followUpInfo()
        }else{
          this.$message.error(res.msg);
        }
        
      })
    }
  },
  created(){
    this.searchItem("transferbw",0);
    this.searchItem("progress",0);
    this.searchItem("followway",0);
  },
  mounted() {
      this.entry=this.$store.state.entryState;
        if(this.entry>=12){
          this.fsave=false;
          this.followUpInfo()
        }
  }
};
</script>