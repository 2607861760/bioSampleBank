<style lang="scss" scoped>
@import "../../base/css/base-var.scss";
.process {
  background: #fff;
  border-radius: 6px;
  overflow-y: scroll;
  max-height: 800px;
  .process-main {
    padding: 0 40px 20px;
    .main-title {
      border-left: 2px solid $maincolor;
      height: 20px;
      padding-left: 10px;
      margin-top: 10px;
    }
    .main-info {
      margin-bottom: 30px;
      overflow: hidden;
      & > div {
        display: flex;
        padding: 15px 10px 0;
        & > div {
          flex: 1;
          float: left;
          .info-text {
            padding-left: 10px;
          }
        }
      }
      & > div.el-divider {
        padding: 0;
      }
       
      
    }
    .main-breast{
      display: block;
      .main-ver{
        width:50%;
        float: left;
        border-right:1px solid #dcdfe6;
        box-sizing: border-box;
        font-size: 16px;
        font-weight: normal;
        p{
          width: 100%;
          padding: 15px 10px 0;
          box-sizing: border-box;
        }
      }
    }
    .stitle {
      color: $maincolor;
    }
  }
}
.title {
  padding: 20px;
  font-weight: bold;
  font-size: 18px;
  text-align: left;
  & > i.el-icon-biosign {
    font-size: 20px;
    color: $maincolor;
  }
  .infoNum {
    color: $maincolor;
    font-size: 20px;
  }
}
.el-button--primary {
  background-color: $maincolor;
  border-color: $maincolor;
}
</style>

<template>
  <div class="contant">
    <div class="process">
      <div class="title">
        <i class="iconfont el-icon-biosign"></i>
        <span>查看科研项目</span>
      </div>
      <div class="process-main">
        <div class="main-title">查看科研项目</div>
        <div class="main-info">
          <div>
            <div>
              <span class="info-label">项目名称：</span>
              <span class="info-text">{{infoform.projectname}}</span>
            </div>
            <div>
              <span class="info-label">项目负责人：</span>
              <span class="info-text">{{infoform.leader}}</span>
            </div>
            </div>
            <div>
            <div>
              <span class="info-label">项目目的：</span>
              <span class="info-text">{{infoform.purpose}}</span>
            </div>
            <div>
              <span class="info-label">计划入组样本数：</span>
              <span class="info-text">{{infoform.samplenum}}例</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">起始时间：</span>
              <span class="info-text">{{infoform.startdate}}</span>
            </div>
            <div>
              <span class="info-label">截至时间：</span>
              <span class="info-text">{{infoform.enddate}}</span>
            </div>
            </div>
            <div>
            <div>
              <span class="info-label">计划经费：</span>
              <span class="info-text">{{infoform.expenditure}}</span>
            </div>
            <div>
              <span class="info-label"></span>
              <span class="info-text"></span>
            </div>
          </div>
        </div>
        <div class="main-title">项目入组标准</div>
        <div class="main-info">
          <div>
            <el-table :data="familytable" height="300" border style="width: 100%">
              <el-table-column type="index" width="50"></el-table-column>
              <el-table-column prop="relationship" label="逻辑关系"></el-table-column>
              <el-table-column prop="tumour" label="字段信息"></el-table-column>
              <el-table-column prop="cancerage" label="筛选内容"></el-table-column>
            </el-table>
          </div>
        </div>
        <div class="main-title">项目人员信息</div>
        <div class="main-info">
          <div>
            <el-table :data="familytable" height="300" border style="width: 100%">
              <el-table-column type="index" width="50"></el-table-column>
              <el-table-column prop="relationship" label="工作单位"></el-table-column>
              <el-table-column prop="tumour" label="所属科室"></el-table-column>
              <el-table-column prop="cancerage" label="姓名"></el-table-column>
              <el-table-column prop="cancerage" label="提供样本数"></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return{
        infoform:{}
    }
  },
  methods: {


  },
  created() {

  }
};
</script>

