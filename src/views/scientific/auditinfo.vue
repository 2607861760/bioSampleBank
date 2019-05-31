<style lang="scss" scoped>
@import "../../base/css/base-var.scss";
.contant {
  background: #fff;
  border-radius: 6px;
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
  .btnlist {
    padding: 0 20px;
    overflow: hidden;
    .btn-left {
      float: left;
      .acstate {
          color: $btncolor;
          border: 1px solid $btncolor;
        }
    }
    .btn-right {
      float: right;
      & > div {
        float: left;
        .acstate {
          color: $btncolor;
          border: 1px solid $btncolor;
        }
      }
      & > div + div {
        margin-left: 25px;
      }
    }
  }
  .info-table {
    padding: 20px;
    .block {
      margin-top: 10px;
      text-align: right;
    }
    .edit {
      color: $maincolor;
    }
    .delete {
      color: #ff5722;
    }
  }
}
</style>

<template>
  <div class="contant">
    <div class="title">
      <i class="iconfont el-icon-biosign"></i>
      <span>审核列表</span>
    </div>
    <div class="btnlist">
      <div class="btn-left">
        <el-button size="small" plain class="acstate">批量操作</el-button>
        <el-button size="small" type="primary" @click="inputInfo">同意</el-button>
        <el-button size="small" type="danger" @click="inputInfo">驳回</el-button>
      </div>
      <div class="btn-right">
        <div>
          <el-button size="small" plain class="acstate">全部</el-button>
          <el-button size="small" plain>已审批</el-button>
          <el-button size="small" plain>待审批</el-button>
        </div>
      </div>
    </div>
    <div class="info-table">
      <el-table :data="tableData" height="550" border style="width: 100%">
          <el-table-column
      type="selection"
      width="55"></el-table-column>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="proposer" label="申请人"></el-table-column>
        <el-table-column prop="organization" label="工作单位" sortable></el-table-column>
        <el-table-column prop="joindate" label="申请时间" sortable></el-table-column>
        <el-table-column prop="state" label="状态"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span style="color:#28c16e;"
              @click="handleCheck(scope.$index, scope.row)"
            >查看</span>
          </template>
        </el-table-column>
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
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          proposer: "武一",
          organization: "中国医学科学院肿瘤医院",
          joindate: "2019-04-29 18：30",
          state: "已审批",
        },
        {
          proposer: "武一",
          organization: "中国医学科学院肿瘤医院",
          joindate: "2019-04-29 18：30",
          state: "已审批",
        },
        {
          proposer: "武一",
          organization: "中国医学科学院肿瘤医院",
          joindate: "2019-04-29 18：30",
          state: "已审批",
        },
        {
          proposer: "武一",
          organization: "中国医学科学院肿瘤医院",
          joindate: "2019-04-29 18：30",
          state: "已审批",
        }
      ],
      
    };
  },
  methods: {
    handleCheck(index,row){
        this.$store.state.audit=true;
        this.$router.push("/scientific/joininfo")
    }
  }
};
</script>

