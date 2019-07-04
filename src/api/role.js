import { apiUrl } from 'base/js/base.js';
//接口字段详情见相关信息文件的接口文件
export const role = {
    /**
     * 角色列表
     * @param {*} obj  userid
     * pagelist   offset  size
     */
    getRole(pagelist, obj) {
        return $ajax.post(apiUrl.apiUrl +
            'role/page?offset=' + pagelist.offset + '&size=' + pagelist.size, obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 保存角色
     * @param {*} obj 
     */
    saveRole(obj) {
        return $ajax.post(apiUrl.apiUrl + 'role/save', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 修改角色
     * @param {*} obj 
     */
    updateRole(obj) {
        return $ajax.post(apiUrl.apiUrl + 'role/update', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 删除角色
     * @param {*} obj 
     */
    delRole(obj) {
        return $ajax.post(apiUrl.apiUrl + 'role/del', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 批量删除角色
     * @param {*} obj 
     */
    delRoleBylist(obj) {
        return $ajax.post(apiUrl.apiUrl + 'role/delBylist', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 获取角色信息
     * @param {*} obj 
     */
    getRoleInfo(obj) {
        return $ajax.post(apiUrl.apiUrl + 'role/info', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 用户列表
     * @param {*} obj  userid
     * pagelist   offset  size
     */
    getUser(pagelist, obj) {
        return $ajax.post(apiUrl.apiUrl +
            'user/page?offset=' + pagelist.offset + '&size=' + pagelist.size, obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 保存角色
     * @param {*} obj 
     */
    saveUser(obj) {
        return $ajax.post(apiUrl.apiUrl + 'user/save', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 修改角色
     * @param {*} obj 
     */
    updateUser(obj) {
        return $ajax.post(apiUrl.apiUrl + 'user/update', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 删除角色
     * @param {*} obj 
     */
    delUser(obj) {
        return $ajax.post(apiUrl.apiUrl + 'user/del', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 批量删除角色
     * @param {*} obj 
     */
    delUserBylist(obj) {
        return $ajax.post(apiUrl.apiUrl + 'user/delBylist', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 获取角色信息
     * @param {*} obj 
     */
    getUserInfo(obj) {
        return $ajax.post(apiUrl.apiUrl + 'user/info', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 角色列表
     * @param {*} obj  userid
     * pagelist   offset  size
     */
    getDept(pagelist, obj) {
        return $ajax.post(apiUrl.apiUrl +
            'dept/page?offset=' + pagelist.offset + '&size=' + pagelist.size, obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 保存角色
     * @param {*} obj 
     */
    saveDept(obj) {
        return $ajax.post(apiUrl.apiUrl + 'dept/save', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 修改角色
     * @param {*} obj 
     */
    updateDept(obj) {
        return $ajax.post(apiUrl.apiUrl + 'dept/update', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 删除角色
     * @param {*} obj 
     */
    delDept(obj) {
        return $ajax.post(apiUrl.apiUrl + 'dept/del', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 批量删除角色
     * @param {*} obj 
     */
    delDeptBylist(obj) {
        return $ajax.post(apiUrl.apiUrl + 'dept/delBylist', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 获取角色信息
     * @param {*} obj 
     */
    getDeptInfo(obj) {
        return $ajax.post(apiUrl.apiUrl + 'dept/info', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 获取角色信息
     * @param {*} obj 
     */
    getDeptAll(obj) {
        return $ajax.post(apiUrl.apiUrl + 'dept/all', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * 获取部门和角色
     * @param {*} obj 
     */
    getItems() {
        return $ajax.get(apiUrl.apiUrl + 'user/getItems').then(function(res) {
            return Promise.resolve(res.data)
        })
    },
}