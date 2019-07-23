<style lang="scss" scoped>
@import "../../base/css/base-var.scss";
.process {
  background: #fff;
  border-radius: 6px;
  overflow-y: scroll;
  max-height: 800px;
  .process-main {
    padding: 0 40px 20px;
    .main-title {
      border-left: 2px solid $maincolor;
      height: 20px;
      padding-left: 10px;
      margin-top: 10px;
    }
    .main-info {
      margin-bottom: 30px;
      overflow: hidden;
      & > div {
        display: flex;
        padding: 15px 10px 0;
        & > div {
          flex: 1;
          float: left;
          .info-text {
            padding-left: 10px;
          }
        }
      }
      & > div.el-divider {
        padding: 0;
      }


    }
    .main-breast{
      display: block;
      .main-ver{
        width:50%;
        float: left;
        border-right:1px solid #dcdfe6;
        box-sizing: border-box;
        font-size: 16px;
        font-weight: normal;
        p{
          width: 100%;
          padding: 15px 10px 0;
          box-sizing: border-box;
        }
      }
    }
    .stitle {
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
  .infoNum {
    color: $maincolor;
    font-size: 20px;
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
        <span>查看科研项目</span>
      </div>
      <div class="process-main">
        <div class="main-title">查看科研项目</div>
        <div class="main-info">
          <div>
            <div>
              <span class="info-label">项目名称：</span>
              <span class="info-text">{{infoform.projectName}}</span>
            </div>
            <div>
              <span class="info-label">项目负责人：</span>
              <span class="info-text">{{infoform.projectPeople}}</span>
            </div>
            </div>
            <div>
            <div>
              <span class="info-label">项目目的：</span>
              <span class="info-text">{{infoform.purpose}}</span>
            </div>
            <div>
              <span class="info-label">计划入组样本数：</span>
              <span class="info-text">{{infoform.sampleCount}}例</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">起始时间：</span>
              <span class="info-text">{{infoform.beginTime | dateFilter}}</span>
            </div>
            <div>
              <span class="info-label">截至时间：</span>
              <span class="info-text">{{infoform.endTime | dateFilter}}</span>
            </div>
            </div>
            <div>
            <div>
              <span class="info-label">计划经费：</span>
              <span class="info-text">{{infoform.funds}}万</span>
            </div>
            <div>
              <span class="info-label"></span>
              <span class="info-text"></span>
            </div>
          </div>
        </div>
        <div class="main-title">项目入组标准</div>
        <div class="main-info">
          <div>
            <el-table :data="newtruptable" height="300" row-key="id" border style="width: 100%">
              <el-table-column type="index" width="50"></el-table-column>
              <el-table-column prop='logic' label="逻辑关系"></el-table-column>
              <el-table-column prop="field" label="字段信息"></el-table-column>
              <el-table-column prop='value' label="筛选内容"></el-table-column>
            </el-table>
          </div>
        </div>
        <div class="main-title">项目人员信息</div>
        <div class="main-info">
          <div>
            <el-table :data="persontable" height="300" border style="width: 100%">
              <el-table-column type="index" width="50"></el-table-column>
              <el-table-column prop="hospital" label="工作单位"></el-table-column>
              <el-table-column prop="dept" label="所属科室"></el-table-column>
              <el-table-column prop="applyName" label="姓名"></el-table-column>
              <el-table-column prop="sampleCount" label="提供样本数"></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {project,dict} from 'api/index.js';
export default {
  data() {
    return{
        infoform:{},
        truptable:[],
        persontable:[],
        zdlist:[],
        newtruptable:[]
    }
  },
  filters:{
    dateFilter(val){
      if(val && (val!=null || val!='')){
        let date=new Date(val),
        year=date.getFullYear(),
        mouth=date.getMonth()+1,
        day=date.getDay();
      return year+'/'+mouth+'/'+day
      }
    },
    logicFilter(val){
      if(val=='and'){
        return '并'
      }else if(val=='or'){
        return '或'
      }
    },
    fieldFilter(val){
      vm.zdlist.map(item=>{
        if(item.itemValue==val){
          return item.itemName
        }
      })
    },
    valueFilter(val){
      vm.zdlist.map(item=>{
        item.itemLists.map(items=>{
          if(items.id==val){
            return items.itemName
          }
        })
      })
      return val
    }
  },
  methods: {
    getAll(callback=null){
      dict.getAll().then((res)=>{
        if(res.returnCode==0){
          this.zdlist=res.data;
          console.log(JSON.stringify(this.zdlist));
          callback()
        }
      })
    },
    newTable(e){
      if(e){
        e.map(item=>{
          if(item.logic=='and'){
            item.logic='并'
          }else if(item.logic=='or'){
            item.logic='或'
          }
          let optionlist=JSON.parse(item.option);
          optionlist.map(items=>{
            if(items.id==item.value){
              item.value=items.itemName
            }
          })
          this.zdlist.map(items=>{
            if(items.itemValue==item.field){
              item.field=items.itemName
            }
          })
          return item
        })
      }
    },
    geinfo(){
        console.log(this.$store.state.infoform.emodel);
       this.infoform=this.$store.state.infoform;
       this.newtruptable=this.$store.state.infoform.emodel.list;
       this.persontable=this.$store.state.infoform.applications;
       this.newTable(this.$store.state.infoform.emodel.list);
    }
  },
  created(){
    this.getAll(this.geinfo)
  },
  mounted() {

  }
};
</script>

