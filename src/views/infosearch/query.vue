<style lang="scss" scoped>
@import "../../base/css/base-var.scss";
.contant{
  height: 800px;
  overflow-y: scroll;
}
.process {
  background: #fff;
  border-radius: 6px;
  overflow: hidden;
  .search {
    width: 530px;
    padding-left: 40px;
    padding-bottom: 20px;
  }
  .process-inner {
    padding: 20px 20px 20px 40px;
  }
  .search-footer {
    border-top: 1px solid #ddd;
    text-align: center;
    padding: 20px 0;
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
.el-input,
.el-select,
.el-date-editor {
  width: 350px;
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
        <span>查询系统</span>
      </div>
      <div class="search">
        <!-- <el-input placeholder="请输入基因、癌种...信息查询" suffix-icon="iconfont el-icon-biosearch"></el-input> -->
      </div>
      <div class="process-inner" v-if="filtrateState">
        <el-form ref="form" :model="basicform" label-width="100px" label-position="left">
          <el-form-item label="基因名称:">
            <el-input v-model="basicform.gene"></el-input>
          </el-form-item>
          <el-divider></el-divider>
          <el-form-item label="突变位点:">
            <el-input v-model="basicform.hgvs"></el-input>
          </el-form-item>
          <el-divider></el-divider>
          <el-form-item label="癌       种:">
            <el-checkbox-group v-model="ctype" @change="ctypechoice"> 
              <el-checkbox v-for="item in cancerList" :label="item.type" :key="item.type">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
          <el-divider></el-divider>
          <el-form-item label="标本类型:">
            <el-checkbox-group v-model="btype">
              <el-checkbox v-for="(item,index) in specimentypeList" :label="item.id" :key="index">{{item.itemName}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-divider></el-divider>
          <div v-if='cancer2'>
            <el-form-item label="原发灶情况：">
              <el-radio-group v-model="basicform.prinature" @change="prinaturechoice">
                <el-radio v-for="(item,index) in primaryList" :label="item.id" :value='item.id' :key="index">{{item.itemName}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item label="肿瘤部位：">
              <el-checkbox-group v-model="tumloc" :max='basicform.prinature==0?1:tumourdepartList.length-1'>
                <el-checkbox v-for="(item,index) in tumourdepartList" :label="item.id" :key="index">{{item.itemName}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item label="临床分期：">
              <el-checkbox-group v-model="clinicalStage">
                <el-checkbox v-for="(item,index) in clinicalstagesList" :label="item.id" :key="index">{{item.itemName}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-divider></el-divider>
          </div>
          <div v-if='cancer3'>
            <el-form-item label="检测标本：">
              <el-checkbox-group v-model="testSpecimen">
                <el-checkbox v-for="(item,index) in specimenList" :label="item.id" :key="index">{{item.itemName}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item label="肿瘤分期：">
              <el-checkbox-group v-model="tumorStage">
                <el-checkbox v-for="(item,index) in tumourstagesList" :label="item.id" :key="index">{{item.itemName}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-divider></el-divider>
          </div>
          <el-form-item label="样本日期：">
              <span>从</span>
              <el-date-picker
                type="date"
                placeholder="yyyy/mm/dd"
                v-model="samdate.start"
              ></el-date-picker>
              <span>到</span>
              <el-date-picker
                type="date"
                placeholder="yyyy/mm/dd"
                v-model="samdate.end"
              ></el-date-picker>
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item label="年龄范围：">
              <span>从</span>
              <el-input v-model="age.start"></el-input>
              <span>到</span>
              <el-input v-model="age.end"></el-input>
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item label="体重（kg)：">
              <span>从</span>
              <el-input v-model="weight.start"></el-input>
              <span>到</span>
              <el-input v-model="weight.end"></el-input>
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item label="BMI指数：">
              <span>从</span>
              <el-input v-model="bmi.start"></el-input>
              <span>到</span>
              <el-input v-model="bmi.end"></el-input>
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item label="收缩压（mmHg)：">
              <span>从</span>
              <el-input v-model="systolic.start"></el-input>
              <span>到</span>
              <el-input v-model="systolic.end"></el-input>
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item label="舒张压（mmHg)：">
              <span>从</span>
              <el-input v-model="diastolic.start"></el-input>
              <span>到</span>
              <el-input v-model="diastolic.end"></el-input>
            </el-form-item>
            <el-divider></el-divider>
            <el-form-item label="用药名称：">
              <el-input v-model="basicform.medication" placeholder="请输入用药名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="medium">重置</el-button>
              <el-button type="primary" @click="query" size="medium">查询</el-button>
            </el-form-item>
        </el-form>
      </div>
      <div class="search-footer" @click="filtrate">
        <!-- <div> -->
        <i :class="filtrateClass"></i>
        <span>自定义筛选</span>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import {infosearch,dict} from 'api/index.js';
import {sortRule} from "../../base/js/common.js";
export default {
  data() {
    return {
      samdate:{},
      age:{},
      weight:{},
      bmi:{},
      systolic:{},
      diastolic:{},
      ctype:[],
      btype:[],
      tumloc:[],
      clinicalStage:[],
      testSpecimen:[],
      tumorStage:[],
      filtrateClass: "iconfont el-icon-bioshang",
      filtrateState: true,
      basicform: {},
      cancer2:false,
      cancer3:false,
      cancerList: [
        {
          name:"结直肠癌",
          type:2
        }, {
          name:"乳腺癌",
          type:3
        }, {
          name:"肺癌",
          type:1
        }, {
          name:"胃癌",
          type:4
        }, {
          name:"膀胱癌",
          type:5
        }],
        specimentypeList:[],
        tumourdepartList:[],
        clinicalstagesList:[],
        specimenList:[],
        tumourstagesList:[],
      // specimentypeList: ["细胞学标本", "穿刺活检", "术中冰冻", "术后组织"],
      primaryList: [{itemName:"单发性",id:0}, {itemName:"多发性",id:1}],
      // primaryList: ["末端回肠", "盲肠","阑尾","回盲瓣","肝曲","横结肠","脾曲","降结肠（左半结肠）","乙状结肠","直肠乙状结肠","直肠","升结肠（右半结肠）"],
      // clinicalstagesList: ["Stage 0", "Stage Ⅰ","Stage ⅡA","Stage ⅡB","Stage ⅢA","Stage ⅢB","Stage ⅢC","Stage ⅣA","Stage ⅣB","Stage ⅣC"],
      // specimenList: ["粗针穿刺活检标本", "真空辅助微创活检标本","乳腺肿物切除标本","乳腺病变保乳切除标本","全乳切除标本（包括单纯切除术和改良根治术）","前哨淋巴结活检标本","腋窝淋巴结标本"],
      // tumourstagesList: ["0期TisN0M0", "Ⅰ期 T1N0M0","ⅠA期T1N0M0","ⅠB期 T1N0M0/T1N1miM0","ⅡA期 T0N1M0/T1N1M0/T2N0M0","ⅡB期 T2N1M0/T3N0M0","ⅢA期 T0N2M0/T1N2M0/T2N2M0/T3N1M0/T3N2M0","ⅢB期 T4N0M0/T4N1M0/T4N2M0","ⅢC期 任何T/N3M0","Ⅳ期 任何T/任何N/M1"],
    };
  },
  methods: {
    prinaturechoice(val){
      this.tumloc=[];
    },
    ctypechoice(val){
      this.cancer2=false
      this.cancer3=false
      val.map((item)=>{
        if(item==2){
          this.cancer2=true
        }
        if(item==3){
          this.cancer3=true
        }
      })
    },
    filtrate() {
      this.filtrateState = !this.filtrateState;
      if (this.filtrateState) {
        this.filtrateClass = "iconfont el-icon-bioopen";
      } else {
        this.filtrateClass = "iconfont el-icon-bioshang";
      }
    },
    stringTonum(list,age=null){
      if(list instanceof Array){
        let newlist=[]
        list.map(item=>{
          newlist.push(Number(item))
        })
        return newlist
      }else{
        let newobj={}
        if(age=='1'){
          for(let key in list){
          newobj[key]=Number(list[key])
        }
        }else{
          for(let key in list){
          newobj[key]=parseFloat(list[key])
        }
        }
        
        return newobj
      }
    },
    numTostring(list){
      let newlist=[]
      list.map(item=>{
        newlist.push(String(item))
      })
      return newlist
    },
    query(){
      this.basicform['samdate']=this.samdate;
      this.basicform['age']=this.stringTonum(this.age,'1');
      this.basicform['weight']=this.stringTonum(this.weight);
      this.basicform['bmi']=this.stringTonum(this.bmi);
      this.basicform['systolic']=this.stringTonum(this.systolic);
      this.basicform['diastolic']=this.stringTonum(this.diastolic);
      this.basicform['ctype']=this.stringTonum(this.ctype);
      this.basicform['btype']=this.stringTonum(this.btype);
      this.basicform['tumloc']=this.numTostring(this.tumloc);
      this.basicform['clinicalStage']=this.numTostring(this.clinicalStage);
      this.basicform['testSpecimen']=this.numTostring(this.testSpecimen);
      this.basicform['tumorStage']=this.numTostring(this.tumorStage);
      let pagelist={
        offset:1,
        size:10
      }
      infosearch.searchList(pagelist,this.basicform).then((res)=>{
        if(res.returnCode==0){
          this.$store.state.querylist=res.data.modelList;
          this.$router.push('/query/queryinfo')
        }
      })
      
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
            case 'pbtype':
              this.specimentypeList=res.data;
              this.specimentypeList.splice(0,1);
              this.specimentypeList.splice(-1,1);
              break;
            case 'ptumloc':
              this.tumourdepartList=res.data;
              this.tumourdepartList.splice(0,1);
              this.tumourdepartList.splice(-1,1);
              this.tumourdepartList.splice(-1,1);
              break;
            case 'clinicalStage':
              this.clinicalstagesList=res.data;
              this.clinicalstagesList.splice(0,1);
              this.clinicalstagesList.splice(-1,1);
              break;
            case 'testSpecimen':
              this.specimenList=res.data;
              break;
            case 'tumorStage':
              this.tumourstagesList=res.data;
              break;

          }
        }
      })
    },
  },
  created() {
    this.searchItem("pbtype",0);
    this.searchItem("ptumloc",2);
    this.searchItem("clinicalStage",2);
    this.searchItem("testSpecimen",3);
    this.searchItem("tumorStage",3);
  }
};
</script>

