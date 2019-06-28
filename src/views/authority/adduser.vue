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
        <el-form-item label="用户名：">
          <el-input v-model="basicform.username"></el-input>
        </el-form-item>
        <el-form-item label="所属部门：">
              <el-select v-model="basicform.deptId" placeholder="请选择...">
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="0"></el-option>
              </el-select>
            </el-form-item>
        <el-form-item label="邮箱：">
          <el-input v-model="basicform.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input v-model="basicform.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input v-model="basicform.password"></el-input>
        </el-form-item>
        <el-form-item label="角色：">
              <el-select v-model="basicform.roleId" placeholder="请选择...">
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="0"></el-option>
              </el-select>
            </el-form-item>
    <el-form-item label="数据权限：">
              <el-radio-group v-model="basicform.dataType">
                <el-radio :label="1" :value='1'>全科室</el-radio>
                <el-radio :label="0" :value='0'>用户个人</el-radio>
              </el-radio-group>
            </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="saveUser" size="medium">确认</el-button>
          <el-button size="medium">取消</el-button>
          
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
    };
  },
  methods: {
    saveUser(){
      if(this.$store.state.userid==null){
        role.saveUser(this.basicform).then((res)=>{
        if(res.returnCode==0){
          this.$router.push('/authority/user');
        }else{
          this.$message.error(res.msg)
        }
      })
      }else{
        role.updateUser(this.basicform).then((res)=>{
        if(res.returnCode==0){
          this.$router.push('/authority/user');
        }else{
          this.$message.error(res.msg)
        }
      })
      }
      
    },
    cancel(){
      this.basicform={};
      if(this.$store.state.userid==null){
        this.basicform={};
      }else{
        this.basicform=this.oldbasic;
      }
      
    },
    getUserInfo(){
      let obj={
        id:this.$store.state.userid
      }
      role.getUserInfo(obj).then((res)=>{
        if(res.returnCode==0){
          this.basicform=res.data;
          this.oldbasic=this.basicform.Copy()
        }
      })
    }
  },
  mounted(){
    if(this.$store.state.userid!=null){
      this.getUserInfo()
    }
  }
};
</script>

