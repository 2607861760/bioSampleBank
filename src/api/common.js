import { apiUrl } from 'base/js/base.js';
export const common = {
    login(obj) {
        return $ajax.post(apiUrl.apiUrl + 'user/login', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    getIndex() {
        return $ajax.get(apiUrl.apiUrl + 'index/index').then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    getPatient(obj) {
        return $ajax.post(apiUrl.apiUrl + 'index/patient', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
}