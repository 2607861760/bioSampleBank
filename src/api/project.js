import { apiUrl } from 'base/js/base.js';
export const project = {
    getProjectList(pagelist, obj) {
        return $ajax.post(apiUrl.apiUrl +
            'project/list?offset=' + pagelist.offset + '&size=' + pagelist.size, obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    saveProject(obj) {
        return $ajax.post(apiUrl.apiUrl + 'project/save', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    infoProject(obj) {
        return $ajax.post(apiUrl.apiUrl + 'project/info', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    updateProject(obj) {
        return $ajax.post(apiUrl.apiUrl + 'project/update', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    delProject(obj) {
        return $ajax.post(apiUrl.apiUrl + 'project/del', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    detailProject(obj) {
        return $ajax.post(apiUrl.apiUrl + 'project/detail', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    getProjectResult(pagelist, obj) {
        return $ajax.post(apiUrl.apiUrl +
            'project/result?offset=' + pagelist.offset + '&size=' + pagelist.size, obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    saveProApp(obj) {
        return $ajax.post(apiUrl.apiUrl + 'proApp/save', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    getProApp(pagelist, obj) {
        return $ajax.post(apiUrl.apiUrl +
            'proApp/page?offset=' + pagelist.offset + '&size=' + pagelist.size, obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    submitProApp(obj) {
        return $ajax.post(apiUrl.apiUrl + 'proApp/submit', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    infoProApp(obj) {
        return $ajax.post(apiUrl.apiUrl + 'proApp/info', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    submitProStd(obj) {
        return $ajax.post(apiUrl.apiUrl + 'proStd/submit', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },

    infoProject(obj) {
      return $ajax.post(apiUrl.apiUrl + 'project/info', obj).then(function(res) {
        return Promise.resolve(res.data)
      })
    },
}
