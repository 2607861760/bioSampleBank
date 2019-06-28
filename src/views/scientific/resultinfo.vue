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
        <span class="infoNum">{{total}}</span>
        <span>条</span>
        <div style="float:right;">
          <el-button size="small" plain class="acstate" @click="all">全部</el-button>
          <el-button size="small" plain @click='mysample'>我的样本</el-button>
          <el-button size="small" plain @click="othersample">参与人样本</el-button>

          <el-button type="primary" size="medium">
            导出
            <i class="iconfont el-icon-biooutput"></i>
          </el-button>
        </div>
      </div>
      <div class="process-table">
        <el-table :data="tableData" height="550" border style="width: 100%">
          <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="username" label="样本归属"></el-table-column>
        <el-table-column label="登录号">
            <template slot-scope="scope">
                <span class="loginnum" @click='toMember(scope.row)'>{{scope.row.number}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column label="癌种">
          <template slot-scope="scope">
                <span>{{scope.row.ctype | ctypeFilter}}</span>
            </template>
        </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            :current-page="current"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {project} from 'api/index.js';
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
      checkNum: 0,
      pageSize:10,
      current:1,
      total:0,
      type:0
    };
  },
  filters:{
    ctypeFilter(val){
      switch (val) {
        case 1:
          return "肺癌";
          break;
        case 2:
          return "结直肠癌";
          break;
        case 3:
          return "乳腺癌";
          break;
        case 4:
          return "胃癌";
          break;
        case 5:
          return "膀胱癌";
          break;
      }
    }
  },
  methods: {
      toReport(row){
        this.$router.push('/query/report')
      },
      all(){
        this.type=0;
        this.getProjectResult()
      },
      mysample(){
        this.type=1;
        this.getProjectResult()
      },
      othersample(){
        this.type=2;
        this.getProjectResult()
      },
      handleSizeChange(val){
        this.pageSize=val;
        this.getProjectResult()
      },
      handleCurrentChange(val){
        this.current=val;
        this.getProjectResult()
      },
      getProjectResult(){
        let obj={
          userId:this.$store.state.userId,
          projectId:this.$store.state.projectid,
          type:this.type
        },
        pagelist={
          offset:this.current,
          size:this.pageSize
        };
        project.getProjectResult(pagelist,obj).then((res)=>{
          if(res.returnCode==0){
            this.tableData=res.data.modelList;
            this.total=res.data.total;
          }else{
            this.$message.error(res.msg)
          }
        })
      }
  },
  mounted() {
    this.getProjectResult()
  }
};
</script>

