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
    .registration {
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
.el-button--primary,.el-button--primary:focus, .el-button--primary:hover{
  background-color: $maincolor !important;
  border-color: $maincolor !important;
}
</style>

<template>
  <div class="contant">
    <div class="process">
      <div class="title">
        <i class="iconfont el-icon-biosign"></i>
        <span>数据列表</span>
      </div>
      <div class="process-inner">
        <span>找到相关信息</span>
        <span class="infoNum">{{total}}</span>
        <span>条</span>
        <div style="float:right;">
          <el-popover placement="bottom" width="299" trigger="click">
            <!-- <el-button slot="reference">click 激活</el-button> -->
            <div>
              <p>
                最多可选12项（当前选择
                <span class="infoNum">{{checkNum}}</span>
                项）
              </p>
              <el-checkbox-group v-model="checkedcol" @change="changecheck">
                  <div v-for="(item,index) in collist" :key="index" style="float:left;width:100px;">
                    <el-checkbox :label="item.label" :checked="item.checked" :disabled="checkDis(item)">{{item.label}}</el-checkbox>
                  </div>
              </el-checkbox-group>
            </div>
            <el-button type="primary" size="medium" slot="reference">
              自定义
              <i class="iconfont el-icon-biotag"></i>
            </el-button>
          </el-popover>

          <el-button type="primary" size="medium" @click="output">
            导出
            <i class="iconfont el-icon-biooutput" ></i>
          </el-button>
        </div>
      </div>
      <div class="process-table">
        <el-table :data="tableData" height="550" border style="width: 100%">
          <el-table-column
            :prop="item.prop"
            :label="item.label"
            v-for="(item,index) in tablecol"
            :key="index"
          >
            <template slot-scope="scope">
              <span v-if="item.prop=='number'" class="registration" @click='toReport(scope.row)'>{{scope.row.number}}</span>
              <span v-else-if="item.prop=='ctype'">{{scope.row.ctype | ctypeFilter}}</span>
              <span v-else-if="item.prop=='istransfer'">{{scope.row.istransfer | isFilter}}</span>
              <span v-else-if="item.prop=='isrelapse'">{{scope.row.isrelapse | isFilter}}</span>
              <span v-else>{{scope.row[item.prop]}}</span>
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
import { infoentry,infosearch } from "api/index.js";
export default {
  data() {
    return {
      checkedcol:[],
      tablecol: [
        {
          prop: "number",
          label: "登记号"
        },
        {
          prop: "ctype",
          label: "癌种"
        },
        {
          prop: "gene",
          label: "基因名"
        },
      ],
      tableData: [],
      collist:[
         {
          prop: "number",
          label: "登记号",
          checked:true
        },
        {
          prop: "ctype",
          label: "癌种",
          checked:true
        },{
          prop: "gene",
          label: "基因名",
          checked:true
        },
        {
          prop: "htype",
          label: "病理组织学类型",
          checked:false
        },
        {
          prop: "clinicalStage",
          label: "分期",
          checked:false
        },
        {
          prop: "mtype",
          label: "突变类型",
          checked:false
        },
        {
          prop: "hgvs",
          label: "突变位点",
          checked:false
        },
        {
          prop: "age",
          label: "年龄",
          checked:false
        },{
            prop:"weight",
            label:"体重",
          checked:false
        },
        {
            prop:"samsource",
            label:"收缩压",
          checked:false
        },{
            prop:"diastolic",
            label:"舒张压",
          checked:false
        },{
            prop:"samsource",
            label:"样本来源",
          checked:false
        },{
            prop:"medication",
            label:"用药名称",
          checked:false
        },{
            prop:"istransfer",
            label:"是否转移",
          checked:false
        },{
            prop:"isrelapse",
            label:"是否复发",
          checked:false
        }
      ],
      checkNum: 0,
      current:1,
      pageSize:10,
      total:0,
      option:[],
      url:'http://42.123.125.101:83'
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
    },
    isFilter(val){
      if(val==0){
        return '是'
      }else if(val==1){
        return '否'
      }
    }
  },
  methods: {
    output(){
      let obj={
        downTiles:this.checkedcol,
      }
      Object.assign(obj,this.$store.state.basicform)
      infosearch.searchDown(obj).then((res)=>{
        if(res.returnCode==0){
          let filePath=this.url+res.data.filename;
          // console.log(filePath)
          // var adown=document.createElement('a');
          // adown.download=res.data.filename;
          // adown.href=filePath;
          // adown.click()
          var elemIF = document.createElement('iframe');
                elemIF.src = filePath;
                elemIF.style.display = 'none';
                document.body.appendChild(elemIF);
                // 防止下载两次
                setTimeout(function() {
                   document.body.removeChild(elemIF)
                }, 1000);
        }
      })
    },
    checkDis(item) {
      if (
        item.prop == "number" ||
        item.prop == "ctype" ||
        item.prop == "gene"
      ) {
        return true;
      }
      return false;
    },
      toReport(row){
        this.$store.state.patientid=row.id;
        this.$store.state.cancerid=row.ctype;
        this.$router.push('/query/report')
      },
      changecheck(){
          let tablecolumn=[]
          console.log(this.checkedcol)
          
          this.checkedcol.forEach(item=>{
              this.collist.forEach(items=>{
                  if(item==items.label){
                    tablecolumn.push(items)
                  }
              })
          })
          this.tablecol=tablecolumn
      },
      handleSizeChange(val){
        this.pageSize=val;
        this.getPatient()
      },
      handleCurrentChange(val){
        this.current=val;
        this.getPatient();
      },
      getPatient() {
      //获取信息列表
      let obj = {
          userId: this.$store.state.userId
        },
        pagelist = {
          offset: this.current,
          size: this.pageSize
        };
      infosearch.searchList(pagelist, obj).then(res => {
        if (res.returnCode == 0) {
          res.data.modelList.forEach(mitem=>{
            this.option.forEach(item=>{
              if(item.itemValue=='htype' && item.itype==mitem.ctype){
                item.itemList.forEach(items=>{
                  if(items.id==mitem.htype){
                    mitem.htype=items.itemName
                  }
                })
              }
              if(item.itemValue=='clinicalStage' && item.itype==mitem.ctype){
                item.itemList.forEach(items=>{
                  if(items.id==mitem.clinicalStage){
                    mitem.clinicalStage=items.itemName
                  }
                })
              }
          })
          })
          this.tableData = res.data.modelList;
          this.total = res.data.total;
        }
      });
    }
  },
  created() {
    let search=['clinicalStage','htype']
    this.$store.state.zdlist.forEach(item=>{
      search.forEach(searchitem=>{
        if(item.itemValue==searchitem){
          this.option.push(item)
        }
      })
    })
  },
  mounted(){
    // this.getPatient();
    this.$store.state.querylist.forEach(mitem=>{
      this.option.forEach(item=>{
                    if(item.itemValue=='htype' && item.itype==mitem.ctype){
                      item.itemList.forEach(items=>{
                        if(items.id==mitem.htype){
                          mitem.htype=items.itemName
                        }
                      })
                    }
                    if(item.itemValue=='clinicalStage' && item.itype==mitem.ctype){
                      item.itemList.forEach(items=>{
                        if(items.id==mitem.clinicalStage){
                          mitem.clinicalStage=items.itemName
                        }
                      })
                    }
                })
    })
    
    
    this.tableData=this.$store.state.querylist;
    this.total=this.$store.state.total;
  }
};
</script>

