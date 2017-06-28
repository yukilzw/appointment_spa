/*set pixel ratio according to the design draft*/
var design = 750;
function px(val){
    return val/design + 'rem'
}

//getURL
function getUrl(string) {
    var obj = new Object();
    if (string.indexOf("?") != -1) {
        var string = string.substr(string.indexOf("?") + 1);
        var strs = string.split("&");
        for (var i = 0; i < strs.length; i++) {
            var tempArr = strs[i].split("=");
            obj[tempArr[0]] = tempArr[1];
        }
    }
    return obj;
}

//WarnTip
function msTip(text){
    if( !document.getElementById('msTip') ){
        var body = document.getElementsByTagName('body'),
            tip = document.createElement('div');
        tip.id='msTip';
        tip.style.cssText=
            'width:100%;position:absolute;left:0;text-align:center;z-index:100;transform:translateZ(100px);animation:msTip 1s 2 alternate;-webkit-animation:msTip 1s 2 alternate;'+
            'top:-'+px(70)+';'
        tip.innerHTML=
            '<span style="display:inline-block;color:#fff;width:auto;background:rgba(40,40,40,0.6);text-align:center;'+
            'line-height:'+px(75)+';'+
            'height:'+px(70)+';'+
            'border-radius:'+px(18)+';'+
            'font-size:'+px(40)+';'+
            'padding:0 '+px(30)+';'+
            '">'+text+'</span>';
        body[0].appendChild(tip)
        setTimeout(function(){
            body[0].removeChild(document.getElementById('msTip'))
        },2000)
    }
}

export {getUrl,msTip}