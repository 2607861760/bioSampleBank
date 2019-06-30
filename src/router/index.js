import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    // mode: 'history',
    routes: [{
        path: '/',
        component: resolve => require(['views/login/login.vue'], resolve)
    }, {
        path: '/home',
        component: resolve => require(['views/home/index.vue'], resolve),
        children: [{
            name: '首页',
            path: '/home',
            component: resolve => require(['views/home/homepage.vue'], resolve),
        }, {
            name: '信息录入',
            path: '/infoentry',
            component: resolve => require(['views/infoentry/index.vue'], resolve),
        }, {
            path: '/infoentry/upinfo',
            component: resolve => require(['views/infoentry/upfile.vue'], resolve),
        }, {
            path: '/infoentry/addpatient',
            component: resolve => require(['views/infoentry/info.vue'], resolve),
        }, {
            name: '查询系统',
            path: '/query',
            component: resolve => require(['views/infosearch/query.vue'], resolve)
        }, {
            path: '/query/queryinfo',
            component: resolve => require(['views/infosearch/querylist.vue'], resolve)
        }, {
            path: '/query/report',
            component: resolve => require(['views/infosearch/report.vue'], resolve)
        }, {
            name: '科研管理',
            path: '/scientific',
            component: resolve => require(['views/scientific/project.vue'], resolve)
        }, {
            path: '/scientific/addproject',
            component: resolve => require(['views/scientific/addproject.vue'], resolve)
        }, {
            path: '/scientific/projectinfo',
            component: resolve => require(['views/scientific/projectinfo.vue'], resolve)
        }, {
            path: '/scientific/resultinfo',
            component: resolve => require(['views/scientific/resultinfo.vue'], resolve)
        }, {
            path: '/scientific/joininfo',
            component: resolve => require(['views/scientific/joininfo.vue'], resolve)
        }, {
            path: '/scientific/auditinfo',
            component: resolve => require(['views/scientific/auditinfo.vue'], resolve)
        }, {
            name: '病人数统计',
            path: '/preview/patientStatic',
            component: resolve => require(['views/preview/patient.vue'], resolve)
        }, {
            name: '样本亚型统计',
            path: '/preview/hypotypeStatic',
            component: resolve => require(['views/preview/hypotype.vue'], resolve)
        }, {
            name: '科室样本统计',
            path: '/preview/sampleStatic',
            component: resolve => require(['views/preview/sample.vue'], resolve)
        }, {
            name: '角色管理',
            path: '/authority/role',
            component: resolve => require(['views/authority/role.vue'], resolve)
        }, {
            path: '/authority/addrole',
            component: resolve => require(['views/authority/addrole.vue'], resolve)
        }, {
            name: '用户管理',
            path: '/authority/user',
            component: resolve => require(['views/authority/user.vue'], resolve)
        }, {
            path: '/authority/adduser',
            component: resolve => require(['views/authority/adduser.vue'], resolve)
        }, {
            name: '部门管理',
            path: '/authority/depart',
            component: resolve => require(['views/authority/depart.vue'], resolve)
        }, {
            path: '/authority/adddepart',
            component: resolve => require(['views/authority/adddepart.vue'], resolve)
        }, {
            name: '字典管理',
            path: '/dict/dict',
            component: resolve => require(['views/dict/dict.vue'], resolve)
        }, {
            path: '/dict/select',
            component: resolve => require(['views/dict/select.vue'], resolve)
        }]
    }]
})