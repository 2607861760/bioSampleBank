<style lang="scss" scoped>
@import "../../base/css/base-var.scss";
.process {
  background: #fff;
  border-radius: 6px;
  overflow: hidden;
  .process-inner {
    padding: 20px;
    .infoNum {
      color: $maincolor;
      font-size: 20px;
    }
  }
  .process-table {
    padding: 20px;
    .loginnum {
      color: #2983cf;
      cursor: pointer;
    }
    .block {
      margin-top: 10px;
      text-align: right;
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
        <span>入组结果列表</span>
      </div>
      <div class="process-inner">
        <span>找到相关信息</span>
        <span class="infoNum">{{infoLen}}</span>
        <span>条</span>
        <div style="float:right;">
          <el-button size="small" plain class="acstate">全部</el-button>
          <el-button size="small" plain>我的样本</el-button>
          <el-button size="small" plain>参与人样本</el-button>

          <el-button type="primary" size="medium">
            导出
            <i class="iconfont el-icon-biooutput"></i>
          </el-button>
        </div>
      </div>
      <div class="process-table">
        <el-table :data="tableData" height="550" border style="width: 100%">
          <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="belonging" label="样本归属"></el-table-column>
        <el-table-column label="登录号">
            <template slot-scope="scope">
                <span class="loginnum" @click='toMember(scope.row)'>{{scope.row.loginnum}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="cancer" label="癌种"></el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      infoLen: 0,
      tableData: [
        {
          belonging: "王二",
          age: "30",
          cancer: "结直肠癌",
          loginnum: "201901032578",
        }
      ],
      checkNum: 0
    };
  },
  methods: {
      toReport(row){
        this.$router.push('/query/report')
      },
  },
  created() {}
};
</script>

