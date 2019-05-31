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
  .infotable {
    .edit {
      color: #3f51b5;
    }
    .delete {
      color: #e51c23;
      .iconfont {
        font-size: 24px;
      }
    }
    .input {
      margin-top: 20px;
      .input-btn {
        width: 80px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background: #e2e2e2;
        border: 1px solid #bbb;
        border-radius: 5px;
        font-size: 14px;
      }
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
.establish{
    margin: 20px auto;
    text-align: center;
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
        <el-form-item label="项目名称：" prop="projectname">
          <el-input v-model="infoform.projectname" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="项目负责人：" prop="leader">
          <el-input v-model="infoform.leader" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="工作单位：" prop="organization">
          <el-input v-model="infoform.organization" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="所属科室：" prop="administrative">
          <el-input v-model="infoform.administrative" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="项目目的：" prop="purpose">
          <el-input v-model="infoform.purpose" placeholder="请输入" type="textarea" :rows="2"></el-input>
        </el-form-item>
        <el-form-item label="计划入组样本数：" prop="samplenum">
          <el-input v-model="infoform.samplenum" placeholder="请输入">
            <template slot="suffix">例</template>
          </el-input>
        </el-form-item>
        <el-form-item label="起始时间：" prop="startdate">
          <el-date-picker type="date" placeholder="yyyy/mm/dd" v-model="infoform.startdate"></el-date-picker>
        </el-form-item>
        <el-form-item label="截至时间：">
          <el-date-picker type="date" placeholder="yyyy/mm/dd" v-model="infoform.enddate"></el-date-picker>
        </el-form-item>
        <el-form-item label="计划经费：" prop="expenditure">
          <el-input v-model="infoform.expenditure" placeholder="请输入">
            <template slot="suffix">万</template>
          </el-input>
        </el-form-item>
        <el-form-item label="联系方式：">
          <el-input v-model="infoform.phone" placeholder="请输入电话号码"></el-input>
        </el-form-item>
        <el-form-item label="Email：">
          <el-input v-model="infoform.Email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="next" size="medium">下一步</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="infoform infotable" v-if="current==1">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="操作" width="80px">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="text"
              class="edit"
              icon="iconfont el-icon-bioplus"
              @click="handleEdit(scope.$index, scope.row)"
            ></el-button>
            <el-button
              size="medium"
              type="text"
              class="delete"
              icon="iconfont el-icon-biominus"
              @click="handleDelete(scope.$index, scope.row)"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column prop="registration" label="逻辑关系">
          <template slot-scope="scope">
            <el-select v-model="value" placeholder="请选择">
              <el-option label="请选择" value="0"></el-option>
              <el-option label="并" value="1"></el-option>
              <el-option label="或" value="2"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="字段信息">
          <template slot-scope="scope">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="sex" label="筛选">
          <template slot-scope="scope">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="内容"></el-table-column>
      </el-table>
      <div class="input">
        <el-popover placement="bottom-start" width="400" trigger="click">
          <el-checkbox-group v-model="checkList">
              <p v-for='(item,index) in inputlist' :key='index' style="padding-top:10px;">
                <el-checkbox :label="item.name" ></el-checkbox>
            </p>
          </el-checkbox-group>
          <div class="input-btn" slot="reference">导入</div>
        </el-popover>
      </div>
      <div class="establish">
          <el-button type="primary" @click="establish" size="medium">创建</el-button>
      </div>
    </div>
    
  </div>
</template>
<script>
export default {
  data() {
    return {
      current: 0,
      infoform: {},
      inforules: {
        projectname: [
          { required: true, message: "请输入项目名称", trigger: "blur" }
        ],
        leader: [
          { required: true, message: "请输入项目负责人", trigger: "blur" }
        ],
        organization: [
          { required: true, message: "请输入工作单位", trigger: "blur" }
        ],
        administrative: [
          { required: true, message: "请输入所属科室", trigger: "blur" }
        ],
        purpose: [
          { required: true, message: "请输入项目目的", trigger: "blur" }
        ],
        samplenum: [
          { required: true, message: "请输入计划入组样本数", trigger: "blur" }
        ],
        startdate: [
          {
            type: "date",
            required: true,
            message: "请选择开始时间",
            trigger: "blur"
          }
        ],
        expenditure: [
          { required: true, message: "请输入计划经费", trigger: "blur" }
        ]
      },
      tableData: [{}],
      inputlist:[
          {
              name:'肿瘤标志物的精准测量及分子机制 '
          },{
              name:'血液肿瘤的细胞异质性及其演化研究'
          }
      ]
    };
  },
  methods: {
    next() {
      this.current += 1;
    },
    handleEdit() {
      this.tableData.push({});
    },
    handleDelete(row, index) {
      this.tableData.splice(index, 1);
    }
  }
};
</script>

