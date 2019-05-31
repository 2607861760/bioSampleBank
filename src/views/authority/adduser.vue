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
              <el-select v-model="basicform.depart" placeholder="请选择...">
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
              <el-select v-model="basicform.role" placeholder="请选择...">
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="0"></el-option>
              </el-select>
            </el-form-item>
    <el-form-item label="数据权限：">
              <el-radio-group v-model="basicform.auth">
                <el-radio label="全科室" value='1'></el-radio>
                <el-radio label="用户个人" value='0'></el-radio>
              </el-radio-group>
            </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="saveRole" size="medium">确认</el-button>
          <el-button size="medium">取消</el-button>
          
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        basicform:{},
        rolenoteList:[
            {
                name:'角色管理（创建、修改、删除）'
            },{
                name:'用户管理（创建、修改、删除）'
            },{
                name:'项目管理（创建、修改、删除、查看、查询、申请加入、审批）'
            },{
                name:'信息录入'
            },{
                name:'结果查询'
            },{
                name:'统计预览'
            }
        ]
    };
  },
  methods: {}
};
</script>

