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
import {objCopy} from 'base/js/common.js';
export default {
  data() {
    return {
        basicform:{},
        powerlist:[],
        oldpowerlist:[],
        oldbasic:{},
        rolenoteList:[
            {
                name:'信息录入',
                id:1
            },{
                name:'查询系统',
                id:2
            },{
                name:'科研管理',
                id:3
            },{
                name:'预览系统',
                id:4
            },{
                name:'权限管理',
                id:5
            },{
                name:'字典管理',
                id:6
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
          this.oldbasic=objCopy(this.basicform);
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

