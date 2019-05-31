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
        <el-form-item label="姓名：" prop="name">
          <el-input v-model="basicform.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="工作单位：" prop="organization">
          <el-input v-model="basicform.organization" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="所属科室：" prop="administrative">
          <el-input v-model="basicform.administrative" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="研究领域：" prop="research">
          <el-input v-model="basicform.research" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="申请加入原因：" prop="reason">
          <el-input v-model="basicform.reason" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="预计提供样本数：">
          <el-input v-model="basicform.samplenum" placeholder="请输入">
            <template slot="suffix">例</template>
          </el-input>
        </el-form-item>
        <el-form-item label="申请加入时间：" prop="joindate">
          <el-date-picker type="date" placeholder="yyyy/mm/dd" v-model="basicform.joindate"></el-date-picker>
        </el-form-item>
        <el-form-item label="联系方式：">
          <el-input v-model="basicform.phone" placeholder="请输入电话号码"></el-input>
        </el-form-item>
        <el-form-item label="Email：">
          <el-input v-model="basicform.Email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="相关领域科研情况：">
          <el-input v-model="basicform.scientific" placeholder="请输入" type="textarea" :rows="2"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveBasic" size="medium">保存</el-button>
          <el-button size="medium">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="info-table" v-if="audit==true">
      <div class="audit-col">
        <span class="info-label">姓名：</span>
        <span class="info-text">{{basicform.name}}</span>
      </div>
      <div class="audit-col">
        <span class="info-label">工作单位：</span>
        <span class="info-text">{{basicform.organization}}</span>
      </div>
      <div class="audit-col">
        <span class="info-label">所属科室：</span>
        <span class="info-text">{{basicform.administrative}}</span>
      </div>
      <div class="audit-col">
        <span class="info-label">研究领域：</span>
        <span class="info-text">{{basicform.research}}</span>
      </div>
      <div class="audit-col">
        <span class="info-label">申请加入原因：</span>
        <span class="info-text">{{basicform.reason}}</span>
      </div>
      <div class="audit-col">
        <span class="info-label">预计提供样本数：</span>
        <span class="info-text">{{basicform.samplenum}}例</span>
      </div>
      <div class="audit-col">
        <span class="info-label">申请加入时间：</span>
        <span class="info-text">{{basicform.joindate}}</span>
      </div>
      <div class="audit-col">
        <span class="info-label">联系方式：</span>
        <span class="info-text">{{basicform.phone}}</span>
      </div>
      <div class="audit-col">
        <span class="info-label">Email：</span>
        <span class="info-text">{{basicform.Email}}</span>
      </div>
      <div class="audit-col">
        <span class="info-label">相关领域科研情况：</span>
        <span class="info-text">{{basicform.scientific}}</span>
      </div>
      <div class="audit-col">
        <el-button type="primary" @click="saveBasic" size="medium">同意</el-button>
        <el-button type="danger" @click="saveBasic" size="medium">驳回</el-button>
        <el-button size="medium">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      basicform: {},
      audit: false,
      basicrules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        organization: [
          { required: true, message: "请输入工作单位", trigger: "blur" }
        ],
        administrative: [
          { required: true, message: "请输入所属科室", trigger: "blur" }
        ],
        research: [
          { required: true, message: "请输入研究领域", trigger: "blur" }
        ],
        reason: [
          { required: true, message: "请输入申请加入原因", trigger: "blur" }
        ],
        phone: [{ required: true, message: "请输入联系方式", trigger: "blur" }],
        joindate: [
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
  methods: {},
  created() {
    this.audit = this.$store.state.audit;
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

