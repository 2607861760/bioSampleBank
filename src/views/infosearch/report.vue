<style lang="scss" scoped>
@import "../../base/css/base-var.scss";
.process {
  background: #fff;
  border-radius: 6px;
  overflow-y: scroll;
  max-height: 800px;
  .process-main {
    padding: 0 40px 20px;
    .main-title {
      border-left: 2px solid $maincolor;
      height: 20px;
      padding-left: 10px;
      margin-top: 10px;
    }
    .main-info {
      margin-bottom: 30px;
      overflow: hidden;
      & > div {
        display: flex;
        padding: 15px 10px 0;
        & > div {
          flex: 1;
          float: left;
          .info-text {
            padding-left: 10px;
          }
        }
      }
      & > div.el-divider {
        padding: 0;
      }
       
      
    }
    .main-breast{
      display: block;
      .main-ver{
        width:50%;
        float: left;
        border-right:1px solid #dcdfe6;
        box-sizing: border-box;
        font-size: 16px;
        font-weight: normal;
        p{
          width: 100%;
          padding: 15px 10px 0;
          box-sizing: border-box;
        }
      }
    }
    .stitle {
      color: $maincolor;
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
  .infoNum {
    color: $maincolor;
    font-size: 20px;
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
        <span>详细情况</span>
        <div style="float:right;">
          <el-popover placement="bottom" width="299" trigger="click">
            <div>
              <p>
                最多可选12项（当前选择
                <span class="infoNum">{{checkNum}}</span>
                项）
              </p>
              <el-checkbox-group v-model="checkedcol" @change="changecheck">
                <div v-for="(item,index) in collist" :key="index" style="float:left;width:100px;">
                  <el-checkbox
                    :label="item.prop"
                    :checked="item.checked"
                    :disabled="checkDis(item)"
                  >{{item.label}}</el-checkbox>
                </div>
              </el-checkbox-group>
            </div>
            <el-button type="primary" size="medium" slot="reference">
              自定义
              <i class="iconfont el-icon-biotag"></i>
            </el-button>
          </el-popover>

          <!-- <el-button type="primary" size="medium">
            导出
            <i class="iconfont el-icon-biooutput"></i>
          </el-button> -->
        </div>
      </div>
      <div class="process-main">
        <div class="main-title" v-if="checkState.basic">基本信息</div>
        <div class="main-info" v-if="checkState.basic">
          <div>
            <div>
              <span class="info-label">登记号：</span>
              <span class="info-text">{{basicform.number}}</span>
            </div>
            <div>
              <span class="info-label">登记时间：</span>
              <span class="info-text">{{basicform.rdate | dateFilter}}</span>
            </div>
            <div>
              <span class="info-label">性别：</span>
              <span class="info-text">{{basicform.sex}}</span>
            </div>
            <div>
              <span class="info-label">年龄：</span>
              <span class="info-text">{{basicform.age}}周岁</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">国籍：</span>
              <span class="info-text">{{basicform.nationality}}</span>
            </div>
            <div>
              <span class="info-label">民族：</span>
              <span class="info-text">{{basicform.nation}}</span>
            </div>
            <div>
              <span class="info-label">血型：</span>
              <span class="info-text">{{basicform.btype}}</span>
            </div>
            <div>
              <span class="info-label">RH血型：</span>
              <span class="info-text">{{basicform.rh | rhFilter}}</span>
            </div>
          </div>
        </div>
        <div class="main-title" v-if="checkState.doctor">就诊信息</div>
        <div class="main-info" v-if="checkState.doctor">
          <div>
            <div>
              <span class="info-label">入院日期：</span>
              <span class="info-text">{{doctorform.intime | dateFilter}}</span>
            </div>
            <div>
              <span class="info-label">入院科室：</span>
              <span class="info-text">{{doctorform.indepartment}}</span>
            </div>
            <div>
              <span class="info-label">出院日期：</span>
              <span class="info-text">{{doctorform.outtime | dateFilter}}</span>
            </div>
            <div>
              <span class="info-label">出院科室：</span>
              <span class="info-text">{{doctorform.outdepartment}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">就诊医院：</span>
              <span class="info-text">{{doctorform.vhospital}}</span>
            </div>
            <div>
              <span class="info-label">门诊日期：</span>
              <span class="info-text">{{doctorform.mzdate | dateFilter}}</span>
            </div>
            <div>
              <span class="info-label">门诊科室：</span>
              <span class="info-text">{{doctorform.mzdepartment}}</span>
            </div>
            <div>
              <span class="info-label">门诊医院：</span>
              <span class="info-text">{{doctorform.mzhospital}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">急诊日期：</span>
              <span class="info-text">{{doctorform.emdate | dateFilter}}</span>
            </div>
            <div>
              <span class="info-label">急诊科室：</span>
              <span class="info-text">{{doctorform.emdepartment}}</span>
            </div>
            <div>
              <span class="info-label">急诊医院：</span>
              <span class="info-text">{{doctorform.emhospital}}</span>
            </div>
            <div>
              <span class="info-label"></span>
              <span class="info-text"></span>
            </div>
          </div>
        </div>
        <div class="main-title" v-if="checkState.present">现病史</div>
        <div class="main-info" v-if="checkState.present">
          <div>
            <div>
              <span class="info-label" v-if="cancerid==2">肠癌相关症状：</span>
              <span class="info-label" v-if="cancerid==3">乳腺癌相关症状：</span>
              <span class="info-text">{{presentform.symptom}}</span>
            </div>
            <div>
              <span class="info-label">初诊转移部位：</span>
              <span class="info-text">{{presentform.vmetastatic}}</span>
            </div>
            <div>
              <span class="info-label" v-if="cancerid==2">原发灶位置：</span>
              <span class="info-text" v-if="cancerid==2">{{presentform.dprimary}}</span>
            </div>
            <div>
              <span class="info-label"></span>
              <span class="info-text"></span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">体重改变时间：</span>
              <span class="info-text">{{presentform.wctime | dateFilter}}</span>
            </div>
            <div>
              <span class="info-label">体重改变数值：</span>
              <span class="info-text">{{presentform.wcvalue}}</span>
            </div>
            <div>
              <span class="info-label">靶向用药开始时间：</span>
              <span class="info-text">{{presentform.drugdate | dateFilter}}</span>
            </div>
            <div>
              <span class="info-label">药物名称：</span>
              <span class="info-text">{{presentform.drugname}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">手术时间：</span>
              <span class="info-text">{{presentform.shtime | dateFilter}}</span>
            </div>
            <div>
              <span class="info-label">手术名称：</span>
              <span class="info-text">{{presentform.shname}}</span>
            </div>
            <div>
              <span class="info-label">病理组织来源：</span>
              <span class="info-text">{{presentform.blorigin}}</span>
            </div>
            <div>
              <span class="info-label">病理类型：</span>
              <span class="info-text">{{presentform.shbltype}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">化疗开始时间：</span>
              <span class="info-text">{{presentform.chdate | dateFilter}}</span>
            </div>
            <div>
              <span class="info-label">化疗方案：</span>
              <span class="info-text">{{presentform.chprogramme}}</span>
            </div>
            <div>
              <span class="info-label">化疗目的：</span>
              <span class="info-text">{{presentform.chgoal}}</span>
            </div>
            <div>
              <span class="info-label">化疗疗效评价：</span>
              <span class="info-text">{{presentform.chevaluation}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">放疗开始时间：</span>
              <span class="info-text">{{presentform.rtdate | dateFilter}}</span>
            </div>
            <div>
              <span class="info-label">放疗次数：</span>
              <span class="info-text">{{presentform.rtnumber}}</span>
            </div>
            <div>
              <span class="info-label">放疗目的：</span>
              <span class="info-text">{{presentform.rtgoal}}</span>
            </div>
            <div v-if="cancerid==3">
              <span class="info-label">放疗疗效评价：</span>
              <span class="info-text">{{presentform.rtevaluation}}</span>
            </div>
            <div v-if="cancerid==2"></div>
          </div>
        </div>
        <div class="main-title" v-if="checkState.family">家族史</div>
        <div class="main-info" v-if="checkState.family">
          <div>
            <div>
              <span class="info-label">家族史分类：</span>
              <span class="info-text">{{familyform.fttype}}</span>
            </div>
            <div>
              <span class="info-label">患肿瘤总人数：</span>
              <span class="info-text">{{familyform.cpnum}}</span>
            </div>
            <div>
              <span class="info-label">展示家族史：</span>
              <span class="info-text">{{familyform.isft | isftFilter}}</span>
            </div>
            <div>
              <span class="info-label"></span>
              <span class="info-text"></span>
            </div>
          </div>
          <div>
            <el-table :data="familytable" height="300" border style="width: 100%">
              <el-table-column type='index' width='50' label="序号"></el-table-column>
              <el-table-column prop="relationship" label="亲属关系"></el-table-column>
              <el-table-column prop="cpartandtype" label="肿瘤部位及类型"></el-table-column>
              <el-table-column prop="diseaseage" label="患癌年龄"></el-table-column>
            </el-table>
          </div>
          <div>
            <div>
              <span class="info-label">家系图：</span>
              <span class="info-text">{{familyform.rb | rbFilter}}</span>
              <span class="info-text">{{familyform.ac | acFilter}}</span>
            </div>
          </div>
        </div>
        <div class="main-title" v-if="checkState.check">基本检查</div>
        <div class="main-info" v-if="checkState.check">
          <div class="stitle">体格检查</div>
          <div>
            <div>
              <span class="info-label">检查日期：</span>
              <span class="info-text">{{checkform.tdate | dateFilter}}</span>
            </div>
            <div>
              <span class="info-label">身高：</span>
              <span class="info-text">{{checkform.height}}</span>
            </div>
            <div>
              <span class="info-label">体重：</span>
              <span class="info-text">{{checkform.weight}}</span>
            </div>
            <div>
              <span class="info-label">体重指数（BMI）：</span>
              <span class="info-text">{{checkform.bmi}}</span>
            </div>
          </div>
          <div v-if="cancerid==3">
            <div>
              <span class="info-label">乳房位置：</span>
              <span class="info-text">{{checkform.breastPos}}</span>
            </div>
            <div>
              <span class="info-label">皮肤表皮：</span>
              <span class="info-text">{{checkform.skinEpi}}</span>
            </div>
            <div>
              <span class="info-label">是否有肿块：</span>
              <span class="info-text">{{checkform.lump | isftFilter}}</span>
            </div>
            <div>
              <span class="info-label">乳头情况：</span>
              <span class="info-text">{{checkform.nippleSit}}</span>
            </div>
          </div>
          <div v-if="cancerid==3">
            <div>
              <span class="info-label">是否溢液：</span>
              <span class="info-text">{{checkform.overflow | isftFilter}}</span>
            </div>
            <div>
              <span class="info-label">溢液方式：</span>
              <span class="info-text">{{checkform.overflow_pos}}</span>
            </div>
            <div>
              <span class="info-label">溢液范围：</span>
              <span class="info-text">{{checkform.overflow_range}}</span>
            </div>
            <div>
              <span class="info-label">乳晕颜色：</span>
              <span class="info-text">{{checkform.areolaColor}}</span>
            </div>
          </div>
          <div v-if="cancerid==3">
            <div>
              <span class="info-label">是否湿疹样改变：</span>
              <span class="info-text">{{checkform.eczemaLike | isftFilter}}</span>
            </div>
            <div>
              <span class="info-label">是否有区域淋巴结：</span>
              <span class="info-text">{{checkform.lymphNode | isftFilter}}</span>
            </div>
            <div>
              <span class="info-label"></span>
              <span class="info-text"></span>
            </div>
            <div>
              <span class="info-label"></span>
              <span class="info-text"></span>
            </div>
          </div>
          <el-divider></el-divider>
          <div class="stitle">血常规</div>
          <div>
            <div>
              <span class="info-label">检查日期：</span>
              <span class="info-text">{{checkform.bloodexaminationdate}}</span>
            </div>
            <div>
              <span class="info-label">白细胞：</span>
              <span class="info-text">{{checkform.xwhitec}}10^9/L</span>
            </div>
            <div>
              <span class="info-label">红细胞：</span>
              <span class="info-text">{{checkform.xredc}}10^12/L</span>
            </div>
            <div>
              <span class="info-label">红细胞压积：</span>
              <span class="info-text">{{checkform.lymphocyte}}L/L</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">红细胞平均体积：</span>
              <span class="info-text">{{checkform.redcv}}fL</span>
            </div>
            <div>
              <span class="info-label">嗜碱性粒细胞：</span>
              <span class="info-text">{{checkform.bas}}10^9/L</span>
            </div>
            <div>
              <span class="info-label">嗜碱性粒细胞比率：</span>
              <span class="info-text">{{checkform.basrate}}%</span>
            </div>
            <div>
              <span class="info-label">中性细胞：</span>
              <span class="info-text">{{checkform.neut}}10^9/L</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">淋巴细胞：</span>
              <span class="info-text">{{checkform.lymphocyte}}10^9/L</span>
            </div>
            <div>
              <span class="info-label">淋巴细胞比率：</span>
              <span class="info-text">{{checkform.lymrate}}%</span>
            </div>
            <div>
              <span class="info-label">中性细胞比率：</span>
              <span class="info-text">{{checkform.neutrate}}%</span>
            </div>
            <div>
              <span class="info-label">嗜酸性粒细胞：</span>
              <span class="info-text">{{checkform.eos}}10^9/L</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">嗜酸性粒细胞比率：</span>
              <span class="info-text">{{checkform.eosrate}}%</span>
            </div>
            <div>
              <span class="info-label">单核细胞：</span>
              <span class="info-text">{{checkform.monocyte}}10^9/L</span>
            </div>
            <div>
              <span class="info-label">单核细胞比率：</span>
              <span class="info-text">{{checkform.monrate}}%</span>
            </div>
            <div>
              <span class="info-label">血小板：</span>
              <span class="info-text">{{checkform.platelet}}10^9/L</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">血小板压积：</span>
              <span class="info-text">{{checkform.pct}}%</span>
            </div>
            <div>
              <span class="info-label">血小板平均体积：</span>
              <span class="info-text">{{checkform.plateletv}}fL</span>
            </div>
            <div>
              <span class="info-label">大型血小板比率：</span>
              <span class="info-text">{{checkform.bigpctrate}}%</span>
            </div>
            <div>
              <span class="info-label">血红蛋白：</span>
              <span class="info-text">{{checkform.cruorin}}g/L</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">随机血糖：</span>
              <span class="info-text">{{checkform.rbg}}fL</span>
            </div>
            <div>
              <span class="info-label"></span>
              <span class="info-text"></span>
            </div>
            <div>
              <span class="info-label"></span>
              <span class="info-text"></span>
            </div>
            <div>
              <span class="info-label"></span>
              <span class="info-text"></span>
            </div>
          </div>
          <el-divider></el-divider>
          <div class="stitle">便常规</div>
          <div>
            <div>
              <span class="info-label">检查日期：</span>
              <span class="info-text">{{checkform.bdate | dateFilter}}</span>
            </div>
            <div>
              <span class="info-label">颜色：</span>
              <span class="info-text">{{checkform.colour}}</span>
            </div>
            <div>
              <span class="info-label">性状：</span>
              <span class="info-text">{{checkform.shape}}</span>
            </div>
            <div>
              <span class="info-label">白细胞：</span>
              <span class="info-text">{{checkform.bwhitec}}HP</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">红细胞：</span>
              <span class="info-text">{{checkform.bredc}}HP</span>
            </div>
            <div>
              <span class="info-label">便吞噬细胞：</span>
              <span class="info-text">{{checkform.bphagocyte}}LP</span>
            </div>
            <div>
              <span class="info-label">脂肪球：</span>
              <span class="info-text">{{checkform.fatglobule}}HP</span>
            </div>
            <div>
              <span class="info-label">隐血试验：</span>
              <span class="info-text">{{checkform.obt}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">寄生虫：</span>
              <span class="info-text">{{checkform.parasite}}</span>
            </div>
            <div>
              <span class="info-label"></span>
              <span class="info-text"></span>
            </div>
            <div>
              <span class="info-label"></span>
              <span class="info-text"></span>
            </div>
            <div>
              <span class="info-label"></span>
              <span class="info-text"></span>
            </div>
          </div>
          <el-divider></el-divider>
          <div class="stitle">肿瘤标志物</div>
          <div>
            <div>
              <span class="info-label">检查日期：</span>
              <span class="info-text">{{checkform.tagdate | dateFilter}}</span>
            </div>
            <div>
              <span class="info-label">糖类抗原CA-199：</span>
              <span class="info-text">{{checkform.ca199}}kU/L</span>
            </div>
            <div>
              <span class="info-label">糖类抗原CA-724：</span>
              <span class="info-text">{{checkform.ca724}}kU/L</span>
            </div>
            <div>
              <span class="info-label">癌胚抗原（CEA）：</span>
              <span class="info-text">{{checkform.cea}}μg/L</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">神经元特异性烯醇化酶（NSE）：</span>
              <span class="info-text">{{checkform.nse}}μg/L</span>
            </div>
            <div>
              <span class="info-label">糖类抗原CA-125：</span>
              <span class="info-text">{{checkform.ca125}}kU/L</span>
            </div>
            <div>
              <span class="info-label">糖类抗原CA-242：</span>
              <span class="info-text">{{checkform.ca242}}kU/L</span>
            </div>
            <div>
              <span class="info-label">甲胎蛋白（AFP）：</span>
              <span class="info-text">{{checkform.afp}}μg/L</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">糖类抗原CA-153：</span>
              <span class="info-text">{{checkform.ca153}}kU/L</span>
            </div>
            <div>
              <span class="info-label"></span>
              <span class="info-text"></span>
            </div>
            <div>
              <span class="info-label"></span>
              <span class="info-text"></span>
            </div>
            <div>
              <span class="info-label"></span>
              <span class="info-text"></span>
            </div>
          </div>
          <el-divider v-if="cancerid==2"></el-divider>
          <div class="image-box" v-if="cancerid==2">
            <div>
              <div class="stitle">CT图像：
                <div style="width:160px;height:105px;margin-left: 55px;">
                  <img :src='checkform.ct' style="width:100%;height:100%;">
                </div>
              </div>
            </div>
            <div>
              <div class="stitle">PET-CT图像：
                <div style="width:160px;height:105px;margin-left: 80px;">
                  <img :src='checkform.pet' style="width:100%;height:100%;">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="main-title" v-if="checkState.assist && cancerid==3">辅助检查</div>
        <div class="main-info main-breast" v-if="checkState.assist && cancerid==3">
          <h5 class='main-ver'>
            <p class="stitle" style="margin-top:0;">乳腺钼靶X线摄影检查：</p>
            <p>
              <span class="info-label">检查时间：</span>
              <span class="info-text">{{assistform.mammoDate}}</span>
            </p>
            <p>
              <span class="info-label">有无异常情况：</span>
              <span class="info-text">{{assistform.abnormal | isftFilter}}</span>
            </p>
            <p>
              <span class="info-label">钙化：</span>
              <span class="info-text">{{assistform.calcification}}</span>
            </p>
            <p>
              <span class="info-label">肿物边缘：</span>
              <span class="info-text">{{assistform.massEdge}}</span>
            </p>
            <p>
              <span class="info-label">其他情况：</span>
              <span class="info-text">{{assistform.other}}</span>
            </p>
          </h5>
          <h5 class='main-ver'>
            <p class="stitle">乳腺MRI检查：</p>
            <p>
              <span class="info-label">检查时间：</span>
              <span class="info-text">{{assistform.mriDate}}</span>
            </p>
            <p>
              <span class="info-label">乳腺MRI征象：</span>
              <span class="info-text">{{assistform.mriSign}}</span>
            </p>
            <p>
              <span class="info-label">BI-RADS分类：</span>
              <span class="info-text">{{assistform.biRads}}</span>
            </p>
          </h5>
        </div>
        <div class="main-title" v-if="checkState.endoscope && cancerid==2">内镜检查</div>
        <div class="main-info" v-if="checkState.endoscope && cancerid==2">
          <div>
            <div>
              <span class="info-label">检查名称：</span>
              <span class="info-text">{{endoscopeform.njname}}</span>
            </div>
            <div>
              <span class="info-label">检查日期：</span>
              <span class="info-text">{{endoscopeform.njdate | dateFilter}}</span>
            </div>
            <div>
              <span class="info-label">肠镜能否通过：</span>
              <span class="info-text">{{endoscopeform.ispass | isftFilter}}</span>
            </div>
            <div>
              <span class="info-label">肿瘤位置：</span>
              <span class="info-text">{{endoscopeform.tumloc}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">肠镜占肠壁：</span>
              <span class="info-text">{{endoscopeform.proportion}}</span>
            </div>
            <div>
              <span class="info-label">肿瘤大小：</span>
              <span class="info-text">{{endoscopeform.tumsize}}</span>
            </div>
            <div>
              <span class="info-label">肿瘤下缘距肛缘距离：</span>
              <span class="info-text">{{endoscopeform.distance}}</span>
            </div>
            <div>
              <span class="info-label">是否有息肉：</span>
              <span class="info-text">{{endoscopeform.ispolyp | isftFilter}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">息肉数量：</span>
              <span class="info-text">{{endoscopeform.polypnum}}</span>
            </div>
            <div>
              <span class="info-label"></span>
              <span class="info-text"></span>
            </div>
            <div>
              <span class="info-label"></span>
              <span class="info-text"></span>
            </div>
            <div>
              <span class="info-label"></span>
              <span class="info-text"></span>
            </div>
          </div>
        </div>
        <div class="main-title" v-if="checkState.pathology">病理诊断结果</div>
        <div class="main-info" v-if="checkState.pathology">
          <div>
            <div>
              <span class="info-label">检查日期：</span>
              <span class="info-text">{{pathologyform.date | dateFilter}}</span>
            </div>
            <div>
              <span class="info-label">病理号：</span>
              <span class="info-text">{{pathologyform.bnum}}</span>
            </div>
            <div>
              <span class="info-label">病理标本类型：</span>
              <span class="info-text">{{pathologyform.btype}}</span>
            </div>
            <div>
              <span class="info-label">电子切片扫描：</span>
              <span class="info-text">
                <img :src='pathologyform.isscan' style="width:160px;height:105px;">
              </span>
            </div>
          </div>
          <div>
            <div v-if="cancerid==2">
              <span class="info-label">肿瘤部位：</span>
              <span class="info-text">{{pathologyform.tumloc}}</span>
            </div>
            <div v-if="cancerid==3">
              <span class="info-label">检测标本：</span>
              <span class="info-text">{{pathologyform.testSpecimen}}</span>
            </div>
            <div>
              <span class="info-label">组织学类型：</span>
              <span class="info-text">{{pathologyform.htype}}</span>
            </div>
            <div>
              <span class="info-label">组织学分级：</span>
              <span class="info-text">{{pathologyform.hgrade}}</span>
            </div>
            <div>
              <span class="info-label">分化程度：</span>
              <span class="info-text">{{pathologyform.degree}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">既往用药史：</span>
              <span class="info-text">{{pathologyform.pmh}}</span>
            </div>
            <div>
              <span class="info-label">是否转移：</span>
              <span class="info-text">{{pathologyform.istransfer | isftFilter}}</span>
            </div>
            <div>
              <span class="info-label">是否复发：</span>
              <span class="info-text">{{pathologyform.isrelapse | isftFilter}}</span>
            </div>
            <div v-if="cancerid==2">
              <span class="info-label">临床分期：</span>
              <span class="info-text">{{pathologyform.clinicalStage}}</span>
            </div>
            <div v-if="cancerid==3">
              <span class="info-label">脉管侵犯：</span>
              <span class="info-text">{{pathologyform.vasInvasion}}</span>
            </div>
          </div>
          <div v-if="cancerid==2">
            <div>
              <span class="info-label">pTNM：</span>
              <span class="info-text">{{pathologyform.ptnm}}</span>
            </div>
            <div>
              <span class="info-label">pT：</span>
              <span class="info-text">{{pathologyform.pt}}</span>
            </div>
            <div>
              <span class="info-label">pN：</span>
              <span class="info-text">{{pathologyform.pn}}</span>
            </div>
            <div>
              <span class="info-label">pM：</span>
              <span class="info-text">{{pathologyform.pm}}</span>
            </div>
          </div>
          <div v-if="cancerid==3">
            <div>
              <span class="info-label">合并原位癌：</span>
              <span class="info-text">{{pathologyform.combineCancer}}</span>
            </div>
            <div>
              <span class="info-label">肿瘤分期：</span>
              <span class="info-text">{{pathologyform.tumorStage}}</span>
            </div>
            <div>
              <span class="info-label">TNM分期：</span>
              <span class="info-text">{{pathologyform.tnm}}</span>
            </div>
            <div>
              <span class="info-label">T分期：</span>
              <span class="info-text">{{pathologyform.t}}</span>
            </div>
          </div>
          <div v-if="cancerid==3">
            <div>
              <span class="info-label">cN分期：</span>
              <span class="info-text">{{pathologyform.cn}}</span>
            </div>
            <div>
              <span class="info-label">pN分期：</span>
              <span class="info-text">{{pathologyform.tpn}}</span>
            </div>
            <div>
              <span class="info-label">M分期：</span>
              <span class="info-text">{{pathologyform.m}}</span>
            </div>
            <div>
              <span class="info-label">特殊诊断类型：</span>
              <span class="info-text">{{pathologyform.specialType}}</span>
            </div>
          </div>
          <div v-if="cancerid==3">
            <div>
              <span class="info-label">乳腺癌并发症（术前）：</span>
              <span class="info-text">{{pathologyform.complication }}</span>
            </div>
            <div>
              <span class="info-label">一般状况ECGO：</span>
              <span class="info-text">{{pathologyform.ecgo}}</span>
            </div>
          </div>
          <el-divider></el-divider>
          <div>免疫组化</div>
          <div v-if="cancerid==2">
            <div>
              <span class="info-label">MLH1：</span>
              <span class="info-text">{{pathologyform.mlh1 | mFilter}}</span>
            </div>
            <div>
              <span class="info-label">MLH3：</span>
              <span class="info-text">{{pathologyform.mlh3 | mFilter}}</span>
            </div>
            <div>
              <span class="info-label">MSH2：</span>
              <span class="info-text">{{pathologyform.msh2 | mFilter}}</span>
            </div>
            <div>
              <span class="info-label">MSH6：</span>
              <span class="info-text">{{pathologyform.msh6 | mFilter}}</span>
            </div>
          </div>
          <div v-if="cancerid==2">
            <div>
              <span class="info-label">PMS1：</span>
              <span class="info-text">{{pathologyform.pms1 | mFilter}}</span>
            </div>
            <div>
              <span class="info-label">PMS2：</span>
              <span class="info-text">{{pathologyform.pms2 | mFilter}}</span>
            </div>
            <div>
              <span class="info-label">APC：</span>
              <span class="info-text">{{pathologyform.apc | mFilter}}</span>
            </div>
            <div>
              <span class="info-label">AXIN2：</span>
              <span class="info-text">{{pathologyform.axin2 | mFilter}}</span>
            </div>
          </div>
          <div v-if="cancerid==2">
            <div>
              <span class="info-label">STK11：</span>
              <span class="info-text">{{pathologyform.stk11 | mFilter}}</span>
            </div>
            <div>
              <span class="info-label">EPCAM：</span>
              <span class="info-text">{{pathologyform.epcam | mFilter}}</span>
            </div>
            <div>
              <span class="info-label">PTEN：</span>
              <span class="info-text">{{pathologyform.pten | mFilter}}</span>
            </div>
            <div>
              <span class="info-label">SMAD4：</span>
              <span class="info-text">{{pathologyform.smad4 | mFilter}}</span>
            </div>
          </div>
          <div v-if="cancerid==2">
            <div>
              <span class="info-label">MUTYH：</span>
              <span class="info-text">{{pathologyform.mutyh | mFilter}}</span>
            </div>
            <div>
              <span class="info-label">BMPR1A：</span>
              <span class="info-text">{{pathologyform.bmpr1a | mFilter}}</span>
            </div>
            <div>
              <span class="info-label"></span>
              <span class="info-text"></span>
            </div>
            <div>
              <span class="info-label"></span>
              <span class="info-text"></span>
            </div>
          </div>
          <div v-if="cancerid==3">
            <div>
              <span class="info-label">ER：</span>
              <span class="info-text">{{pathologyform.ER}}</span>
            </div>
            <div>
              <span class="info-label">PR：</span>
              <span class="info-text">{{pathologyform.PR}}</span>
            </div>
            <div>
              <span class="info-label">P53：</span>
              <span class="info-text">{{pathologyform.P53}}</span>
            </div>
            <div>
              <span class="info-label">CK5/6：</span>
              <span class="info-text">{{pathologyform.CK5}}</span>
            </div>
          </div>
          <div v-if="cancerid==3">
            <div>
              <span class="info-label">E-Card：</span>
              <span class="info-text">{{pathologyform.ECard}}</span>
            </div>
            <div>
              <span class="info-label">EGFR：</span>
              <span class="info-text">{{pathologyform.PMS2}}</span>
            </div>
            <div>
              <span class="info-label">Her-2：</span>
              <span class="info-text">{{pathologyform.Her2}}</span>
            </div>
            <div>
              <span class="info-label">Ki-67：</span>
              <span class="info-text">{{pathologyform.Ki67}}</span>
            </div>
          </div>
        </div>
        <div class="main-title" v-if="checkState.molecule">分子检测</div>
        <div class="main-info" v-if="checkState.molecule">
          <div>
            <div>
              <span class="info-label">检查日期：</span>
              <span class="info-text">{{moleculeform.mdate | dateFilter}}</span>
            </div>
            <div>
              <span class="info-label">标本类型：</span>
              <span class="info-text">{{moleculeform.sampletype}}</span>
            </div>
            <div>
              <span class="info-label">MSI：</span>
              <span class="info-text">{{moleculeform.msi | msiFilter}}</span>
            </div>
            <div>
              <span class="info-label">MLPA：</span>
              <span class="info-text">{{moleculeform.mlpagene}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">NGS检测：</span>
              <span class="info-text">{{moleculeform.ngsjc | ngsFilter}}</span>
            </div>
            <div>
              <span class="info-label">NGS平台：</span>
              <span class="info-text">{{moleculeform.ngspt | ngsptFilter}}</span>
            </div>
            <div>
              <span class="info-label">上机测序编号：</span>
              <span class="info-text">AQ{{moleculeform.seqnum}}</span>
            </div>
            <div>
              <span class="info-label">NGS Panel：</span>
              <span class="info-text">{{moleculeform.ngspanel}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">MLH1启动子甲基化分析【MSP】：</span>
              <span class="info-text">{{moleculeform.msp}}</span>
            </div>
            <div>
              <span class="info-label">MSI检测平台</span>
              <span class="info-text">{{moleculeform.msisp}}</span>
            </div>
            <div>
              <span class="info-label">MSI结果</span>
              <span class="info-text">{{moleculeform.msiresult}}</span>
            </div>
            <div>
              <span class="info-label"></span>
              <span class="info-text"></span>
            </div>
          </div>
          <el-divider></el-divider>
          <div>检测结果</div>
          <div v-for='(item,index) in testresult' :key='index'>
          <div>
            <div>
              <span class="info-label">Gene：</span>
              <span class="info-text">{{item.gene}}</span>
            </div>
            <div>
              <span class="info-label">Position：</span>
              <span class="info-text">{{item.position}}</span>
            </div>
            <div>
              <span class="info-label">Transcript：</span>
              <span class="info-text">{{item.transcript}}</span>
            </div>
            <div>
              <span class="info-label">HGVS：</span>
              <span class="info-text">{{item.hgvs}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">Mutation type：</span>
              <span class="info-text">{{item.mtype}}</span>
            </div>
            <div>
              <span class="info-label">Function：</span>
              <span class="info-text">{{item.function}}</span>
            </div>
            <div>
              <span class="info-label">Coding：</span>
              <span class="info-text">{{item.coding}}</span>
            </div>
            <div>
              <span class="info-label">Protein：</span>
              <span class="info-text">{{item.protein}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">Allelic frequency(%)：</span>
              <span class="info-text">{{item.aferquency}}</span>
            </div>
            <div>
              <span class="info-label">ExAC ALL：</span>
              <span class="info-text">{{item.alls}}</span>
            </div>
            <div>
              <span class="info-label">ExAC EAS：</span>
              <span class="info-text">{{item.eas}}</span>
            </div>
            <div>
              <span class="info-label">Class：</span>
              <span class="info-text">{{item.grade}}</span>
            </div>
          </div>
          </div>
          <el-divider></el-divider>
          <div>其他代表性基因突变结果</div>
          <div v-if="cancerid==2">
            <div>
              <span class="info-label">检测平台：</span>
              <span class="info-text">{{moleculeform.testp | testpFilter}}</span>
            </div>
            <div>
              <span class="info-label">KRAS：</span>
              <span class="info-text">{{moleculeform.kras | mFilter}}</span>
            </div>
            <div>
              <span class="info-label">NRAS：</span>
              <span class="info-text">{{moleculeform.nras | mFilter}}</span>
            </div>
            <div>
              <span class="info-label">BRAF：</span>
              <span class="info-text">{{moleculeform.braf | mFilter}}</span>
            </div>
          </div>
          <div v-if="cancerid==2">
            <div>
              <span class="info-label">PIK3CA：</span>
              <span class="info-text">{{moleculeform.pik3ca | mFilter}}</span>
            </div>
            <div>
              <span class="info-label">PTEN：</span>
              <span class="info-text">{{moleculeform.pten | mFilter}}</span>
            </div>
            <div>
              <span class="info-label"></span>
              <span class="info-text"></span>
            </div>
            <div>
              <span class="info-label"></span>
              <span class="info-text"></span>
            </div>
          </div>
          <div v-if="cancerid==3">
            <div>
              <span class="info-label">检测平台：</span>
              <span class="info-text">{{moleculeform.testplatform}}</span>
            </div>
            <div>
              <span class="info-label">MUTYH：</span>
              <span class="info-text">{{moleculeform.MUTYH}}</span>
            </div>
            <div>
              <span class="info-label">MSH2：</span>
              <span class="info-text">{{moleculeform.MSH2}}</span>
            </div>
            <div>
              <span class="info-label">MSH6：</span>
              <span class="info-text">{{moleculeform.MSH6}}</span>
            </div>
          </div>
          <div v-if="cancerid==3">
            <div>
              <span class="info-label">MRE11A：</span>
              <span class="info-text">{{moleculeform.MRE11A}}</span>
            </div>
            <div>
              <span class="info-label">MLH1：</span>
              <span class="info-text">{{moleculeform.MLH1}}</span>
            </div>
            <div>
              <span class="info-label"></span>
              <span class="info-text"></span>
            </div>
            <div>
              <span class="info-label"></span>
              <span class="info-text"></span>
            </div>
          </div>
        </div>
        <div class="main-title" v-if="checkState.therapy">药物治疗</div>
        <div class="main-info" v-if="checkState.therapy">
          <div>化疗药物</div>
          <div>
            <div>
              <span class="info-label">化疗药物：</span>
              <span class="info-text" v-if='therapyform.chemodrugs==0'>无化疗</span>
              <span class="info-text" v-if='therapyform.chemodrugs==1'>{{therapyform.drug}}</span>
              <span class="info-text" v-if='therapyform.chemodrugs==3'>未知化疗史</span>
              <span class="info-text" v-if='therapyform.chemodrugs==4'>{{therapyform.drugother}}</span>
            </div>
            <div>
              <span class="info-label">开始时间：</span>
              <span class="info-text">{{therapyform.cstrdate | dateFilter}}</span>
            </div>
            <div>
              <span class="info-label">结束时间：</span>
              <span class="info-text">{{therapyform.cenddate | dateFilter}}</span>
            </div>
            <div>
              <span class="info-label">药物单次剂量：</span>
              <span class="info-text">{{therapyform.conedose}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">给药途径：</span>
              <span class="info-text">{{therapyform.cway}}</span>
            </div>
            <div>
              <span class="info-label">用药频次：</span>
              <span class="info-text">{{therapyform.cdrugrate}}次</span>
            </div>
            <div>
              <span class="info-label">是否参与临床试验：</span>
              <span class="info-text">{{therapyform.cisctrials | isftFilter}}</span>
            </div>
            <div>
              <span class="info-label"></span>
              <span class="info-text"></span>
            </div>
          </div>
          <el-divider></el-divider>
          <div>靶向药物</div>
          <div>
            <div>
              <span class="info-label">靶点：</span>
              <span class="info-text">
                <span>{{therapyform.target}}</span>
                <span v-if='therapyform.target && therapyform.other'>,</span>
                <span>{{therapyform.other}}</span>
              </span>
            </div>
            <div>
              <span class="info-label">药物名称：</span>
              <span class="info-text">{{therapyform.tdrugname}}</span>
            </div>
            <div>
              <span class="info-label">开始时间：</span>
              <span class="info-text">{{therapyform.tstrdate | dateFilter}}</span>
            </div>
            <div>
              <span class="info-label">结束时间：</span>
              <span class="info-text">{{therapyform.tenddate | dateFilter}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">药物单次剂量：</span>
              <span class="info-text">{{therapyform.tonedose}}</span>
            </div>
            <div>
              <span class="info-label">给药途径：</span>
              <span class="info-text">{{therapyform.tway}}</span>
            </div>
            <div>
              <span class="info-label">用药频次：</span>
              <span class="info-text">{{therapyform.tdrugrate}}次</span>
            </div>
            <div>
              <span class="info-label">是否参与临床试验：</span>
              <span class="info-text">{{therapyform.tisctrials | isftFilter}}</span>
            </div>
          </div>
          <el-divider></el-divider>
          <div>免疫药物</div>
          <div>
            <div>
              <span class="info-label">靶点：</span>
              <span class="info-text">
                <span>{{therapyform.imtargetlist}}</span>
              </span>
            </div>
            <div>
              <span class="info-label">药物名称：</span>
              <span class="info-text">{{therapyform.immdrugname}}</span>
            </div>
            <div>
              <span class="info-label">开始时间：</span>
              <span class="info-text">{{therapyform.immstrdate | dateFilter}}</span>
            </div>
            <div>
              <span class="info-label">结束时间：</span>
              <span class="info-text">{{therapyform.immenddate | dateFilter}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">药物单次剂量：</span>
              <span class="info-text">{{therapyform.immonedose}}</span>
            </div>
            <div>
              <span class="info-label">给药途径：</span>
              <span class="info-text">{{therapyform.immway}}</span>
            </div>
            <div>
              <span class="info-label">用药频次：</span>
              <span class="info-text">{{therapyform.immdrugrate}}次</span>
            </div>
            <div>
              <span class="info-label">是否参与临床试验：</span>
              <span class="info-text">{{therapyform.immisctrials | isftFilter}}</span>
            </div>
          </div>
        </div>
        <div class="main-title" v-if="checkState.evaluation">疗效评估</div>
        <div class="main-info" v-if="checkState.evaluation">
          <div>
            <div>
              <span class="info-label">疗效评估：</span>
              <span class="info-text">{{evaluationform.lxassess | isftFilter}}</span>
            </div>
            <div>
              <span class="info-label">靶病灶名称：</span>
              <span class="info-text">{{evaluationform.focusname}}</span>
            </div>
            <div>
              <span class="info-label">靶病灶长径：</span>
              <span class="info-text">{{evaluationform.focuscd}}</span>
            </div>
            <div>
              <span class="info-label">靶病灶短径：</span>
              <span class="info-text">{{evaluationform.focusdd}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">检查方法：</span>
              <span class="info-text">{{evaluationform.method}}</span>
            </div>
            <div>
              <span class="info-label">评估日期：</span>
              <span class="info-text">{{evaluationform.assdate | dateFilter}}</span>
            </div>
            <div>
              <span class="info-label">靶病灶评估：</span>
              <span class="info-text">{{evaluationform.focusass}}</span>
            </div>
            <div>
              <span class="info-label">是否有新病灶：</span>
              <span class="info-text">{{evaluationform.isnewfocus | isftFilter}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">新靶病灶名称：</span>
              <span class="info-text">{{evaluationform.nfocusname}}</span>
            </div>
            <div>
              <span class="info-label">新靶病灶长径：</span>
              <span class="info-text">{{evaluationform.nfocuscd}}</span>
            </div>
            <div>
              <span class="info-label">新靶病灶短径：</span>
              <span class="info-text">{{evaluationform.nfocusdd}}</span>
            </div>
            <div>
              <span class="info-label">新病灶评估日期：</span>
              <span class="info-text">{{evaluationform.nassdate | dateFilter}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">肿瘤标记物评估：</span>
              <span class="info-text">{{evaluationform.tumormarher | marherFilter}}</span>
            </div>
            <div>
              <span class="info-label">总体疗效评估：</span>
              <span class="info-text">{{evaluationform.allass}}</span>
            </div>
            <div>
              <span class="info-label"></span>
              <span class="info-text"></span>
            </div>
            <div>
              <span class="info-label"></span>
              <span class="info-text"></span>
            </div>
          </div>
        </div>
        <div class="main-title" v-if="checkState.symptoms">临床症状</div>
        <div class="main-info" v-if="checkState.symptoms">
          <div>
            <div>
              <span class="info-label">是否经历不良反应：</span>
              <span class="info-text">{{symptomsform.isreact | isftFilter}}</span>
            </div>
            <div>
              <span class="info-label">不良反应名称：</span>
              <span class="info-text">{{symptomsform.reactname}}</span>
            </div>
            <div>
              <span class="info-label">产生不良反应来源：</span>
              <span class="info-text">{{symptomsform.reactsource}}</span>
            </div>
            <div>
              <span class="info-label">开始日期：</span>
              <span class="info-text">{{symptomsform.strdate | dateFilter}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">结束日期：</span>
              <span class="info-text">{{symptomsform.enddate | dateFilter}}</span>
            </div>
            <div>
              <span class="info-label">标准毒性：</span>
              <span class="info-text">{{symptomsform.stoxic}}</span>
            </div>
            <div>
              <span class="info-label">放射性损伤早期分级：</span>
              <span class="info-text">{{symptomsform.earlyclass | isftFilter}}</span>
            </div>
            <div>
              <span class="info-label">放射性损伤晚期分级：</span>
              <span class="info-text">{{symptomsform.latterclass | isftFilter}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">治疗变化：</span>
              <span class="info-text">{{symptomsform.changes}}</span>
            </div>
            <div>
              <span class="info-label">不良事件结局：</span>
              <span class="info-text">{{symptomsform.badevent}}</span>
            </div>
            <div>
              <span class="info-label"></span>
              <span class="info-text"></span>
            </div>
            <div>
              <span class="info-label"></span>
              <span class="info-text"></span>
            </div>
          </div>
        </div>
        <div class="main-title" v-if="checkState.follow">随访信息</div>
        <div class="main-info" v-if="checkState.follow">
          <div>
            <div>
              <span class="info-label">是否随访：</span>
              <span class="info-text">{{followform.isfollowup | isftFilter}}</span>
            </div>
            <div>
              <span class="info-label">随访时间：</span>
              <span class="info-text">{{followform.followdate | dateFilter}}</span>
            </div>
            <div>
              <span class="info-label">随访方式：</span>
              <span class="info-text">{{followform.followway}}</span>
            </div>
            <div>
              <span class="info-label">生存状态：</span>
              <span class="info-text">{{followform.existence | exFilter}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">生存分析：</span>
              <span class="info-text">{{followform.os+' '+followform.pfs}}</span>
            </div>
            <div>
              <span class="info-label">死亡日期：</span>
              <span class="info-text">{{followform.diedate | dateFilter}}</span>
            </div>
            <div>
              <span class="info-label">是否复发：</span>
              <span class="info-text">{{followform.isrec | isftFilter}}</span>
            </div>
            <div>
              <span class="info-label">复发日期：</span>
              <span class="info-text">{{followform.recdate | dateFilter}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">肿瘤进展情况：</span>
              <span class="info-text">{{followform.progress}}</span>
            </div>
            <div>
              <span class="info-label">转移日期：</span>
              <span class="info-text">{{followform.transferdate | dateFilter}}</span>
            </div>
            <div>
              <span class="info-label">转移部位：</span>
              <span class="info-text">{{followform.transferbw}}</span>
            </div>
            <div>
              <span class="info-label">随访信息：</span>
              <span class="info-text">{{followform.followinfo}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">随访结论：</span>
              <span class="info-text">{{followform.followresult}}</span>
            </div>
            <div>
              <span class="info-label"></span>
              <span class="info-text"></span>
            </div>
            <div>
              <span class="info-label"></span>
              <span class="info-text"></span>
            </div>
            <div>
              <span class="info-label"></span>
              <span class="info-text"></span>
            </div>
          </div>
        </div>
        <div class="main-title" v-if="checkState.sample">样本库</div>
        <div class="main-info" v-if="checkState.sample">
          <div>
            <div>
              <span class="info-label">是否留样本：</span>
              <span class="info-text">{{sampleform.issample | isftFilter}}</span>
            </div>
            <div>
              <span class="info-label">样品编号：</span>
              <span class="info-text">{{sampleform.samnum}}</span>
            </div>
            <div>
              <span class="info-label">样品来源：</span>
              <span class="info-text">{{sampleform.samsource}}</span>
            </div>
            <div>
              <span class="info-label">样本日期：</span>
              <span class="info-text">{{sampleform.samdate | dateFilter}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {infosearch,dict} from 'api/index.js';
import {sortRule} from "../../base/js/common.js";
export default {
  data() {
    return {
      cancertype: "colorectal",
      assistform:{},
      sampleform: {},
      followform: {},
      symptomsform: {},
      evaluationform: {},
      therapyform: {},
      moleculeform: {},
      pathologyform: {},
      endoscopeform: {},
      checkform: {},
      familytable: [],
      familyform: {},
      presentform: {},
      doctorform: {},
      basicform: {},
      checkedcol: [],
      collist: [
        {
          prop: "basic",
          label: "基本信息",
          checked: true
        },
        {
          prop: "doctor",
          label: "就诊信息",
          checked: true
        },
        {
          prop: "present",
          label: "现病史",
          checked: true
        },
        {
          prop: "family",
          label: "家族史",
          checked: false
        },
        {
          prop: "check",
          label: "基本检查",
          checked: false
        },
        {
          prop: "endoscope",
          label: "内镜检查",
          checked: false
        },
        {
          prop: "pathology",
          label: "病理诊断",
          checked: false
        },
        {
          prop: "molecule",
          label: "分子检测",
          checked: false
        },
        {
          prop: "therapy",
          label: "药物治疗",
          checked: false
        },
        {
          prop: "evaluation",
          label: "疗效评估",
          checked: false
        },
        {
          prop: "symptoms",
          label: "临床症状",
          checked: false
        },
        {
          prop: "follow",
          label: "随访信息",
          checked: false
        },
        {
          prop: "sample",
          label: "样本库",
          checked: false
        },
        {
          prop: "assist",
          label: "辅助检查",
          checked: false
        }
      ],
      checkNum: 0,
      checkState: {
        basic: true,
        doctor: true,
        present: true,
        family: false,
        check: false,
        endoscope: false,
        pathology: false,
        molecule: false,
        therapy: false,
        evaluation: false,
        symptoms: false,
        follow: false,
        sample: false,
        assist:false
      },
      testresult:[],
      sexlist: [],
      btypelist:[],
      nationalitylist:[],
      nationlist:[],
      symptomlist:[],
      vmetastaticlist:[],
      dprimarylist:[],
      fttypelist:[],
      cpartandtypelist:[],
      shbltypelist:[],
      chprogrammelist:[],
      chgoallist:[],
      chevaluationlist:[],
      rtgoallist:[],
      drugnamelist:[],
      obtlist:[],
      tumloclist:[],
      proportionlist:[],
      polypnumlist:[],
      pbtypelist:[],
      htypelist:[],
      hgradelist:[],
      degreelist:[],
      clinicalStagelist:[],
      ptlist:[],
      pnlist:[],
      pmlist:[],
      ptumloclist:[],
      sampletypelist:[],
      msplist:[],
      msisplist:[],
      msiresultlist:[],
      gradelist:[],
      cwaylist:[],
      allasslist:[],
      focusasslist:[],
      reactsourcelist:[],
      changeslist:[],
      stoxiclist:[],
      badeventlist:[],
      transferbwlist:[],
      progresslist:[],
      followwaylist:[],
      cancerid:0
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
    rhFilter(val){
      if(val==0){
        return '阴性'
      }else if(val==1){
        return '阳性'
      }
    },
    marherFilter(val){
      if(val==0){
        return '正常'
      }else if(val==1){
        return '异常'
      }
    },
    exFilter(val){
      if(val==0){
        return '生存'
      }else if(val==1){
        return '死亡'
      }
    },
    isftFilter(val){
      if(val==0){
        return '是'
      }else if(val==1){
        return '否'
      }
    },
    mFilter(val){
      if(val==0){
        return '-'
      }else if(val==1){
        return '+'
      }else if(val==2){
        return '未做'
      }else if(val==3){
        return '不确定'
      }
    },
    rbFilter(val){
      if(val==0){
        return 'Revised Bethesda'
      }else if(val==1){
        return ''
      }else if(val==2){
        return 'Revised Bethesda:不确定'
      }
    },
    acFilter(val){
      if(val==0){
        return 'Amsterdam criteria'
      }else if(val==1){
        return ''
      }else if(val==2){
        return 'Amsterdam criteria:不确定'
      }
    },
    msiFilter(val){
      if(val==0){
        return '未检测'
      }else if(val==1){
        return '已检测'
      }
    },
    ngsFilter(val){
      if(val==0){
        return '已做'
      }else if(val==1){
        return '未做'
      }
    },
    testpFilter(val){
      if(val==0){
        return 'ARMS'
      }else if(val==1){
        return 'NGS'
      }
    },
    ngsptFilter(val){
      if(val==0){
        return 'Illumina'
      }else if(val==1){
        return 'Life'
      }else if(val==2){
        return '其他'
      }
    }
  },
  methods: {
    checkDis(item) {
      if (
        item.prop == "basic" ||
        item.prop == "doctor" ||
        item.prop == "present"
      ) {
        return true;
      }
      return false;
    },
    checkShow() {
      for (let key in this.checkState) {
        this.checkState[key] = false;
      }
      this.checkState["basic"] = true;
      this.checkState["doctor"] = true;
      this.checkState["present"] = true;
      this.checkedcol.forEach(item => {
        switch (item) {
          case "family":
            this.checkState.family = true;
            break;
          case "check":
            this.checkState.check = true;
            break;
          case "endoscope":
            this.checkState.endoscope = true;
            break;
          case "pathology":
            this.checkState.pathology = true;
            break;
          case "molecule":
            this.checkState.molecule = true;
            break;
          case "therapy":
            this.checkState.therapy = true;
            break;
          case "evaluation":
            this.checkState.evaluation = true;
            break;
          case "symptoms":
            this.checkState.symptoms = true;
            break;
          case "follow":
            this.checkState.follow = true;
            break;
          case "sample":
            this.checkState.sample = true;
            break;
          case "assist":
            this.checkState.assist = true;
            break;
        }
      });
    },
    changecheck() {
      this.checkShow();
    },
    detailPatient(){
      let obj={
        id:this.$store.state.patientid
      }
      infosearch.detailPatient(obj).then((res)=>{
        if(res.returnCode==0){
          if(res.data.patientInfo){
            this.basicform=res.data.patientInfo;
            let key=[
              {
                lists:this.sexlist,
                val:'sex'
              },
              {
                lists:this.nationalitylist,
                val:'nationality'
              },
              {
                lists:this.nationlist,
                val:'nation'
              },
              {
                lists:this.btypelist,
                val:'btype'
              },
            ]
            key.map(item=>{
              this.basicform=this.filterlist(item.lists,item.val,this.basicform);
            })
          }
          if(res.data.visitRecord){
            this.doctorform=res.data.visitRecord;
          }
          if(res.data.diseaseHistory){
            this.presentform=res.data.diseaseHistory;
            let key=[
              {
                lists:this.symptomlist,
                val:'symptom'
              },
              {
                lists:this.vmetastaticlist,
                val:'vmetastatic'
              },
              {
                lists:this.dprimarylist,
                val:'dprimary'
              },
              
              {
                lists:this.chprogrammelist,
                val:'chprogramme'
              },
              {
                lists:this.chgoallist,
                val:'chgoal'
              },
              {
                lists:this.chevaluationlist,
                val:'chevaluation'
              },
              {
                lists:this.rtgoallist,
                val:'rtgoal'
              },
              {
                lists:this.drugnamelist,
                val:'drugname'
              },
              {
                lists:this.shbltypelist,
                val:'shbltype'
              },
            ]
            key.map(item=>{
              this.presentform=this.filterlist(item.lists,item.val,this.presentform);
            })
          }
          if(res.data.familyHistory){
            this.familyform=res.data.familyHistory;
            this.familytable=this.familyform.familyIllinfoList;
            let key=[
              {
                lists:this.fttypelist,
                val:'fttype'
              },
            ]
            key.map(item=>{
              this.familyform=this.filterlist(item.lists,item.val,this.familyform);
            })
            let keys=[
              {
                lists:this.cpartandtypelist,
                val:'cpartandtype'
              }
            ]
            keys.map(item=>{
              this.familytable.forEach(items=>{
                items=this.filterlist(item.lists,item.val,items);
              })
            })
          }
          if(res.data.basicCheck){
            this.checkform=res.data.basicCheck;
            let key=[
              {
                lists:this.obtlist,
                val:'obt'
              },
              {
                lists:this.parasitelist,
                val:'parasite'
              },
            ]
            key.map(item=>{
              this.checkform=this.filterlist(item.lists,item.val,this.checkform);
            })
          }
          if(res.data.introscope){
            this.endoscopeform=res.data.introscope;
            let key=[
              {
                lists:this.proportionlist,
                val:'proportion'
              },
              {
                lists:this.polypnumlist,
                val:'polypnum'
              },
              {
                lists:this.tumloclist,
                val:'tumloc'
              },
            ];
            key.map(item=>{
              this.endoscopeform=this.filterlist(item.lists,item.val,this.endoscopeform);
            })
          }
          if(res.data.pathDiagnosis){
            this.pathologyform=res.data.pathDiagnosis;
            let key=[
              {
                lists:this.pbtypelist,
                val:'btype'
              },
              {
                lists:this.htypelist,
                val:'htype'
              },
              {
                lists:this.ptumloclist,
                val:'tumloc'
              },
              {
                lists:this.hgradelist,
                val:'hgrade'
              },
              {
                lists:this.degreelist,
                val:'degree'
              },
              {
                lists:this.clinicalStagelist,
                val:'clinicalStage'
              },
              {
                lists:this.ptlist,
                val:'pt'
              },
              {
                lists:this.pnlist,
                val:'pn'
              },
              {
                lists:this.pmlist,
                val:'pm'
              },
            ];
            key.map(item=>{
              this.pathologyform=this.filterlist(item.lists,item.val,this.pathologyform);
            })
          }
          if(res.data.molDetection){
            this.moleculeform=res.data.molDetection;
            let key=[
              {
                lists:this.sampletypelist,
                val:'sampletype'
              },
              {
                lists:this.msplist,
                val:'msp'
              },
              {
                lists:this.msisplist,
                val:'msisp'
              },
              {
                lists:this.msiresultlist,
                val:'msiresult'
              },
              ];
              key.map(item=>{
              this.moleculeform=this.filterlist(item.lists,item.val,this.moleculeform);
            })
            this.testresult=this.moleculeform.checkResultList;
            this.testresult.map(item=>{
              this.gradelist.map(items=>{
                if(item.grade==items.id){
                  item.grade=items.itemName
                }
              })
            })
          }
          if(res.data.medication){
            this.therapyform=res.data.medication;
            let key=[
              {
                lists:this.cwaylist,
                val:'cway'
              },
              {
                lists:this.cwaylist,
                val:'tway'
              },
              {
                lists:this.cwaylist,
                val:'immway'
              },
              ];
              key.map(item=>{
              this.therapyform=this.filterlist(item.lists,item.val,this.therapyform);
            })
          }
          if(res.data.assess){
            this.evaluationform=res.data.assess;
            let key=[
              {
                lists:this.allasslist,
                val:'allass'
              },
              {
                lists:this.focusasslist,
                val:'focusass'
              },
              ];
              key.map(item=>{
              this.evaluationform=this.filterlist(item.lists,item.val,this.evaluationform);
            })
          }
          if(res.data.clinicalSymptoms){
            this.symptomsform=res.data.clinicalSymptoms;
            let key=[
              {
                lists:this.reactsourcelist,
                val:'reactsource'
              },
              {
                lists:this.changeslist,
                val:'changes'
              },
              {
                lists:this.stoxiclist,
                val:'stoxic'
              },
              {
                lists:this.badeventlist,
                val:'badevent'
              },
              ];
              key.map(item=>{
              this.symptomsform=this.filterlist(item.lists,item.val,this.symptomsform);
            })
          }
          if(res.data.followUp){
            this.followform=res.data.followUp;
            let key=[
              {
                lists:this.transferbwlist,
                val:'transferbw'
              },
              {
                lists:this.progresslist,
                val:'progress'
              },
              {
                lists:this.followwaylist,
                val:'followway'
              },
              ];
              key.map(item=>{
              this.followform=this.filterlist(item.lists,item.val,this.followform);
            })
          }
          if(res.data.bank){
            this.sampleform=res.data.bank
          }
        }
      })
    },
    filterlist(arr,key,form){
      arr.map(item=>{
            if(form[key]==item.id){
              form[key]=item.itemName
            }
          })
      return form
    },
    searchItem(name,type=null) {
      let obj = {
        itemValue: name,
        itype: this.$store.state.cancerid
      };
      if(type!==null){
        obj.itype=type
      }
      dict.searchItem(obj).then((res)=>{
        if(res.returnCode==0){
          res.data.sort(sortRule)
          switch(name){
            case 'sex':
              this.sexlist=res.data;
              break;
            case 'btype':
              this.btypelist=res.data;
              break;
            case 'nationality':
              this.nationalitylist=res.data;
              break;
            case 'nation':
              this.nationlist=res.data;
              break;
            case 'symptom':
              this.symptomlist=res.data;
              break;
            case 'vmetastatic':
              this.vmetastaticlist=res.data;
              break;
            case 'dprimary':
              this.dprimarylist=res.data;
              break;
            case 'fttype':
              this.fttypelist=res.data;
              break;
            case 'cpartandtype':
              this.cpartandtypelist=res.data;
              break;
            case 'shbltype':
              this.shbltypelist=res.data;
              break;
            case 'chprogramme':
              this.chprogrammelist=res.data;
              break;
            case 'chgoal':
              this.chgoallist=res.data;
              break;
            case 'chevaluation':
              this.chevaluationlist=res.data;
              break;
            case 'rtgoal':
              this.rtgoallist=res.data;
              break;
            case 'drugname':
              this.drugnamelist=res.data;
              break;
            case 'obt':
              this.obtlist=res.data;
              break;
            case 'parasite':
              this.parasitelist=res.data;
              break;
            case 'proportion':
              this.proportionlist=res.data;
              break;
            case 'tumloc':
              this.tumloclist=res.data;
              break;
            case 'polypnum':
              this.polypnumlist=res.data;
              break;
            case 'pbtype':
              this.pbtypelist=res.data;
              break;
            case 'htype':
              this.htypelist=res.data;
              break;
            case 'hgrade':
              this.hgradelist=res.data;
              break;
            case 'degree':
              this.degreelist=res.data;
              break;
            case 'clinicalStage':
              this.clinicalStagelist=res.data;
              break;
            case 'pt':
              this.ptlist=res.data;
              break;
            case 'pn':
              this.pnlist=res.data;
              break;
            case 'pm':
              this.pmlist=res.data;
              break;
            case 'ptumloc':
              this.ptumloclist=res.data;
              break;
            case 'sampletype':
              this.sampletypelist=res.data;
              break;
            case 'msp':
              this.msplist=res.data;
              break;
            case 'msisp':
              this.msisplist=res.data;
              break;
            case 'msiresult':
              this.msiresultlist=res.data;
              break;
            case 'grade':
              this.gradelist=res.data;
              break;
            case 'cway':
              this.cwaylist=res.data;
              break;
            case 'allass':
              this.allasslist=res.data;
              break;
            case 'focusass':
              this.focusasslist=res.data;
              break;
            case 'reactsource':
              this.reactsourcelist=res.data;
              break;
            case 'stoxic':
              this.stoxiclist=res.data;
              break;
            case 'changes':
              this.changeslist=res.data;
              break;
            case 'badevent':
              this.badeventlist=res.data;
              break;
            case 'followway':
              this.followwaylist=res.data;
              break;
            case 'progress':
              this.progresslist=res.data;
              break;
            case 'transferbw':
              this.transferbwlist=res.data;
              break;
          }
        }
      })
    },
  },
  created(){
      this.searchItem("sex",0);
      this.searchItem("nationality",0);
      this.searchItem("nation",0);
      this.searchItem("btype",0);
      this.searchItem("symptom",2);
      this.searchItem("shbltype",2);
      this.searchItem("vmetastatic",2);
      this.searchItem("dprimary",2);
      this.searchItem("chprogramme",0);
      this.searchItem("chgoal",0);
      this.searchItem("chevaluation",0);
      this.searchItem("rtgoal",0);
      this.searchItem("drugname",2);
      this.searchItem("fttype",0);
      this.searchItem("cpartandtype",0);
      this.searchItem("obt",2);
      this.searchItem("parasite",2);
      this.searchItem("ptumloc",2);
      this.searchItem("polypnum",2);
      this.searchItem("proportion",2);
      this.searchItem("tumloc",2);
      this.searchItem("pbtype",0);
      this.searchItem("htype",2);
      this.searchItem("hgrade",0);
      this.searchItem("degree",2);
      this.searchItem("clinicalStage",2);
      this.searchItem("pt",2);
      this.searchItem("pn",2);
      this.searchItem("pm",2);
      this.searchItem("sampletype",0);
      this.searchItem("msp",0);
      this.searchItem("msisp",0);
      this.searchItem("msiresult",0);
      this.searchItem("grade",2);
      this.searchItem("cway",0);
      this.searchItem("allass",0);
      this.searchItem("focusass",0);
      this.searchItem("reactsource",0);
    this.searchItem("changes",0);
    this.searchItem("stoxic",0);
    this.searchItem("badevent",0);
    this.searchItem("transferbw",0);
    this.searchItem("progress",0);
    this.searchItem("followway",0);
  },
  mounted() {
    // this.cancertype = "breast";
    this.cancerid=this.$store.state.cancerid;
    if(this.cancerid==3){
      this.collist.forEach((item,index)=>{
        if(item.prop=='endoscope'){
          this.collist.splice(index,1); 
        }
      })
    }else if(this.cancerid==2){
      this.collist.forEach((item,index)=>{
        if(item.prop=='assist'){
          this.collist.splice(index,1); 
        }
      })
    }
    this.detailPatient()
   
  }
};
</script>

