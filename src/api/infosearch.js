import { apiUrl } from 'base/js/base.js';
//接口字段详情见相关信息文件的接口文件
export const infosearch = {
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
     * 自定义搜索
     * @param {*} obj 
     */
    searchList(pagelist, obj) {
        return $ajax.post(apiUrl.apiUrl + 'search/list?offset=' + pagelist.offset + '&size=' + pagelist.size, obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
}