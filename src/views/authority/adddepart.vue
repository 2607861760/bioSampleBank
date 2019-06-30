<style lang="scss" scoped>
@import "../../base/css/base-var.scss";
.contant {
  background: #fff;
  border-radius: 6px;
  height: 800px;
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
  .info-table {
    padding: 20px 20px 20px 40px;
  }
}
.el-input,
.el-select,
.el-date-editor,.el-tree {
  width: 350px;
}
.el-button--primary {
  background-color: $maincolor;
  border-color: $maincolor;
}
.el-tree{
  border: 1px solid #DCDFE6;
    max-height: 200px;
    overflow-y: scroll;
}
.el-tree-node__content{
  height:30px;
}
</style>

<template>
  <div class="contant">
    <div class="title">
      <i class="iconfont el-icon-biosign"></i>
      <span>新建部门</span>
    </div>
    <div class="info-table">
      <el-form
        ref="form"
        :model="basicform"
        label-width="100px"
        label-position="left"
      >
        <el-form-item label="部门名称：">
          <el-input v-model="basicform.depName"></el-input>
        </el-form-item>
        <el-form-item label="上级部门：">
          <el-input v-model="upName" @focus="treeState=true"></el-input>
        </el-form-item>
        <el-form-item v-if='treeState'>
          <el-tree
            :data="treeData"
            show-checkbox
            default-expand-all
            node-key="id"
            ref="tree"
            highlight-current
            :props="defaultProps"
            check-strictly=true
            @check="orgCheckChange">
          </el-tree>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="saveDept" size="medium">确认</el-button>
            <el-button size="medium" @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {role} from 'api/index.js';
import {objCopy} from 'base/js/common.js';
export default {
  data() {
    return {
        basicform:{},
        treeData:[],
        defaultProps:{
            label: 'depName'
          },
          checklist:{},
        checkid:0,
        upName:'',
        treeState:false
    };
  },
  methods: {
    orgCheckChange(data, checked){
      this.$refs.tree.setCheckedNodes([]);
      this.$refs.tree.setCheckedNodes([data]);
      this.upName=data.depName;
      this.checkid=data.id;
    },
    getdeptall(callback=null){
      role.getDeptAll().then((res)=>{
        if(res.returnCode==0){
          this.treeData=res.data
          if(callback!=null){
            callback()
          }
        }
      })
    },
    saveDept(){
      this.basicform.pid=this.checkid;
      if(this.$store.state.partid==null){
        role.saveDept(this.basicform).then((res)=>{
        if(res.returnCode==0){
          this.$router.push('/authority/depart');
        }else{
          this.$message.error(res.msg)
        }
      })
      }else{
        role.updateDept(this.basicform).then((res)=>{
        if(res.returnCode==0){
          this.$router.push('/authority/depart');
        }else{
          this.$message.error(res.msg)
        }
      })
      }
    },
    cancel(){
      if(this.$store.state.partid==null){
        this.basicform={};
        this.upName=''
      }else{
        this.basicform=this.oldbasic;
        this.upName=this.oldupName;
      }
      this.checkid='';
      this.$refs.tree.setCheckedNodes([]);
      this.treeState=false;
    },
    findUp(id){
      let depName='';
      if(this.treeData){
        this.treeData.map(item=>{
          if(item.id==id){
            depName=item.depName
          }
        })
      }
      
      return depName
    },
    getDeptInfo(){
      let obj={
        id:this.$store.state.partid
      }
      role.getDeptInfo(obj).then((res)=>{
        if(res.returnCode==0){
          this.basicform=res.data;
          this.upName=this.findUp(this.basicform.pid)
          this.oldbasic=objCopy(this.basicform);
          this.oldupName=this.upName;
        }
      })
    },
    calls(){
      if(this.$store.state.partid!=null){
        this.getDeptInfo()
      }
    }
  },
  mounted(){
    this.getdeptall(this.calls) 
  }
};
</script>

