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
      <div class="btn-right">
        <div>
          <el-input
            placeholder="请选择登记号、癌种"
            size="small"
            suffix-icon="iconfont el-icon-biosearch"
          ></el-input>
        </div>
      </div>
    </div>
    <div class="info-table">
      <el-table :data="tableData" height="550" border style="width: 100%">
        <el-table-column prop="itemName" label="字典名字"></el-table-column>
        <el-table-column prop="sort" sortable label="排序"></el-table-column>
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
          :page-sizes="[10, 20, 30, 50]"
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
              <el-input v-model="dictobj.itemName" placeholder="请输入" disabled></el-input>
          </el-form-item>
          <el-form-item label="子项名称：">
              <el-input v-model="dictform.itemName" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="排序：">
              <el-input v-model="dictform.sort" placeholder="请输入"></el-input>
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
      pageSize:100,
      current:1,
      total:0,
      tableData: [],
      inputModel: false,
      dictform:{},
      type:'',
      edit:false
    };
  },
  methods: {
    handleEdit(index, row) {
      this.dictform=row;
      this.type=row.type;
      this.edit=true;
      this.inputModel=true;
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
      if(this.edit){
        dict.updateItem(this.dictform).then((res)=>{
        if(res.returnCode==0){
          this.inputModel=false;
          this.getDict()
        }
      })
      }else{
        this.dictform['pid']=this.dictobj.id;
        this.dictform['itype']=this.dictobj.type;
        dict.saveItem(this.dictform).then((res)=>{
        if(res.returnCode==0){
          this.inputModel=false;
          this.getDict()
        }

      })
      this.addguo()
      }
      
    },
    getDict(){  //获取信息列表
    let pagelist={
        offset:this.current,
        size:this.pageSize
      },obj={
        'pid':this.dictobj.id
      };
      dict.getItemlist(pagelist,obj).then((res)=>{
        if(res.returnCode==0){
          this.tableData=res.data.itemList;
          this.total=res.data.total;
        }
      })
    },
    // addguo(){
    // let json1=[
		// {id:1 ,name:'LuminalA'},
		// {id:2 ,name:'LuminalB阴性'},
    // {id:3 ,name:'LuminalB阳性'},
    // {id:4 ,name:'HER2阳性'},
    // {id:4 ,name:'基地细胞样型，三阴性（导管型）'},
    // {id:4 ,name:'5'},
    // {id:4 ,name:'其他'},
		// {id:4 ,name:'pN3a 10个或10个以上的同侧腋窝淋巴结转移（至少1处转移灶>2mm）或锁骨下淋巴结转移'},
		// {id:4 ,name:'pN3b 有临床征象的同侧内乳淋巴结转移并伴1个以上腋窝淋巴结转移'},
		// {id:4 ,name:'pN3c 同侧锁骨上淋巴结转移'},
		// {id:4 ,name:'T4b乳腺皮肤水肿'},
		// {id:4 ,name:'T4c同时包含T4a和T4b'},
		// {id:4 ,name:'炎性乳腺癌'},
		// {id:4 ,name:'腺泡细胞癌'},
		// {id:4 ,name:'粘液表皮样癌'},
		// {id:4 ,name:'多样性癌'},
		// {id:4 ,name:'嗜酸细胞癌'},
		// {id:4 ,name:'富脂质癌'},
    // {id:4 ,name:'富含糖原透明细胞癌'},
    // {id:4 ,name:'皮脂腺癌'},
    // {id:4 ,name:'涎腺/皮肤附件型肿瘤'},
    // {id:4 ,name:'多形性腺瘤'},
    // {id:4 ,name:'腺肌上皮瘤'},
		// {id:4 ,name:'样囊性癌'},
		// {id:4 ,name:'导管原位癌'},
		// {id:4 ,name:'小叶肿瘤'},
		// {id:4 ,name:'普通型导管增生'},
		// {id:4 ,name:'柱状上皮病变'},
		// {id:4 ,name:'非典型性导管上皮增生'},
		// {id:4 ,name:'导管内乳头状瘤'},
		// {id:4 ,name:'包裹性内乳头状瘤'},
		// {id:4 ,name:'实性乳头状瘤'},
		// {id:4 ,name:'良性上皮增生'},
		// {id:4 ,name:'间叶性肿瘤'},
		// {id:4 ,name:'纤维上皮性肿瘤'},
		// {id:4 ,name:'乳头肿瘤'},
		// {id:4 ,name:'恶性淋巴瘤'},
		// {id:4 ,name:'转移性肿瘤'},
// ]
//       console.log(json1.length)
//       json1.forEach((item,index)=>{
//         // this.dictform['pid']=this.dictobj.id;
//         // this.dictform['itype']=this.dictobj.type;
//         let obj={
//           "pid":this.dictobj.id,
// 	        "itemName":item.name,
// 	        "itype":this.dictobj.type,
// 	        "sort":index+1

//         }
//         dict.saveItem(obj).then((res)=>{
//         if(res.returnCode==0){
//           // this.inputModel=false;
//           // this.getDict()
//         }
//       })
      
//       })
//       this.getDict()
  
// }

},
  created(){
    this.dictobj=this.$store.state.row;
    this.getDict()
  }
};
</script>

