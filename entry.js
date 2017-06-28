/*set document scale and font with device*/
let scale = 1;
document.querySelector('meta[name="viewport"]').setAttribute('content','initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
window.REM=document.documentElement.clientWidth;
document.documentElement.style.fontSize = window.REM + 'px';

/*import packages needed*/
import './css/main.less'
import Vue from 'vue'
import VueTouch from 'vue-touch'
import router from './route/router'
import store from './store/store'
import app from './component/app.vue'

Vue.use(VueTouch, {name:'touch'})

export function createApp () {
    const App = new Vue({
        store,
        router,
        render: h => h(app)
    })
    return  { App,router,store }
}