<style lang="scss" scoped>
@import "../../base/css/base-var.scss";
.contant {
  background: #fff;
  border-radius: 6px;
  height: 800px;
  overflow-y: scroll;
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
  .steplist {
    padding: 0 40px 20px;
  }
  .infoform {
    padding: 20px 40px;
  }
  .standard {
    max-height: 500px;
    border: 1px solid #dff0e0;
    .standard-title {
      height: 50px;
      background: #dff0e0;
      line-height: 50px;
      .condition {
        float: left;
        margin-left: 20px;
        font-size: 24px;
        font-weight: bold;
      }
      .clear {
        float: right;
        margin-right: 15px;
      }
    }
    .tree-legic {
      float: left;
    }
    .delcont {
      float: right;
      margin-right: 15px;
    }
    .custom-tree-node {
      width: 100%;
    }
  }
  .input {
    margin-top: 15px;
    .input-btn {
      width: 80px;
      border: 1px solid #ccc;
      font-size: 14px;
      padding: 5px 0;
      border-radius: 6px;
      background: #ddd;
      text-align: center;
    }
  }
}
.el-input,
.el-select,
.el-date-editor,
.el-textarea {
  width: 350px;
}
.el-button--primary {
  background-color: $maincolor;
  border-color: $maincolor;
}
.infotable {
  .el-select {
    width: 100%;
  }
}
.establish {
  margin: 20px auto;
  text-align: center;
}
.tree-legic {
  .el-input,
  .el-select,
  .el-date-editor,
  .el-textarea {
    width: 120px;
  }
}
</style>

<template>
  <div class="contant">
    <div class="title">
      <i class="iconfont el-icon-biosign"></i>
      <span>新建科研项目</span>
    </div>
    <div class="steplist">
      <Steps :current="current">
        <Step title="填写项目信息"></Step>
        <Step title="填写入组标准"></Step>
      </Steps>
    </div>
    <div class="infoform" v-if="current==0">
      <el-form
        ref="form"
        :model="infoform"
        label-width="100px"
        :rules="inforules"
        label-position="left"
      >
        <el-form-item label="项目名称：" prop="projectName">
          <el-input v-model="infoform.projectName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="项目负责人：" prop="projectPeople">
          <el-input v-model="infoform.projectPeople" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="工作单位：" prop="hospital">
          <el-input v-model="infoform.hospital" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="所属科室：" prop="department">
          <el-input v-model="infoform.department" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="目标癌肿：" prop="ctype">
          <!-- <el-input v-model="infoform.ctype" placeholder="请输入" type="textarea" :rows="2"></el-input> -->
          <el-select v-model="infoform.ctype" placeholder="请输入">
                  <el-option
                    v-for="item in ctypelist"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
        </el-form-item>
        <el-form-item label="项目目的：" prop="purpose">
          <el-input v-model="infoform.purpose" placeholder="请输入" type="textarea" :rows="2"></el-input>
        </el-form-item>
        <el-form-item label="计划入组样本数：" prop="sampleCount">
          <el-input v-model="infoform.sampleCount" placeholder="请输入">
            <template slot="suffix">例</template>
          </el-input>
        </el-form-item>
        <el-form-item label="起始时间：" prop="beginTime">
          <el-date-picker type="date" placeholder="yyyy/mm/dd" v-model="infoform.beginTime"></el-date-picker>
        </el-form-item>
        <el-form-item label="截至时间：">
          <el-date-picker type="date" placeholder="yyyy/mm/dd" v-model="infoform.endTime"></el-date-picker>
        </el-form-item>
        <el-form-item label="计划经费：" prop="funds">
          <el-input v-model="infoform.funds" placeholder="请输入">
            <template slot="suffix">万</template>
          </el-input>
        </el-form-item>
        <el-form-item label="联系方式：">
          <el-input v-model="infoform.tel" placeholder="请输入电话号码"></el-input>
        </el-form-item>
        <el-form-item label="Email：">
          <el-input v-model="infoform.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveProject" size="medium">下一步</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="infoform infotable" v-if="current==1">
      <div class="standard">
        <div class="standard-title">
          <div class="condition">条件</div>
          <div class="clear">
            <el-button size="middle" @click="clear">清空</el-button>
          </div>
        </div>
        <div>
          <el-tree
            :data="treedata"
            node-key="id"
            ref="tree"
            default-expand-all
            :expand-on-click-node="false"
          >
            <div class="custom-tree-node" slot-scope="{ node, data }">
              <div class="tree-legic">
                <el-select v-model="data.logic" placeholder="逻辑关系" v-if='data.disabled || data.logic==null'>
                  <el-option
                    v-for="item in legiclist"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
                <el-button size="mini" @click="() => appendchild(node,data)">
                  <i class="iconfont el-icon-bioplus"></i>
                  {}
                </el-button>
                <el-button type="text" size="mini" @click="() => append(node,data)">
                  <i class="iconfont el-icon-bioplus"></i>
                </el-button>
                <el-select v-model="data.field" filterable
    remote
    reserve-keyword
    :remote-method="remoteMethod" placeholder="请选择字段"  @focus="fieldfocus()" @change="fieldchange(data)">
                  <el-option
                    v-for="item in zdlists"
                    :key="item.index"
                    :label="item.itemName"
                    :value="item.itemValue"
                  ></el-option>
                </el-select>

                <el-select v-model="data.condition" placeholder="条件">
                  <el-option
                    v-for="item in tjlist"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
                <span v-if="data.fieldType==2">
                  <el-input v-model="data.value"></el-input>
                  <span v-if='data.fieldUnit'>{{data.fieldUnit}}</span>
                </span>
                <span v-if="data.fieldType==1">
                  <el-select v-model="data.value">
                    <el-option
                    v-for="item in data.option"
                    :key="item.id"
                    :label="item.itemName"
                    :value="item.id"
                  ></el-option>
                  </el-select>
                </span>
              </div>
              <div class="delcont">
                <el-button type="text" size="mini" @click="() => remove(node, data)" v-if='data.disabled || data.logic==null'>
                  <i class="iconfont el-icon-biominus"></i>
                </el-button>
              </div>
            </div>
          </el-tree>
        </div>
      </div>
      <div class="input">
        <el-popover placement="bottom-start" width="400" trigger="click">
          <el-radio-group v-model="checkList" @change='inputChange'>
            <p v-for="(item,index) in inputlist" :key="index" style="padding-top:10px;">
              <el-radio :label="item.projectName"></el-radio>
            </p>
          </el-radio-group>
          <!-- <div class="input-btn" slot="reference">导入</div> -->
        </el-popover>
      </div>
      <div class="establish">
        <el-button type="primary" @click="establish" size="medium">创建</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import {project,dict} from 'api/index.js';
export default {
  data() {
    return {
      current: 0,
      infoform: {},
      checkList:[],
      ctypelist:[
        {
          id:1,
          name:'肺癌'
        },
        {
          id:2,
          name:'结直肠癌'
        },
        {
          id:3,
          name:'乳腺癌'
        },
        {
          id:4,
          name:'胃癌'
        },
        {
          id:5,
          name:'膀胱癌'
        },
      ],
      inforules: {
        projectName: [
          { required: true, message: "请输入项目名称", trigger: "blur" }
        ],
        projectPeople: [
          { required: true, message: "请输入项目负责人", trigger: "blur" }
        ],
        hospital: [
          { required: true, message: "请输入工作单位", trigger: "blur" }
        ],
        department: [
          { required: true, message: "请输入所属科室", trigger: "blur" }
        ],
        purpose: [
          { required: true, message: "请输入项目目的", trigger: "blur" }
        ],
        sampleCount: [
          { required: true, message: "请输入计划入组样本数", trigger: "blur" }
        ],
        beginTime: [
          {
            type: "date",
            required: true,
            message: "请选择开始时间",
            trigger: "blur"
          }
        ],
        funds: [
          { required: true, message: "请输入计划经费", trigger: "blur" }
        ],
        ctype: [
          { required: true, message: "请输入目标癌肿", trigger: "blur" }
        ]
      },
      tableData: [{}],
      inputlist: [
        {
          name: "肿瘤标志物的精准测量及分子机制 "
        },
        {
          name: "血液肿瘤的细胞异质性及其演化研究"
        }
      ],
      treedata: [
        {
          type: "",
          logic: "",
          field: "",
          condition: null,
          value: "",
          disabled:false,
          // children: [
          //   {
          //     logic: "and",
          //     field: "ctype",
          //     condition: 2,
          //     value: "2",
          //     type: "",
          //     children: [
          //       {
          //         logic: "and",
          //         field: "ctype",
          //         condition: 2,
          //         value: "2",
          //         type: ""
          //       },
          //       {
          //         logic: "and",
          //         field: "ctype",
          //         condition: 2,
          //         value: "2",
          //         type: ""
          //       }
          //     ]
          //   }
          // ]
        },
        // {
        //   logic: "and",
        //   field: "ctype",
        //   condition: 2,
        //   value: "2",
        //   type: "",
        //   children: [
        //     {
        //       logic: "and",
        //       field: "ctype",
        //       condition: 2,
        //       value: "2",
        //       type: ""
        //     },
        //     {
        //       logic: "and",
        //       field: "ctype",
        //       condition: 2,
        //       value: "2",
        //       type: ""
        //     }
        //   ]
        // }
      ],
      legiclist: [
        {
          name: "逻辑关系",
          id: ""
        },
        {
          name: "并",
          id: "and"
        },
        {
          name: "或",
          id: "or"
        }
      ],
      zdlist: [
        // {
        //   name: "逻辑关系",
        //   id: 0,
        //   option:[
        //     {
        //       name:1,
        //       id:1
        //     }
        //   ]
        // },
        // {
        //   name: "并",
        //   id: 1,
        //   option:[
        //     {
        //       name:2,
        //       id:2
        //     }
        //   ]
        // },
        // {
        //   name: "或",
        //   id: 2,
        //   option:[
        //     {
        //       name:3,
        //       id:3
        //     }
        //   ]
        // }
      ],
      zdlists:[],
      tjlist: [
        {
          name: "条件",
          id: 0
        },
        {
          name: "= =",
          id: 2
        },
        {
          name: "！=",
          id: 4
        },
        {
          name: "<",
          id: 3
        },
        {
          name: ">",
          id: 1
        },
        {
          name: "between",
          id: 5
        }
      ],
      childrenlist: {
        logic: "",
        field: "",
        condition: 0,
        value: "",
        type: "",
        disabled:true
      },
      id:1000
    };
  },
  methods: {
    clear(){
      this.treedata=[
        {
          type: "",
          logic: "",
          field: "",
          condition: null,
          value: "",
          disabled:false,
        }
      ]
      this.establish()
    },
    remoteMethod(query){
      let _this=this;
      _this.zdlists = [];
      if (query !== '') {
          // this.loading = true;
          setTimeout(() => {
            // this.loading = false;
            _this.zdlists = _this.zdlist.filter(item => {
              return item.itemName.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        }
    },
    fieldfocus(){
      this.zdlists=this.zdlist;
    },
    fieldchange(data){
        console.log(data);
      data.value=null;
      data.condition=null;
      data.fieldUnit=null;
      this.zdlist.map(item=>{
        if(data.field ==item.itemValue){
          data['fieldType']=item.fieldType;
          data['fieldUnit']=item.fieldUnit;
          if(item.fieldType==1){
            data['option']=item.itemList;
          }
        }
      })
    },
    appendchild(node, data) {
      const newChild = { id: this.id++,children: [] };
      for(let key in this.childrenlist){
        newChild[key]=this.childrenlist[key]
      }
      if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
    },
    append(node, data) {
      const newChild = { id: this.id++,children: [] };
      for(let key in this.childrenlist){
        newChild[key]=this.childrenlist[key]
      }
      this.$refs.tree.insertAfter(newChild, node);
    },
    remove(node, data) {
      this.$refs.tree.remove(node);
    },
    arrTostring(arr){
      arr.forEach(element => {
        if(element.option){
          element.option=JSON.stringify(element.option)

          console.log(element.children);
//          if(element.children.length>0){
//            this.arrTostring(element.children)
//          }
        }

      });
      return arr
    },
    stringToarr(string){
      string.forEach(element => {
        if(element.option){
          element.option=JSON.parse(element.option)
        }
        if(element.children && element.children.length>0){
          this.stringToarr(element.children)
        }
        if(element.fieldType==1){
          element.value=Number(element.value)
        }
        this.zdlist.map(item=>{
          if(element.field==item.itemValue){
            element.field=item.itemName
          }
        })
      });
      return string
    },
    establish(){
      let obj={
        projectName:this.infoform.projectName,
        projectId:this.$store.state.projectid,
        userId:this.$store.state.userId,
        list:this.arrTostring(this.treedata)
      }
      project.submitProStd(obj).then((res)=>{
        if(res.returnCode==0){
          console.log(res)
        }
      })
    },
    handleEdit() {
      this.tableData.push({});
    },
    handleDelete(row, index) {
      this.tableData.splice(index, 1);
    },
    saveProject(){
        this.$refs['form'].validate((valid) => {
        if(valid){
          let obj={
            createUserId:this.$store.state.userId
          }
          for(let key in this.infoform){
            obj[key]=this.infoform[key]
          }
          if(this.$store.state.edit){
            project.updateProject(obj).then((res)=>{
            if(res.returnCode==0){
              this.getInfoProject(this.$store.state.userId,this.$store.state.projectid)
              this.current += 1;
            }else{
              this.$message.error(res.msg)
            }
            })
          }else{
            project.saveProject(obj).then((res)=>{
            if(res.returnCode==0){
              this.$store.state.projectid=res.data.id;
              this.infoProject(this.$store.state.userId)
              this.current += 1;
            }else{
              this.$message.error(res.msg)
            }
        })
          }

        }else{
          return false
        }

      })

    },
    getAll(){
      dict.getAll().then((res)=>{
        if(res.returnCode==0){
          this.zdlist=res.data;
        }
      })
    },
    getInfoProject(createUserId,projectid){
      let obj={
        createUserId:createUserId,
        id:projectid
      }
      project.infoProject(obj).then((res)=>{
        if(res.returnCode==0){
            this.treedata=this.stringToarr(res.data.emodel.list);
            console.log(this.treedata)
            this.inputlist=res.data.emodels;
            console.log(this.inputlist)
        }
      })
    },
    infoProject(){
      let obj={
        id:this.$store.state.projectid
      }
      project.infoProject(obj).then((res)=>{
        if(res.returnCode==0){
            this.infoform=res.data;
        }
      })
    },
    inputChange(){
      if(this.checkList){
        this.inputlist.find(item=>{
            if(item.projectName==this.checkList){
              this.getInfoProject(this.$store.state.userId,item.projectId)
            }
        })
      }

    }
  },
  mounted(){
    this.getAll();
    if(this.$store.state.edit==true){
      this.infoProject()
    }
  }
};
</script>

