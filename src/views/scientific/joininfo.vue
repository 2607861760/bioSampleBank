<style lang="scss" scoped>
@import "../../base/css/base-var.scss";
.contant {
  background: #fff;
  border-radius: 6px;
  height: 800px;
  overflow-y: scroll;
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
    .audit-col {
      height: 40px;
      font-size: 14px;
      font-weight: bold;
      .info-label {
        width: 150px;
      }
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
  <div class="contant">
    <div class="title">
      <i class="iconfont el-icon-biosign"></i>
      <span>申请信息</span>
    </div>
    <div class="info-table" v-if="audit==false">
      <el-form
        ref="form"
        :model="basicform"
        label-width="100px"
        :rules="basicrules"
        label-position="left"
      >
        <el-form-item label="姓名：" prop="applyName">
          <el-input v-model="basicform.applyName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="工作单位：" prop="hospital">
          <el-input v-model="basicform.hospital" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="所属科室：" prop="dept">
          <el-input v-model="basicform.dept" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="研究领域：" prop="realm">
          <el-input v-model="basicform.realm" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="申请加入原因：" prop="applyReason">
          <el-input v-model="basicform.applyReason" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="预计提供样本数：">
          <el-input v-model="basicform.sampleCount" placeholder="请输入" type="number" onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" >
            <template slot="suffix">例</template>
          </el-input>
        </el-form-item>
        <el-form-item label="申请加入时间：" prop="joinTime">
          <el-date-picker type="date" placeholder="yyyy/mm/dd" v-model="basicform.joinTime"></el-date-picker>
        </el-form-item>
        <el-form-item label="联系方式：">
          <el-input v-model="basicform.tel" placeholder="请输入电话号码"></el-input>
        </el-form-item>
        <el-form-item label="Email：">
          <el-input v-model="basicform.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="相关领域科研情况：">
          <el-input v-model="basicform.situation" placeholder="请输入" type="textarea" :rows="2"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveProApp" size="medium">保存</el-button>
          <el-button size="medium" @click="basicform={}">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="info-table" v-if="audit==true">
      <div class="audit-col">
        <span class="info-label">姓名：</span>
        <span class="info-text">{{basicform.applyName}}</span>
      </div>
      <div class="audit-col">
        <span class="info-label">工作单位：</span>
        <span class="info-text">{{basicform.hospital}}</span>
      </div>
      <div class="audit-col">
        <span class="info-label">所属科室：</span>
        <span class="info-text">{{basicform.dept}}</span>
      </div>
      <div class="audit-col">
        <span class="info-label">研究领域：</span>
        <span class="info-text">{{basicform.realm}}</span>
      </div>
      <div class="audit-col">
        <span class="info-label">申请加入原因：</span>
        <span class="info-text">{{basicform.applyReason}}</span>
      </div>
      <div class="audit-col">
        <span class="info-label">预计提供样本数：</span>
        <span class="info-text">{{basicform.sampleCount}}例</span>
      </div>
      <div class="audit-col">
        <span class="info-label">申请加入时间：</span>
        <span class="info-text">{{basicform.joinTime | dateFilter}}</span>
      </div>
      <div class="audit-col">
        <span class="info-label">联系方式：</span>
        <span class="info-text">{{basicform.tel}}</span>
      </div>
      <div class="audit-col">
        <span class="info-label">Email：</span>
        <span class="info-text">{{basicform.email}}</span>
      </div>
      <div class="audit-col">
        <span class="info-label">相关领域科研情况：</span>
        <span class="info-text">{{basicform.situation}}</span>
      </div>
      <div class="audit-col">
        <el-button type="primary" size="medium" @click="submitProApp(1)">同意</el-button>
        <el-button type="danger" size="medium" @click="submitProApp(2)">驳回</el-button>
        <el-button size="medium"  @click="exit()">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import {project} from 'api/index.js';
export default {
  data() {
    return {
      basicform: {},
      audit: false,
      basicrules: {
        applyName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        hospital: [
          { required: true, message: "请输入工作单位", trigger: "blur" }
        ],
        dept: [
          { required: true, message: "请输入所属科室", trigger: "blur" }
        ],
        realm: [
          { required: true, message: "请输入研究领域", trigger: "blur" }
        ],
        applyReason: [
          { required: true, message: "请输入申请加入原因", trigger: "blur" }
        ],
        tel: [{ required: true, message: "请输入联系方式", trigger: "blur" }],
        joinTime: [
          {
            type: "date",
            required: true,
            message: "请选择申请加入时间",
            trigger: "blur"
          }
        ]
      }
    };
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
  },
  methods: {
    saveProApp(){
        console.log(this.$store.state);
      this.basicform['projectId']=this.$store.state.projectid;
      this.basicform['applicantId']=this.$store.state.userId;
      this.$refs['form'].validate((valid)=>{
        if(valid){
          project.saveProApp(this.basicform).then((res)=>{
            if(res.returnCode==0){
              this.$router.push('/scientific')
            }else{
              this.$message.error(res.msg)
            }
          })
        }else{
          return false
        }
      })
    },
    infoProApp(){
      let obj={
        id:this.$store.state.userid
      }
      project.infoProApp(obj).then((res)=>{
        if(res.returnCode==0){
          this.basicform=res.data
          console.log(this.basicform)
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    submitProApp(flag){
      let obj={
          projectId:this.$store.state.projectid,
          flag:flag
        },
        multiple=[];
        multiple.push(this.basicform.id);
      obj['idList']=multiple
      project.submitProApp(obj).then((res)=>{
        if(res.returnCode==0){
          this.$router.push("/scientific/auditinfo");
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    exit(){this.$router.push("/scientific/auditinfo");}
  },
  created() {

    this.audit = this.$store.state.audit;

    if(this.audit){
      this.infoProApp();
    }
    // for (var a = 0; a < datas.length; a++) {
    //   var playPeriodStart1='datas['+a+'].packageList[0].playPeriodStart';
    //   var playPeriodEnd1='datas['+a+'].packageList[0].playPeriodEnd';
    //   var playPeriodStart = datas[a].packageList[0].playPeriodStart.slice(
    //     0,
    //     10
    //   );
    //   var playPeriodEnd = packageList.playPeriodEnd.slice(0, 10);
    //   that.setData({
    //     [playPeriodStart1]: playPeriodStart,
    //     [playPeriodEnd1]: playPeriodEnd
    //   });
    //   console.log(that.data.playPeriodEnd, that.data.playPeriodStart);
    // }
  }
};
</script>

