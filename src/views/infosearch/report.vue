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

          <el-button type="primary" size="medium">
            导出
            <i class="iconfont el-icon-biooutput"></i>
          </el-button>
        </div>
      </div>
      <div class="process-main">
        <div class="main-title" v-if="checkState.basic">基本信息</div>
        <div class="main-info" v-if="checkState.basic">
          <div>
            <div>
              <span class="info-label">登记号：</span>
              <span class="info-text">{{basicform.resnumber}}</span>
            </div>
            <div>
              <span class="info-label">登记时间：</span>
              <span class="info-text">{{basicform.resdate}}</span>
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
              <span class="info-text">{{basicform.citizenship}}</span>
            </div>
            <div>
              <span class="info-label">民族：</span>
              <span class="info-text">{{basicform.nation}}</span>
            </div>
            <div>
              <span class="info-label">血型：</span>
              <span class="info-text">{{basicform.blood}}</span>
            </div>
            <div>
              <span class="info-label">RH血型：</span>
              <span class="info-text">{{basicform.RH}}</span>
            </div>
          </div>
        </div>
        <div class="main-title" v-if="checkState.doctor">就诊信息</div>
        <div class="main-info" v-if="checkState.doctor">
          <div>
            <div>
              <span class="info-label">入院日期：</span>
              <span class="info-text">{{doctorform.admissiondate}}</span>
            </div>
            <div>
              <span class="info-label">入院科室：</span>
              <span class="info-text">{{doctorform.admissiondepart}}</span>
            </div>
            <div>
              <span class="info-label">出院日期：</span>
              <span class="info-text">{{doctorform.dischargedate}}</span>
            </div>
            <div>
              <span class="info-label">出院科室：</span>
              <span class="info-text">{{doctorform.dischargedepart}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">就诊医院：</span>
              <span class="info-text">{{doctorform.clinichospital}}</span>
            </div>
            <div>
              <span class="info-label">门诊日期：</span>
              <span class="info-text">{{doctorform.outpatientdate}}</span>
            </div>
            <div>
              <span class="info-label">门诊科室：</span>
              <span class="info-text">{{doctorform.outpatientdepart}}</span>
            </div>
            <div>
              <span class="info-label">门诊医院：</span>
              <span class="info-text">{{doctorform.outpatienthospital}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">急诊日期：</span>
              <span class="info-text">{{doctorform.emergencydate}}</span>
            </div>
            <div>
              <span class="info-label">急诊科室：</span>
              <span class="info-text">{{doctorform.emergencydepart}}</span>
            </div>
            <div>
              <span class="info-label">急诊医院：</span>
              <span class="info-text">{{doctorform.emergencyhospital}}</span>
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
              <span class="info-label" v-if="cancertype=='colorectal'">肠癌相关症状：</span>
              <span class="info-label" v-if="cancertype=='breast'">乳腺癌相关症状：</span>
              <span class="info-text">{{presentform.symptom}}</span>
            </div>
            <div>
              <span class="info-label">初诊转移部位：</span>
              <span class="info-text">{{presentform.firstdepart}}</span>
            </div>
            <div>
              <span class="info-label" v-if="cancertype=='colorectal'">原发灶位置：</span>
              <span class="info-text" v-if="cancertype=='colorectal'">{{presentform.primarydepart}}</span>
            </div>
            <div>
              <span class="info-label"></span>
              <span class="info-text"></span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">体重改变时间：</span>
              <span class="info-text">{{presentform.weightdate}}</span>
            </div>
            <div>
              <span class="info-label">体重改变数值：</span>
              <span class="info-text">{{presentform.weightval}}</span>
            </div>
            <div>
              <span class="info-label">靶向用药开始时间：</span>
              <span class="info-text">{{presentform.medicinedate}}</span>
            </div>
            <div>
              <span class="info-label">药物名称：</span>
              <span class="info-text">{{presentform.medicinename}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">手术时间：</span>
              <span class="info-text">{{presentform.operationdate}}</span>
            </div>
            <div>
              <span class="info-label">手术名称：</span>
              <span class="info-text">{{presentform.operationname}}</span>
            </div>
            <div>
              <span class="info-label">病理组织来源：</span>
              <span class="info-text">{{presentform.operationfrom}}</span>
            </div>
            <div>
              <span class="info-label">病理类型：</span>
              <span class="info-text">{{presentform.operationtype}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">化疗开始时间：</span>
              <span class="info-text">{{presentform.chemotherapydate}}</span>
            </div>
            <div>
              <span class="info-label">化疗方案：</span>
              <span class="info-text">{{presentform.chemotherapyproject}}</span>
            </div>
            <div>
              <span class="info-label">化疗目的：</span>
              <span class="info-text">{{presentform.chemotherapygoal}}</span>
            </div>
            <div>
              <span class="info-label">化疗疗效评价：</span>
              <span class="info-text">{{presentform.curative}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">放疗开始时间：</span>
              <span class="info-text">{{presentform.radiotherapydate}}</span>
            </div>
            <div>
              <span class="info-label">放疗次数：</span>
              <span class="info-text">{{presentform.radiotherapytime}}</span>
            </div>
            <div>
              <span class="info-label">放疗目的：</span>
              <span class="info-text">{{presentform.radiotherapygoal}}</span>
            </div>
            <div>
              <span class="info-label">放疗疗效评价：</span>
              <span class="info-text">{{presentform.radiotherapycurative}}</span>
            </div>
          </div>
        </div>
        <div class="main-title" v-if="checkState.family">家族史</div>
        <div class="main-info" v-if="checkState.family">
          <div>
            <div>
              <span class="info-label">家族史分类：</span>
              <span class="info-text">{{familyform.familyhistorytype}}</span>
            </div>
            <div>
              <span class="info-label">患肿瘤总人数：</span>
              <span class="info-text">{{familyform.familyhistorynum}}</span>
            </div>
            <div>
              <span class="info-label">展示家族史：</span>
              <span class="info-text">{{familyform.person}}</span>
            </div>
            <div>
              <span class="info-label"></span>
              <span class="info-text"></span>
            </div>
          </div>
          <div>
            <el-table :data="familytable" height="300" border style="width: 100%">
              <el-table-column prop="num" label="序号"></el-table-column>
              <el-table-column prop="relationship" label="亲属关系"></el-table-column>
              <el-table-column prop="tumour" label="肿瘤部位及类型"></el-table-column>
              <el-table-column prop="cancerage" label="患癌年龄"></el-table-column>
            </el-table>
          </div>
          <div>
            <div>
              <span class="info-label">家系图：</span>
              <span class="info-text">{{familyform.familyhistorytype}}</span>
            </div>
          </div>
        </div>
        <div class="main-title" v-if="checkState.check">基本检查</div>
        <div class="main-info" v-if="checkState.check">
          <div class="stitle">体格检查</div>
          <div>
            <div>
              <span class="info-label">检查日期：</span>
              <span class="info-text">{{checkform.basicexaminationdate}}</span>
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
              <span class="info-text">{{checkform.BMI}}</span>
            </div>
          </div>
          <div v-if="cancertype=='breast'">
            <div>
              <span class="info-label">乳房位置：</span>
              <span class="info-text">{{checkform.basicexaminationdate}}</span>
            </div>
            <div>
              <span class="info-label">皮肤表皮：</span>
              <span class="info-text">{{checkform.height}}</span>
            </div>
            <div>
              <span class="info-label">是否有肿块：</span>
              <span class="info-text">{{checkform.weight}}</span>
            </div>
            <div>
              <span class="info-label">乳头情况：</span>
              <span class="info-text">{{checkform.BMI}}</span>
            </div>
          </div>
          <div v-if="cancertype=='breast'">
            <div>
              <span class="info-label">是否溢液：</span>
              <span class="info-text">{{checkform.basicexaminationdate}}</span>
            </div>
            <div>
              <span class="info-label">溢液方式：</span>
              <span class="info-text">{{checkform.height}}</span>
            </div>
            <div>
              <span class="info-label">溢液范围：</span>
              <span class="info-text">{{checkform.weight}}</span>
            </div>
            <div>
              <span class="info-label">乳晕颜色：</span>
              <span class="info-text">{{checkform.BMI}}</span>
            </div>
          </div>
          <div v-if="cancertype=='breast'">
            <div>
              <span class="info-label">是否湿疹样改变：</span>
              <span class="info-text">{{checkform.basicexaminationdate}}</span>
            </div>
            <div>
              <span class="info-label">是否有区域淋巴结：</span>
              <span class="info-text">{{checkform.height}}</span>
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
              <span class="info-text">{{checkform.hemameba}}</span>
            </div>
            <div>
              <span class="info-label">红细胞：</span>
              <span class="info-text">{{checkform.erythrocyte}}</span>
            </div>
            <div>
              <span class="info-label">红细胞压积：</span>
              <span class="info-text">{{checkform.hematokrit}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">红细胞平均体积：</span>
              <span class="info-text">{{checkform.MCV}}</span>
            </div>
            <div>
              <span class="info-label">嗜碱性粒细胞：</span>
              <span class="info-text">{{checkform.basophilic}}</span>
            </div>
            <div>
              <span class="info-label">嗜碱性粒细胞比率：</span>
              <span class="info-text">{{checkform.basophilicratio}}</span>
            </div>
            <div>
              <span class="info-label">中性细胞：</span>
              <span class="info-text">{{checkform.neutrophil}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">淋巴细胞：</span>
              <span class="info-text">{{checkform.lymphocyte}}</span>
            </div>
            <div>
              <span class="info-label">淋巴细胞比率：</span>
              <span class="info-text">{{checkform.lymphocyteratio}}</span>
            </div>
            <div>
              <span class="info-label">中性细胞比率：</span>
              <span class="info-text">{{checkform.neutrophilratio}}</span>
            </div>
            <div>
              <span class="info-label">嗜酸性粒细胞：</span>
              <span class="info-text">{{checkform.eosnophils}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">嗜酸性粒细胞比率：</span>
              <span class="info-text">{{checkform.eosnophilsratio}}</span>
            </div>
            <div>
              <span class="info-label">单核细胞：</span>
              <span class="info-text">{{checkform.monocyte}}</span>
            </div>
            <div>
              <span class="info-label">单核细胞比率：</span>
              <span class="info-text">{{checkform.monocyteratio}}</span>
            </div>
            <div>
              <span class="info-label">血小板：</span>
              <span class="info-text">{{checkform.soterocyte}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">血小板压积：</span>
              <span class="info-text">{{checkform.thrombocytocrit}}</span>
            </div>
            <div>
              <span class="info-label">血小板平均体积：</span>
              <span class="info-text">{{checkform.MPV}}</span>
            </div>
            <div>
              <span class="info-label">大型血小板比率：</span>
              <span class="info-text">{{checkform.macroplateletratio}}</span>
            </div>
            <div>
              <span class="info-label">血红蛋白：</span>
              <span class="info-text">{{checkform.hemoglobin}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">随机血糖：</span>
              <span class="info-text">{{checkform.bloodsugar}}</span>
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
              <span class="info-text">{{checkform.shitcheckdate}}</span>
            </div>
            <div>
              <span class="info-label">颜色：</span>
              <span class="info-text">{{checkform.colour}}</span>
            </div>
            <div>
              <span class="info-label">性状：</span>
              <span class="info-text">{{checkform.character}}</span>
            </div>
            <div>
              <span class="info-label">白细胞：</span>
              <span class="info-text">{{checkform.shithemameba}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">红细胞：</span>
              <span class="info-text">{{checkform.shiterythrocyte}}</span>
            </div>
            <div>
              <span class="info-label">便吞噬细胞：</span>
              <span class="info-text">{{checkform.phagocyte}}</span>
            </div>
            <div>
              <span class="info-label">脂肪球：</span>
              <span class="info-text">{{checkform.globules}}</span>
            </div>
            <div>
              <span class="info-label">隐血试验：</span>
              <span class="info-text">{{checkform.occult}}</span>
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
              <span class="info-text">{{checkform.tumorcheckdate}}</span>
            </div>
            <div>
              <span class="info-label">糖类抗原CA-199：</span>
              <span class="info-text">{{checkform.CA199}}</span>
            </div>
            <div>
              <span class="info-label">糖类抗原CA-724：</span>
              <span class="info-text">{{checkform.CA724}}</span>
            </div>
            <div>
              <span class="info-label">癌胚抗原（CEA）：</span>
              <span class="info-text">{{checkform.CEA}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">神经元特异性烯醇化酶（NSE）：</span>
              <span class="info-text">{{checkform.NSE}}</span>
            </div>
            <div>
              <span class="info-label">糖类抗原CA-125：</span>
              <span class="info-text">{{checkform.CA125}}</span>
            </div>
            <div>
              <span class="info-label">糖类抗原CA-242：</span>
              <span class="info-text">{{checkform.CA242}}</span>
            </div>
            <div>
              <span class="info-label">甲胎蛋白（AFP）：</span>
              <span class="info-text">{{checkform.AFP}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">糖类抗原CA-153：</span>
              <span class="info-text">{{checkform.CA153}}</span>
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
          <el-divider v-if="cancertype=='colorectal'"></el-divider>
          <div class="image-box" v-if="cancertype=='colorectal'">
            <div>
              <div class="stitle">CT图像：</div>
            </div>
            <div>
              <div class="stitle">PET-CT图像：</div>
            </div>
          </div>
        </div>
        <div class="main-title" v-if="checkState.assist && cancertype=='breast'">辅助检查</div>
        <div class="main-info main-breast" v-if="checkState.assist && cancertype=='breast'">
          <h5 class='main-ver'>
            <p class="stitle" style="margin-top:0;">乳腺钼靶X线摄影检查：</p>
            <p>
              <span class="info-label">检查时间：</span>
              <span class="info-text">{{assistform.xraydate}}</span>
            </p>
            <p>
              <span class="info-label">有无异常情况：</span>
              <span class="info-text">{{assistform.unusual}}</span>
            </p>
            <p>
              <span class="info-label">钙化：</span>
              <span class="info-text">{{assistform.calcification}}</span>
            </p>
            <p>
              <span class="info-label">肿物边缘：</span>
              <span class="info-text">{{assistform.massedge}}</span>
            </p>
            <p>
              <span class="info-label">其他情况：</span>
              <span class="info-text">{{assistform.othercondition}}</span>
            </p>
          </h5>
          <h5 class='main-ver'>
            <p class="stitle">乳腺MRI检查：</p>
            <p>
              <span class="info-label">检查时间：</span>
              <span class="info-text">{{assistform.MRIdate}}</span>
            </p>
            <p>
              <span class="info-label">乳腺MRI征象：</span>
              <span class="info-text">{{assistform.MRIsign}}</span>
            </p>
            <p>
              <span class="info-label">BI-RADS分类：</span>
              <span class="info-text">{{assistform.BIRADS}}</span>
            </p>
          </h5>
        </div>
        <div class="main-title" v-if="checkState.endoscope && cancertype=='colorectal'">内镜检查</div>
        <div class="main-info" v-if="checkState.endoscope && cancertype=='colorectal'">
          <div>
            <div>
              <span class="info-label">检查名称：</span>
              <span class="info-text">{{endoscopeform.checkname}}</span>
            </div>
            <div>
              <span class="info-label">检查日期：</span>
              <span class="info-text">{{endoscopeform.checkdate}}</span>
            </div>
            <div>
              <span class="info-label">肠镜能否通过：</span>
              <span class="info-text">{{endoscopeform.colonoscopy}}</span>
            </div>
            <div>
              <span class="info-label">肿瘤位置：</span>
              <span class="info-text">{{endoscopeform.tumourdepart}}周岁</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">肠镜占肠壁：</span>
              <span class="info-text">{{endoscopeform.intestinal}}</span>
            </div>
            <div>
              <span class="info-label">肿瘤大小：</span>
              <span class="info-text">{{endoscopeform.tumoursize}}</span>
            </div>
            <div>
              <span class="info-label">肿瘤下缘距肛缘距离：</span>
              <span class="info-text">{{endoscopeform.tumourdistance}}</span>
            </div>
            <div>
              <span class="info-label">是否有息肉：</span>
              <span class="info-text">{{endoscopeform.polyp}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">息肉数量：</span>
              <span class="info-text">{{endoscopeform.intepolypnumstinal}}</span>
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
              <span class="info-text">{{pathologyform.checkdate}}</span>
            </div>
            <div>
              <span class="info-label">病理号：</span>
              <span class="info-text">{{pathologyform.pathologynum}}</span>
            </div>
            <div>
              <span class="info-label">病理标本类型：</span>
              <span class="info-text">{{pathologyform.pathologytype}}</span>
            </div>
            <div>
              <span class="info-label">电子切片扫描：</span>
              <span class="info-text">{{}}</span>
            </div>
          </div>
          <div>
            <div v-if="cancertype=='colorectal'">
              <span class="info-label">肿瘤部位：</span>
              <span class="info-text">{{pathologyform.tumourdepart}}</span>
            </div>
            <div v-if="cancertype=='breast'">
              <span class="info-label">检测标本：</span>
              <span class="info-text">{{pathologyform.testspecimens}}</span>
            </div>
            <div>
              <span class="info-label">组织学类型：</span>
              <span class="info-text">{{pathologyform.histologicaltype}}</span>
            </div>
            <div>
              <span class="info-label">组织学分级：</span>
              <span class="info-text">{{pathologyform.histologicalclass}}</span>
            </div>
            <div>
              <span class="info-label">分化程度：</span>
              <span class="info-text">{{pathologyform.differentiated}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">既往用药史：</span>
              <span class="info-text">{{pathologyform.medicalhistory}}</span>
            </div>
            <div>
              <span class="info-label">是否转移：</span>
              <span class="info-text">{{pathologyform.transfer}}</span>
            </div>
            <div>
              <span class="info-label">是否复发：</span>
              <span class="info-text">{{pathologyform.reappear}}</span>
            </div>
            <div v-if="cancertype=='colorectal'">
              <span class="info-label">临床分期：</span>
              <span class="info-text">{{pathologyform.clinical}}</span>
            </div>
            <div v-if="cancertype=='breast'">
              <span class="info-label">脉管侵犯：</span>
              <span class="info-text">{{pathologyform.vascular}}</span>
            </div>
          </div>
          <div v-if="cancertype=='colorectal'">
            <div>
              <span class="info-label">pTNM：</span>
              <span class="info-text">{{pathologyform.pTNM}}</span>
            </div>
            <div>
              <span class="info-label">pT：</span>
              <span class="info-text">{{pathologyform.pT}}</span>
            </div>
            <div>
              <span class="info-label">pN：</span>
              <span class="info-text">{{pathologyform.pN}}</span>
            </div>
            <div>
              <span class="info-label">pM：</span>
              <span class="info-text">{{pathologyform.pM}}</span>
            </div>
          </div>
          <div v-if="cancertype=='breast'">
            <div>
              <span class="info-label">合并原位癌：</span>
              <span class="info-text">{{pathologyform.carcinoma}}</span>
            </div>
            <div>
              <span class="info-label">肿瘤分期：</span>
              <span class="info-text">{{pathologyform.neoplasm}}</span>
            </div>
            <div>
              <span class="info-label">TNM分期：</span>
              <span class="info-text">{{pathologyform.TNM}}</span>
            </div>
            <div>
              <span class="info-label">T分期：</span>
              <span class="info-text">{{pathologyform.T}}</span>
            </div>
          </div>
          <div v-if="cancertype=='breast'">
            <div>
              <span class="info-label">cN分期：</span>
              <span class="info-text">{{pathologyform.cN}}</span>
            </div>
            <div>
              <span class="info-label">pN分期：</span>
              <span class="info-text">{{pathologyform.pN}}</span>
            </div>
            <div>
              <span class="info-label">M分期：</span>
              <span class="info-text">{{pathologyform.M}}</span>
            </div>
            <div>
              <span class="info-label">特殊诊断类型：</span>
              <span class="info-text">{{pathologyform.specialdiagnostic}}</span>
            </div>
          </div>
          <div v-if="cancertype=='breast'">
            <div>
              <span class="info-label">乳腺癌并发症（术前）：</span>
              <span class="info-text">{{pathologyform.complications }}</span>
            </div>
            <div>
              <span class="info-label">一般状况ECGO：</span>
              <span class="info-text">{{pathologyform.ECGO}}</span>
            </div>
          </div>
          <el-divider></el-divider>
          <div>免疫组化</div>
          <div v-if="cancertype=='colorectal'">
            <div>
              <span class="info-label">MLH1：</span>
              <span class="info-text">{{pathologyform.MLH1}}</span>
            </div>
            <div>
              <span class="info-label">MLH3：</span>
              <span class="info-text">{{pathologyform.MLH3}}</span>
            </div>
            <div>
              <span class="info-label">MSH2：</span>
              <span class="info-text">{{pathologyform.MSH2}}</span>
            </div>
            <div>
              <span class="info-label">MSH6：</span>
              <span class="info-text">{{pathologyform.MSH6}}</span>
            </div>
          </div>
          <div v-if="cancertype=='colorectal'">
            <div>
              <span class="info-label">PMS1：</span>
              <span class="info-text">{{pathologyform.PMS1}}</span>
            </div>
            <div>
              <span class="info-label">PMS2：</span>
              <span class="info-text">{{pathologyform.PMS2}}</span>
            </div>
            <div>
              <span class="info-label">APC：</span>
              <span class="info-text">{{pathologyform.APC}}</span>
            </div>
            <div>
              <span class="info-label">AXIN2：</span>
              <span class="info-text">{{pathologyform.AXIN2}}</span>
            </div>
          </div>
          <div v-if="cancertype=='colorectal'">
            <div>
              <span class="info-label">STK11：</span>
              <span class="info-text">{{pathologyform.STK11}}</span>
            </div>
            <div>
              <span class="info-label">EPCAM：</span>
              <span class="info-text">{{pathologyform.EPCAM}}</span>
            </div>
            <div>
              <span class="info-label">PTEN：</span>
              <span class="info-text">{{pathologyform.PTEN}}</span>
            </div>
            <div>
              <span class="info-label">SMAD4：</span>
              <span class="info-text">{{pathologyform.SMAD4}}</span>
            </div>
          </div>
          <div v-if="cancertype=='colorectal'">
            <div>
              <span class="info-label">MUTYH：</span>
              <span class="info-text">{{pathologyform.MUTYH}}</span>
            </div>
            <div>
              <span class="info-label">BMPR1A：</span>
              <span class="info-text">{{pathologyform.BMPR1A}}</span>
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
          <div v-if="cancertype=='breast'">
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
          <div v-if="cancertype=='breast'">
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
              <span class="info-text">{{moleculeform.checkdate}}</span>
            </div>
            <div>
              <span class="info-label">标本类型：</span>
              <span class="info-text">{{moleculeform.moleculetype}}</span>
            </div>
            <div>
              <span class="info-label">MSI：</span>
              <span class="info-text">{{moleculeform.MSI}}</span>
            </div>
            <div>
              <span class="info-label">MLPA：</span>
              <span class="info-text">{{moleculeform.MLPA}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">NGS检测：</span>
              <span class="info-text">{{moleculeform.NGS}}</span>
            </div>
            <div>
              <span class="info-label">NGS平台：</span>
              <span class="info-text">{{moleculeform.NGSplatform}}</span>
            </div>
            <div>
              <span class="info-label">上机测序编号：</span>
              <span class="info-text">{{moleculeform.NGSnum}}</span>
            </div>
            <div>
              <span class="info-label">NGS Panel：</span>
              <span class="info-text">{{moleculeform.NGSPanel}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">MLH1启动子甲基化分析【MSP】：</span>
              <span class="info-text">{{moleculeform.MSP}}</span>
            </div>
            <div>
              <span class="info-label">MSI检测平台</span>
              <span class="info-text">{{moleculeform.moleculeplatform}}</span>
            </div>
            <div>
              <span class="info-label">MSI结果</span>
              <span class="info-text">{{moleculeform.moleculeresult}}</span>
            </div>
            <div>
              <span class="info-label"></span>
              <span class="info-text"></span>
            </div>
          </div>
          <el-divider></el-divider>
          <div>检测结果</div>
          <div>
            <div>
              <span class="info-label">Gene：</span>
              <span class="info-text">{{moleculeform.NGSGene}}</span>
            </div>
            <div>
              <span class="info-label">Position：</span>
              <span class="info-text">{{moleculeform.NGSPosition}}</span>
            </div>
            <div>
              <span class="info-label">Transcript：</span>
              <span class="info-text">{{moleculeform.NGSTranscript}}</span>
            </div>
            <div>
              <span class="info-label">HGVS：</span>
              <span class="info-text">{{moleculeform.NGSHGVS}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">Mutation type：</span>
              <span class="info-text">{{moleculeform.NGSMutation}}</span>
            </div>
            <div>
              <span class="info-label">Function：</span>
              <span class="info-text">{{moleculeform.NGSFunction}}</span>
            </div>
            <div>
              <span class="info-label">Coding：</span>
              <span class="info-text">{{moleculeform.NGSCoding}}</span>
            </div>
            <div>
              <span class="info-label">Protein：</span>
              <span class="info-text">{{moleculeform.NGSProtein}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">Allelic frequency(%)：</span>
              <span class="info-text">{{moleculeform.NGSAllelic}}</span>
            </div>
            <div>
              <span class="info-label">ExAC ALL：</span>
              <span class="info-text">{{moleculeform.NGSExACALL}}</span>
            </div>
            <div>
              <span class="info-label">ExAC EAS：</span>
              <span class="info-text">{{moleculeform.NGSExACEAS}}</span>
            </div>
            <div>
              <span class="info-label">Class：</span>
              <span class="info-text">{{moleculeform.NGSpathogenicity}}</span>
            </div>
          </div>
          <el-divider></el-divider>
          <div>其他代表性基因突变结果</div>
          <div v-if="cancertype=='colorectal'">
            <div>
              <span class="info-label">检测平台：</span>
              <span class="info-text">{{moleculeform.testplatform}}</span>
            </div>
            <div>
              <span class="info-label">KRAS：</span>
              <span class="info-text">{{moleculeform.KRAS}}</span>
            </div>
            <div>
              <span class="info-label">NRAS：</span>
              <span class="info-text">{{moleculeform.NRAS}}</span>
            </div>
            <div>
              <span class="info-label">BRAF：</span>
              <span class="info-text">{{moleculeform.BRAF}}</span>
            </div>
          </div>
          <div v-if="cancertype=='colorectal'">
            <div>
              <span class="info-label">PIK3CA：</span>
              <span class="info-text">{{moleculeform.PIK3CA}}</span>
            </div>
            <div>
              <span class="info-label">PTEN：</span>
              <span class="info-text">{{moleculeform.PTEN}}</span>
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
          <div v-if="cancertype=='breast'">
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
          <div v-if="cancertype=='breast'">
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
          <div>
            <div>化疗药物</div>
            <div>
              <span class="info-label">化疗药物：</span>
              <span class="info-text">{{therapyform.chemotherapeutics}}</span>
            </div>
            <div>
              <span class="info-label">开始时间：</span>
              <span class="info-text">{{therapyform.startdate}}</span>
            </div>
            <div>
              <span class="info-label">结束时间：</span>
              <span class="info-text">{{therapyform.enddate}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">药物单次剂量：</span>
              <span class="info-text">{{therapyform.medication}}</span>
            </div>
            <div>
              <span class="info-label">给药途径：</span>
              <span class="info-text">{{therapyform.administration}}</span>
            </div>
            <div>
              <span class="info-label">用药频次：</span>
              <span class="info-text">{{therapyform.frequency}}</span>
            </div>
            <div>
              <span class="info-label">是否参与临床试验：</span>
              <span class="info-text">{{therapyform.clinical}}</span>
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
              <span class="info-text">{{therapyform.target}}</span>
            </div>
            <div>
              <span class="info-label">药物名称：</span>
              <span class="info-text">{{therapyform.drugname}}</span>
            </div>
            <div>
              <span class="info-label">开始时间：</span>
              <span class="info-text">{{therapyform.drugstartdate}}</span>
            </div>
            <div>
              <span class="info-label">结束时间：</span>
              <span class="info-text">{{therapyform.drugenddate}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">药物单次剂量：</span>
              <span class="info-text">{{therapyform.drugmedication}}</span>
            </div>
            <div>
              <span class="info-label">给药途径：</span>
              <span class="info-text">{{therapyform.drugadministration}}</span>
            </div>
            <div>
              <span class="info-label">用药频次：</span>
              <span class="info-text">{{therapyform.drugfrequency}}</span>
            </div>
            <div>
              <span class="info-label">是否参与临床试验：</span>
              <span class="info-text">{{therapyform.drugclinical}}</span>
            </div>
          </div>
          <el-divider></el-divider>
          <div>免疫药物</div>
          <div>
            <div>
              <span class="info-label">靶点：</span>
              <span class="info-text">{{therapyform.immunetarget}}</span>
            </div>
            <div>
              <span class="info-label">药物名称：</span>
              <span class="info-text">{{therapyform.immunedrugname}}</span>
            </div>
            <div>
              <span class="info-label">开始时间：</span>
              <span class="info-text">{{therapyform.immunedrugstartdate}}</span>
            </div>
            <div>
              <span class="info-label">结束时间：</span>
              <span class="info-text">{{therapyform.immunedrugenddate}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">药物单次剂量：</span>
              <span class="info-text">{{therapyform.immunedrugmedication}}</span>
            </div>
            <div>
              <span class="info-label">给药途径：</span>
              <span class="info-text">{{therapyform.immunedrugadministration}}</span>
            </div>
            <div>
              <span class="info-label">用药频次：</span>
              <span class="info-text">{{therapyform.immunedrugfrequency}}</span>
            </div>
            <div>
              <span class="info-label">是否参与临床试验：</span>
              <span class="info-text">{{therapyform.immunedrugclinical}}</span>
            </div>
          </div>
        </div>
        <div class="main-title" v-if="checkState.evaluation">疗效评估</div>
        <div class="main-info" v-if="checkState.evaluation">
          <div>
            <div>
              <span class="info-label">疗效评估：</span>
              <span class="info-text">{{evaluationform.evaluation}}</span>
            </div>
            <div>
              <span class="info-label">靶病灶名称：</span>
              <span class="info-text">{{evaluationform.lesionname}}</span>
            </div>
            <div>
              <span class="info-label">靶病灶长径：</span>
              <span class="info-text">{{endoscopeform.colonoscopy}}</span>
            </div>
            <div>
              <span class="info-label">靶病灶短径：</span>
              <span class="info-text">{{evaluationform.lesionshort}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">检查方法：</span>
              <span class="info-text">{{evaluationform.inspection}}</span>
            </div>
            <div>
              <span class="info-label">评估日期：</span>
              <span class="info-text">{{evaluationform.valuationdate}}</span>
            </div>
            <div>
              <span class="info-label">靶病灶评估：</span>
              <span class="info-text">{{evaluationform.lesionevaluation}}</span>
            </div>
            <div>
              <span class="info-label">是否有新病灶：</span>
              <span class="info-text">{{evaluationform.newevaluation}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">新靶病灶名称：</span>
              <span class="info-text">{{evaluationform.newlesionname}}</span>
            </div>
            <div>
              <span class="info-label">新靶病灶长径：</span>
              <span class="info-text">{{evaluationform.newlesionlong}}</span>
            </div>
            <div>
              <span class="info-label">新靶病灶短径：</span>
              <span class="info-text">{{evaluationform.newlesionshort}}</span>
            </div>
            <div>
              <span class="info-label">新病灶评估日期：</span>
              <span class="info-text">{{evaluationform.newvaluationdate}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">肿瘤标记物评估：</span>
              <span class="info-text">{{evaluationform.newevaluation}}</span>
            </div>
            <div>
              <span class="info-label">总体疗效评估：</span>
              <span class="info-text">{{evaluationform.overall}}</span>
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
              <span class="info-text">{{symptomsform.untoward}}</span>
            </div>
            <div>
              <span class="info-label">不良反应名称：</span>
              <span class="info-text">{{symptomsform.untowardname}}</span>
            </div>
            <div>
              <span class="info-label">产生不良反应来源：</span>
              <span class="info-text">{{symptomsform.untowardresource}}</span>
            </div>
            <div>
              <span class="info-label">开始日期：</span>
              <span class="info-text">{{symptomsform.untowardstartdate}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">结束日期：</span>
              <span class="info-text">{{symptomsform.untowardenddate}}</span>
            </div>
            <div>
              <span class="info-label">标准毒性：</span>
              <span class="info-text">{{symptomsform.TEQ}}</span>
            </div>
            <div>
              <span class="info-label">放射性损伤早期分级：</span>
              <span class="info-text">{{symptomsform.earlygrading}}</span>
            </div>
            <div>
              <span class="info-label">放射性损伤晚期分级：</span>
              <span class="info-text">{{symptomsform.lategrading}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">治疗变化：</span>
              <span class="info-text">{{symptomsform.treatmentchange}}</span>
            </div>
            <div>
              <span class="info-label">不良事件结局：</span>
              <span class="info-text">{{symptomsform.untowardresult}}</span>
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
              <span class="info-text">{{followform.follow}}</span>
            </div>
            <div>
              <span class="info-label">随访时间：</span>
              <span class="info-text">{{followform.followdate}}</span>
            </div>
            <div>
              <span class="info-label">随访方式：</span>
              <span class="info-text">{{followform.followmethods}}</span>
            </div>
            <div>
              <span class="info-label">生存状态：</span>
              <span class="info-text">{{followform.follow}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">生存分析：</span>
              <span class="info-text">{{followform.OS}}</span>
            </div>
            <div>
              <span class="info-label">死亡日期：</span>
              <span class="info-text">{{followform.death}}</span>
            </div>
            <div>
              <span class="info-label">是否复发：</span>
              <span class="info-text">{{followform.reappear}}</span>
            </div>
            <div>
              <span class="info-label">复发日期：</span>
              <span class="info-text">{{followform.reappeardate}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">肿瘤进展情况：</span>
              <span class="info-text">{{followform.tumoursituation}}</span>
            </div>
            <div>
              <span class="info-label">转移日期：</span>
              <span class="info-text">{{followform.transdate}}</span>
            </div>
            <div>
              <span class="info-label">转移部位：</span>
              <span class="info-text">{{followform.transdepart}}</span>
            </div>
            <div>
              <span class="info-label">随访信息：</span>
              <span class="info-text">{{followform.folloeinfo}}</span>
            </div>
          </div>
          <div>
            <div>
              <span class="info-label">随访结论：</span>
              <span class="info-text">{{followform.folloeresult}}</span>
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
              <span class="info-text">{{sampleform.sample}}</span>
            </div>
            <div>
              <span class="info-label">样品编号：</span>
              <span class="info-text">{{sampleform.samplenum}}</span>
            </div>
            <div>
              <span class="info-label">样品来源：</span>
              <span class="info-text">{{sampleform.sampleresource}}</span>
            </div>
            <div>
              <span class="info-label">样本日期：</span>
              <span class="info-text">{{sampleform.sampledate}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
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
      }
    };
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
    }
  },
  created() {
    this.cancertype = "breast";
    if(this.cancertype=='breast'){
      this.collist.forEach((item,index)=>{
        if(item.prop=='endoscope'){
          this.collist.splice(index,1); 
        }
      })
    }else if(this.cancertype=='colorectal'){
      this.collist.forEach((item,index)=>{
        if(item.prop=='assist'){
          this.collist.splice(index,1); 
        }
      })
    }
  }
};
</script>

