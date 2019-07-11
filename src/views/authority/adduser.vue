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
.el-date-editor,
.el-cascader {
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
      <span>新建用户</span>
    </div>
    <div class="info-table">
      <el-form
        ref="form"
        :model="basicform"
        :rules="basicrules"
        label-width="100px"
        label-position="left"
      >
        <el-form-item label="用户名：">
          <el-input v-model="basicform.username"></el-input>
        </el-form-item>
        <el-form-item label="所属部门：">
                <el-cascader
                v-model="basicform.deptId"
                :options="departList"
                :props="{
                  checkStrictly: true,
                value:'id',
                label:'depName',
                emitPath:false
                  }"
                clearable
                placeholder="请选择..."
                :show-all-levels="false"
                ></el-cascader>
            </el-form-item>
        <el-form-item label="邮箱：" prop="email">
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
                <el-option
                v-for='item in roleList'
                :key='item.id'
                :value="item.id"
                :label="item.roleName"
                ></el-option>
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
import {objCopy} from 'base/js/common.js';
export default {
  data() {
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback();
      }
      if (value) {
        setTimeout(() => {
          var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
          if (!reg.test(value)) {
            callback(new Error('请输入有效的电子邮箱！'));
          } else {
            callback();
          }
        }, 500);
      }
    };
    return {

        basicform:{},
        roleList:[],
        departList:[],
        deptId:null,
        basicrules: {
          email: [{validator: checkEmail,required: true, message: "请输入有效的电子邮箱" }],
        },
    };
  },
  methods: {
    saveUser(){
      // this.basicform.deptId=this.deptId;
      this.$refs["form"].validate(valid => {
        if (valid) {
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
        } else {
          console.log("error submit!!");
          return false;
        }
      });


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
          this.basicform.password='';
          // this.deptId=this.basicform.deptId;
          this.oldbasic=objCopy(this.basicform);
        }
      })
    },
    getItems(){
        role.getItems().then((res)=>{
          if(res.returnCode==0){
            this.roleList=res.data.roew;
          }
        })
    },
    getDeptAll(){
      role.getDeptAll().then((res)=>{
        if(res.returnCode==0){
          this.departList=res.data;
        }
      })
    }
  },
  mounted(){
    this.getItems();
    this.getDeptAll();
    if(this.$store.state.userid!=null){
      this.getUserInfo()
    }

  }
};
</script>

