<style lang="scss" scoped>
@import "../../base/css/base-var.scss";
.contain {
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
      color: $maincolor;
    }
    .delete {
      color: #ff5722;
    }
    .check{
        color: $btncolor;
    }
  }
}
</style>

<template>
  <div class="contain">
    <div class="title">
      <i class="iconfont el-icon-biosign"></i>
      <span>查看上传列表</span>
    </div>
    <div class="btnlist">
      <div class="btn-right">
        <div>
          <el-button size="small" plain :class="upState==true?'acstate':''" @click='upState=true'>已上传</el-button>
          <el-button size="small" plain :class="upState==false?'acstate':''" @click='upState=false'>上传失败</el-button>
        </div>
      </div>
    </div>
    <div class="info-table">
      <el-table :data="tableData" height="550" border style="width: 100%">
        <el-table-column prop="registration" label="登记号"></el-table-column>
        <el-table-column prop="name" label="操作人"></el-table-column>
        <el-table-column prop="uptime" label="上传时间"></el-table-column>
        <el-table-column prop="lasttime" label="最后修改时间" v-if='upState==true'></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope" >
              <div v-if='upState==true'>
              <el-button
              size="mini"
              type="text"
              class="check"
              @click="handleCheck(scope.$index, scope.row)"
            >查看</el-button>
            <el-button
              size="mini"
              type="text"
              class="edit"
              @click="handleEdit(scope.$index, scope.row)"
            >修改</el-button>
            <el-button
              size="mini"
              type="text"
              class="delete"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
            </div>
            <div v-else>
                <el-button
              size="mini"
              type="text"
              class="edit"
              @click="handleEdit(scope.$index, scope.row)"
            >手动上传</el-button>
            <el-button
              size="mini"
              type="text"
              class="delete"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
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
          registration: "201901032578",
          name: "111",
          uptime: "2019-10-18",
          lasttime: "2019-10-19",
        },
        {
          registration: "201901032578",
          name: "111",
          uptime: "2019-10-18",
          lasttime: "2019-10-19",
        },
        {
          registration: "201901032578",
          name: "111",
          uptime: "2019-10-18",
          lasttime: "2019-10-19",
        },
        {
          registration: "201901032578",
          name: "111",
          uptime: "2019-10-18",
          lasttime: "2019-10-19",
        }
      ],
      upState:true
    };
  },
  methods: {
      handleCheck(index,row){
      },
      handleEdit(index, row) {},
    handleDelete(index, row) {},
  }
};
</script>

