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
        <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane v-for='(item,index) in coltablist' :label="item.label" :name='item.name' :key='index' :disabled="item.disabled"></el-tab-pane>
        </el-tabs>
        </div>
        <!-- <div v-if='cancerid==3'>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane v-for='(item,index) in bretablist' :label="item.label" :name='item.name' :key='index' :disabled="item.disabled"></el-tab-pane>
        </el-tabs>
        </div> -->
      </div>
      <div class="basic-main">
        <div v-if="activeName=='basic'">
          <el-form ref="form" :model="basicform" label-width="150px" label-position="left">
            <el-form-item label="体格检查"></el-form-item>
            <el-form-item label="检查日期：">
              <el-date-picker type="date" placeholder="yyyy/mm/dd" v-model="basicform.tdate" value-format="yyyy-MM-dd"></el-date-picker>
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
            <div v-if="cancerid==3">
              <el-form-item label="乳房位置：">
                <el-radio-group v-model="basicform.breastPos">
                  <el-radio label="对称" :value="1"></el-radio>
                  <el-radio label="不对称" :value="0"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="皮肤表皮：">
                <el-select v-model="basicform.skinEpi" placeholder="请选择...">
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in optionlist['epidermis']" :key="index"></el-option>
              </el-select>
              </el-form-item>
              <el-form-item label="是否有肿块：">
                <el-radio-group v-model="basicform.lump">
                  <el-radio :label="0" :value="0">是</el-radio>
                  <el-radio :label="1" :value="1">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="乳头情况：">
                <el-select v-model="basicform.nippleSit" placeholder="请选择...">
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in optionlist['papilla']" :key="index"></el-option>
              </el-select>
              </el-form-item>
              <el-form-item label="是否溢液：">
                <el-radio-group v-model="basicform.overflow">
                  <el-radio :label="0" :value="0">是</el-radio>
                  <el-radio :label="1" :value="1">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item v-if='basicform.overflow==0'>
                <el-select v-model="basicform.overflow_pos" placeholder="溢液方式">
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in optionlist['dischargeway']" :key="index"></el-option>
              </el-select>
              </el-form-item>
              <el-form-item v-if='basicform.overflow==0'>
                <el-select v-model="basicform.overflow_range" placeholder="溢液范围">
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in optionlist['dischargerange']" :key="index"></el-option>
              </el-select>
              </el-form-item>
              <el-form-item label="乳晕颜色：">
                <el-radio-group v-model="basicform.areolaColor">
                  <el-radio label="正常" :value="1"></el-radio>
                  <el-radio label="异常" :value="0"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="是否湿疹样改变：">
                <el-radio-group v-model="basicform.eczemaLike">
                  <el-radio :label="0" :value="0">是</el-radio>
                  <el-radio :label="1" :value="1">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="是否有区域淋巴结：">
                <el-radio-group v-model="basicform.lymphNode">
                  <el-radio :label="0" :value="0">是</el-radio>
                  <el-radio :label="1" :value="1">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
            <el-form-item label="KPS评分：" v-if="cancerid==2">
              <el-select v-model="basicform.kps" placeholder="请选择...">
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in optionlist['kps']" :key="index"></el-option>
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
            <template v-if="cancerid==2">
            <el-form-item label="便常规" ></el-form-item>
            <el-form-item label="检查日期：">
              <el-date-picker type="date" placeholder="yyyy/mm/dd" v-model="basicform.bdate" value-format="yyyy-MM-dd"></el-date-picker>
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
              <el-select v-model="basicform.obt" placeholder="请选择...">
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in optionlist['obt']" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="寄生虫：">
              <el-select v-model="basicform.parasite" placeholder="请选择...">
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in optionlist['parasite']" :key="index"></el-option>
              </el-select>
            </el-form-item>
            </template>
            <el-form-item label="肿瘤标志物"></el-form-item>
            <el-form-item label="检查日期：">
              <el-date-picker type="date" placeholder="yyyy/mm/dd" v-model="basicform.tagdate" value-format="yyyy-MM-dd"></el-date-picker>
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
            <div v-if="cancerid==2">
              <el-form-item label="影像检查"></el-form-item>
              <el-form-item label="CT：">
                <el-date-picker type="date" placeholder="yyyy/mm/dd" v-model="basicform.ctdate"></el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-upload
                class="upload-demo"
                action="/1.0/upload/upload"
                multiple
                :on-success='ctchoice'
                list-type="picture"
                :file-list="ctfile"
                :limit='2'
                >
                <el-button size="small" type="primary">选择文件</el-button>
                </el-upload>
              </el-form-item>
              <el-form-item label="PET-CT：">
                <el-date-picker type="date" placeholder="yyyy/mm/dd" v-model="basicform.petdate"></el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-upload
                class="upload-demo"
                action="/1.0/upload/upload"
                multiple
                :on-success='petchoice'
                list-type="picture"
                :file-list="petfile"
                :limit='2'
                >
                <el-button size="small" type="primary">选择文件</el-button>
                </el-upload>
              </el-form-item>
            </div>
            <el-form-item>
              
              <el-button type="primary" @click="saveBasic" size="medium" v-if='bsave'>保存</el-button>
              <el-button size="medium" @click="updateBasicCheck" v-else>编辑</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="activeName=='endoscope'">
          <el-form ref="form" :model="endoscopeform" label-width="150px" label-position="left">
            <el-form-item label="检查名称：">
              <el-input v-model="endoscopeform.njname"></el-input>
            </el-form-item>
            <el-form-item label="检查日期：">
              <el-date-picker type="date" placeholder="yyyy/mm/dd" v-model="endoscopeform.njdate" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item label="肠镜能否通过：">
              <el-radio-group v-model="endoscopeform.ispass">
                <el-radio :label="0" :value="0">是</el-radio>
                <el-radio :label="1" :value="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="肿瘤位置：">
              <el-select v-model="endoscopeform.tumloc" placeholder="请选择...">
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in optionlist['tumloc']" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="肠镜占肠壁：">
              <el-select v-model="endoscopeform.proportion" placeholder="请选择...">
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in optionlist['proportion']" :key="index"></el-option>
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
                <el-radio :label="0" :value="0">是</el-radio>
                <el-radio :label="1" :value="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="息肉数量：">
              <el-select v-model="endoscopeform.polypnum" placeholder="请选择...">
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in optionlist['polypnum']" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              
              <el-button type="primary" @click="saveEndoscope" size="medium" v-if='esave'>保存</el-button>
              <el-button size="medium" @click="updateEndoscope" v-else>编辑</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="activeName=='pathology'">
          <el-form ref="form" :model="pathologyform" label-width="150px" label-position="left">
            <el-form-item label="检查日期：">
              <el-date-picker type="date" placeholder="yyyy/mm/dd" v-model="pathologyform.date" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item label="病理号：">
              <el-input v-model="pathologyform.bnum"></el-input>
            </el-form-item>
            <el-form-item label="病理标本类型：">
              <el-select v-model="pathologyform.btype" placeholder="请选择...">
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in optionlist['pbtype']" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="电子切片扫描：">
              <el-upload
                class="upload-demo"
                action="/1.0/upload/upload"
                multiple
                :on-success='isscanchoice'
                list-type="picture"
                :file-list="isscanfile"
                :limit='2'
              >
              <el-button size="small" type="primary">选择文件</el-button>
              </el-upload>
            </el-form-item>
            <div v-if='cancerid==2'>
              <el-form-item label="原发灶性质：">
                <el-radio-group v-model="pathologyform.prinature" @change="prinaturechange">
                  <el-radio :label="0" :value="0">单发性</el-radio>
                  <el-radio :label="1" :value="1">多发性</el-radio>
                </el-radio-group>
              </el-form-item>
              <div  v-if='pathologyform.prinature==1'>
                <el-form-item label="肿瘤部位：">
                  <el-select v-model="mtumloc" placeholder="请选择..." :multiple='true'>
                  <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in optionlist['ptumloc']" :key="index"></el-option>
                </el-select>
                </el-form-item>
              </div>
              <div  v-if='pathologyform.prinature==0'>
              <el-form-item label="肿瘤部位：">
                <el-select v-model="tumloc" placeholder="请选择...">
                  <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in optionlist['ptumloc']" :key="index"></el-option>
                </el-select>
                </el-form-item>
              </div>
            </div>
            <el-form-item label="检测标本：" v-if='cancerid==3'>
              <el-select v-model="pathologyform.testSpecimen" placeholder="请选择...">
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in optionlist['testSpecimen']" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="组织学类型：">
              <el-select v-model="pathologyform.htype" placeholder="请选择...">
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in optionlist['htype']" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="组织学分级：">
              <el-select v-model="pathologyform.hgrade" placeholder="请选择...">
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in optionlist['hgrade']" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="分化程度：">
              <el-select v-model="pathologyform.degree" placeholder="请选择...">
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in optionlist['degree']" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="既往用药史：">
              <el-checkbox label="none" v-model="pmhnone" @change="pmhcheck">无</el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-checkbox label="dname" v-model="pmhdname" :disabled="nowpmh" @change="dnamecheck">化疗药</el-checkbox>
            </el-form-item>
            <el-form-item v-if="nowdname">
              <el-input v-model="pathologyform.dname" placeholder="请输入化疗药名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-checkbox label="targetedDrug" v-model="pmhtargetedDrug" :disabled="nowpmh" @change="targetedDrugcheck">靶向药</el-checkbox>
            </el-form-item>
            <el-form-item v-if="nowtargetedDrug">
              <el-input v-model="pathologyform.targetedDrug" placeholder="请输入靶向药名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-checkbox label="otherDrug" v-model="pmhotherDrug" :disabled="nowpmh" @change="otherDrugcheck">其他</el-checkbox>
            </el-form-item>
            <el-form-item v-if="nowotherDrug">
              <el-input v-model="pathologyform.otherDrug" placeholder="请输入其他药物名称"></el-input>
            </el-form-item>
            <div v-if='cancerid==2'>
              <el-form-item label="是否转移：">
                <el-radio-group v-model="pathologyform.istransfer">
                  <el-radio :label="0" :value="0">是</el-radio>
                  <el-radio :label="1" :value="1">否</el-radio>
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
                  <el-radio :label="0" :value="0">是</el-radio>
                  <el-radio :label="1" :value="1">否</el-radio>
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
                <el-select v-model="pathologyform.clinicalStage" placeholder="请选择..." >
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in optionlist['clinicalStage']" :key="index"></el-option>
              </el-select>
              </el-form-item>
              <el-form-item label="pTNM：">
                <p>
                  <el-checkbox v-model="ptnmcheck">NA</el-checkbox>
                </p>
                <p style="margin-top:10px;">
                  <el-checkbox v-model="ptcheck">pT</el-checkbox>
                  <el-select v-model="pathologyform.pt" placeholder="请选择...">
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in optionlist['pt']" :key="index"></el-option>
              </el-select>
                </p>
                <p style="margin-top:10px;">
                  <el-checkbox v-model="pncheck">pN</el-checkbox>
                  <el-select v-model="pathologyform.pn" placeholder="请选择...">
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in optionlist['pn']" :key="index"></el-option>
              </el-select>
                </p>
                <p style="margin-top:10px;">
                  <el-checkbox v-model="pmcheck">pM</el-checkbox>
                  <el-select v-model="pathologyform.pm" placeholder="请选择...">
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in optionlist['pm']" :key="index"></el-option>
              </el-select>
                </p>
              </el-form-item>
            </div>
            <div v-if='cancerid==3'>
              <el-form-item label="是否转移：">
                <el-radio-group v-model="pathologyform.istransfer">
                  <el-radio :label="0" :value="0">是</el-radio>
                  <el-radio :label="1" :value="1">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="脉管侵犯：">
                <el-radio-group v-model="pathologyform.vasInvasion">
                  <el-radio :label="0" :value="0">是</el-radio>
                  <el-radio :label="1" :value="1">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="合并原位癌：">
                <el-radio-group v-model="pathologyform.combineCancer">
                  <el-radio :label="0" :value="0">是</el-radio>
                  <el-radio :label="1" :value="1">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="是否复发：">
                <el-radio-group v-model="pathologyform.isrelapse">
                  <el-radio :label="0" :value="0">是</el-radio>
                  <el-radio :label="1" :value="1">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="肿瘤分期：">
                <el-select v-model="pathologyform.tumorStage" placeholder="请选择...">
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in optionlist['tumorStage']" :key="index"></el-option>
              </el-select>
              </el-form-item>
              <el-form-item label="TNM分期：">
                <el-select v-model="pathologyform.tnm" placeholder="请选择...">
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in optionlist['tnm']" :key="index"></el-option>
              </el-select>
              </el-form-item>
              <el-form-item label="T分期：">
                <el-select v-model="pathologyform.t" placeholder="请选择...">
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in optionlist['t']" :key="index"></el-option>
              </el-select>
              </el-form-item>
              <el-form-item label="N分期：">
                <el-select v-model="pathologyform.cn" placeholder="N-临床区域淋巴结转移">
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in optionlist['cn']" :key="index"></el-option>
              </el-select>
                <el-select v-model="pathologyform.tpn" placeholder="pN-病理区域淋巴结转移">
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in optionlist['tpn']" :key="index"></el-option>
              </el-select>
              </el-form-item>
              <el-form-item label="M分期：">
                <el-select v-model="pathologyform.m" placeholder="请选择...">
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in optionlist['m']" :key="index"></el-option>
              </el-select>
              </el-form-item>
              <el-form-item label="特殊诊断类型：">
                <el-select v-model="pathologyform.specialType" placeholder="请选择...">
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in optionlist['specialType']" :key="index"></el-option>
              </el-select>
              </el-form-item>
              <el-form-item label="乳腺癌并发症（术前）：">
                <el-select v-model="pathologyform.complication" placeholder="请选择...">
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in optionlist['complication']" :key="index"></el-option>
              </el-select>
              </el-form-item>
              <el-form-item label="一般状况ECGO：">
                <el-select v-model="pathologyform.ecgo" placeholder="请选择...">
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in optionlist['ecgo']" :key="index"></el-option>
              </el-select>
              </el-form-item>
            </div>
            <el-form-item label="免疫组化"></el-form-item>
            <div class="immun" v-if='cancerid==2'>
              <div>
                <el-form-item label="MLH1：">
                  <el-radio-group v-model="pathologyform.mlh1">
                    <p>
                      <el-radio label="1" :value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" :value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" :value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" :value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="MLH3：">
                  <el-radio-group v-model="pathologyform.mlh3">
                    <p>
                      <el-radio label="1" :value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" :value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" :value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" :value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="MSH2：">
                  <el-radio-group v-model="pathologyform.msh2">
                    <p>
                      <el-radio label="1" :value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" :value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" :value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" :value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="MSH6：">
                  <el-radio-group v-model="pathologyform.msh6">
                    <p>
                      <el-radio label="1" :value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" :value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" :value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" :value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
            </div>
            <div class="immun" v-if='cancerid==2'>
              <div>
                <el-form-item label="PMS1：">
                  <el-radio-group v-model="pathologyform.pms1">
                    <p>
                      <el-radio label="1" :value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" :value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" :value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" :value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="PMS2：">
                  <el-radio-group v-model="pathologyform.pms2">
                    <p>
                      <el-radio label="1" :value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" :value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" :value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" :value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="APC：">
                  <el-radio-group v-model="pathologyform.apc">
                    <p>
                      <el-radio label="1" :value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" :value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" :value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" :value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="AXIN2：">
                  <el-radio-group v-model="pathologyform.axin2">
                    <p>
                      <el-radio label="1" :value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" :value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" :value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" :value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
            </div>
            <div class="immun" v-if='cancerid==2'>
              <div>
                <el-form-item label="STK11：">
                  <el-radio-group v-model="pathologyform.stk11">
                    <p>
                      <el-radio label="1" :value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" :value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" :value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" :value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="EPCAM：">
                  <el-radio-group v-model="pathologyform.epcam">
                    <p>
                      <el-radio label="1" :value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" :value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" :value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" :value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="PTEN：">
                  <el-radio-group v-model="pathologyform.pten">
                    <p>
                      <el-radio label="1" :value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" :value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" :value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" :value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="SMAD4：">
                  <el-radio-group v-model="pathologyform.smad4">
                    <p>
                      <el-radio label="1" :value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" :value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" :value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" :value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
            </div>
            <div class="immun" v-if='cancerid==2'>
              <div>
                <el-form-item label="MUTYH：">
                  <el-radio-group v-model="pathologyform.mutyh">
                    <p>
                      <el-radio label="1" :value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" :value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" :value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" :value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="BMPR1A：">
                  <el-radio-group v-model="pathologyform.bmpr1a">
                    <p>
                      <el-radio label="1" :value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" :value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" :value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" :value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
            </div>
            <div class="immun" v-if='cancerid==3'>
              <div>
                <el-form-item label="ER：">
                  <el-radio-group v-model="pathologyform.ER">
                    <p>
                      <el-radio label="1" :value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" :value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" :value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" :value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="PR：">
                  <el-radio-group v-model="pathologyform.PR">
                    <p>
                      <el-radio label="1" :value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" :value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" :value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" :value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
            </div>
            <div class="immun" v-if='cancerid==3'>
              <div>
                <el-form-item label="P53：">
                  <el-radio-group v-model="pathologyform.P53">
                    <p>
                      <el-radio label="1" :value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" :value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" :value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" :value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="CK5/6：">
                  <el-radio-group v-model="pathologyform.CK5">
                    <p>
                      <el-radio label="1" :value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" :value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" :value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" :value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
            </div>
            <div class="immun" v-if='cancerid==3'>
              <div>
                <el-form-item label="E-Card：">
                  <el-radio-group v-model="pathologyform.ECard">
                    <p>
                      <el-radio label="1" :value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" :value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" :value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" :value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="EGFR：">
                  <el-radio-group v-model="pathologyform.EGFR">
                    <p>
                      <el-radio label="1" :value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" :value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" :value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" :value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
            </div>
            <div class="immun" v-if='cancerid==3'>
              <div>
                <el-form-item label="Her-2：">
                  <el-radio-group v-model="pathologyform.Her2">
                    <p>
                      <el-radio label="1" :value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" :value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" :value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" :value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="Ki-67：">
                  <el-radio-group v-model="pathologyform.Ki67">
                    <p>
                      <el-radio label="1" :value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" :value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" :value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" :value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
            </div>
            <div v-if='cancerid==2'>
              <el-form-item label="是否有遗传易感综合征：">
                <el-select v-model="pathologyform.hasyndrome" placeholder="请选择...">
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in optionlist['hasyndrome']" :key="index"></el-option>
              </el-select>
              </el-form-item>
              <el-form-item label="Lynch相关病理特征：">
                <p>
                  <el-checkbox v-model="inrolycheck">黏膜内淋巴细胞反应</el-checkbox>
                  <el-select v-model="pathologyform.inrolymreaction" placeholder="请选择...">
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in optionlist['inrolymreaction']" :key="index"></el-option>
              </el-select>
                </p>

                <p style="margin-top:10px;">
                  <el-checkbox v-model="perilycheck">肿瘤周淋巴细胞反应</el-checkbox>
                  <el-select v-model="pathologyform.perilymreaction" placeholder="请选择...">
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in optionlist['perilymreaction']" :key="index"></el-option>
              </el-select>
                </p>
                <p>
                  <el-checkbox v-model="othereactioncheck">其他</el-checkbox>
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
            <el-form-item label="分子分型：" v-if='cancerid==3'>
              <el-select v-model="pathologyform.moleType" placeholder="请选择...">
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in optionlist['moleType']" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="savePathology" size="medium" v-if='psave'>保存</el-button>
              <el-button size="medium" @click="updatePathology" v-else>编辑</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="activeName=='molecule'">
          <el-form ref="form" :model="moleculeform" label-width="150px" label-position="left">
            <el-form-item label="检查日期：">
              <el-date-picker type="date" placeholder="yyyy/mm/dd" v-model="moleculeform.mdate" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item label="标本类型：">
              <el-select v-model="moleculeform.sampletype" placeholder="请选择...">
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in optionlist['sampletype']" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="MSI：">
              <el-radio-group v-model="moleculeform.msi">
                <el-radio :label="1" :value="1">已检测</el-radio>
                <el-radio :label="0" :value="0">未检测</el-radio>
              </el-radio-group>
            </el-form-item>
            <div v-if="moleculeform.msi=='1'">
              <el-form-item >
                <el-select v-model="moleculeform.msisp" placeholder="请选择...">
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in optionlist['msisp']" :key="index"></el-option>
              </el-select>
              </el-form-item>
              <el-form-item>
                <el-select v-model="moleculeform.msiresult" placeholder="请选择...">
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in optionlist['msiresult']" :key="index"></el-option>
              </el-select>
              </el-form-item>
            </div>
            <el-form-item label="MLH1启动子甲基化分析【MSP】：">
              <el-select v-model="moleculeform.msp" placeholder="请选择...">
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in optionlist['msp']" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="MLPA：">
              <el-radio-group v-model="moleculeform.mlpa">
                <el-radio :label="0" :value="0">未检测</el-radio>
                <el-radio :label="1" :value="1">已检测</el-radio>
              </el-radio-group>
            </el-form-item>
            
              <div v-if="moleculeform.mlpa=='1'">
              <el-form-item >
                <el-select v-model="moleculeform.mlpagene" placeholder="请选择...">
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in optionlist['mlpagene']" :key="index"></el-option>
              </el-select>
              </el-form-item>
              <el-form-item>
                <el-select v-model="moleculeform.mlparesult" placeholder="请选择...">
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in optionlist['mlparesult']" :key="index"></el-option>
              </el-select>
              </el-form-item>
            </div>
            <el-form-item label="NGS检测：">
              <el-radio-group v-model="moleculeform.ngsjc">
                <el-radio :label="0" :value="0">已做</el-radio>
                <el-radio :label="1" :value="1">未做</el-radio>
              </el-radio-group>
            </el-form-item>
            <div v-if="moleculeform.ngsjc=='0'">
              
              <el-form-item>
                <el-form-item label="NGS平台：">
                  <el-radio-group v-model="moleculeform.ngspt">
                    <el-radio :label="0" :value="0">Illumina</el-radio>
                    <el-radio :label="1" :value="1">Life</el-radio>
                    <el-radio :label="2" :value="2">其他</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="上机测序编号：" style="margin-top:10px;">
                  AQ
                  <el-input v-model="moleculeform.seqnum"></el-input>
                </el-form-item>
                <el-form-item label="NGS Panel：" style="margin-top:10px;">
                  <el-select v-model="moleculeform.ngspanel" placeholder="请选择...">
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in optionlist['ngspanel']" :key="index"></el-option>
              </el-select>
                </el-form-item>
                <el-form-item label="检测结果"></el-form-item>
                <div v-for="(item,index) in checkResultList" :key='index'>
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
                  <el-select v-model="item.grade" placeholder="请选择...">
                <el-option :label="items.itemName" :value="items.id" v-for="(items,index) in optionlist['grade']" :key="index"></el-option>
              </el-select>
                </el-form-item>
                <el-form-item style="margin-top:10px;">
                  <el-button type="text" style="color:red;" @click="handle('checkResult',index,'del')">删除</el-button>
                <el-button type="text" style="color:#28c16e;" @click="handle('checkResult',index,'add')">添加一例</el-button>
                </el-form-item>
                </div>
                </el-form-item>
              
            </div>
            <el-form-item label="其他代表性基因突变结果："></el-form-item>
            <el-form-item label="检测平台：">
              <el-radio-group v-model="moleculeform.testp">
                <el-radio label="0" :value="0">ARMS</el-radio>
                <el-radio label="1" :value="1">NGS</el-radio>
              </el-radio-group>
            </el-form-item>
            <div class="immun" v-if='cancerid==2'>
              <div>
                <el-form-item label="KRAS：">
                  <el-radio-group v-model="moleculeform.kras">
                    <p>
                      <el-radio label="1" :value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" :value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" :value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" :value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="NRAS：">
                  <el-radio-group v-model="moleculeform.nras">
                    <p>
                      <el-radio label="1" :value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" :value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" :value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" :value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="BRAF：">
                  <el-radio-group v-model="moleculeform.braf">
                    <p>
                      <el-radio label="1" :value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" :value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" :value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" :value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
            </div>
            <div class="immun" v-if='cancerid==2'>
              <div>
                <el-form-item label="PIK3CA：">
                  <el-radio-group v-model="moleculeform.pik3ca">
                    <p>
                      <el-radio label="1" :value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" :value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" :value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" :value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="PTEN：">
                  <el-radio-group v-model="moleculeform.pten">
                    <p>
                      <el-radio label="1" :value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" :value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" :value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" :value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div></div>
            </div>
            <div class="immun" v-if='cancerid==3'>
              <div>
                <el-form-item label="MUTYH：">
                  <el-radio-group v-model="moleculeform.mutyh">
                    <p>
                      <el-radio label="1" :value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" :value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" :value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" :value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="MSH2">
                  <el-radio-group v-model="moleculeform.msh2">
                    <p>
                      <el-radio label="1" :value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" :value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" :value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" :value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
            </div>
            <div class="immun" v-if='cancerid==3'>
              <div>
                <el-form-item label="MSH6：">
                  <el-radio-group v-model="moleculeform.msh6">
                    <p>
                      <el-radio label="1" :value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" :value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" :value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" :value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="MRE11A：">
                  <el-radio-group v-model="moleculeform.mre11a">
                    <p>
                      <el-radio label="1" :value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" :value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" :value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" :value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
            </div>
            <div class="immun" v-if='cancerid==3'>
              <div>
                <el-form-item label="MLH1：">
                  <el-radio-group v-model="moleculeform.mlh1">
                    <p>
                      <el-radio label="1" :value="1">+</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="0" :value="0">-</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="2" :value="2">未做</el-radio>
                    </p>
                    <p style="margin-top:5px;">
                      <el-radio label="3" :value="3">不确定</el-radio>
                    </p>
                  </el-radio-group>
                </el-form-item>
              </div>
              <div></div>
            </div>
            <el-form-item>
              
              <el-button type="primary" @click="saveMolecule" size="medium" v-if='msave'>保存</el-button>
              <el-button size="medium" @click="updateMolDetection" v-else>编辑</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="activeName=='assist'">
          <el-form ref="form" :model="assistform" label-width="100px" label-position="left">
            <el-form-item label="乳腺钼靶X线摄影检查：">
              <el-date-picker type="date" placeholder="yyyy/mm/dd" v-model="assistform.mammoDate"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-upload
                class="upload-demo"
                action="/1.0/upload/upload"
                multiple
                :on-success='mammochoice'
                list-type="picture"
                :file-list="mammofile"
                :limit='2'
              >
              <el-button size="small" type="primary">选择文件</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="有无异常情况：">
              <el-radio-group v-model="assistform.unusual">
                <el-radio :label="0" :value="0">是</el-radio>
                <el-radio :label="1" :value="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <template v-if='assistform.unusual==0'>
            <el-form-item>
              <el-select v-model="assistform.calcification" placeholder="钙化">
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in optionlist['calcification']" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="assistform.massEdge" placeholder="肿物边缘">
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in optionlist['massedge']" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input v-model="assistform.other" placeholder="其他"></el-input>
            </el-form-item>
            </template>
            <el-form-item label="乳腺MRI检查：">
              <el-date-picker type="date" placeholder="yyyy/mm/dd" v-model="assistform.mriDate"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-upload
                class="upload-demo"
                action="/1.0/upload/upload"
                multiple
                :on-success='mrichoice'
                list-type="picture"
                :file-list="mrifile"
                :limit='2'
              >
              <el-button size="small" type="primary">选择文件</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="乳腺MRI征象：">
              <el-select v-model="assistform.mriSign" placeholder="请选择...">
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in optionlist['MRIsign']" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="BI-RADS分类：">
              <el-select v-model="assistform.biRads" placeholder="请选择...">
                <el-option :label="item.itemName" :value="item.id" v-for="(item,index) in optionlist['BIRADS']" :key="index"></el-option>
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
import {sortRule,getTabListByState,getActiveName,getOption} from "../../../base/js/common.js";
export default {
  data() {
    return {
      coltablist:[
        {
          name:'basic',
          label:'基本检查',
          disabled:false,
          num:5
        },{
          name:'endoscope',
          label:'内镜检查',
          disabled:true,
          num:6
        },{
          name:'pathology',
          label:'病理检查',
          disabled:true,
          num:7
        },{
          name:'molecule',
          label:'分子检测',
          disabled:true,
          num:8
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
      edisabled:true,
      adisabled:true,
      pdisabled:true,
      mdisabled:true,
      checkResultList:[{}],
      transferinfolist: [{}],
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
      multipe:false,
      pmhnone:false,
      pmhdname:false,
      pmhtargetedDrug:false,
      pmhotherDrug:false,
      ptnmcheck:false,
      ptcheck:false,
      pncheck:false,
      pmcheck:false,
      inrolycheck:false,
      perilycheck:false,
      othereactioncheck:false,
      ctfile:[],
      petfile:[],
      mrifile:[],
      mammofile:[],
      isscanfile:[],
      imgurl:'http://42.123.125.101:82/',
      cancerid:0,
      optionlist:{},
      mtumloc:[],
      tumloc:''
    };
  },
  computed:{
    bsave(){
      if(this.$store.state.entryState>=5){
        return false
      }
      return true
    },
    esave(){
      if(this.$store.state.entryState>=6){
        return false
      }
      return true
    },
    ssave(){
      if(this.$store.state.entryState>=6){
        return false
      }
      return true
    }
    ,
    msave(){
      if(this.$store.state.entryState>=8){
        return false
      }
      return true
    },
    psave(){
      if(this.$store.state.entryState>=7){
        return false
      }
      return true
    },
  },
  methods: {
    ctchoice(res,file,fileList){
      this.ctfile.push({url:this.imgurl+res.data})
    },
    petchoice(res,file,fileList){
      this.petfile.push({url:this.imgurl+res.data})
    },
    isscanchoice(res,file,fileList){
      this.isscanfile.push({url:this.imgurl+res.data})
    },
    mammochoice(res,file,fileList){
      this.mammofile.push({url:this.imgurl+res.data})
    },
    mrichoice(res,file,fileList){
      this.mrifile.push({url:this.imgurl+res.data})
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
    prinaturechange(val){
      console.log(val)
    },
    pmhlistchange(name) {
      if (name in this.pmhlist) {
        return true;
      }
      return false;
    },
    pmhcheck(val) {
      this.nowpmh = val;
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
    handleClick(val) {
      if(this.$store.state.entryState>=5 && val.name=="basic"){
        this.basicCheckInfo()
      }else if(this.$store.state.entryState>=6 && (val.name=='endoscope' || val.name=='assist')){
          this.introscopeInfo()
      }else if(this.$store.state.entryState>=7 && val.name=="pathology"){
        this.pathologicInfo()
      }else if(this.$store.state.entryState>=8 && val.name=="molecule"){
        this.molDetectionInfo()
      }
    },
    saveBasic() {
      this.basicform["pid"] = this.$store.state.patientid;
      let ct=[],
        pet=[],
        mammo=[],
        mri=[];
        if(this.ctfile){
          this.ctfile.map(item=>{
            ct.push(item.url)
          })
        }
      if(this.petfile){
        this.petfile.map(item=>{
        pet.push(item.url)
      })
      }
      if(this.mammofile){
        this.mammofile.map(item=>{
        mammo.push(item.url)
      })
      }
      if(this.mrifile){
        this.mrifile.map(item=>{
        mri.push(item.url)
      })
      }
      
      this.basicform["ct"]=String(ct)
      this.basicform["pet"]=String(pet)
      this.basicform["mammoPath"]=String(mammo)
      this.basicform["mriPath"]=String(mri)
      infoentry.saveBasicCheck(this.basicform).then(res => {
        if (res.returnCode == 0) {
          this.$store.state.entryState=5;
          this.entry=this.$store.state.entryState;
        }else{
          this.$message.error(res.msg);
        }
      });
    },
    basicCheckInfo(){
      let obj={
        pid:this.$store.state.patientid
      }
      infoentry.basicCheckInfo(obj).then((res)=>{
        if(res.returnCode==0){
          if(res.data!=null){
            this.basicform=res.data;
            if(this.basicform.ct && (this.basicform.ct!=null || this.basicform.ct!='')){
              let ct=[];
            ct=this.basicform.ct.split(',');
            this.ctfile.length=0;
            ct.map(item=>{
              this.ctfile.push({url:item})
            })
            }
            
           if(this.basicform.pet && (this.basicform.pet!=null || this.basicform.pet!='')){
              let pet=[];
            pet=this.basicform.pet.split(',');
            this.petfile.length=0;
            pet.map(item=>{
              this.petfile.push({url:item})
            })
            }

           if(this.basicform.mriPath && (this.basicform.mriPath!=null || this.basicform.mriPath!='')){
              let mri=[];
            mri=this.basicform.mriPath.split(',');
            this.mrifile.length=0;
            mri.map(item=>{
              this.mrifile.push({url:item})
            })
            }

            if(this.basicform.mammoPath && (this.basicform.mammoPath!=null || this.basicform.mammoPath!='')){
              let mammo=[];
            mammo=this.basicform.mammoPath.split(',');
            this.mammofile.length=0;
            mammo.map(item=>{
              this.mammofile.push({url:item})
            })
            }
          }
        }else{
          this.$message.error(res.msg);
        }
      })
    },
    updateBasicCheck(){
      let ct=[],
        pet=[],
        mammo=[],
        mri=[];
      if(this.ctfile){
          this.ctfile.map(item=>{
            ct.push(item.url)
          })
        }
      if(this.petfile){
        this.petfile.map(item=>{
        pet.push(item.url)
      })
      }
      if(this.mammofile){
        this.mammofile.map(item=>{
        mammo.push(item.url)
      })
      }
      if(this.mrifile){
        this.mrifile.map(item=>{
        mri.push(item.url)
      })
      }
      this.basicform["ct"]=String(ct)
      this.basicform["pet"]=String(pet)
      this.basicform["mammoPath"]=String(mammo)
      this.basicform["mriPath"]=String(mri)
      infoentry.updateBasicCheck(this.basicform).then(res => {
        if (res.returnCode == 0) {
          this.$message({
            message: '修改成功！',
            type: 'success'
          });
          this.basicCheckInfo()
        }else{
          this.$message.error(res.msg);
        }
      });
    },
    saveAssist() {
      this.$store.state.entryState=6;
      this.entry=this.$store.state.entryState;
    },
    saveEndoscope() {
      this.endoscopeform["pid"] = this.$store.state.patientid;
      infoentry.saveIntroscope(this.endoscopeform).then(res => {
        if (res.returnCode == 0) {
          this.$store.state.entryState=6;
          this.entry=this.$store.state.entryState;
        }else{
          this.$message.error(res.msg);
        }
      });
    },
    introscopeInfo(){
      let obj={
        pid:this.$store.state.patientid
      }
      infoentry.introscopeInfo(obj).then((res)=>{
        if(res.returnCode==0){
          if(res.data!=null){
            this.endoscopeform=res.data;
          }
        }else{
          this.$message.error(res.msg);
        }
      })
    },
    updateEndoscope() {
      infoentry.updateIntroscope(this.endoscopeform).then(res => {
        if (res.returnCode == 0) {
          this.$message({
            message: '修改成功！',
            type: 'success'
          });
          this.introscopeInfo()
        }else{
          this.$message.error(res.msg);
        }
      });
    },
    savePathology() {
      this.pathologyform["pid"] = this.$store.state.patientid;
      if(this.pathologyform.prinature==1){
        this.pathologyform['tumloc']=String(this.mtumloc);
      }else if(this.pathologyform.prinature==0){
         this.pathologyform['tumloc']=this.tumloc;
      }
      let transferinfolist=[];
      this.transferinfolist.map((item)=>{
        transferinfolist.push(item.transferinfo)
      })
      this.pathologyform["transferinfo"]=String(transferinfolist);
      let isscan=[];
      this.isscanfile.map(item=>{
        isscan.push(item.url)
      })
      this.pathologyform["isscan"]=String(isscan)
      infoentry.savePathologic(this.pathologyform).then(res => {
        if (res.returnCode == 0) {
          this.$store.state.entryState=7;
          this.entry=this.$store.state.entryState;
        }else{
          this.$message.error(res.msg);
        }
      });
    },
    pathologicInfo(){
      let obj={
        pid:this.$store.state.patientid
      }
      infoentry.pathologicInfo(obj).then((res)=>{
        if(res.returnCode==0){
          if(res.data!=null){
            this.pathologyform=res.data;
            if(this.pathologyform.prinature==1){
              this.mtumloc=this.pathologyform.tumloc.split(',');
            }else if(this.pathologyform.prinature==0){
              this.tumloc=this.pathologyform['tumloc'];
            }
            if(this.pathologyform.transferinfo && (this.pathologyform.transferinfo!='' || this.pathologyform.transferinfo!=null)){
              let transferinfolist=this.pathologyform.transferinfo.split(',');
              transferinfolist.map((item,index)=>{
                let obj={
                  transferinfo:item
                }
                this.transferinfolist[index]=obj
              })
              if(this.pathologyform.isscan && (this.pathologyform.isscan!=null || this.pathologyform.isscan!='')){
                let isscan=[];
                isscan=this.pathologyform.isscan.split(',');
                this.isscanfile.length=0;
                isscan.map(item=>{
                  this.isscanfile.push({url:item})
                })
              }
            }else{
              this.transferinfolist.push({})
            }
            if(this.pathologyform.pmh && (this.pathologyform.pmh!='' || this.pathologyform.pmh!=null)){
              this.pmhnone=true;
            }
            if(this.pathologyform.dname && (this.pathologyform.dname!='' || this.pathologyform.dname!=null)){
              this.pmhdname=true;
              this.nowdname=true;
            }
            if(this.pathologyform.targetedDrug && (this.pathologyform.targetedDrug!='' || this.pathologyform.targetedDrug!=null)){
              this.pmhtargetedDrug=true;
              this.nowtargetedDrug=true;
            }
            if(this.pathologyform.otherDrug && (this.pathologyform.otherDrug!='' || this.pathologyform.otherDrug!=null)){
              this.pmhotherDrug=true;
              this.nowotherDrug=true;
            }
            if(this.pathologyform.ptnm && (this.pathologyform.ptnm!='' || this.pathologyform.ptnm!=null)){
              this.ptnmcheck=true;
            }
            if(this.pathologyform.pt && (this.pathologyform.pt!='' || this.pathologyform.pt!=null)){
              this.ptcheck=true
            }
            if(this.pathologyform.pn && (this.pathologyform.pn!='' || this.pathologyform.pn!=null)){
              this.pncheck=true
            }
            if(this.pathologyform.pm && (this.pathologyform.pm!='' || this.pathologyform.pm!=null)){
              this.pmcheck=true
            }
            if(this.pathologyform.perilymreaction && this.pathologyform.perilymreaction!=null){
              this.perilycheck=true
            }
            if(this.pathologyform.inrolymreaction && this.pathologyform.inrolymreaction!=null){
              this.inrolycheck=true
            }
            if(this.pathologyform.othereaction && (this.pathologyform.othereaction!='' || this.pathologyform.othereaction!=null)){
              this.othereactioncheck=true
            }
          }
        }else{
          this.$message.error(res.msg);
        }
      })
    },
    updatePathology() {
      let transferinfolist=[];
      this.transferinfolist.map((item)=>{
        transferinfolist.push(item.transferinfo)
      })
      this.pathologyform["transferinfo"]=String(transferinfolist);
      let isscan=[]
      this.isscanfile.map(item=>{
        isscan.push(item.url)
      })
      this.pathologyform["isscan"]=String(isscan)
      infoentry.updatePathologic(this.pathologyform).then(res => {
        if (res.returnCode == 0) {
          this.$message({
            message: '修改成功！',
            type: 'success'
          });
          this.pathologicInfo()
        }else{
          this.$message.error(res.msg);
        }
      });
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
        }else{
          this.$message.error(res.msg);
        }
      });
    },
    molDetectionInfo(){
      let obj={
        pid:this.$store.state.patientid
      }
      infoentry.molDetectionInfo(obj).then((res)=>{
        if(res.returnCode==0){
          if(res.data!=null){
            this.moleculeform=res.data;
            if(this.moleculeform.checkResultList && this.moleculeform.checkResultList.length>0){
              this.checkResultList=this.moleculeform.checkResultList;
            }else{
              this.checkResultList=[{}]
            }
          }
        }else{
          this.$message.error(res.msg);
        }
      })
    },
    updateMolDetection(){
      this.moleculeform["checkResultList"]=this.checkResultList;
      infoentry.updateMolDetection(this.moleculeform).then(res => {
        if (res.returnCode == 0) {
          this.$message({
            message: '修改成功！',
            type: 'success'
          });
          this.molDetectionInfo()
        }else{
          this.$message.error(res.msg);
        }
      });
    }
  },
  created() {
      this.cancerid=this.$store.state.cancerid;
      let selectlist=["epidermis","BIRADS","MRIsign","massedge","calcification",
      "grade","ngspanel","mlparesult","mlpagene","msp","msiresult","msisp","sampletype",
      "moleType","perilymreaction","inrolymreaction","hasyndrome","ecgo","complication",
      "specialType","m","tpn","cn","t","tnm","tumorStage","pm","pn","pt","clinicalStage",
      "degree","hgrade","htype","testSpecimen","ptumloc","pbtype","polypnum","proportion",
      "tumloc","parasite","obt","kps","dischargerange","dischargeway","papilla"];
      this.optionlist=getOption(this.$store.state.zdlist,selectlist,this.cancerid);
  },
  mounted(){
    let state = this.$store.state.entryState;
    if(this.$store.state.cancerid==2){
      this.coltablist = getTabListByState(2,state);
    this.activeName = getActiveName(2,state);
    }else if(this.$store.state.cancerid==3){
      this.coltablist = getTabListByState('2-1',state);
    this.activeName = getActiveName('2-1',state);
    }
    console.log(this.coltablist)
    if(state>=5){
      this.basicCheckInfo()
    }
  },
  watch:{
    "$store.state.entryState":function(){
      let state = this.$store.state.entryState;
      if(this.$store.state.cancerid==2){
      this.tablist = getTabListByState(2,state);
    this.activeName = getActiveName(2,state);
    }else if(this.$store.state.cancerid==3){
      this.tablist = getTabListByState('2-1',state);
    this.activeName = getActiveName('2-1',state);
    }
    },
    "basicform.height":function(){
      if(this.basicform.height){
        this.basicform.height=parseFloat(this.basicform.height)
      }
    },
    "basicform.weight":function(){
      if(this.basicform.weight){
        this.basicform.weight=parseFloat(this.basicform.weight)
      }
      
    },
    "basicform.bmi":function(){
      if(this.basicform.bmi){
        this.basicform.bmi=parseFloat(this.basicform.bmi)
      }
    },
    "basicform.diastolic":function(){
      if(this.basicform.diastolic){
        this.basicform.diastolic=parseFloat(this.basicform.diastolic)
      }
    },
    "basicform.systolic":function(){
      if(this.basicform.systolic){
        this.basicform.systolic=parseFloat(this.basicform.systolic)
      }
    },
    activeName(val){
      this.$store.state.activeName=val;
    }
  }
};
</script>