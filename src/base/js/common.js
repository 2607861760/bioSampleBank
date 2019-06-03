// export default comfun = {
//     isPoneAvailable(str) {
//         var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
//         if (!myreg.test(str)) {
//             return false;
//         } else {
//             return true;
//         }
//     },
//     sortRule(a, b) {
//         return a.sort - b.sort;
//     }
// }
export const sortRule = function(a, b) {
    return a.sort - b.sort;
}
export const tabs={
    '0':{
        max:0,
        maxState:2,
        tabList:[{
            name:'basic',
            label:'基本信息',
            disabled:false
        },{
            name:'doctor',
            label:'就诊信息',
            disabled:true
        }]
    },
    '1':{
        max:2,
        maxState:4,
        tabList:[{
            name:'present',
            label:'现病史',
            disabled:false
          },{
            name:'family',
            label:'家族史',
            disabled:true
        }]
    },
    "2":{
        max:4,
        maxState:8,
        tabList:[{
            name:'basic',
            label:'基本检查',
            disabled:false
        },{
            name:'endoscope',
            label:'内镜检查',
            disabled:true
        },{
            name:'pathology',
            label:'病理检查',
            disabled:true
        },{
            name:'molecule',
            label:'分子检测',
            disabled:true
        }]
    },
    '2-1':{
        max:4,
        maxState:8,
        tabList:[{
            name:'basic',
            label:'基本检查',
            disabled:false
        },{
            name:'assist',
            label:'辅助检查',
            disabled:true
        },{
            name:'pathology',
            label:'病理检查',
            disabled:true
        },{
            name:'molecule',
            label:'分子检测',
            disabled:true
        }]
    }
}
export const getTabByIndex = function(index){
    return tabs[index].tabList;
}
export const getTabMax = function(index){
    return tabs[index].max;
}
export const getTabMaxstate = function(index){
    return tabs[index].maxState;
}
export const getTabListByState= function(index,state){
    let orginList = getTabByIndex(index);
    let max = getTabMax(index);
    for(var i=0;i<orginList.length;i++){
        if(i<=(state-max)){
            orginList[i].disabled = false;
        }else{
            orginList[i].disabled = true;
        }
    }
    return orginList;
}
export const getActiveName = function(index,state){
    let orginList = getTabByIndex(index);
    let max = getTabMax(index);
    let maxState = getTabMaxstate(index);
    if(state>maxState){
        return orginList[0].name
    }else{
        return orginList[state-max].name
    }
}