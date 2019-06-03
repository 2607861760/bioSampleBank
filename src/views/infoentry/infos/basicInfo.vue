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
          <el-tab-pane v-for='(item,index) in tablist' :num='item.num' :label="item.label" :name='item.name' :key='index' :disabled="item.disabled"></el-tab-pane>
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
              <el-select v-model="basicform.sex" placeholder="请选择..." @focus='searchItem("sex",0)'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in sexlist" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="国籍：">
              <el-select v-model="basicform.nationality" placeholder="请选择..." @focus='searchItem("nationality",0)'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in nationalitylist" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="民族：">
              <el-select v-model="basicform.nation" placeholder="请选择..." @focus='searchItem("nation",0)'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in nationlist" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="出生日期：">
              <el-date-picker type="date" placeholder="yyyy/mm/dd" v-model="basicform.birthday"></el-date-picker>
            </el-form-item>
            <el-form-item label="年龄：" prop="age">
              <el-input v-model.number="basicform.age"></el-input>
            </el-form-item>
            <el-form-item label="血型：" prop="btype">
              <el-select v-model="basicform.btype" placeholder="请选择..." @focus='searchItem("btype",0)'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in btypelist" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="RH血型：">
              <el-radio-group v-model="basicform.RH">
                <el-radio label="阴性"></el-radio>
                <el-radio label="阳性"></el-radio>
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
import sortRule from "../../../base/js/common.js";
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
          disabled:false,
          num:1
        },{
          name:'doctor',
          label:'就诊信息',
          disabled:false,
          num:2
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
      sexlist: [],
      btypelist:[],
      nationalitylist:[],
      nationlist:[],
      // disabled:true,
      entry:0,
    };
  },
  watch:{
    entry(val){
      this.tablist.forEach((item,index)=>{
        if(index+1<=val){
          item.disabled=false;
        }
        //if(this.$store.state.edit){
        if(val==item.num){
          this.activeName=item.name;
        }
      })
      console.log(this.tablist)
      if(this.$store.state.edit){
        if(val>=1 && this.activeName=='basic'){
        this.getBasicInfo()
      }else if(val>2){
        this.getDocotorInfo()
      }

      }
      
    }
  },
  computed:{
    bsave(){
      console.log(this.$store.state.entryState)
      if(this.$store.state.entryState>1){
        return false
      }else{
        return true
      }
      
    },
    fsave(){
      if(this.$store.state.entryState>2){
        return false
      }
      return true
    }
  },
  methods: {
    handleClick(val) {
      if(this.activeName=='basic' && val.index<=this.$store.state.entryState-1){
        this.getBasicInfo()
      }
      if(this.activeName=='doctor' && val.index<=this.$store.state.entryState-1){
        this.getDocotorInfo()
      }

    },
    saveBasic() {
      this.$refs["basicform"].validate(valid => {
        if (valid) {
          this.basicform["userId"] = 1;
          this.basicform["ctype"] = this.$store.state.cancerid;
          infoentry.savePatient(this.basicform).then(res => {
            if (res.returnCode == 0) {
              this.$store.state.patientid = res.data.id;
              this.$store.state.entryState=2;
              this.entry=this.$store.state.entryState;
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
          this.$store.state.entryState=1;
          this.$store.state.tabState=2;
          this.$router.push({
            path: "/infoentry/addpatient",
            query: {
              type: "historyInfo"
            }
          });
          
        }
      });
    },
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
            case 'sex':
              this.sexlist=res.data;
              break;
            case 'btype':
              this.btypelist=res.data;
              break;
            case 'nationality':
              this.nationalitylist=res.data;
              break;
            case 'nation':
              this.nationlist=res.data;
              break;
          }
        }
      })
    },
    getBasicInfo(){
      let obj={
        id:this.$store.state.patientid
      }
      infoentry.patientInfo(obj).then((res)=>{
        if(res.returnCode==0){
          this.basicform=res.data;
        }
      })
    },
    upBasicInfo(){
      this.$refs["basicform"].validate(valid => {
        if (valid) {
          infoentry.updatePatient(this.basicform).then(res => {
            if (res.returnCode == 0) {
              this.disabled=false;
              this.activeName = "doctor";
            }
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
        }
      })
    },
    upDoctor() {
      infoentry.updateVisit(this.doctorform).then(res => {
        if (res.returnCode == 0) {
          if(this.$store.state.entryState<2){
            this.$store.state.entryState=2;
          }
          this.$router.push({
            path: "/infoentry/addpatient",
            query: {
              type: "historyInfo"
            }
          });
          
        }
      });
    },
  },
  created() {
      this.searchItem("sex",0);
      this.searchItem("nationality",0);
      this.searchItem("nation",0);
      this.searchItem("btype",0);
      let _this=this;
      setTimeout(function(){
        _this.entry=_this.$store.state.entryState;
      },0)
      
      
  }
};
</script>