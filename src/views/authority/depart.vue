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
      background: #259b24;
      border-color: #259b24;
    }
    .delete {
      background: #ee2929;
      border-color: #ee2929;
    }
  }
}
</style>

<template>
  <div class="contant">
    <div class="title">
      <i class="iconfont el-icon-biosign"></i>
      <span>部门列表</span>
    </div>
    <div class="btnlist">
      <div class="btn-left">
        <el-button
          type="primary"
          icon="iconfont el-icon-bioadd"
          size="medium"
          @click="addRole"
        >新建</el-button>
        <el-button
          type="danger"
          icon="iconfont el-icon-biorecycle"
          size="medium"
          @click="addProject"
        >批量删除</el-button>
      </div>
      <div class="btn-right">
        <div>
          <el-input
            placeholder="请输入角色名称"
            size="small"
            suffix-icon="iconfont el-icon-biosearch"
          ></el-input>
        </div>
      </div>
    </div>
    <div class="info-table">
      <el-table :data="tableData" height="550" border style="width: 100%">
          <el-table-column
      type="selection"
      width="55"></el-table-column>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="departid" label="部门ID"></el-table-column>
        <el-table-column prop="departname" label="部门名称" sortable></el-table-column>
        <el-table-column prop="updepart" label="上级部门" sortable></el-table-column>
        <el-table-column prop="startdate" label="创建时间 "></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" class="edit" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button type="danger" size="small" class="delete" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
          departid: "kdfhlk8375758jfsdfh",
          departname: "乳腺科",
          updepart: "一级部门",
          startdate: "2019-04-30",
        },
        {
          departid: "kdfhlk8375758jfsdfh",
          departname: "乳腺科",
          updepart: "一级部门",
          startdate: "2019-04-30",
        },
        {
          departid: "kdfhlk8375758jfsdfh",
          departname: "乳腺科",
          updepart: "一级部门",
          startdate: "2019-04-30",
        },
        {
          departid: "kdfhlk8375758jfsdfh",
          departname: "乳腺科",
          updepart: "一级部门",
          startdate: "2019-04-30",
        }
      ],
      
    };
  },
  methods: {
      handleEdit(){
          this.$router.push('/authority/adddepart')
      },
      addRole(){
          this.$router.push('/authority/adddepart')
      },
    handleCheck(index,row){
        this.$store.state.audit=true;
        this.$router.push("/scientific/joininfo")
    }
  }
};
</script>

