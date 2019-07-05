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
      <span>角色列表</span>
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
          @click="delRoles"
        >批量删除</el-button>
      </div>
      <div class="btn-right">
        <div>
          <el-input
            placeholder="请输入角色名称"
            size="small"
            v-model="roleName"
          >
          <el-button slot="append" icon="iconfont el-icon-biosearch" @click="searchRole"></el-button>
          </el-input>
        </div>
      </div>
    </div>
    <div class="info-table">
      <el-table :data="tableData" height="550" border style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column
      type="selection"
      width="55"></el-table-column>
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column prop="id" label="角色ID"></el-table-column>
        <el-table-column prop="roleName" label="角色名称" sortable></el-table-column>
        <!-- <el-table-column prop="power" label="权限信息" sortable></el-table-column> -->
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
      pageSize:10,
      current:1,
      total:0,
      roleName:'',
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
      multipleSelection:[]
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
    searchRole(){
      this.getRole(this.roleName)
    },
    delRoles(){
      let arr=[],
        obj={};
      this.multipleSelection.map(item=>{
        arr.push(item.id)
      })
      obj['idList']=arr;
      role.delRoleBylist(obj).then((res)=>{
        if(res.returnCode==0){
          this.getRole()
          }else{
            this.$message.error(res.msg)
          }
      })
    },
    handleSelectionChange(val){
       this.multipleSelection = val;
    },
      handleEdit(index,row){
          this.$store.state.roleid=row.id;
          this.$router.push('/authority/addrole')
      },
      addRole(){
        this.$store.state.roleid=null;
          this.$router.push('/authority/addrole')
      },
      handleDelete(index,row){
        let obj={
          id:row.id
        }
        role.delRole(obj).then((res)=>{
          if(res.returnCode==0){
            this.getRole()
          }else{
            this.$message.error(res.msg)
          }
        })
      },
    handleSizeChange(val){
      this.pageSize=val;
      this.getRole();
    },
    handleCurrentChange(val){
      this.current=val;
      this.getRole()
    },
    getRole(state=null){
      let obj = {
          userId: this.$store.state.userId
        },
        pagelist = {
          offset: this.current,
          size: this.pageSize
        };
        if(state!=null){
          obj['roleName']=state;
        }
      role.getRole(pagelist,obj).then((res)=>{
        if(res.returnCode==0){
          this.tableData=res.data.roleList;
          this.total=res.data.total;
        }else{
          this.$message.error(res.msg)
        }
      })
    }
  },
  mounted(){
    this.getRole()
  }
};
</script>

