<style lang="scss" scoped>
@import "../../../base/css/base-var.scss";
.basic {
  background: #fff;
  border-radius: 6px;
  overflow: hidden;
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
  .basic-inner {
    padding: 0 45px 20px;
    .basic-main {
      padding: 20px;
      height: 500px;
      overflow-y: scroll;
    }
    .basic-tab {
      text-align: center;
    }
  }
}
.immun {
  display: flex;
  & > div {
    flex: 1;
    float: left;
  }
}
.el-input,
.el-select,
.el-date-editor {
  width: 350px;
}
// .el-date-editor{
// width: 350px !important;
// }
.el-button--primary {
  background-color: $maincolor;
  border-color: $maincolor;
}
.el-input__prefix {
  right: 5px;
  color: $maincolor;
}
.el-input--prefix .el-input__inner {
  padding-left: 15px;
}
</style>
<template>
  <div class="basic">
    <div class="title">
      <i class="iconfont el-icon-biosign"></i>
      <span>检查诊断</span>
    </div>
    <div class="basic-inner">
      <div class="basic-tab">
        <div v-if='cancertype=="colorectal"'>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane v-for='(item,index) in coltablist' :label="item.label" :name='item.name' :key='index' :disabled="item.disabled"></el-tab-pane>
        </el-tabs>
        </div>
        <div v-if='cancertype=="breast"'>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane v-for='(item,index) in bretablist' :label="item.label" :name='item.name' :key='index' :disabled="item.disabled"></el-tab-pane>
        </el-tabs>
        </div>
      </div>
      <div class="basic-main">
        <div v-if="activeName=='basic'">
          <el-form ref="form" :model="basicform" label-width="150px" label-position="left">
            <el-form-item label="体格检查"></el-form-item>
            <el-form-item label="检查日期：">
              <el-date-picker type="date" placeholder="yyyy/mm/dd" v-model="basicform.tdate"></el-date-picker>
            </el-form-item>
            <el-form-item label="身高：">
              <el-input v-model="basicform.height">
                <template slot="suffix">cm</template>
              </el-input>
            </el-form-item>
            <el-form-item label="体重：">
              <el-input v-model="basicform.weight">
                <template slot="suffix">kg</template>
              </el-input>
            </el-form-item>
            <el-form-item label="体重指数（BMI）：">
              <el-input v-model="basicform.bmi" placeholder="BMI=体重（kg)/身高（m)^2"></el-input>
            </el-form-item>
            <el-form-item label="舒张压：">
              <el-input v-model="basicform.diastolic">
                <template slot="suffix">mmHg</template>
              </el-input>
            </el-form-item>
            <el-form-item label="收缩压：">
              <el-input v-model="basicform.systolic">
                <template slot="suffix">mmHg</template>
              </el-input>
            </el-form-item>
            <div v-if="cancertype=='breast'">
              <el-form-item label="乳房位置：">
                <el-radio-group v-model="basicform.breastdepart">
                  <el-radio label="对称" value="1"></el-radio>
                  <el-radio label="不对称" value="0"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="皮肤表皮：">
                <el-select v-model="basicform.epidermis" placeholder="请选择..." @focus='searchItem("epidermis")'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in epidermislist" :key="index"></el-option>
              </el-select>
              </el-form-item>
              <el-form-item label="是否有肿块：">
                <el-radio-group v-model="basicform.bossing">
                  <el-radio label="0" value="0">是</el-radio>
                  <el-radio label="1" value="1">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="乳头情况：">
                <el-select v-model="basicform.papilla" placeholder="请选择..." @focus='searchItem("papilla")'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in papillalist" :key="index"></el-option>
              </el-select>
              </el-form-item>
              <el-form-item label="是否溢液：">
                <el-radio-group v-model="basicform.discharge">
                  <el-radio label="0" value="0">是</el-radio>
                  <el-radio label="1" value="1">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <el-select v-model="basicform.dischargeway" placeholder="溢液方式" @focus='searchItem("dischargeway")'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in dischargewaylist" :key="index"></el-option>
              </el-select>
              </el-form-item>
              <el-form-item>
                <el-select v-model="basicform.dischargerange" placeholder="溢液范围" @focus='searchItem("dischargerange")'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in dischargerangelist" :key="index"></el-option>
              </el-select>
              </el-form-item>
              <el-form-item label="乳晕颜色：">
                <el-radio-group v-model="basicform.mammary">
                  <el-radio label="正常" value="1"></el-radio>
                  <el-radio label="异常" value="0"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="是否湿疹样改变：">
                <el-radio-group v-model="basicform.discharge">
                  <el-radio label="0" value="0">是</el-radio>
                  <el-radio label="1" value="1">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="是否有区域淋巴结：">
                <el-radio-group v-model="basicform.discharge">
                  <el-radio label="0" value="0">是</el-radio>
                  <el-radio label="1" value="1">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
            <el-form-item label="KPS评分：" v-if="cancertype=='colorectal'">
              <el-select v-model="basicform.kps" placeholder="请选择..." @focus='searchItem("kps")'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in kpslist" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="血常规"></el-form-item>
            <el-form-item label="白细胞：">
              <el-input v-model="basicform.xwhitec">
                <template slot="suffix">10^9/L</template>
              </el-input>
            </el-form-item>
            <el-form-item label="红细胞：">
              <el-input v-model="basicform.xredc">
                <template slot="suffix">10^12/L</template>
              </el-input>
            </el-form-item>
            <el-form-item label="淋巴细胞：">
              <el-input v-model="basicform.lymphocyte">
                <template slot="suffix">10^9/L</template>
              </el-input>
            </el-form-item>
            <el-form-item label="淋巴细胞比率：">
              <el-input v-model="basicform.lymrate">
                <template slot="suffix">%</template>
              </el-input>
            </el-form-item>
            <el-form-item label="单核细胞：">
              <el-input v-model="basicform.monocyte">
                <template slot="suffix">10^9/L</template>
              </el-input>
            </el-form-item>
            <el-form-item label="单核细胞比率：">
              <el-input v-model="basicform.monrate">
                <template slot="suffix">%</template>
              </el-input>
            </el-form-item>
            <el-form-item label="嗜碱性粒细胞：">
              <el-input v-model="basicform.bas">
                <template slot="suffix">10^9/L</template>
              </el-input>
            </el-form-item>
            <el-form-item label="红细胞压积：">
              <el-input v-model="basicform.htc">
                <template slot="suffix">L/L</template>
              </el-input>
            </el-form-item>
            <el-form-item label="血小板压积：">
              <el-input v-model="basicform.pct">
                <template slot="suffix">%</template>
              </el-input>
            </el-form-item>
            <el-form-item label="大型血小板比率：">
              <el-input v-model="basicform.bigpctrate">
                <template slot="suffix">%</template>
              </el-input>
            </el-form-item>
            <el-form-item label="血红蛋白：">
              <el-input v-model="basicform.cruorin">
                <template slot="suffix">g/L</template>
              </el-input>
            </el-form-item>
            <el-form-item label="血小板：">
              <el-input v-model="basicform.platelet">
                <template slot="suffix">10^9/L</template>
              </el-input>
            </el-form-item>
            <el-form-item label="中性细胞：">
              <el-input v-model="basicform.neut">
                <template slot="suffix">10^9/L</template>
              </el-input>
            </el-form-item>
            <el-form-item label="中性细胞比率：">
              <el-input v-model="basicform.neutrate">
                <template slot="suffix">%</template>
              </el-input>
            </el-form-item>
            <el-form-item label="嗜酸性粒细胞：">
              <el-input v-model="basicform.eos">
                <template slot="suffix">10^9/L</template>
              </el-input>
            </el-form-item>
            <el-form-item label="嗜酸性粒细胞比率：">
              <el-input v-model="basicform.eosrate">
                <template slot="suffix">%</template>
              </el-input>
            </el-form-item>
            <el-form-item label="嗜碱性粒细胞比率：">
              <el-input v-model="basicform.basrate">
                <template slot="suffix">%</template>
              </el-input>
            </el-form-item>
            <el-form-item label="红细胞平均体积：">
              <el-input v-model="basicform.redcv">
                <template slot="suffix">fL</template>
              </el-input>
            </el-form-item>
            <el-form-item label="血小板平均体积：">
              <el-input v-model="basicform.plateletv">
                <template slot="suffix">fL</template>
              </el-input>
            </el-form-item>
            <el-form-item label="随机血糖：">
              <el-input v-model="basicform.rbg">
                <template slot="suffix">fL</template>
              </el-input>
            </el-form-item>
            <el-form-item label="便常规"></el-form-item>
            <el-form-item label="检查日期：">
              <el-date-picker type="date" placeholder="yyyy/mm/dd" v-model="basicform.bdate"></el-date-picker>
            </el-form-item>
            <el-form-item label="颜色：">
              <el-input v-model="basicform.colour"></el-input>
            </el-form-item>
            <el-form-item label="性状：">
              <el-input v-model="basicform.shape"></el-input>
            </el-form-item>
            <el-form-item label="白细胞：">
              <el-input v-model="basicform.bwhitec">
                <template slot="suffix">HP</template>
              </el-input>
            </el-form-item>
            <el-form-item label="红细胞：">
              <el-input v-model="basicform.bredc">
                <template slot="suffix">HP</template>
              </el-input>
            </el-form-item>
            <el-form-item label="便吞噬细胞：">
              <el-input v-model="basicform.bphagocyte">
                <template slot="suffix">LP</template>
              </el-input>
            </el-form-item>
            <el-form-item label="脂肪球：">
              <el-input v-model="basicform.fatglobule">
                <template slot="suffix">HP</template>
              </el-input>
            </el-form-item>
            <el-form-item label="隐血试验：">
              <el-select v-model="basicform.obt" placeholder="请选择..." @focus='searchItem("obt")'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in obtlist" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="寄生虫：">
              <el-select v-model="basicform.parasite" placeholder="请选择..." @focus='searchItem("parasite")'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in parasitelist" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="肿瘤标志物"></el-form-item>
            <el-form-item label="检查日期：">
              <el-date-picker type="date" placeholder="yyyy/mm/dd" v-model="basicform.tagdate"></el-date-picker>
            </el-form-item>
            <el-form-item label="糖类抗原CA-199：">
              <el-input v-model="basicform.ca199">
                <template slot="suffix">kU/L</template>
              </el-input>
            </el-form-item>
            <el-form-item label="糖类抗原CA-724：">
              <el-input v-model="basicform.ca724">
                <template slot="suffix">kU/L</template>
              </el-input>
            </el-form-item>
            <el-form-item label="癌胚抗原（CEA）：">
              <el-input v-model="basicform.cea">
                <template slot="suffix">μg/L</template>
              </el-input>
            </el-form-item>
            <el-form-item label="神经元特异性烯醇化酶（NSE）：">
              <el-input v-model="basicform.nse">
                <template slot="suffix">μg/L</template>
              </el-input>
            </el-form-item>
            <el-form-item label="糖类抗原CA-125：">
              <el-input v-model="basicform.ca125">
                <template slot="suffix">kU/L</template>
              </el-input>
            </el-form-item>
            <el-form-item label="糖类抗原CA-242：">
              <el-input v-model="basicform.ca242">
                <template slot="suffix">kU/L</template>
              </el-input>
            </el-form-item>
            <el-form-item label="甲胎蛋白（AFP）：">
              <el-input v-model="basicform.afp">
                <template slot="suffix">μg/L</template>
              </el-input>
            </el-form-item>
            <el-form-item label="糖类抗原CA-153：">
              <el-input v-model="basicform.ca153">
                <template slot="suffix">kU/L</template>
              </el-input>
            </el-form-item>
            <div v-if="cancertype=='colorectal'">
              <el-form-item label="影像检查"></el-form-item>
              <el-form-item label="CT：">
                <el-date-picker type="date" placeholder="yyyy/mm/dd" v-model="basicform.ctdate"></el-date-picker>
              </el-form-item>
              <el-form-item v-model="basicform.ct">
                <!-- <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList"
                >-->
                <el-button size="small" type="primary">选择文件</el-button>
                <!-- </el-upload> -->
              </el-form-item>
              <el-form-item label="PET-CT：">
                <el-date-picker type="date" placeholder="yyyy/mm/dd" v-model="basicform.petdate"></el-date-picker>
              </el-form-item>
              <el-form-item v-model="basicform.pet">
                <!-- <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList"
                >-->
                <el-button size="small" type="primary">选择文件</el-button>
                <!-- </el-upload> -->
              </el-form-item>
            </div>
            <el-form-item>
              
              <el-button type="primary" @click="saveBasic" size="medium" v-if='bsave'>保存</el-button>
              <el-button size="medium" v-else>编辑</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="activeName=='endoscope'">
          <el-form ref="form" :model="endoscopeform" label-width="150px" label-position="left">
            <el-form-item label="检查名称：">
              <el-input v-model="endoscopeform.njname"></el-input>
            </el-form-item>
            <el-form-item label="检查日期：">
              <el-date-picker type="date" placeholder="yyyy/mm/dd" v-model="endoscopeform.njdate"></el-date-picker>
            </el-form-item>
            <el-form-item label="肠镜能否通过：">
              <el-radio-group v-model="endoscopeform.ispass">
                <el-radio label="0" value="0">是</el-radio>
                <el-radio label="1" value="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="肿瘤位置：">
              <el-select v-model="endoscopeform.tumloc" placeholder="请选择..." @focus='searchItem("tumloc")'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in tumloclist" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="肠镜占肠壁：">
              <el-select v-model="endoscopeform.proportion" placeholder="请选择..." @focus='searchItem("proportion")'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in proportionlist" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="肿瘤大小：">
              <el-input v-model="endoscopeform.tumsize">
                <template slot="suffix">mm</template>
              </el-input>
            </el-form-item>
            <el-form-item label="肿瘤下缘距肛缘距离：">
              <el-input v-model="endoscopeform.distance">
                <template slot="suffix">cm</template>
              </el-input>
            </el-form-item>
            <el-form-item label="是否有息肉：">
              <el-radio-group v-model="endoscopeform.ispolyp">
                <el-radio label="0" value="0">是</el-radio>
                <el-radio label="1" value="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="息肉数量：">
              <el-select v-model="endoscopeform.polypnum" placeholder="请选择..." @focus='searchItem("polypnum")'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in polypnumlist" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              
              <el-button type="primary" @click="saveEndoscope" size="medium" v-if='esave'>保存</el-button>
              <el-button size="medium" v-else>编辑</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="activeName=='pathology'">
          <el-form ref="form" :model="pathologyform" label-width="150px" label-position="left">
            <el-form-item label="检查日期：">
              <el-date-picker type="date" placeholder="yyyy/mm/dd" v-model="pathologyform.date"></el-date-picker>
            </el-form-item>
            <el-form-item label="病理号：">
              <el-input v-model="pathologyform.bnum"></el-input>
            </el-form-item>
            <el-form-item label="病理标本类型：">
              <el-select v-model="pathologyform.btype" placeholder="请选择..." @focus='searchItem("pbtype",0)'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in pbtypelist" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="电子切片扫描：" v-model="pathologyform.isscan">
              <!-- <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList"
              >-->
              <el-button size="small" type="primary">选择文件</el-button>
              <!-- </el-upload> -->
            </el-form-item>
            <div v-if='cancertype=="colorectal"'>
              <el-form-item label="原发灶性质：">
                <el-radio-group v-model="pathologyform.prinature" @change="prinaturechange">
                  <el-radio label="0" value="0">单发性</el-radio>
                  <el-radio label="1" value="1">多发性</el-radio>
                </el-radio-group>
              </el-form-item>
              <div  v-if='pathologyform.prinature==1'>
                <el-form-item label="肿瘤部位：">
                  <el-select v-model="pathologyform.tumloc" placeholder="请选择..." @focus='searchItem("ptumloc")' :multiple='true'>
                  <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in ptumloclist" :key="index"></el-option>
                </el-select>
                </el-form-item>
              </div>
              <div  v-if='pathologyform.prinature==0'>
              <el-form-item label="肿瘤部位：">
                <el-select v-model="pathologyform.tumloc" placeholder="请选择..." @focus='searchItem("ptumloc")'>
                  <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in ptumloclist" :key="index"></el-option>
                </el-select>
                </el-form-item>
              </div>
            </div>
            <el-form-item label="检测标本：" v-if='cancertype=="breast"'>
              <el-select v-model="pathologyform.testSpecimen" placeholder="请选择..." @focus='searchItem("testSpecimen")'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in testSpecimenlist" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="组织学类型：">
              <el-select v-model="pathologyform.htype" placeholder="请选择..." @focus='searchItem("htype")'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in htypelist" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="组织学分级：">
              <el-select v-model="pathologyform.hgrade" placeholder="请选择..." @focus='searchItem("hgrade",0)'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in hgradelist" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="分化程度：">
              <el-select v-model="pathologyform.degree" placeholder="请选择..." @focus='searchItem("degree")'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in degreelist" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="既往用药史：">
              <el-checkbox label="none" :checked="pathologyform.pmh=='none'" @change="pmhcheck">无</el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-checkbox label="dname" :disabled="nowpmh" @change="dnamecheck">化疗药</el-checkbox>
            </el-form-item>
            <el-form-item v-if="nowdname">
              <el-input v-model="pathologyform.dname" placeholder="请输入化疗药名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-checkbox label="targetedDrug" :disabled="nowpmh" @change="targetedDrugcheck">靶向药</el-checkbox>
            </el-form-item>
            <el-form-item v-if="nowtargetedDrug">
              <el-input v-model="pathologyform.targetedDrug" placeholder="请输入靶向药名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-checkbox label="otherDrug" :disabled="nowpmh" @change="otherDrugcheck">其他</el-checkbox>
            </el-form-item>
            <el-form-item v-if="nowotherDrug">
              <el-input v-model="pathologyform.otherDrug" placeholder="请输入其他药物名称"></el-input>
            </el-form-item>
            <div v-if='cancertype=="colorectal"'>
              <el-form-item label="是否转移：">
                <el-radio-group v-model="pathologyform.istransfer">
                  <el-radio label="0" value="0">是</el-radio>
                  <el-radio label="1" value="1">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <div v-if="pathologyform.istransfer==0">
                <div v-for="(item,index) in transferinfolist" :key="index">
                  <el-form-item>
                    <el-input v-model="item.transferinfo" placeholder="请输入转移部位"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button
                      type="text"
                      style="color:red;"
                      @click="handle('transferinfo',index,'del')"
                    >删除</el-button>
                    <el-button
                      type="text"
                      style="color:#28c16e;"
                      @click="handle('transferinfo',index,'add')"
                    >添加转移部位</el-button>
                  </el-form-item>
                </div>
              </div>
              <el-form-item label="是否复发：">
                <el-radio-group v-model="pathologyform.isrelapse">
                  <el-radio label="0" value="0">是</el-radio>
                  <el-radio label="1" value="1">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <div v-if="pathologyform.isrelapse==0">
                <el-form-item>
                  <el-input v-model="pathologyform.tumtype" placeholder="请输入肿瘤类型"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-date-picker
                    type="date"
                    placeholder="患病时间"
                    v-model="pathologyform.illnessdate"
                  ></el-date-picker>
                </el-form-item>
              </div>
              <el-form-item label="临床分期：">
                <el-select v-model="pathologyform.clinicalStage" placeholder="请选择..." @focus='searchItem("clinicalStage")'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in clinicalStagelist" :key="index"></el-option>
              </el-select>
              </el-form-item>
              <el-form-item label="pTNM：">
                <p>
                  <el-checkbox :checked="pathologyform.ptnm">NA</el-checkbox>
                </p>
                <p style="margin-top:10px;">
                  <el-checkbox :checked="(pathologyform.pt &&pathologyform.pt!='')?true:false">pT</el-checkbox>
                  <el-select v-model="pathologyform.pt" placeholder="请选择..." @focus='searchItem("pt")'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in ptlist" :key="index"></el-option>
              </el-select>
                </p>
                <p style="margin-top:10px;">
                  <el-checkbox :checked="(pathologyform.pn &&pathologyform.pn!='')?true:false">pN</el-checkbox>
                  <el-select v-model="pathologyform.pn" placeholder="请选择..." @focus='searchItem("pn")'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in pnlist" :key="index"></el-option>
              </el-select>
                </p>
                <p style="margin-top:10px;">
                  <el-checkbox :checked="(pathologyform.pm &&pathologyform.pm!='')?true:false">pM</el-checkbox>
                  <el-select v-model="pathologyform.pm" placeholder="请选择..." @focus='searchItem("pm")'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in pmlist" :key="index"></el-option>
              </el-select>
                </p>
              </el-form-item>
            </div>
            <div v-if='cancertype=="breast"'>
              <el-form-item label="是否转移：">
                <el-radio-group v-model="pathologyform.istransfer">
                  <el-radio label="0" value="0">是</el-radio>
                  <el-radio label="1" value="1">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="脉管侵犯：">
                <el-radio-group v-model="pathologyform.vasInvasion">
                  <el-radio label="0" value="0">是</el-radio>
                  <el-radio label="1" value="1">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="合并原位癌：">
                <el-radio-group v-model="pathologyform.combineCancer">
                  <el-radio label="0" value="0">是</el-radio>
                  <el-radio label="1" value="1">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="是否复发：">
                <el-radio-group v-model="pathologyform.isrelapse">
                  <el-radio label="0" value="0">是</el-radio>
                  <el-radio label="1" value="1">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="肿瘤分期：">
                <el-select v-model="pathologyform.tumorStage" placeholder="请选择..." @focus='searchItem("tumorStage")'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in tumorStagelist" :key="index"></el-option>
              </el-select>
              </el-form-item>
              <el-form-item label="TNM分期：">
                <el-select v-model="pathologyform.tnm" placeholder="请选择..." @focus='searchItem("tnm")'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in tnmlist" :key="index"></el-option>
              </el-select>
              </el-form-item>
              <el-form-item label="T分期：">
                <el-select v-model="pathologyform.t" placeholder="请选择..." @focus='searchItem("t")'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in tlist" :key="index"></el-option>
              </el-select>
              </el-form-item>
              <el-form-item label="N分期：">
                <el-select v-model="pathologyform.cn" placeholder="N-临床区域淋巴结转移" @focus='searchItem("cn")'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in cnlist" :key="index"></el-option>
              </el-select>
                <el-select v-model="pathologyform.tpn" placeholder="pN-病理区域淋巴结转移" @focus='searchItem("tpn")'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in tpnlist" :key="index"></el-option>
              </el-select>
              </el-form-item>
              <el-form-item label="M分期：">
                <el-select v-model="pathologyform.m" placeholder="请选择..." @focus='searchItem("m")'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in mlist" :key="index"></el-option>
              </el-select>
              </el-form-item>
              <el-form-item label="特殊诊断类型：">
                <el-select v-model="pathologyform.specialType" placeholder="请选择..." @focus='searchItem("specialType")'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in specialTypelist" :key="index"></el-option>
              </el-select>
              </el-form-item>
              <el-form-item label="乳腺癌并发症（术前）：">
                <el-select v-model="pathologyform.complication" placeholder="请选择..." @focus='searchItem("complication")'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in complicationlist" :key="index"></el-option>
              </el-select>
              </el-form-item>
              <el-form-item label="一般状况ECGO：">
                <el-select v-model="pathologyform.ecgo" placeholder="请选择..." @focus='searchItem("ecgo")'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in ecgolist" :key="index"></el-option>
              </el-select>
              </el-form-item>
            </div>
            <el-form-item label="免疫组化"></el-form-item>
            <div class="immun" v-if='cancertype=="colorectal"'>
              <div>
                <el-form-item label="MLH1：">
                  <el-radio-group v-model="pathologyform.mlh1">
                    <p>
                      <el-radio label="1" value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="MLH3：">
                  <el-radio-group v-model="pathologyform.mlh3">
                    <p>
                      <el-radio label="1" value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="MSH2：">
                  <el-radio-group v-model="pathologyform.msh2">
                    <p>
                      <el-radio label="1" value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="MSH6：">
                  <el-radio-group v-model="pathologyform.msh6">
                    <p>
                      <el-radio label="1" value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
            </div>
            <div class="immun" v-if='cancertype=="colorectal"'>
              <div>
                <el-form-item label="PMS1：">
                  <el-radio-group v-model="pathologyform.pms1">
                    <p>
                      <el-radio label="1" value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="PMS2：">
                  <el-radio-group v-model="pathologyform.pms2">
                    <p>
                      <el-radio label="1" value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="APC：">
                  <el-radio-group v-model="pathologyform.apc">
                    <p>
                      <el-radio label="1" value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="AXIN2：">
                  <el-radio-group v-model="pathologyform.axin2">
                    <p>
                      <el-radio label="1" value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
            </div>
            <div class="immun" v-if='cancertype=="colorectal"'>
              <div>
                <el-form-item label="STK11：">
                  <el-radio-group v-model="pathologyform.stk11">
                    <p>
                      <el-radio label="1" value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="EPCAM：">
                  <el-radio-group v-model="pathologyform.epcam">
                    <p>
                      <el-radio label="1" value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="PTEN：">
                  <el-radio-group v-model="pathologyform.pten">
                    <p>
                      <el-radio label="1" value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="SMAD4：">
                  <el-radio-group v-model="pathologyform.smad4">
                    <p>
                      <el-radio label="1" value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
            </div>
            <div class="immun" v-if='cancertype=="colorectal"'>
              <div>
                <el-form-item label="MUTYH：">
                  <el-radio-group v-model="pathologyform.mutyh">
                    <p>
                      <el-radio label="1" value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="BMPR1A：">
                  <el-radio-group v-model="pathologyform.bmpr1a">
                    <p>
                      <el-radio label="1" value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
            </div>
            <div class="immun" v-if='cancertype=="breast"'>
              <div>
                <el-form-item label="ER：">
                  <el-radio-group v-model="pathologyform.ER">
                    <p>
                      <el-radio label="1" value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="PR：">
                  <el-radio-group v-model="pathologyform.PR">
                    <p>
                      <el-radio label="1" value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
            </div>
            <div class="immun" v-if='cancertype=="breast"'>
              <div>
                <el-form-item label="P53：">
                  <el-radio-group v-model="pathologyform.P53">
                    <p>
                      <el-radio label="1" value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="CK5/6：">
                  <el-radio-group v-model="pathologyform.CK5">
                    <p>
                      <el-radio label="1" value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
            </div>
            <div class="immun" v-if='cancertype=="breast"'>
              <div>
                <el-form-item label="E-Card：">
                  <el-radio-group v-model="pathologyform.ECard">
                    <p>
                      <el-radio label="1" value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="EGFR：">
                  <el-radio-group v-model="pathologyform.EGFR">
                    <p>
                      <el-radio label="1" value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
            </div>
            <div class="immun" v-if='cancertype=="breast"'>
              <div>
                <el-form-item label="Her-2：">
                  <el-radio-group v-model="pathologyform.Her2">
                    <p>
                      <el-radio label="1" value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="Ki-67：">
                  <el-radio-group v-model="pathologyform.Ki67">
                    <p>
                      <el-radio label="1" value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
            </div>
            <div v-if='cancertype=="colorectal"'>
              <el-form-item label="是否有遗传易感综合征：">
                <el-select v-model="pathologyform.hasyndrome" placeholder="请选择..." @focus='searchItem("hasyndrome")'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in hasyndromelist" :key="index"></el-option>
              </el-select>
              </el-form-item>
              <el-form-item label="Lynch相关病理特征：">
                <p>
                  <el-checkbox :checked="(pathologyform.inrolymreaction &&pathologyform.inrolymreaction!='')?true:false">黏膜内淋巴细胞反应</el-checkbox>
                  <el-select v-model="pathologyform.inrolymreaction" placeholder="请选择..." @focus='searchItem("inrolymreaction")'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in inrolymreactionlist" :key="index"></el-option>
              </el-select>
                </p>

                <p style="margin-top:10px;">
                  <el-checkbox :checked="(pathologyform.perilymreaction &&pathologyform.perilymreaction!='')?true:false">肿瘤周淋巴细胞反应</el-checkbox>
                  <el-select v-model="pathologyform.perilymreaction" placeholder="请选择..." @focus='searchItem("perilymreaction")'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in perilymreactionlist" :key="index"></el-option>
              </el-select>
                </p>
                <p>
                  <el-checkbox :checked="(pathologyform.othereaction &&pathologyform.othereaction!='')?true:false">其他</el-checkbox>
                </p>
                <p>
                  <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="备注..."
                    v-model="pathologyform.othereaction"
                  ></el-input>
                </p>
              </el-form-item>
            </div>
            <el-form-item label="分子分型：" v-if='cancertype=="breast"'>
              <el-select v-model="pathologyform.moleType" placeholder="请选择..." @focus='searchItem("moleType")'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in moleTypelist" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="savePathology" size="medium" v-if='psave'>保存</el-button>
              <el-button size="medium" v-else>编辑</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="activeName=='molecule'">
          <el-form ref="form" :model="moleculeform" label-width="150px" label-position="left">
            <el-form-item label="检查日期：">
              <el-date-picker type="date" placeholder="yyyy/mm/dd" v-model="moleculeform.mdate"></el-date-picker>
            </el-form-item>
            <el-form-item label="标本类型：">
              <el-select v-model="moleculeform.sampletype" placeholder="请选择..." @focus='searchItem("sampletype",0)'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in sampletypelist" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="MSI：">
              <el-radio-group v-model="moleculeform.msi">
                <el-radio label="1" value="1">已检测</el-radio>
                <el-radio label="0" value="0">未检测</el-radio>
              </el-radio-group>
            </el-form-item>
            <div v-if="moleculeform.msi=='1'">
              <el-form-item >
                <el-select v-model="moleculeform.msisp" placeholder="请选择..." @focus='searchItem("msisp",0)'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in msisplist" :key="index"></el-option>
              </el-select>
              </el-form-item>
              <el-form-item>
                <el-select v-model="moleculeform.msiresult" placeholder="请选择..." @focus='searchItem("msiresult",0)'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in msiresultlist" :key="index"></el-option>
              </el-select>
              </el-form-item>
            </div>
            <el-form-item label="MLH1启动子甲基化分析【MSP】：">
              <el-select v-model="moleculeform.msp" placeholder="请选择..." @focus='searchItem("msp",0)'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in msplist" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="MLPA：">
              <el-radio-group v-model="moleculeform.mlpa">
                <el-radio label="0" value="0">未检测</el-radio>
                <el-radio label="1" value="1">已检测</el-radio>
              </el-radio-group>
            </el-form-item>
            
              <div v-if="moleculeform.mlpa=='1'">
              <el-form-item >
                <el-select v-model="moleculeform.mlpagene" placeholder="请选择..." @focus='searchItem("mlpagene")'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in mlpagenelist" :key="index"></el-option>
              </el-select>
              </el-form-item>
              <el-form-item>
                <el-select v-model="moleculeform.mlparesult" placeholder="请选择..." @focus='searchItem("mlparesult",0)'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in mlparesultlist" :key="index"></el-option>
              </el-select>
              </el-form-item>
            </div>
            <el-form-item label="NGS检测：">
              <el-radio-group v-model="moleculeform.ngsjc">
                <el-radio label="0" value="0">已做</el-radio>
                <el-radio label="1" value="1">未做</el-radio>
              </el-radio-group>
            </el-form-item>
            <div v-if="moleculeform.ngsjc=='0'">
              <div v-for="(item,index) in checkResultList" :key='index'>
              <el-form-item>
                <el-form-item label="NGS平台：">
                  <el-radio-group v-model="item.ngspt">
                    <el-radio label="0" value="0">Illumina</el-radio>
                    <el-radio label="1" value="1">Life</el-radio>
                    <el-radio label="2" value="2">其他</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="上机测序编号：" style="margin-top:10px;">
                  AQ
                  <el-input v-model="item.seqnum"></el-input>
                </el-form-item>
                <el-form-item label="NGS Panel：" style="margin-top:10px;">
                  <el-select v-model="item.ngspanel" placeholder="请选择..." @focus='searchItem("ngspanel",0)'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in ngspanellist" :key="index"></el-option>
              </el-select>
                </el-form-item>
                <el-form-item label="检测结果"></el-form-item>
                <el-form-item label="Gene：" style="margin-top:10px;">
                  <el-input v-model="item.gene"></el-input>
                </el-form-item>
                <el-form-item label="Position：" style="margin-top:10px;">
                  <el-input v-model="item.position"></el-input>
                </el-form-item>
                <el-form-item label="Transcript：" style="margin-top:10px;">
                  <el-input v-model="item.transcript"></el-input>
                </el-form-item>
                <el-form-item label="HGVS：" style="margin-top:10px;">
                  <el-input v-model="item.hgvs"></el-input>
                </el-form-item>
                <el-form-item label="Mutation type：" style="margin-top:10px;">
                  <el-input v-model="item.mtype"></el-input>
                </el-form-item>
                <el-form-item label="Function：" style="margin-top:10px;">
                  <el-input v-model="item.function"></el-input>
                </el-form-item>
                <el-form-item label="Coding：" style="margin-top:10px;">
                  <el-input v-model="item.coding"></el-input>
                </el-form-item>
                <el-form-item label="Protein：" style="margin-top:10px;">
                  <el-input v-model="item.protein"></el-input>
                </el-form-item>
                <el-form-item label="Allelic frequency(%)：" style="margin-top:10px;">
                  <el-input v-model="item.aferquency"></el-input>
                </el-form-item>
                <el-form-item label="ExAC ALL：" style="margin-top:10px;">
                  <el-input v-model="item.alls"></el-input>
                </el-form-item>
                <el-form-item label="ExAC EAS：" style="margin-top:10px;">
                  <el-input v-model="item.eas"></el-input>
                </el-form-item>
                <el-form-item label="致病性分级：" style="margin-top:10px;">
                  <el-select v-model="item.grade" placeholder="请选择..." @focus='searchItem("grade",0)'>
                <el-option :label="items.itemName" :value="items.id" v-for="(items,index) in gradelist" :key="index"></el-option>
              </el-select>
                </el-form-item>
                <el-form-item style="margin-top:10px;">
                  <el-button type="text" style="color:red;" @click="handle('checkResult',index,'del')">删除</el-button>
                <el-button type="text" style="color:#28c16e;" @click="handle('checkResult',index,'add')">添加一例</el-button>
                </el-form-item>
                </el-form-item>
              </div>
            </div>
            <el-form-item label="其他代表性基因突变结果："></el-form-item>
            <el-form-item label="检测平台：">
              <el-radio-group v-model="moleculeform.testp">
                <el-radio label="0" value="0">ARMS</el-radio>
                <el-radio label="1" value="1">NGS</el-radio>
              </el-radio-group>
            </el-form-item>
            <div class="immun" v-if='cancertype=="colorectal"'>
              <div>
                <el-form-item label="KRAS：">
                  <el-radio-group v-model="moleculeform.kras">
                    <p>
                      <el-radio label="1" value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="NRAS：">
                  <el-radio-group v-model="moleculeform.nras">
                    <p>
                      <el-radio label="1" value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="BRAF：">
                  <el-radio-group v-model="moleculeform.braf">
                    <p>
                      <el-radio label="1" value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
            </div>
            <div class="immun" v-if='cancertype=="colorectal"'>
              <div>
                <el-form-item label="PIK3CA：">
                  <el-radio-group v-model="moleculeform.pik3ca">
                    <p>
                      <el-radio label="1" value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="PTEN：">
                  <el-radio-group v-model="moleculeform.pten">
                    <p>
                      <el-radio label="1" value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div></div>
            </div>
            <div class="immun" v-if='cancertype=="breast"'>
              <div>
                <el-form-item label="MUTYH：">
                  <el-radio-group v-model="pathologyform.mutyh">
                    <p>
                      <el-radio label="1" value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="MSH2">
                  <el-radio-group v-model="pathologyform.msh2">
                    <p>
                      <el-radio label="1" value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
            </div>
            <div class="immun" v-if='cancertype=="breast"'>
              <div>
                <el-form-item label="MSH6：">
                  <el-radio-group v-model="pathologyform.msh6">
                    <p>
                      <el-radio label="1" value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="MRE11A：">
                  <el-radio-group v-model="pathologyform.mre11a">
                    <p>
                      <el-radio label="1" value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
            </div>
            <div class="immun" v-if='cancertype=="breast"'>
              <div>
                <el-form-item label="MLH1：">
                  <el-radio-group v-model="pathologyform.mlh1">
                    <p>
                      <el-radio label="1" value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div></div>
            </div>
            <el-form-item>
              
              <el-button type="primary" @click="saveMolecule" size="medium" v-if='msave'>保存</el-button>
              <el-button size="medium" v-else>编辑</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="activeName=='assist'">
          <el-form ref="form" :model="assistform" label-width="100px" label-position="left">
            <el-form-item label="乳腺钼靶X线摄影检查：">
              <el-date-picker type="date" placeholder="yyyy/mm/dd" v-model="assistform.xraydate"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <!-- <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList"
              >-->
              <el-button size="small" type="primary">选择文件</el-button>
              <!-- </el-upload> -->
            </el-form-item>
            <el-form-item label="有无异常情况：">
              <el-radio-group v-model="assistform.unusual">
                <el-radio label="0" value="0">是</el-radio>
                <el-radio label="1" value="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-select v-model="assistform.calcification" placeholder="钙化" @focus='searchItem("calcification")'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in calcificationlist" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="assistform.massedge" placeholder="肿物边缘" @focus='searchItem("massedge")'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in massedgelist" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input v-model="assistform.othercondition" placeholder="其他"></el-input>
            </el-form-item>
            <el-form-item label="乳腺MRI检查：">
              <el-date-picker type="date" placeholder="yyyy/mm/dd" v-model="assistform.MRIdate"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <!-- <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList"
              >-->
              <el-button size="small" type="primary">选择文件</el-button>
              <!-- </el-upload> -->
            </el-form-item>
            <el-form-item label="乳腺MRI征象：">
              <el-select v-model="assistform.MRIsign" placeholder="请选择..." @focus='searchItem("MRIsign")'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in MRIsignlist" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="BI-RADS分类：">
              <el-select v-model="assistform.BIRADS" placeholder="请选择..." @focus='searchItem("BIRADS")'>
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in BIRADSlist" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveAssist" size="medium" v-if='ssave'>保存</el-button>
              <el-button size="medium" v-else>编辑</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { infoentry,dict } from "api/index.js";
import sortRule from "../../../base/js/common.js";
export default {
  data() {
    return {
      coltablist:[
        {
          name:'basic',
          label:'基本检查',
          disabled:false
        },{
          name:'endoscope',
          label:'内镜检查',
          disabled:true
        },{
          name:'pathology',
          label:'病理检查',
          disabled:true
        },{
          name:'molecule',
          label:'分子检测',
          disabled:true
        }
      ],
      bretablist:[
        {
          name:'basic',
          label:'基本检查',
          disabled:false
        },{
          name:'assist',
          label:'辅助检查',
          disabled:true
        },{
          name:'pathology',
          label:'病理检查',
          disabled:true
        },{
          name:'molecule',
          label:'分子检测',
          disabled:true
        }
      ],
      ssave:true,
      msave:true,
      bsave:true,
      psave:true,
      esave:true,
      edisabled:true,
      adisabled:true,
      pdisabled:true,
      mdisabled:true,
      checkResultList:[{}],
      transferinfolist: [{}],
      cancertype: "colorectal",
      activeName: "basic",
      basicform: {},
      assistform: {},
      endoscopeform: {},
      pathologyform: {},
      moleculeform: {},
      nowdname: false,
      nowtargetedDrug: false,
      nowotherDrug: false,
      nowpmh: false,
      kpslist:[],
      obtlist:[],
      parasitelist:[],
      tumloclist:[],
      proportionlist:[],
      polypnumlist:[],
      pbtypelist:[],
      ptumloclist:[],
      htypelist:[],
      hgradelist:[],
      degreelist:[],
      clinicalStagelist:[],
      ptlist:[],
      pnlist:[],
      pmlist:[],
      hasyndromelist:[],
      inrolymreactionlist:[],
      perilymreactionlist:[],
      sampletypelist:[],
      msisplist:[],
      msiresultlist:[],
      msplist:[],
      mlpagenelist:[],      
      mlparesultlist:[],
      ngspanellist:[],
      gradelist:[],
      epidermislist:[],
      papillalist:[],
      dischargewaylist:[],
      dischargerangelist:[],
      testSpecimenlist:[],
      tumorStagelist:[],
      tnmlist:[],      
      tlist:[],      
      cnlist:[],      
      tpnlist:[],      
      mlist:[],      
      specialTypelist:[],      
      complicationlist:[],      
      ecgolist:[], 
      moleTypelist:[],
      calcificationlist:[],
      massedgelist:[],
      MRIsignlist:[],
      BIRADSlist:[],
      multipe:false,  
    };
  },
  methods: {
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
            case 'kps':
              this.kpslist=res.data;
              break;
            case 'obt':
              this.obtlist=res.data;
              break;
            case 'parasite':
              this.parasitelist=res.data;
              break;
            case 'tumloc':
              this.tumloclist=res.data;
              break;
            case 'proportion':
              this.proportionlist=res.data;
              break;
            case 'polypnum':
              this.polypnumlist=res.data;
              break;
            case 'pbtype':
              this.pbtypelist=res.data;
              break;
            case 'ptumloc':
              this.ptumloclist=res.data;
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
            case 'hasyndrome':
              this.hasyndromelist=res.data;
              break;
            case 'inrolymreaction':
              this.inrolymreactionlist=res.data;
              break;
            case 'perilymreaction':
              this.perilymreactionlist=res.data;
              break;
            case 'sampletype':
              this.sampletypelist=res.data;
              break;
            case 'msisp':
              this.msisplist=res.data;
              break;
            case 'msiresult':
              this.msiresultlist=res.data;
              break;
            case 'msp':
              this.msplist=res.data;
              break;
            case 'mlpagene':
              this.mlpagenelist=res.data;
              break;
            case 'mlparesult':
              this.mlparesultlist=res.data;
              break;
            case 'ngspanel':
              this.ngspanellist=res.data;
              break;
            case 'grade':
              this.gradelist=res.data;
              break;
            case 'epidermis':
              this.epidermislist=res.data;
              break;
            case 'papilla':
              this.papillalist=res.data;
              break;
            case 'dischargeway':
              this.dischargewaylist=res.data;
              break;
            case 'dischargerange':
              this.dischargerangelist=res.data;
              break;
            case 'testSpecimen':
              this.testSpecimenlist=res.data;
              break;
            case 'tumorStage':
              this.tumorStagelist=res.data;
              break;
            case 'tnm':
              this.tnmlist=res.data;
              break;
            case 't':
              this.tlist=res.data;
              break;
            case 'cn':
              this.cntlist=res.data;
              break;
            case 'tpn':
              this.tpnlist=res.data;
              break;
            case 'm':
              this.mlist=res.data;
              break;
            case 'specialType':
              this.specialTypelist=res.data;
              break;
            case 'complication':
              this.complicationlist=res.data;
              break;
            case 'ecgo':
              this.ecgolist=res.data;
              break;
            case 'moleType':
              this.moleTypelist=res.data;
              break;
            case 'calcification':
              this.calcificationlist=res.data;
              break;
            case 'massedge':
              this.massedgelist=res.data;
              break;
            case 'MRIsign':
              this.MRIsignlist=res.data;
              break;
            case 'BIRADS':
              this.BIRADSlist=res.data;
              break;
          }
        }
      })
    },
    handle(name,index, handle) {
      let n = 0;
      if (handle == "del") {
        n = 1;
      }
      if(name=='transferinfo'){
        n == 0
        ? this.transferinfolist.splice(index + 1, 0, {})
        : this.transferinfolist.splice(index + 1, n);
      }else if(name=='checkResult'){
        n == 0
        ? this.checkResultList.splice(index + 1, 0, {})
        : this.checkResultList.splice(index + 1, n);
      }
      
    },
    prinaturechange(){
      console.log(this.pathologyform)
    },
    pmhlistchange(name) {
      if (name in this.pmhlist) {
        return true;
      }
      return false;
    },
    pmhcheck(val) {
      this.nowpmh = val;
      if (val) {
        this.pathologyform.pmh = "none";
      }
    },
    dnamecheck(val) {
      this.nowdname = val;
    },
    targetedDrugcheck(val) {
      this.nowtargetedDrug = val;
    },
    otherDrugcheck(val) {
      this.nowotherDrug = val;
    },
    handleClick() {
      if(this.$store.state.entryState>=4 && this.activeName=='basic'){
        this.bsave=false;
        this.basicCheckInfo()
      }else if(this.$store.state.entryState>=5 && (this.activeName=='endoscope'|| this.activeName=='assist')){
        if(this.activeName=='endoscope'){
          this.esave=false;
          this.introscopeInfo()
        }
        if(this.activeName=='assist'){
          this.asave=false;
          this.introscopeInfo()
        }
      }else if(this.$store.state.entryState>=6 && this.activeName=='pathology'){
        this.psave=false;
        this.pathologicInfo()
      }else if(this.$store.state.entryState>=7 && this.activeName=='molecule'){
        this.msave=false;
        this.molDetectionInfo()
      }
    },
    saveBasic() {
      this.basicform["pid"] = this.$store.state.patientid;
      infoentry.saveBasicCheck(this.basicform).then(res => {
        if (res.returnCode == 0) {
          if (this.cancertype == "colorectal") {
            this.edisabled=false;
            this.activeName = "endoscope";
          } else if (this.cancertype == "breast") {
            this.adisabled=false;
            this.activeName = "assist";
          }
          this.$store.state.entryState=5;
        }
      });
    },
    basicCheckInfo(){
      let obj={
        id:this.$store.state.patientid
      }
      infoentry.basicCheckInfo(obj).then((res)=>{
        if(res.returnCode==0){
          this.basicform=res.data;
        }
      })
    },
    saveAssist() {
      this.$store.state.entryState=6;
      this.pdisabled=false;
      this.activeName = "pathology";
    },
    saveEndoscope() {
      this.endoscopeform["pid"] = this.$store.state.patientid;
      infoentry.saveIntroscope(this.endoscopeform).then(res => {
        if (res.returnCode == 0) {
          this.$store.state.entryState=6;
          this.pdisabled=false;
          this.activeName = "pathology";
        }
      });
    },
    introscopeInfo(){
      let obj={
        id:this.$store.state.patientid
      }
      infoentry.introscopeInfo(obj).then((res)=>{
        if(res.returnCode==0){
          this.endoscopeform=res.data;
        }
      })
    },
    savePathology() {
      this.pathologyform["pid"] = this.$store.state.patientid;
      infoentry.savePathologic(this.pathologyform).then(res => {
        if (res.returnCode == 0) {
          this.$store.state.entryState=7;
          this.mdisabled=false;
          this.activeName = "molecule";
        }
      });
    },
    pathologicInfo(){
      let obj={
        id:this.$store.state.patientid
      }
      infoentry.pathologicInfo(obj).then((res)=>{
        if(res.returnCode==0){
          this.pathologyform=res.data;
        }
      })
    },
    saveMolecule() {
      this.moleculeform["checkResultList"]=this.checkResultList;
      this.moleculeform["pid"] = this.$store.state.patientid;
      infoentry.saveMolDetection(this.moleculeform).then(res => {
        if (res.returnCode == 0) {
          this.$store.state.entryState=8;
          this.$store.state.tabState=4;
          this.$router.push({
            path: "/infoentry/addpatient",
            query: {
              type: "treatInfo"
            }
          });
        }
      });
    },
    molDetectionInfo(){
      let obj={
        id:this.$store.state.patientid
      }
      infoentry.molDetectionInfo(obj).then((res)=>{
        if(res.returnCode==0){
          this.pathologyform=res.data;
        }
      })
    },
  },
  created() {
    // this.cancertype='breast';
    if(this.$store.state.entryState!=null){
      if(this.$store.state.entryState>=7){
        // this.ssave=false
        this.msave=false
        // this.bsave=false
        // this.psave=false
        // this.esave=false
        this.edisabled=false
        this.adisabled=false
        this.pdisabled=false
        this.mdisabled=false
      }else if(this.$store.state.entryState>=6){
        // this.ssave=false
        // this.bsave=false
        this.psave=false
        // this.esave=false
        this.edisabled=false
        this.adisabled=false
        this.pdisabled=false
      }else if(this.$store.state.entryState>=5){
        // this.ssave=false
        // this.bsave=false
        this.esave=false
        this.edisabled=false
        this.adisabled=false
      }else if(this.$store.state.entryState>4){
        this.bsave=false
      }
    }
  }
};
</script>