import { apiUrl } from 'base/js/base.js';
//接口字段详情见相关信息文件的接口文件
export const infoentry = {
    /**
     * 信息列表
     * @param {*} obj  userid
     * pagelist   offset  size
     */
    getPatient(pagelist, obj) {
        return $ajax.post(apiUrl.apiUrl +
            'patient/page?offset=' + pagelist.offset + '&size=' + pagelist.size, obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 病人信息
     * @param {*} obj 
     */
    savePatient(obj) {
        return $ajax.post(apiUrl.apiUrl + 'patient/save', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    patientInfo(obj) {
        return $ajax.post(apiUrl.apiUrl + 'patient/info', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    updatePatient(obj) {
        return $ajax.post(apiUrl.apiUrl + 'patient/update', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 就诊信息
     * @param {*} obj 
     */
    saveVisit(obj) {
        return $ajax.post(apiUrl.apiUrl + 'visit/save', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    visitInfo(obj) {
        return $ajax.post(apiUrl.apiUrl + 'visit/info', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    updateVisit(obj) {
        return $ajax.post(apiUrl.apiUrl + 'visit/update', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 现病史
     * @param {*} obj 
     */
    saveDesHistory(obj) {
        return $ajax.post(apiUrl.apiUrl + 'desHistory/save', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    desHistoryInfo(obj) {
        return $ajax.post(apiUrl.apiUrl + 'desHistory/info', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 家族史
     * @param {*} obj 
     */
    saveFamilyHistory(obj) {
        return $ajax.post(apiUrl.apiUrl + 'familyHistory/save', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    familyHistoryInfo(obj) {
        return $ajax.post(apiUrl.apiUrl + 'familyHistory/info', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 基本检查
     * @param {*} obj 
     */
    saveBasicCheck(obj) {
        return $ajax.post(apiUrl.apiUrl + 'basicCheck/info', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    basicCheckInfo(obj) {
        return $ajax.post(apiUrl.apiUrl + 'basicCheck/info', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 内镜检查
     * @param {*} obj 
     */
    saveIntroscope(obj) {
        return $ajax.post(apiUrl.apiUrl + 'introscope/save', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    introscopeInfo(obj) {
        return $ajax.post(apiUrl.apiUrl + 'introscope/info', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 病理检查
     * @param {*} obj  
     */
    savePathologic(obj) {
        return $ajax.post(apiUrl.apiUrl + 'pathologic/save', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    pathologicInfo(obj) {
        return $ajax.post(apiUrl.apiUrl + 'pathologic/info', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 病理检查 
     * @param {*} obj 
     */
    saveMolDetection(obj) {
        return $ajax.post(apiUrl.apiUrl + 'molDetection/save', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    molDetectionInfo(obj) {
        return $ajax.post(apiUrl.apiUrl + 'molDetection/info', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 药物治疗
     * @param {*} obj 
     */
    saveMedication(obj) {
        return $ajax.post(apiUrl.apiUrl + 'medication/save', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    medicationInfo(obj) {
        return $ajax.post(apiUrl.apiUrl + 'medication/info', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 疗效评估
     * @param {*} obj 
     */
    saveAssess(obj) {
        return $ajax.post(apiUrl.apiUrl + 'assess/save', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    assessInfo(obj) {
        return $ajax.post(apiUrl.apiUrl + 'assess/info', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 疗效评估
     * @param {*} obj 
     */
    saveClinical(obj) {
        return $ajax.post(apiUrl.apiUrl + 'clinical/save', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    clinicalInfo(obj) {
        return $ajax.post(apiUrl.apiUrl + 'clinical/info', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 随访信息
     * @param {*} obj 
     */
    saveFollowUp(obj) {
        return $ajax.post(apiUrl.apiUrl + 'followUp/save', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    followUpInfo(obj) {
        return $ajax.post(apiUrl.apiUrl + 'followUp/info', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 样本库
     * @param {*} obj 
     */
    saveBank(obj) {
        return $ajax.post(apiUrl.apiUrl + 'bank/save', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    bankInfo(obj) {
        return $ajax.post(apiUrl.apiUrl + 'bank/info', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
}