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
        <el-table-column prop="number" label="登记号"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="add_user_name" label="操作人"></el-table-column>
        <el-table-column label="上传时间">
          <template slot-scope="scope">
            {{scope.row.addtime |dateFilter}}
          </template>
        </el-table-column>
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
          :current-page="current"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import {infoentry} from 'api/infoentry';
export default {
  data() {
    return {
      tableData: [
        // {
        //   registration: "201901032578",
        //   name: "111",
        //   uptime: "2019-10-18",
        //   lasttime: "2019-10-19",
        // },
        // {
        //   registration: "201901032578",
        //   name: "111",
        //   uptime: "2019-10-18",
        //   lasttime: "2019-10-19",
        // },
        // {
        //   registration: "201901032578",
        //   name: "111",
        //   uptime: "2019-10-18",
        //   lasttime: "2019-10-19",
        // },
        // {
        //   registration: "201901032578",
        //   name: "111",
        //   uptime: "2019-10-18",
        //   lasttime: "2019-10-19",
        // }
      ],
      upState:true,
      current:1,
      pageSize:10,
      total:0
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
  watch:{
    upState(val){
      this.current=1
      this.pageSize=10
      this.getUploadRecord(val)
    }
  },
  methods: {
      handleCheck(index,row){
        this.$store.state.patientid=row.pid;
        this.$router.push('/query/report')
      },
      handleEdit(index, row) {
        this.$store.state.entryState = 14;
        this.$store.state.patientid = row.pid;
        this.$router.push('/infoentry/addpatient')
      },
      handleDelete(index, row) {
        let obj={
          id:row.pid
        }
        infoentry.deleteRecord(obj).then((res)=>{
          if(res.returnCode==0){
            this.getUploadRecord(this.upState)
          }else{
            this.$message.error(res.msg)
          }
        })
      },
      handleSizeChange(val){
        this.pageSize=val;
        this.getUploadRecord(this.upState)
      },
      handleCurrentChange(val){
        this.current=val;
        this.getUploadRecord(this.upState)
      },
      getUploadRecord(status){
        let obj={
           page:this.current,
           pagesize:this.pageSize,
           uid:this.$store.state.userId,
           ctype:this.$store.state.cancerid,
           status:status?1:0
        }
        infoentry.getUploadRecord(obj).then((res)=>{
          if(res.returnCode==0){
            this.tableData=res.data.list;
            this.total=res.data.total;
          }else{
            this.$message.error(res.msg)
          }
        })
      }
  },
  created(){
    this.getUploadRecord(true)
  }
};
</script>

