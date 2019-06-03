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
.el-date-editor,
.el-textarea {
  width: 350px;
}
.el-button--primary {
  background-color: $maincolor;
  border-color: $maincolor;
}
</style>
<template>
  <div class="basic">
    <div class="title">
      <i class="iconfont el-icon-biosign"></i>
      <span>病史信息</span>
    </div>
    <div class="basic-inner">
      <div class="basic-tab">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane v-for='(item,index) in tablist' :label="item.label" :name='item.name' :key='index' :disabled="item.disabled"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="basic-main">
        <div v-if="activeName=='present'">
          <el-form ref="form" :model="presentform" label-width="150px" label-position="left">
            <el-form-item label="肠癌相关症状：" v-if='cancertype=="colorectal"'>
              <el-select v-model="presentform.symptom" placeholder="请选择..." @focus='searchItem("symptom")'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in symptomlist" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="乳腺癌相关症状：" v-if='cancertype=="breast"'>
              <el-select v-model="presentform.symptom" placeholder="请选择..." @focus='searchItem("symptom")'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in symptomlist" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="体重改变：">
              <el-radio-group v-model="presentform.wchange" @change="wchange">
                <el-radio label="0" value="0">是</el-radio>
                <el-radio label="1" value="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-if="presentform.wchange=='0'">
              <el-date-picker type="date" placeholder="请输入体重改变时间" v-model="presentform.wctime"></el-date-picker>
            </el-form-item>
            <el-form-item v-if="presentform.wchange=='0'">
              <el-input type="text" placeholder="请输入体重改变数值" v-model="presentform.wcvalue">
                <template slot="suffix">kg</template>
              </el-input>
            </el-form-item>
            <el-form-item label="是否手术史：">
              <el-radio-group v-model="presentform.issurgery">
                <el-radio label="0" value="0">是</el-radio>
                <el-radio label="1" value="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-if="presentform.issurgery=='0'">
              <el-date-picker type="date" placeholder="手术时间" v-model="presentform.shtime"></el-date-picker>
            </el-form-item>
            <el-form-item v-if="presentform.issurgery=='0'">
              <el-input v-model="presentform.shname" placeholder="手术名称"></el-input>
            </el-form-item>
            <el-form-item v-if="presentform.issurgery=='0'">
              <el-input v-model="presentform.blorigin" placeholder="病理组织来源"></el-input>
            </el-form-item>
            <el-form-item v-if="presentform.issurgery=='0'">
              <el-select v-model="presentform.shbltype" placeholder="病理类型请选择WHO病理分类" @focus='searchItem("shbltype")'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in shbltypelist" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="初诊转移部位：">
              <el-select v-model="presentform.vmetastatic" placeholder="请选择..." @focus='searchItem("vmetastatic")'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in vmetastaticlist" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="原发灶位置：">
              <el-select v-model="presentform.dprimary" placeholder="请选择..." @focus='searchItem("dprimary")'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in dprimarylist" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否化疗：">
              <el-radio-group v-model="presentform.ischemo">
                <el-radio label="0" value="0">是</el-radio>
                <el-radio label="1" value="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-show="presentform.ischemo=='0'">
              <el-date-picker type="date" placeholder="开始时间" v-model="presentform.chdate"></el-date-picker>
            </el-form-item>
            <el-form-item v-if="presentform.ischemo=='0'">
              <el-select v-model="presentform.chprogramme" placeholder="化疗方案" @focus='searchItem("chprogramme",0)'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in chprogrammelist" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="presentform.ischemo=='0'">
              <el-select v-model="presentform.chgoal" placeholder="化疗目的" @focus='searchItem("chgoal",0)'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in chgoallist" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="presentform.ischemo=='0'">
              <el-select v-model="presentform.chevaluation" placeholder="疗效评价" @focus='searchItem("chevaluation",0)'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in chevaluationlist" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否放疗：">
              <el-radio-group v-model="presentform.isradiotherapy">
                <el-radio label="0" value="0">是</el-radio>
                <el-radio label="1" value="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-if="presentform.isradiotherapy=='0'">
              <el-date-picker type="date" placeholder="开始时间" v-model="presentform.rtdate"></el-date-picker>
            </el-form-item>
            <el-form-item v-if="presentform.isradiotherapy=='0'">
              <el-input type="text" v-model="presentform.rtnumber" placeholder="请输入次数">
                <template slot="suffix">次</template>
              </el-input>
            </el-form-item>
            <el-form-item v-if="presentform.isradiotherapy=='0'">
              <el-select v-model="presentform.rtgoal" placeholder="目的" @focus='searchItem("rtgoal",0)'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in rtgoallist" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="presentform.isradiotherapy=='0'">
              <el-input v-model="presentform.rtevaluation" placeholder="请输入放疗总剂量">
                <template slot="suffix">Gy</template>
              </el-input>
            </el-form-item>
            <el-form-item label="是否靶向用药：">
              <el-radio-group v-model="presentform.isdrug">
                <el-radio label="0" value="0">是</el-radio>
                <el-radio label="1" value="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-if="presentform.isdrug=='0'">
              <el-date-picker type="date" placeholder="开始时间" v-model="presentform.drugdate"></el-date-picker>
            </el-form-item>
            <el-form-item v-if="presentform.isdrug=='0'">
              <el-select v-model="presentform.drugname" placeholder="目的" @focus='searchItem("drugname")'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in drugnamelist" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveBasic" size="medium" v-if='bsave'>保存</el-button>
              <el-button size="medium" v-else>编辑</el-button>
              
            </el-form-item>
          </el-form>
        </div>
        <div v-if="activeName=='family'">
          <el-form
            ref="form"
            :model="familyform"
            label-width="100px"
            label-position="left"
          >
            <el-form-item label="是否家族史：">
              <el-radio-group v-model="familyform.isft">
                 <el-radio label="0" value="0">是</el-radio>
                 <el-radio label="1" value="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-if="familyform. isft=='0'">
              <el-input v-model="familyform.cpnum" placeholder="患肿瘤总人数"></el-input>
            </el-form-item>
            <el-form-item v-if="familyform. isft=='0'">
              <el-select v-model="familyform.fttype" placeholder="家族史分类" @focus='searchItem("fttype",0)'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in fttypelist" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="familyform. isft=='0'">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="备注..."
                v-model="familyform.ftremark"
              ></el-input>
            </el-form-item>
            <el-form-item label="展示家族史：">
              <el-checkbox v-model="person">本人患癌情况</el-checkbox>
            </el-form-item>
            <div v-if="person">
              <div v-for='(item,index) in personlist' :key='index' >
            <el-form-item>
              <el-select v-model="item.cpartandtype" placeholder="肿瘤部位及类型" @focus='searchItem("cpartandtype",0)'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in cpartandtypelist" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="患癌年龄" v-model="item.diseaseage"
              ></el-input>
            </el-form-item>
            </div>
            </div>
            <el-form-item>
              <el-checkbox v-model="firstlevel" @change="firstlevelchange">一级亲属患癌情况</el-checkbox>
            </el-form-item>
            <div v-if='firstlevel'>
            <div  v-for='(item,index) in firstlevellist' :key='index' >
              <el-form-item>
              <el-input placeholder="亲缘关系" v-model="item.relationship"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="item.cpartandtype" placeholder="肿瘤部位及类型" @focus='searchItem("cpartandtype",0)'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in cpartandtypelist" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="患癌年龄" v-model="item.diseaseage"
              ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="text" style="color:red;" @click="handlefamily('firstlevel',index,'del')">删除</el-button>
                <el-button type="text" style="color:#28c16e;" @click="handlefamily('firstlevel',index,'add')">添加家属</el-button>
            </el-form-item>
            </div>
            
            </div>
            <el-form-item>
              <el-checkbox v-model="secondlevel">二级亲属患癌情况</el-checkbox>
            </el-form-item>
            <div v-if='secondlevel'>
            <div  v-for='(item,index) in secondlevellist' :key='index' >
              <el-form-item>
              <el-input placeholder="亲缘关系" v-model="item.relationship"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="item.cpartandtype" placeholder="肿瘤部位及类型" @focus='searchItem("cpartandtype",0)'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in cpartandtypelist" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="患癌年龄" v-model="item.diseaseage"
              ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="text" style="color:red;" @click="handlefamily('secondlevel',index,'del')">删除</el-button>
                <el-button type="text" style="color:#28c16e;" @click="handlefamily('secondlevel',index,'add')">添加家属</el-button>
            </el-form-item>
            </div>
            
            </div>
            <el-form-item>
              <el-checkbox v-model="thirdlevel">三级亲属患癌情况</el-checkbox>
            </el-form-item>
            <div v-if='thirdlevel'>
            <div  v-for='(item,index) in thirdlevellist' :key='index' >
              <el-form-item>
              <el-input placeholder="亲缘关系" v-model="item.relationship"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="item.cpartandtype" placeholder="肿瘤部位及类型" @focus='searchItem("cpartandtype",0)'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in cpartandtypelist" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="患癌年龄" v-model="item.diseaseage"
              ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="text" style="color:red;" @click="handlefamily('thirdlevel',index,'del')">删除</el-button>
                <el-button type="text" style="color:#28c16e;" @click="handlefamily('thirdlevel',index,'add')">添加家属</el-button>
            </el-form-item>
            </div>
            
            </div>
            <el-form-item>
              <el-checkbox v-model="familyform.specialintro">特殊说明</el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-input
                type="textarea"
                :rows="2"
                placeholder="备注..."
                v-model="familyform.instructionsnote"
              ></el-input>
            </el-form-item>
            <el-form-item label="家系图：">
              <span>Revised Bethesda:</span>
              <el-radio-group v-model="familyform.rb">
                 <el-radio label="0" value="0">是</el-radio>
                 <el-radio label="1" value="1">否</el-radio>
                <el-radio label="2" value="2">不确定</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <span>Amsterdam criteria:</span>
              <el-radio-group v-model="familyform.amsterdam">
                 <el-radio label="0" value="0">是</el-radio>
                 <el-radio label="1" value="1">否</el-radio>
                <el-radio label="2" value="2">不确定</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="savefamily" v-if="fsave">保存</el-button>
              <el-button v-else>编辑</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { infoentry,dict } from "api/index.js";
import {sortRule,getTabListByState,getActiveName} from "../../../base/js/common.js";
export default {
  data() {
    return {
      tablist:[
        {
          name:'present',
          label:'现病史',
          disabled:false,
          num:3
        },{
          name:'family',
          label:'家族史',
          disabled:true,
          num:4
        }
      ],
      activeName: "present",
      presentform: {},
      familyform: {},
      firstlevel:false,
      firstlevellist:[{}],
      secondlevel:false,
      secondlevellist:[{}],
      thirdlevel:false,
      thirdlevellist:[{}],
      person:false,
      personlist:[{}],
      symptomlist:[],
      vmetastaticlist:[],
      dprimarylist:[],
      fttypelist:[],
      cpartandtypelist:[],
      cancertype: "colorectal",
      shbltypelist:[],
      chprogrammelist:[],
      chgoallist:[],
      chevaluationlist:[],
      rtgoallist:[],
      drugnamelist:[],
      disabled:true
    };
  },
  computed:{
    bsave(){
      if(this.$store.state.entryState>3){
        return false
      }
      return true
    },
    fsave(){
      if(this.$store.state.entryState>4){
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
            case 'symptom':
              this.symptomlist=res.data;
              break;
            case 'vmetastatic':
              this.vmetastaticlist=res.data;
              break;
            case 'dprimary':
              this.dprimarylist=res.data;
              break;
            case 'fttype':
              this.fttypelist=res.data;
              break;
            case 'cpartandtype':
              this.cpartandtypelist=res.data;
              break;
            case 'shbltype':
              this.shbltypelist=res.data;
              break;
            case 'chprogramme':
              this.chprogrammelist=res.data;
              break;
            case 'chgoal':
              this.chgoallist=res.data;
              break;
            case 'chevaluation':
              this.chevaluationlist=res.data;
              break;
            case 'rtgoal':
              this.rtgoallist=res.data;
              break;
            case 'drugname':
              this.drugnamelist=res.data;
              break;
          }
        }
      })
    },
    handlefamily(name,index,handle){  //添加亲属
    let n=0;
    if(handle=='del'){
      n=1
    }
      switch(name){
        case 'firstlevel':
          n==0?this.firstlevellist.splice(index+1,0,{}):this.firstlevellist.splice(index+1,n)
          break;
        case 'secondlevel':
          n==0?this.secondlevellist.splice(index+1,0,{}):this.secondlevellist.splice(index+1,n)
          break;
        case 'thirdlevel':
          n==0?this.thirdlevellist.splice(index+1,0,{}):this.thirdlevellist.splice(index+1,n)
          break;
      }
    },
    firstlevelchange(val){
      console.log(val);
      console.log(this.firstlevel)
    },
    wchange(val) {
      console.log(val);
      console.log(this.presentform);
    },
    handleClick() {
      if(this.$store.state.entryState>=3 && this.activeName=='present'){
        this.getDesHistoryInfo()
      }else if(this.$store.state.entryState>=4 && this.activeName=='family'){
        this.getFamilyHistoryInfo()
      }
    },
    saveBasic() {
      this.presentform["pid"] = this.$store.state.patientid;
      infoentry.saveDesHistory(this.presentform).then(res => {
        if (res.returnCode == 0) {
          this.$store.state.entryState=3;
          this.disabled=false;
          this.entry=this.$store.state.entryState;
          this.activeName = "family";
        }
      });
    },
    familyIllinfo(level,levellist,type){
      let familyIllinfoList=[]
      if(level){
            levellist.map((item)=>{
            if(Object.keys(item).length>0){
              familyIllinfoList.push(Object.assign({},item,{
              "pid":this.$store.state.patientid,
              "familytype":type
            }))
            }
          })
        return familyIllinfoList
      }
    },
    savefamily() {
      let familyIllinfoList=[],
        personlist=this.familyIllinfo(this.person,this.personlist,'0'),
        firstlevellist=this.familyIllinfo(this.firstlevel,this.firstlevellist,'1'),
        secondlevellist=this.familyIllinfo(this.secondlevel,this.secondlevellist,'2'),
        thirdlevellist=this.familyIllinfo(this.thirdlevel,this.thirdlevellist,'3');
      familyIllinfoList.push.apply(familyIllinfoList,personlist);
      familyIllinfoList.push.apply(familyIllinfoList,firstlevellist);
      familyIllinfoList.push.apply(familyIllinfoList,secondlevellist);
      familyIllinfoList.push.apply(familyIllinfoList,thirdlevellist);
      this.familyform["pid"] = this.$store.state.patientid;
      this.familyform["familyIllinfoList"]=familyIllinfoList;
      infoentry.saveFamilyHistory(this.familyform).then(res => {
        if (res.returnCode == 0) {
          this.$store.state.entryState=4;
          this.$store.state.tabState=3;
          this.$router.push({
            path: "/infoentry/addpatient",
            query: {
              type: "diagnoseInfo"
            }
          });
        }
      });
    },
    getDesHistoryInfo(){
      let obj={
        id:this.$store.state.patientid
      }
      infoentry.desHistoryInfo(obj).then((res)=>{
        if(res.returnCode==0){
          this.presentform=res.data;
        }
      })
    },
    getFamilyHistoryInfo(){
      let obj={
        id:this.$store.state.patientid
      }
      infoentry.familyHistoryInfo(obj).then((res)=>{
        if(res.returnCode==0){
          this.familyform=res.data;
        }
      })
    }
  },
  mounted() {
    // this.cancertype='breast';
    if(this.$store.state.edit){
      if(this.entry>=3){
        this.getDesHistoryInfo()
      }
    }
    let state = this.$store.state.entryState;
    this.tablist = getTabListByState(1,state);
    this.activeName = getActiveName(1,state);
  },
  watch:{
    "$store.state.entryState":function(){
      debugger;
      let state = this.$store.state.entryState;
      this.tablist = getTabListByState(1,state);
      this.activeName = getActiveName(1,state);
    }
  }
};
</script>