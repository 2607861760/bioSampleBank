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
          <el-input v-model="basicform.rolename"></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="basicform.rolenote"></el-input>
        </el-form-item>
        <el-form-item label="功能权限：">
          <el-checkbox-group v-model="basicform.rolenote" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="(note,index) in rolenoteList" :label="note.name" :key="index">{{note.name}}</el-checkbox>
          </el-checkbox-group>
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

