import { apiUrl } from 'base/js/base.js';
//接口字段详情见相关信息文件的接口文件
export const dict = {
    /**
     * 字典列表
     * @param {*} obj  userid
     * pagelist   offset  size
     */
    getItemlist(pagelist, obj) {
        return $ajax.post(apiUrl.apiUrl +
            'item/list?offset=' + pagelist.offset + '&size=' + pagelist.size, obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 字典表添加
     * @param {*} obj 
     */
    saveItem(obj) {
        return $ajax.post(apiUrl.apiUrl + 'item/save', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 字典表添加
     * @param {*} obj 
     */
    updateItem(obj) {
        return $ajax.post(apiUrl.apiUrl + 'item/update', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 字典表添加
     * @param {*} obj 
     */
    delItem(obj) {
        return $ajax.post(apiUrl.apiUrl + 'item/del', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 查询下拉框
     * @param {*} obj 
     */
    searchItem(obj) {
        return $ajax.post(apiUrl.apiUrl + 'item/search', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 查询下拉框
     * @param {*} obj 
     */
    getAll(obj) {
        return $ajax.post(apiUrl.apiUrl + 'item/getAll', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
}