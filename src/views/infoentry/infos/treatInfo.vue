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
      <span>治疗信息</span>
    </div>
    <div class="basic-inner">
      <div class="basic-tab">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane v-for='(item,index) in coltablist' :label="item.label" :name='item.name' :key='index' :disabled="item.disabled"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="basic-main">
        <div v-if="activeName=='therapy'">
          <el-form ref="form" :model="therapyform" label-width="150px" label-position="left">
            <el-form-item label="化疗药物："></el-form-item>
            <el-form-item label="化疗药物：">
              <el-radio-group v-model="therapyform.chemodrugs">
                <el-form-item>
                  <el-radio label="0" value="0">无化疗</el-radio>
                </el-form-item>
                <el-form-item>
                  <el-radio label="1" value="1">有化疗</el-radio>
                </el-form-item>
                <div v-if="therapyform.chemodrugs==1">
                  <el-select v-model="therapyform.drug" placeholder="请选择化疗药物" @focus='searchItem("drug",0)'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in druglist" :key="index"></el-option>
              </el-select>
                </div>
                <el-form-item>
                  <el-radio label="3" value="3">未知化疗史</el-radio>
                </el-form-item>
                <el-form-item>
                  <el-radio label="4" value="4">其他</el-radio>
                </el-form-item>
                <div v-if="therapyform.chemodrugs==4">
                  <el-input v-model="therapyform.drugother" placeholder="请输入其他药物"></el-input>
                </div>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="开始时间：">
              <el-date-picker type="date" placeholder="yyyy/mm/dd" v-model="therapyform.cstrdate"></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间：">
              <el-date-picker type="date" placeholder="yyyy/mm/dd" v-model="therapyform.cenddate"></el-date-picker>
            </el-form-item>
            <el-form-item label="药物单次剂量：">
              <el-input v-model="therapyform.conedose">
                <template slot="suffix">mg</template>
              </el-input>
            </el-form-item>
            <el-form-item label="给药途径：">
              <el-select v-model="therapyform.cway" placeholder="请选择..." @focus='searchItem("cway",0)'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in cwaylist" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="用药频次：">
              <el-input v-model="therapyform.cdrugrate">
                <template slot="suffix">次</template>
              </el-input>
            </el-form-item>
            <el-form-item label="是否参与临床试验：">
              <el-radio-group v-model="therapyform.cisctrials">
                <el-radio label="0" value="0">是</el-radio>
                <el-radio label="1" value="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="靶向药物"></el-form-item>
            <el-form-item label="靶点：">
              <el-checkbox-group v-model="targetlist" @change="targetchange">
              <div v-if="cancertype=='colorectal'">
                
              <p>
                <el-checkbox label="EGFR" :checked="therapyform.target=='EGFR'" :disabled="(targetlist[0]=='EGFR' || nowtarget==false)?false:true">EGFR</el-checkbox>
              </p>
              <p>
                <el-checkbox label="VEGF" :checked="therapyform.target=='VEGF'" :disabled="(targetlist[0]=='VEGF' || nowtarget==false)?false:true">VEGF</el-checkbox>
              </p>
              
              </div>
              <div v-if="cancertype=='breast'">
                <p>
                  <el-checkbox label="HER2" :checked="therapyform.target=='HER2'" :disabled="(targetlist[0]=='HER2' || nowtarget==false)?false:true">HER2</el-checkbox>
                  <el-checkbox label="PARP" :checked="therapyform.target=='PARP'" :disabled="(targetlist[0]=='PARP' || nowtarget==false)?false:true">PARP</el-checkbox>
                </p>
                <p>
                  <el-checkbox label="CKD4" :checked="therapyform.target=='CKD4'" :disabled="(targetlist[0]=='CKD4' || nowtarget==false)?false:true">CKD4/6</el-checkbox>
                  <el-checkbox label="PI3K" :checked="therapyform.target=='PI3K'" :disabled="(targetlist[0]=='PI3K' || nowtarget==false)?false:true">PI3K/AKT/mTor</el-checkbox>
                </p>
              </div>
              <p>
                <el-checkbox label="othertarget" :checked="therapyform.target=='othertarget'" :disabled="(targetlist[0]=='othertarget' || nowtarget==false)?false:true">其他</el-checkbox>
              </p>
              <p>
                <el-input v-model="therapyform.other" placeholder="请输入其他靶点"></el-input>
              </p>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="药物名称：">
              <el-input v-model="therapyform.tdrugname"></el-input>
            </el-form-item>
            <el-form-item label="开始时间：">
              <el-date-picker
                type="date"
                placeholder="yyyy/mm/dd"
                v-model="therapyform.tstrdate"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间：">
              <el-date-picker
                type="date"
                placeholder="yyyy/mm/dd"
                v-model="therapyform.tenddate"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="药物单次剂量：">
              <el-input v-model="therapyform.tonedose">
                <template slot="suffix">mg</template>
              </el-input>
            </el-form-item>
            <el-form-item label="给药途径：">
              <el-select v-model="therapyform.tway" placeholder="请选择..." @focus='searchItem("cway",0)'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in cwaylist" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="用药频次：">
              <el-input v-model="therapyform.tdrugrate">
                <template slot="suffix">次</template>
              </el-input>
            </el-form-item>
            <el-form-item label="是否参与临床试验：">
              <el-radio-group v-model="therapyform.tisctrials">
                <el-radio label="0" value="0">是</el-radio>
                <el-radio label="1" value="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="免疫药物"></el-form-item>
            <el-form-item label="靶点：">
              <el-checkbox-group v-model="imtargetlist" @change="imtargetchange">
              <p>
                <el-checkbox label="PD1">PD-1</el-checkbox>
              </p>
              <p>
                <el-checkbox label="PDL1">PD-L1</el-checkbox>
              </p>
              <p>
                <el-checkbox label="CTLA">CTLA-4</el-checkbox>
              </p>
              <p>
                <el-checkbox label="imothertarget">其他靶点</el-checkbox>
              </p>
              <p>
                <el-input v-model="therapyform.othertag" placeholder="请输入其他靶点"></el-input>
              </p>
              <p>
                <el-checkbox label="lhzl">联合治疗</el-checkbox>
              </p>
              <p>
                <el-input v-model="therapyform.lhzl" placeholder="请输入联合治疗靶点"></el-input>
              </p>
              <p>
                <el-checkbox label="unknown">未知</el-checkbox>
              </p>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="药物名称：">
              <el-input v-model="therapyform.immdrugname"></el-input>
            </el-form-item>
            <el-form-item label="其他药物：">
              <el-input v-model="therapyform.immother"></el-input>
            </el-form-item>
            <el-form-item label="开始时间：">
              <el-date-picker
                type="date"
                placeholder="yyyy/mm/dd"
                v-model="therapyform.immstrdate"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间：">
              <el-date-picker
                type="date"
                placeholder="yyyy/mm/dd"
                v-model="therapyform.immenddate"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="药物单次剂量：">
              <el-input v-model="therapyform.immonedose">
                <template slot="suffix">mg</template>
              </el-input>
            </el-form-item>
            <el-form-item label="给药途径：">
              <el-select v-model="therapyform.immway" placeholder="请选择..." @focus='searchItem("cway",0)'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in cwaylist" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="用药频次：">
              <el-input v-model="therapyform.immdrugrate">
                <template slot="suffix">次</template>
              </el-input>
            </el-form-item>
            <el-form-item label="是否参与临床试验：">
              <el-radio-group v-model="therapyform.immisctrials">
                <el-radio label="0" value="0">是</el-radio>
                <el-radio label="1" value="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              
              <el-button type="primary" @click="saveTherapy" size="medium" v-if='tsave'>保存</el-button>
              <el-button size="medium" v-else>编辑</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="activeName=='evaluation'">
          <el-form ref="form" :model="evaluationform" label-width="150px" label-position="left">
            <el-form-item label="疗效评估：">
              <el-radio-group v-model="evaluationform.lxassess">
                <el-radio label="0" value="0">有</el-radio>
                <el-radio label="1" value="1">无</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="靶病灶名称：">
              <el-input v-model="evaluationform.focusname"></el-input>
            </el-form-item>
            <el-form-item label="靶病灶长径：">
              <el-input v-model="evaluationform.focuscd"></el-input>
            </el-form-item>
            <el-form-item label="靶病灶短径：">
              <el-input v-model="evaluationform.focusdd"></el-input>
            </el-form-item>
            <el-form-item label="检查方法：">
              <el-input v-model="evaluationform.method"></el-input>
            </el-form-item>
            <el-form-item label="评估日期：">
              <el-date-picker
                type="date"
                placeholder="yyyy/mm/dd"
                v-model="evaluationform.assdate"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="靶病灶评估：">
              <el-select v-model="evaluationform.focusass" placeholder="请选择..." @focus='searchItem("focusass",0)'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in focusasslist" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="非靶病灶评估：">
              <el-select v-model="evaluationform.unfocusass" placeholder="请选择..." @focus='searchItem("unfocusass",0)'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in unfocusasslist" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否有新病灶：">
              <el-radio-group v-model="evaluationform.isnewfocus">
                <el-radio label="0" value="0">是</el-radio>
                <el-radio label="1" value="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="新靶病灶名称：">
              <el-input v-model="evaluationform.nfocusname"></el-input>
            </el-form-item>
            <el-form-item label="新靶病灶长径：">
              <el-input v-model="evaluationform.nfocuscd"></el-input>
            </el-form-item>
            <el-form-item label="新靶病灶短径：">
              <el-input v-model="evaluationform.nfocusdd"></el-input>
            </el-form-item>
            <el-form-item label="新病灶评估日期：">
              <el-date-picker
                type="date"
                placeholder="yyyy/mm/dd"
                v-model="evaluationform.nassdate"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="肿瘤标记物评估：">
              <el-radio-group v-model="evaluationform.tumormarher">
                <el-radio label="0" value="0">正常</el-radio>
                  <el-radio label="1" value="1">异常</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="总体疗效评估：">
              <el-select v-model="evaluationform.allass" placeholder="请选择..." @focus='searchItem("allass",0)'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in allasslist" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              
              <el-button type="primary" @click="saveEvaluation" size="medium" v-if='esave'>保存</el-button>
              <el-button size="medium" v-else>编辑</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="activeName=='symptoms'">
          <el-form ref="form" :model="symptomsform" label-width="150px" label-position="left">
            <el-form-item label="是否经历不良反应：">
              <el-radio-group v-model="symptomsform.isreact">
                  <el-radio label="0" value="0">有</el-radio>
                  <el-radio label="1" value="1">无</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="不良反应名称：">
              <el-input v-model="symptomsform.reactname"></el-input>
            </el-form-item>
            <el-form-item label="产生不良反应来源：">
              <el-select v-model="symptomsform.reactsource" placeholder="请选择..." @focus='searchItem("reactsource",0)'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in reactsourcelist" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开始时间：">
              <el-date-picker type="date" placeholder="yyyy/mm/dd" v-model="symptomsform.strdate"></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间：">
              <el-date-picker type="date" placeholder="yyyy/mm/dd" v-model="symptomsform.enddate"></el-date-picker>
            </el-form-item>
            <el-form-item label="标准毒性：">
              <el-select v-model="symptomsform.stoxic" placeholder="请选择..." @focus='searchItem("stoxic",0)'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in stoxiclist" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="放射性损伤早期分级：">
              <el-radio-group v-model="symptomsform.earlyclass">
                  <el-radio label="0" value="0">有</el-radio>
                  <el-radio label="1" value="1">无</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="放射性损伤晚期分级：">
              <el-radio-group v-model="symptomsform.latterclass">
                  <el-radio label="0" value="0">有</el-radio>
                  <el-radio label="1" value="1">无</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="治疗变化：">
              <el-select v-model="symptomsform.changes" placeholder="请选择..." @focus='searchItem("changes",0)'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in changeslist" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="不良事件结局：">
              <el-select v-model="symptomsform.badevent" placeholder="请选择..." @focus='searchItem("badevent",0)'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in badeventlist" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              
              <el-button type="primary" @click="saveSymptoms" size="medium" v-if='ssave'>保存</el-button>
              <el-button size="medium" v-else>编辑</el-button>
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
      coltablist:[
        {
          name:'therapy',
          label:'药物治疗',
          disabled:false,
          num:9
        },{
          name:'evaluation',
          label:'疗效评估',
          disabled:true,
          num:10
        },{
          name:'symptoms',
          label:'临床症状',
          disabled:true,
          num:11
        }
      ],
      sdisabled:true,
      edisabled:true,
      imnowtarget:false,
      imtargetlist:[],
      nowtarget:false,
      targetlist:[],
      cancertype:'colorectal',
      activeName: "therapy",
      therapyform: {
      },
      symptomsform:{},
      evaluationform: {
      },
      druglist:[],
      cwaylist:[],
      focusasslist:[],
      unfocusasslist:[],
      allasslist:[],
      reactsourcelist:[],
      stoxiclist:[],
      changeslist:[],
      badeventlist:[]
    }
  },
  computed:{
    tsave(){
      if(this.$store.state.entryState>=9){
        return false
      }
      return true
    },
    esave(){
      if(this.$store.state.entryState>10){
        return false
      }
      return true
    },
    ssave(){
      if(this.$store.state.entryState>11){
        return false
      }
      return true
    }
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
            case 'drug':
              this.druglist=res.data;
              break;
            case 'cway':
              this.cwaylist=res.data;
              break;
            case 'focusass':
              this.focusasslist=res.data;
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
    targetchange(){
      if(this.targetlist.length==1){
        this.nowtarget=true
      }else if(this.targetlist.length==0){
        this.nowtarget=false
      }
    },
    handleClick() {
      if(this.$store.state.entryState>=8 && this.activeName=='therapy'){
        this.medicationInfo()
      }else if(this.$store.state.entryState>=9 && this.activeName=='evaluation'){
          this.assessInfo()
      }else if(this.$store.state.entryState>=10 && this.activeName=='symptoms'){
        this.clinicalInfo()
      }
    },
    saveTherapy() {
      this.therapyform['immtarget']=String(this.imtargetlist);
      this.therapyform['target']=this.targetlist[0];
      this.therapyform['pid']=this.$store.state.patientid;
      infoentry.saveMedication(this.therapyform).then((res)=>{
        if(res.returnCode==0){
          this.$store.state.entryState=9;
          this.entry=this.$store.state.entryState;
          this.activeName = "evaluation";
        }
      })
    },
    medicationInfo(){
      let obj={
        id:this.$store.state.patientid
      }
      infoentry.medicationInfo(obj).then((res)=>{
        if(res.returnCode==0){
          this.therapyform=res.data;
        }
      })
    },
    saveEvaluation() {
      this.evaluationform['pid']=this.$store.state.patientid;
      infoentry.saveAssess(this.evaluationform).then((res)=>{
        if(res.returnCode==0){
          this.$store.state.entryState=10;
          this.entry=this.$store.state.entryState;
          this.activeName = "symptoms";
        }
      })
      
    },
    assessInfo(){
      let obj={
        id:this.$store.state.patientid
      }
      infoentry.assessInfo(obj).then((res)=>{
        if(res.returnCode==0){
          this.therapyform=res.data;
        }
      })
    },
    saveSymptoms() {
      this.symptomsform['pid']=this.$store.state.patientid;
      infoentry.saveClinical(this.symptomsform).then((res)=>{
        if(res.returnCode==0){
          this.$store.state.entryState=11;
          this.$store.state.tabState=5;
          this.$router.push({
            path: "/infoentry/addpatient",
            query: {
              type: "followInfo"
            }
          });
        }
      })
      
    },
    clinicalInfo(){
      let obj={
        id:this.$store.state.patientid
      }
      infoentry.clinicalInfo(obj).then((res)=>{
        if(res.returnCode==0){
          this.therapyform=res.data;
        }
      })
    },
  },
  mounted() {
    // this.cancertype='breast'
    if(this.$store.state.edit){
        if(this.entry>=9){
          this.medicationInfo()
        }
      }
  }
};
</script>