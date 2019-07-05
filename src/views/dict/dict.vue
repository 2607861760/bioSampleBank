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
      color: $maincolor;
    }
    .delete {
      color: #ff5722;
    }
  }
  .input-inner {
    padding:0 20px;
    .input-title {
      font-size: 18px;
      font-weight: bold;
      line-height: 26px;
    }
  }
}
.el-input,
.el-select,
.el-date-editor {
  width: 350px;
}
</style>

<template>
  <div class="contant">
    <div class="title">
      <i class="iconfont el-icon-biosign"></i>
      <span>字典信息</span>
    </div>
    <div class="btnlist">
      <div class="btn-left">
        <el-button
          type="primary"
          icon="iconfont el-icon-bioadd"
          size="medium"
          @click="addDict"
        >新建</el-button>
      </div>
      <!-- <div class="btn-right">
        <div>
          <el-input
            placeholder="请选择登记号、癌种"
            size="small"
            suffix-icon="iconfont el-icon-biosearch"
          ></el-input>
        </div>
      </div> -->
    </div>
    <div class="info-table">
      <el-table :data="tableData" height="550" border style="width: 100%">
        <el-table-column
      type="index"
      width="50">
    </el-table-column>
        <el-table-column label="字典项名字">
          <template slot-scope="scope">
            <span style="color:#2983cf;cursor: pointer;" @click="addItem(scope.row)">{{scope.row.itemName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="癌种" sortable>
          <template slot-scope="scope">
            <span>{{scope.row.itype | ctypefilter}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              class="edit"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="text"
              class="delete"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30, 100]"
          :page-size="pageSize"
          :current-page="current"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <el-dialog title="字典信息" :visible.sync="inputModel" width="620px">
      <div class="input-inner">
        <el-form :model="dictform" label-width="150px" label-position="left">  
          <el-form-item label="字典名称：">
              <el-input v-model="dictform.itemName" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="字典值：">
              <el-input v-model="dictform.itemValue" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="癌种：">
              <el-select v-model="type" placeholder="请选择..." >
                <el-option v-for='item in carcinoma' :key='item.cancerid' :value="item.cancerid" :label="item.name"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="单位：">
              <el-input v-model="dictform.fieldUnit" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="排序：">
              <el-input v-model="dictform.sort" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="类型：">
              <!-- <el-input v-model="dictform.fieldType" placeholder="请输入"></el-input> -->
              <el-select v-model="fieldType" placeholder="请选择..." >
                <el-option v-for='item in fieldlist' :key='item.id' :value="item.id" :label="item.name"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="saveDict" size="medium">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {dict} from 'api/index.js';
export default {
  data() {
    return {
      pageSize:1000,
      current:1,
      total:0,
      tableData: [],
      inputModel: false,
      dictform:{},
      carcinoma: [
        {
          name: "请选择",
          cancerid:0
        },
        {
          name: "肺癌",
          cancerid:1
        },
        {
          name: "结直肠癌",
          cancerid:2
        },
        {
          name: "乳腺癌",
          cancerid:3
        },
        {
          name: "胃癌",
          cancerid:4
        },
        {
          name: "膀胱癌",
          cancerid:5
        }
      ],
      type:'',
      fieldlist:[
        {
          name:'下拉框',
          id:1
        },
        {
          name:'输入框',
          id:2
        },
      ],
      fieldType:''
    };
  },
  filters:{
    ctypefilter(val){
      switch(val){
        case 1:
          return '肺癌';
          break;
        case 2:
          return '结直肠癌';
          break;
        case 3:
          return '乳腺癌';
          break;
        case 4:
          return '胃癌';
          break;
        case 5:
          return '膀胱癌';
          break;
      }
    }
  },
  methods: {
    addItem(row){
      this.$store.state.row=row;
      this.$router.push('/dict/select');
    },
    handleEdit(index, row) {
      this.dictform=row;
      this.type=row.itype;
      this.fieldType=row.fieldType;
      this.inputModel=true;
      this.edit=true;
    },
    handleDelete(index, row) {
      let obj={
        'id':row.id
      }
      dict.delItem(obj).then((res)=>{
        if(res.returnCode==0){
          this.getDict()
        }
      })
    },
    addDict() {
      this.dictform={};
      this.type='';
      this.fieldType='';
      this.edit=false;
      this.inputModel = true;
    },
    handleCurrentChange(val){//current改变
      this.current=val;
      this.getDict();
    },
    handleSizeChange(val){  //pageSize改变
      this.pageSize=val;
      this.getDict();
    },
    saveDict(){
      this.dictform['itype']=this.type;
      this.dictform['fieldType']=this.fieldType;
      if(this.edit){
        dict.updateItem(this.dictform).then((res)=>{
           if(res.returnCode==0){
            this.inputModel=false;
            this.getDict()
          }
        })
      }else{
        dict.saveItem(this.dictform).then((res)=>{
        if(res.returnCode==0){
          this.inputModel=false;
          this.getDict()
        }
      })
      }
      
    },
    getDict(){  //获取信息列表
      let pagelist={
        offset:this.current,
        size:this.pageSize
      },obj={
        'pid':0
      };
      this.tableData.length=0;
      dict.getItemlist(pagelist,obj).then((res)=>{
        if(res.returnCode==0){
          this.tableData=res.data.itemList;
          this.total=res.data.total;
        }
      })
    }
  },
  created(){
    this.getDict()
  }
};
</script>

