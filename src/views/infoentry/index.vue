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
  .dialog-inner {
    overflow: hidden;
    .choiceCarcinoma {
      width: 100px;
      height: 80px;
      padding: 10px;
      float: left;
      border: 1px solid $btncolor;
      border-radius: 6px;
      text-align: center;
      box-sizing: border-box;
      & > div {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: #ddd;
        margin: auto;
        color: #fff;
        i {
          font-size: 24px;
          vertical-align: middle;
          margin-top: 7px;
        }
        i.el-icon-biolung {
          font-size: 28px;
          vertical-align: middle;
          margin-top: 3px;
        }
      }
      & > div.caractive {
        background: $maincolor;
      }
      & > p {
        line-height: 36px;
      }
    }
    .choiceCarcinoma + .choiceCarcinoma {
      margin-left: 20px;
    }
  }
  .dialog-footer {
    text-align: center;
  }
  .input-inner {
    .input-title {
      font-size: 18px;
      font-weight: bold;
      line-height: 26px;
    }
    .downfile {
      width: 80px;
      height: 80px;
      border: 1px solid #ddd;
      margin: 20px;
      text-align: center;
      i {
        font-size: 45px;
        vertical-align: middle;
        margin-top: 20px;
        color: #076112;
      }
    }
    .choice-file {
      margin: 20px;
      overflow: hidden;
    }
  }
}
  

</style>

<template>
  <div class="contant">
    <div class="title">
      <i class="iconfont el-icon-biosign"></i>
      <span>数据列表</span>
    </div>
    <div class="btnlist">
      <div class="btn-left">
        <el-button
          type="primary"
          icon="iconfont el-icon-bioadd"
          size="medium"
          @click="addPatient"
        >新建</el-button>
        <!-- <el-button type="primary" icon="iconfont el-icon-bioadd" size="medium" @click="inputInfo">导入</el-button> -->
      </div>
      <div class="btn-right">
        <div>
          <el-button size="small" plain :class="all?'acstate':''" @click="getPatient()">全部</el-button>
          <el-button size="small" plain :class="ing?'acstate':''" @click="getPatient(1)">进行中</el-button>
          <el-button size="small" plain :class="done?'acstate':''" @click="getPatient(14)">已完成</el-button>
        </div>
        <div>
          <el-input placeholder="请选择登记号、癌种" v-model="selectinner" size="small">
            <el-select v-model="select" slot="prepend" placeholder="请选择...">
              <el-option label="登记号" value="1"></el-option>
              <el-option label="癌种" value="2"></el-option>
            </el-select>
            <el-button slot="append" icon="iconfont el-icon-biosearch" @click="search"></el-button>
          </el-input>
        </div>
      </div>
    </div>
    <div class="info-table">
      <el-table :data="tableData" height="550" border style="width: 100%">
        <el-table-column prop="number" label="登记号"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column label="性别">
          <template slot-scope="scope">
            <span>{{scope.row.sex | sexfilter}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column label="癌种">
          <template slot-scope="scope">
            <span>{{scope.row.ctype | ctypefilter}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="状态"></el-table-column>
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
    <el-dialog title="请选择癌肿" :visible.sync="choiceCarcinoma" width="620px">
      <div class="dialog-inner">
        <div
          class="choiceCarcinoma"
          v-for="(item,index) in carcinoma"
          :key="index"
          @click="choiceCancer(item,index)"
        >
          <div :class="choiceNum==index?'caractive':''">
            <i :class="item.icon"></i>
          </div>
          <p>{{item.name}}</p>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="choice" size="small">确 定</el-button>
        <el-button @click="choiceCarcinoma = false" size="small">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="导入文件" :visible.sync="inputModel" width="620px">
      <div class="input-inner">
        <div class="input-title">请下载自动导入模板</div>
        <div class="downfile">
          <i class="iconfont el-icon-bioExcel"></i>
        </div>
        <div class="input-title">请上传文件</div>
        <div class="choice-file">
          <div style="width:200px;float:left;">
            <el-input v-model="input" size="medium"></el-input>
          </div>
          <el-button size="medium">浏览</el-button>
          <span></span>
          <div style="float:right;">
            <el-button size="medium">上传文件</el-button>
          </div>
        </div>
        <div class="choice-file">
          <span></span>
          <div style="float:right;">
            <el-button size="medium" style="width:98px;" @click="readInfo">查看</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { infoentry } from "api/index.js";
export default {
  data() {
    return {
      pageSize: 10,
      current: 1,
      total: 0,
      cancerid: 0,
      all: true,
      ing: false,
      done: false,
      select:'',
      selectinner:'',
      tableData: [
        {
          registration: "201901032578",
          name: "111",
          sex: "男",
          age: "20",
          carcinoma: "肺癌"
        },
        {
          registration: "201901032578",
          name: "111",
          sex: "男",
          age: "20",
          carcinoma: "肺癌"
        },
        {
          registration: "201901032578",
          name: "111",
          sex: "男",
          age: "20",
          carcinoma: "肺癌"
        },
        {
          registration: "201901032578",
          name: "111",
          sex: "男",
          age: "20",
          carcinoma: "肺癌"
        }
      ],
      choiceCarcinoma: false,
      carcinoma: [
        {
          name: "肺癌",
          icon: "iconfont el-icon-biolung",
          rightclass: "biolung",
          cancerid: 1
        },
        {
          name: "结直肠癌",
          icon: "iconfont el-icon-biocolorectum",
          rightclass: "biocolorectum",
          cancerid: 2
        },
        {
          name: "乳腺癌",
          icon: "iconfont el-icon-biobreast",
          rightclass: "biobreast",
          cancerid: 3
        },
        {
          name: "胃癌",
          icon: "iconfont el-icon-biogastric",
          rightclass: "biogastric",
          cancerid: 4
        },
        {
          name: "膀胱癌",
          icon: "iconfont el-icon-biocarcinoma",
          rightclass: "biocarcinoma",
          cancerid: 5
        }
      ],
      choiceNum: null,
      inputModel: false
    };
  },
  filters: {
    sexfilter(val) {
      if (val == 0) {
        return "男";
      } else if (val == 1) {
        return "女";
      }
    },
    ctypefilter(val) {
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
    search(){
      if(this.ing){
        this.getPatient(1)
      }else if(this.done){
        this.getPatient(14)
      }else{
        this.getPatient()
      }
    },
    handleEdit(index, row) {
      this.$store.state.entryState = row.state;
      this.$store.state.patientid = row.id;
      this.$store.state.edit = true;
      this.$router.push("/infoentry/addpatient?type=basicInfo");
    },
    handleDelete(index, row) {
      let obj = {
        id: row.id
      };
      infoentry.delPatient(obj).then(res => {
        if (res.returnCode == 0) {
          this.getPatient();
        }
      });
    },
    addPatient() {
      this.choiceCarcinoma = true;
    },
    choice() {
      this.choiceCarcinoma = false;
      this.$store.state.cancerid = this.cancerid;
      this.$store.state.entryState = 0;
      this.$store.state.tabState = 1;
      this.$store.state.edit = false;
      this.$router.push("/infoentry/addpatient?type=basicInfo");
    },
    inputInfo() {
      this.inputModel = true;
    },
    readInfo() {
      this.$router.push("/infoentry/upinfo");
    },
    choiceCancer(item, index) {
      this.choiceNum = index;
      this.cancerid = item.cancerid;
    },
    handleCurrentChange(val) {
      //current改变
      this.current = val;
      this.getPatient();
    },
    handleSizeChange(val) {
      //pageSize改变
      this.pageSize = val;
      this.getPatient();
    },
    getPatient(state = null) {
      //获取信息列表
      let obj = {
          userId: this.$store.state.userId
        },
        pagelist = {
          offset: this.current,
          size: this.pageSize
        };
      this.all = true;
      if (state != null) {
        obj["state"] = state;
        if (state == 1) {
          this.all = false;
          this.done = false;
          this.ing = true;
        } else if (state == 14) {
          this.all = false;
          this.done = true;
          this.ing = false;
        }
      } else {
        this.done = false;
        this.ing = false;
      }
      if(this.select==1){
        obj['number']=this.selectinner
      }else if(this.select==2){
        obj['ctype']=this.selectinner
      }
      this.tableData = [];
      infoentry.getPatient(pagelist, obj).then(res => {
        if (res.returnCode == 0) {
          this.tableData = res.data.patientList;
          this.total = res.data.total;
        }
      });
    }
  },
  created() {
    this.getPatient();
  }
};
</script>

