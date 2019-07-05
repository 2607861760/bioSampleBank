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
          @click="addDept"
        >新建</el-button>
        <el-button
          type="danger"
          icon="iconfont el-icon-biorecycle"
          size="medium"
          @click="delDepts"
        >批量删除</el-button>
      </div>
      <div class="btn-right">
        <div>
          <el-input
            placeholder="请输入部门名称"
            size="small"
            v-model="depName"
          >
          <el-button slot="append" icon="iconfont el-icon-biosearch" @click="searchDept"></el-button>
          </el-input>
        </div>
      </div>
    </div>
    <div class="info-table">
      <el-table :data="tableData" height="550" border style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column
      type="selection"
      width="55"></el-table-column>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="id" label="部门ID"></el-table-column>
        <el-table-column prop="depName" label="部门名称" sortable></el-table-column>
        <el-table-column prop="upName" label="上级部门" sortable></el-table-column>
        <el-table-column label="创建时间 ">
          <template slot-scope="scope">
            {{scope.row.createDate | dateFilter}}
          </template>
        </el-table-column>
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
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          :current-page="current"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import {role} from 'api/index.js'
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
      depName:'',
      current:1,
      pageSize:10,
      total:0,
      multipleSelection:[],
      treeData:[]
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
  methods: {
    searchDept(){
      this.getDept(this.depName)
    },
    delDepts(){
      let arr=[],
        obj={};
        if(this.multipleSelection){
          this.multipleSelection.map(item=>{
        arr.push(item.id)
      })
        }
      
      obj['idList']=arr;
      role.delDeptBylist(obj).then((res)=>{
        if(res.returnCode==0){
          this.getDept()
          }else{
            this.$message.error(res.msg)
          }
      })
    },
    handleSelectionChange(val){
       this.multipleSelection = val;
    },
      handleEdit(index,row){
        this.$store.state.partid=row.id;
          this.$router.push('/authority/adddepart')
      },
      addDept(){
        this.$store.state.partid=null;
          this.$router.push('/authority/adddepart')
      },
      handleDelete(index,row){
        let obj={
          id:row.id
        }
        role.delDept(obj).then((res)=>{
          if(res.returnCode==0){
            this.getDept()
          }else{
            this.$message.error(res.msg)
          }
        })
      },
      handleSizeChange(val){
      this.pageSize=val;
      this.getDept();
    },
    handleCurrentChange(val){
      this.current=val;
      this.getDept()
    },
    findUp(id,lists){
      let depName='',
      flag=true;
      if(id!=0){
        lists.map(item=>{
          if(item.id==id){
            depName=item.depName;
            flag=false;
          }else if(item.children!=null && flag==true){
            depName=this.findUp(id,item.children)
          }
        })
      }
      return depName
    },
    getDept(state=null){
      let obj = {
          userId: this.$store.state.userId
        },
        pagelist = {
          offset: this.current,
          size: this.pageSize
        };
        if(state!=null){
          obj['depName']=state;
        }
      role.getDept(pagelist,obj).then((res)=>{
        if(res.returnCode==0){
          this.tableData=res.data.deptList;
          this.total=res.data.total;
          if(this.tableData){
            this.tableData.map(item=>{
            item['upName']=this.findUp(item.pid,this.treeData)
          })
          }
          
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    getdeptall(callback=null){
      role.getDeptAll().then((res)=>{
        if(res.returnCode==0){
          this.treeData=res.data
          if(callback!=null){
            callback()
          }
        }
      })
    },
  },
  mounted(){
    this.getdeptall(this.getDept())
    
  }
};
</script>

