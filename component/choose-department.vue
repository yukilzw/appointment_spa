<template>
<div class="page">
    <header class="l-f">选择科室</header>
    <div class="page-wrapper">
        <ul>
            <touch class="choose n-f" v-on:tap="changeDepart(inx,item)" v-for="(item,inx) in departChoose" :class="{active:isActive[inx]}">{{item}}</touch>
        </ul>
        <div class="page-detail-wrapper">
            <touch class="page-detail n-t" v-for="n in departName" @tap="pageGo(n)">{{n}}</touch>
        </div>
    </div>
</div>
</template>

<script type="text/ecmascript-6">
    import store,{ mapState } from '../js/store'
    import router from '../js/router'
    export default {
        data(){
            return {
                isActive:[1,0,0,0]
            }
        },
        computed:{
            departName () {
                return store.state.departName
            },
            departChoose(){
                return store.state.departChoose
            }
        },
        methods:{
            changeDepart (inx,item) {
                this.isActive.forEach( (val,i,arr)=> arr[i]=0 );
                this.isActive[inx]=1;
                store.commit('changeDepart',{
                    chooseHosArea:item
                })
            },
            pageGo (n){
                store.commit('setChooseDepart',{
                    chooseDepart:n
                })
                router.push({ path: 'chooseDoctor', query: { } })
            }
        }
    }
</script>


<style lang="less" scoped>
@import "../css/base";
ul{
    width: 30%;
    height:100%;
    border-right:1px solid @color-line;
    float: left;
    background-color: white;
}
.choose{
    .px(height,100);
    text-align: center;
    .px(line-height,100);
    border-bottom:1px solid @color-line;
}
.page-detail-wrapper{
    width: 70%;
    float: right;
}
.page-detail{
    .px(line-height,80);
    .px(padding-left,30);
    border-bottom:1px solid @color-line;
    background-color: white;
}
.choose.active{
    transition:background-color .1s;
    background-color: @color1;
    color:#fff;
    border-bottom:none;
}
</style>