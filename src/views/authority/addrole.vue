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
    <div class="title">
      <i class="iconfont el-icon-biosign"></i>
      <span>新建角色</span>
    </div>
    <div class="info-table">
      <el-form
        ref="form"
        :model="basicform"
        label-width="100px"
        label-position="left"
      >
        <el-form-item label="角色名称：">
          <el-input v-model="basicform.roleName"></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="basicform.roleInfo"></el-input>
        </el-form-item>
        <el-form-item label="功能权限：">
          <el-checkbox-group v-model="powerlist">
            <el-checkbox v-for="(note) in rolenoteList" :label="note.id" :key="note.id" :value='note.id'>{{note.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="saveRole" size="medium">确认</el-button>
          <el-button size="medium" @click="cancel">取消</el-button>
          
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {role} from 'api/index.js'
export default {
  data() {
    return {
        basicform:{},
        powerlist:[],
        oldpowerlist:[],
        oldbasic:{},
        rolenoteList:[
            {
                name:'角色管理（创建、修改、删除）',
                id:'1'
            },{
                name:'用户管理（创建、修改、删除）',
                id:'2'
            },{
                name:'项目管理（创建、修改、删除、查看、查询、申请加入、审批）',
                id:'3'
            },{
                name:'信息录入',
                id:'4'
            },{
                name:'结果查询',
                id:'5'
            },{
                name:'统计预览',
                id:'6'
            }
        ]
    };
  },
  methods: {
    saveRole(){
      this.basicform['power']=String(this.powerlist)
      if(this.$store.state.roleid==null){
        role.saveRole(this.basicform).then((res)=>{
        if(res.returnCode==0){
          this.$router.push('/authority/role');
        }else{
          this.$message.error(res.msg)
        }
      })
      }else{
        role.updateRole(this.basicform).then((res)=>{
        if(res.returnCode==0){
          this.$router.push('/authority/role');
        }else{
          this.$message.error(res.msg)
        }
      })
      }
      
    },
    cancel(){
      
      if(this.$store.state.roleid==null){
        this.powerlist=[];
        this.basicform={};
      }else{
        this.powerlist=this.oldpowerlist;
        this.basicform=this.oldbasic;
      }
      
    },
    getRoleInfo(){
      let obj={
        id:this.$store.state.roleid
      }
      role.getRoleInfo(obj).then((res)=>{
        if(res.returnCode==0){
          this.basicform=res.data;
          this.oldbasic=this.basicform.copy();
          this.powerlist=this.basicform.power.split(',')
          this.oldpowerlist=this.powerlist;
        }
      })
    }
  },
  mounted(){
    if(this.$store.state.roleid!=null){
      this.getRoleInfo()
    }
   
  }
};
</script>

