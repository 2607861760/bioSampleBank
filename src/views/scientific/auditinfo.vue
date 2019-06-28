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
        <el-button size="small" type="primary" @click="flag=1">同意</el-button>
        <el-button size="small" type="danger" @click="flag=2">驳回</el-button>
      </div>
      <div class="btn-right">
        <div>
          <el-button size="small" plain :class="applicatFlag==null?'acstate':''" @click="all">全部</el-button>
          <el-button size="small" plain :class="applicatFlag==1?'acstate':''" @click="agree">已审批</el-button>
          <el-button size="small" plain :class="applicatFlag==0?'acstate':''" @click="wait">待审批</el-button>
        </div>
      </div>
    </div>
    <div class="info-table">
      <el-table :data="tableData" height="550" border style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column
      type="selection"
      width="55"></el-table-column>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="applyName" label="申请人"></el-table-column>
        <el-table-column prop="hospital" label="工作单位" sortable></el-table-column>
        <el-table-column label="申请时间" sortable>
          <template slot-scope='scope'>
            <span>{{scope.row.joinTime | dateFilter}}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span>{{scope.row.applicatFlag | flagFilter}}</span>
          </template>
        </el-table-column>
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
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          :total="total"
          :current-page="current"
          layout="total, sizes, prev, pager, next, jumper"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import {project} from 'api/index.js';
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
      pageSize:10,
      current:1,
      total:0,
      applicatFlag:null,
      multipleSelection:[],
      flag:0
    };
  },
  filters:{
    dateFilter(val){
      if(val && (val!=null || val!='')){
        let date=new Date(val),
        year=date.getFullYear(),
        mouth=date.getMonth(),
        day=date.getDay();
      return year+'/'+mouth+'/'+day
      }
    },
    flagFilter(val){
      if(val==0){
        return '待批准'
      }else if(val==1){
        return '已同意'
      }else if(val==2){
        return '已拒绝'
      }
    }
  },
  watch:{
    flag(){
      this.submitProApp()
    }
  },
  methods: {
    handleSelectionChange(val) {
        this.multipleSelection = val;
    },
    submitProApp(){
      let obj={
        projectId:this.$store.state.projectid,
        flag:this.flag
      },
      multiple=[];
      this.multipleSelection.map(item=>{
        multiple.push(item.id)
      })
      obj['idList']=multiple
      project.submitProApp(obj).then((res)=>{
        if(res.returnCode==0){
          this.getProApp()
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    handleCheck(index,row){
        this.$store.state.audit=true;
        this.$store.state.userid=row.id;
        this.$router.push("/scientific/joininfo")
    },
    handleSizeChange(val){
      this.pageSize=val;
      this.getProApp()
    },
    handleCurrentChange(val){
      this.current=val;
      this.getProApp()
    },
    all(){
      this.applicatFlag=null;
      this.getProApp()
    },
    agree(){
      this.applicatFlag=1;
      this.getProApp()
    },
    wait(){
      this.applicatFlag=0;
      this.getProApp()
    },
    getProApp(){
      let obj={
        projectId:this.$store.state.projectid,
      },
      pagelist={
        offset:this.current,
        size:this.pageSize
      }
      if(this.applicatFlag!=null){
        obj['applicatFlag']=this.applicatFlag;
      }
      project.getProApp(pagelist,obj).then((res)=>{
        if(res.returnCode==0){
          this.tableData=res.data.modelList;
          this.total=res.data.total;
        }else{
          this.$message.error(res.msg)
        }
      })
    }
  },
  mounted(){
    this.getProApp()
  }
};
</script>

