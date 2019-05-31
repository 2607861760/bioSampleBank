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
      background: #259b24;
      border-color: #259b24;
    }
    .delete {
      background: #ee2929;
      border-color: #ee2929;
    }
    .check{
      color: #259b24;
    background: #fff;
    border-color: #259b24;
    }
    .audit{
      color: #2983cf;
    background: #fff;
    border-color: #2983cf;
    }
    .join{
      background: #009688;
      border-color: #009688;
    }
  }
}
</style>

<template>
  <div class="contant">
    <div class="title">
      <i class="iconfont el-icon-biosign"></i>
      <span>科研项目列表</span>
    </div>
    <div class="btnlist">
      <div class="btn-left">
        <el-button
          type="primary"
          icon="iconfont el-icon-bioadd"
          size="medium"
          @click="addProject"
        >新建</el-button>
      </div>
      <div class="btn-right">
        <div>
          <el-button size="small" plain class="acstate">全部</el-button>
          <el-button size="small" plain>参与</el-button>
          <el-button size="small" plain>未参与</el-button>
        </div>
        <div>
          <el-input
            placeholder="请输入项目名称、负责人..."
            size="small"
            suffix-icon="iconfont el-icon-biosearch"
          ></el-input>
        </div>
      </div>
    </div>
    <div class="info-table">
      <el-table :data="tableData" height="550" border style="width: 100%">
        <el-table-column prop="projectname" label="项目名称"></el-table-column>
        <el-table-column prop="expenditure" label="经费"></el-table-column>
        <el-table-column prop="principal" label="负责人"></el-table-column>
        <el-table-column prop="startdate" label="开始时间"></el-table-column>
        <el-table-column prop="participating" label="参与单位数量"></el-table-column>
        <el-table-column label="操作" width="450px">
          <template slot-scope="scope">
            <el-button type="success" size="small" plain class="check"  @click="handleCheck(scope.$index, scope.row)">查看</el-button>
            <el-button type="primary" size="small" class="query" @click="handleQuery(scope.$index, scope.row)">查询</el-button>
            <el-badge :value="3" class="item">
            <el-button type="primary" size="small" plain class="audit" @click="handleAudit(scope.$index, scope.row)">审核</el-button>
            </el-badge>
            <el-button type="success" size="small" class="edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" size="small" class="delete" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <el-button type="success" size="small" class="join" @click="handleJoin(scope.$index, scope.row)">申请加入</el-button>
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
          projectname: "肿瘤标志物的精准测量及分子机制",
          expenditure: "2000万",
          principal: "王二",
          startdate: "2019/04/29",
          participating: "3"
        },
        {
          projectname: "肿瘤标志物的精准测量及分子机制",
          expenditure: "2000万",
          principal: "王二",
          startdate: "2019/04/29",
          participating: "3"
        },
        {
          projectname: "肿瘤标志物的精准测量及分子机制",
          expenditure: "2000万",
          principal: "王二",
          startdate: "2019/04/29",
          participating: "3"
        }
      ],
      choiceCarcinoma: false,
      carcinoma: [
        {
          name: "肺癌",
          icon: "iconfont el-icon-biolung",
          rightclass: "biolung"
        },
        {
          name: "结直肠癌",
          icon: "iconfont el-icon-biocolorectum",
          rightclass: "biocolorectum"
        },
        {
          name: "乳腺癌",
          icon: "iconfont el-icon-biobreast",
          rightclass: "biobreast"
        },
        {
          name: "胃癌",
          icon: "iconfont el-icon-biogastric",
          rightclass: "biogastric"
        },
        {
          name: "膀胱癌",
          icon: "iconfont el-icon-biocarcinoma",
          rightclass: "biocarcinoma"
        }
      ],
      choiceNum: null
    };
  },
  methods: {
    handleCheck(index, row){
      this.$router.push('/scientific/projectinfo')
    },
    handleQuery(index, row){
      this.$router.push('/scientific/resultinfo')
    },
    handleJoin(index, row){
      this.$router.push('/scientific/joininfo')
    },
    handleAudit(index, row){
      this.$router.push('/scientific/auditinfo')
    },
    handleEdit(index, row) {
      this.$router.push('/scientific/addproject')
    },
    handleDelete(index, row) {},
    addProject() {
      this.$router.push('/scientific/addproject')
    },
    choice() {
      this.choiceCarcinoma = false;
      this.$router.push("/infoentry/addpatient?type=basicInfo");
    },
    readInfo() {
      this.$router.push("/infoentry/upinfo");
    }
  }
};
</script>

