<style lang='scss' scoped>
@import '../../base/css/base-var.scss';
.login-main {
  width: 400px;
  height: 510px;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;
  h1 {
    font-size: 36px;
    font-weight: 400;
    margin-bottom: 30px;
    text-align: center;
  }
  .login {
    width: 400px;
    height: 360px;
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 0 20px rgba(95, 95, 95, 0.5);
    padding: 0 50px;
    .image_box {
      text-align: center;
      img {
        display: inline-block;
        height: 42px;
        margin-top: 25px;
      }
    }
    .login-input{
      margin: 24px 0;
    }
    .remember{
      text-align: left;
    }
    .loginbtn{
      .el-button--success{
        width: 100%;
        letter-spacing: 20px;
        background-color: $maincolor;
        border-color: $maincolor;
      }
    }
  }
}
.bg{
  width: 100%;
  height: 100%;
  // overflow: hidden;
  img{
    width: 100%;
    height: 100%;
    display: block;
  }
}

</style>

<template>
  <div style="height:100%;">
    <div class="bg">
      <img src="../../../static/img/bg.png" alt="" srcset="">
    </div>
    <div class="login-main">
      <h1>生物样本库</h1>
      <div class="login">
        <div class="image_box">
          <img src="static/img/logo.png">
        </div>
        <div class="login-input">
           <el-input placeholder="请输入用户名" prefix-icon="iconfont el-icon-biouser" v-model="email"></el-input>
        </div>
       <div class="login-input">
           <el-input placeholder="请输入密码" prefix-icon="iconfont el-icon-biopassword" v-model="password"></el-input>
        </div>
        <!-- <div class="login-input remember">
          <el-checkbox>记住密码</el-checkbox>
        </div> -->
        <div class="login-input loginbtn">
          <el-button type="success" @click='login'>登   录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {common} from 'api/index.js';
export default {
  name:'login',
  data(){
    return{
      email:'',
      password:''
    }
  },
  methods:{
    login(){
      let obj={
        email:this.email,
        password:this.password
      }
      common.login(obj).then((res)=>{
        if(res.returnCode==0){
          this.$store.state.userId=res.data.id;
          this.$store.state.role=res.data.role;
          this.$store.state.topNavList=[
            {
          name: "首页",
          newname:"首页",
          path: "/home",
        }
          ]
          this.$router.push('/home')
        }else{
          this.$message.error(res.msg)
        }
      })
      // this.$router.push('/home')
    }
  }
}
</script>

