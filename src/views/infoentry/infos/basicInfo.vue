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
</style>
<template>
  <div class="basic">
    <div class="title">
      <i class="iconfont el-icon-biosign"></i>
      <span>患者信息</span>
    </div>
    <div class="basic-inner">
      <div class="basic-tab">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane v-for='(item,index) in tablist' :label="item.label" :name='item.name' :key='index' :disabled="item.disabled"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="basic-main">
        <div v-if="activeName=='basic'">
          <el-form
            ref="basicform"
            :model="basicform"
            label-width="100px"
            :rules="basicrules"
            label-position="left"
          >
            <el-form-item label="姓名：" prop="name">
              <el-input v-model="basicform.name"></el-input>
            </el-form-item>
            <el-form-item label="性别：">
              <el-select v-model="basicform.sex" placeholder="请选择...">
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in optionlist['sex']" :key="index">{{item.itemName}}</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="国籍：">
              <el-select v-model="basicform.nationality" placeholder="请选择...">
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in optionlist['nationality']" :key="index">{{item.itemName}}</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="民族：">
              <el-select v-model="basicform.nation" placeholder="请选择...">
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in optionlist['nation']" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="出生日期：">
              <el-date-picker type="date" placeholder="yyyy/mm/dd" v-model="basicform.birthday"></el-date-picker>
            </el-form-item>
            <el-form-item label="年龄：" prop="age">
              <el-input v-model.number="basicform.age"></el-input>
            </el-form-item>
            <el-form-item label="血型：" prop="btype">
              <el-select v-model="basicform.btype" placeholder="请选择...">
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in optionlist['btype']" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="RH血型：">
              <el-radio-group v-model="basicform.rh">
                <el-radio :label="0" :value='0'>阴性</el-radio>
                <el-radio :label="1" :value='1'>阳性</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="登记号：" prop="number">
              <el-input v-model="basicform.number"></el-input>
            </el-form-item>
            <el-form-item label="登记时间：">
              <el-date-picker type="date" placeholder="yyyy/mm/dd" v-model="basicform.rdate"></el-date-picker>
            </el-form-item>
            <el-form-item label="联系方式：" prop="phone">
              <el-input v-model="basicform.phone"></el-input>
            </el-form-item>
            <el-form-item label="固定地址：">
              <el-input v-model="basicform.address"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveBasic" size="medium" v-if="bsave">保存</el-button>
              <el-button size="medium" @click="upBasicInfo" v-else>编辑</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="activeName=='doctor'">
          <el-form
            ref="form"
            :model="doctorform"
            label-width="100px"
            :rules="basicrules"
            label-position="left"
          >
            <el-form-item label="入院日期：">
              <el-date-picker type="date" placeholder="yyyy/mm/dd" v-model="doctorform.intime"></el-date-picker>
            </el-form-item>
            <el-form-item label="入院科室：">
              <el-input v-model="doctorform.indepartment"></el-input>
            </el-form-item>
            <el-form-item label="出院日期：">
              <el-date-picker type="date" placeholder="yyyy/mm/dd" v-model="doctorform.outtime"></el-date-picker>
            </el-form-item>
            <el-form-item label="出院科室：">
              <el-input v-model="doctorform.outdepartment"></el-input>
            </el-form-item>
            <el-form-item label="就诊医院：">
              <el-input v-model="doctorform.vhospital"></el-input>
            </el-form-item>
            <el-form-item label="门诊日期：">
              <el-date-picker type="date" placeholder="yyyy/mm/dd" v-model="doctorform.mzdate"></el-date-picker>
            </el-form-item>
            <el-form-item label="门诊科室：">
              <el-input v-model="doctorform.mzdepartment"></el-input>
            </el-form-item>
            <el-form-item label="门诊医院：">
              <el-input v-model="doctorform.mzhospital"></el-input>
            </el-form-item>
            <el-form-item label="急诊日期：">
              <el-date-picker type="date" placeholder="yyyy/mm/dd" v-model="doctorform.emdate"></el-date-picker>
            </el-form-item>
            <el-form-item label="急诊科室：">
              <el-input v-model="doctorform.emdepartment"></el-input>
            </el-form-item>
            <el-form-item label="急诊医院：">
              <el-input v-model="doctorform.emhospital"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveDoctor" size="medium" v-if="fsave">保存</el-button>
              <el-button size="medium" @click="upDoctor" v-else>编辑</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { infoentry, dict } from "api/index.js";
import {sortRule,getTabListByState,getActiveName,getOption} from "../../../base/js/common.js";
export default {
  data() {
    var poneAvailable = (rule, value, callback) => {
      if (!value) {
      }
      setTimeout(() => {
        if (isPoneAvailable(value) == false) {
          callback(new Error("手机号不存在"));
        }
      }, 1000);
    };
    return {
      tablist:[
        {
          name:'basic',
          label:'基本信息',
          disabled:false
        },{
          name:'doctor',
          label:'就诊信息',
          disabled:true
        }
      ],
      activeName: "basic",
      basicform: {
        name: "",
        btype: "",
        number: ""
      },
      basicrules: {
        name: [{ required: true, message: "请输入姓名" }],
        btype: [{ required: true, message: "请选择血型" }],
        number: [{ required: true, message: "请输入登记号" }],
        age: [{ type: "number", message: "年龄必须为数字值" }]
        // phone:[{ validator: poneAvailable, trigger: 'blur' }]
      },
      doctorform: {},
      disabled:true,
      cancerid:0,
      optionlist:[]
    };
  },
  computed:{
    bsave(){
      if(this.$store.state.entryState>=1){
        return false
      }
      return true
    },
    fsave(){
      if(this.$store.state.entryState>=2){
        return false
      }
      return true
    }
  },
  methods: {
    handleClick(val) {
      if(this.$store.state.entryState>=1 && val.name=='basic'){
        this.getBasicInfo()
      }
      if(this.$store.state.entryState>=2 && val.name=='doctor'){
        this.getDocotorInfo()
      }
    },
    saveBasic() {
      this.$refs["basicform"].validate(valid => {
        if (valid) {
          this.basicform["userId"] = this.$store.state.userId;
          this.basicform["ctype"] = this.cancerid;
          infoentry.savePatient(this.basicform).then(res => {
            if (res.returnCode == 0) {
              this.$store.state.patientid = res.data.id;
              this.$store.state.entryState=1;
              this.entry=this.$store.state.entryState;
            }else{
              this.$message.error(res.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    saveDoctor() {
      this.doctorform["pid"] = this.$store.state.patientid;
      infoentry.saveVisit(this.doctorform).then(res => {
        if (res.returnCode == 0) {
          this.$store.state.entryState=2;
          this.$store.state.tabState=2;
          this.$router.push({
            path: "/infoentry/addpatient",
            query: {
              type: "historyInfo"
            }
          });
          
        }else{
          this.$message.error(res.msg);
        }
      });
    },
    getBasicInfo(){
      let obj={
        id:this.$store.state.patientid
      }
      infoentry.patientInfo(obj).then((res)=>{
        if(res.returnCode==0){
          this.basicform=res.data;
        }else{
          this.$message.error(res.msg);
        }
      })
    },
    upBasicInfo(){
      this.$refs["basicform"].validate(valid => {
        if (valid) {
          infoentry.updatePatient(this.basicform).then(res => {
            if (res.returnCode == 0) {
              this.$message({
            message: '修改成功！',
            type: 'success'
          });
          this.getBasicInfo()}
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getDocotorInfo(){
      let obj={
        id:this.$store.state.patientid
      }
      infoentry.visitInfo(obj).then((res)=>{
        if(res.returnCode==0){
          this.basicform=res.data;
        }else{
          this.$message.error(res.msg);
        }
      })
    },
    upDoctor() {
      infoentry.updateVisit(this.doctorform).then(res => {
        if (res.returnCode == 0) {
          this.$message({
            message: '修改成功！',
            type: 'success'
          });
          this.getDocotorInfo()
          
        }else{
          this.$message.error(res.msg);
        }
      });
    },
  },
  created() {
      this.cancerid=this.$store.state.cancerid;
      let selectlist=["sex","nationality","nation","btype"];
      this.optionlist=getOption(this.$store.state.zdlist,selectlist,this.cancerid);
  },
  mounted(){
    let state = this.$store.state.entryState;
    this.tablist = getTabListByState(0,state);
    this.activeName = getActiveName(0,state);
    if(state>=1){
      this.getBasicInfo()
    }
  },
  watch:{
    "$store.state.entryState":function(){
      let state = this.$store.state.entryState;
      this.tablist = getTabListByState(0,state);
      this.activeName = getActiveName(0,state);
    }
  }
};
</script>