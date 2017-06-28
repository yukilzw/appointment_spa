import Vue from 'vue'
import VueRouter from 'vue-router'
import chooseDepartment from '../component/choose-department.vue'
import chooseDoctor from '../component/choose-doctor.vue'
import patientDetail from '../component/patient-detail.vue'
import patientList from '../component/patient-list.vue'
import choosePayway from '../component/choose-payway.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/', component: chooseDepartment },
    { path: '/chooseDoctor', component: chooseDoctor },
    { path: '/patientDetail', component: patientDetail },
    { path: '/patientList', component: patientList },
    { path: '/choosePayway', component: choosePayway }
]

const router = new VueRouter({
    routes
})

export default router