
window.onload=function () {
    let canvas = document.querySelector('canvas');
    let ctx = canvas.getContext("2d");
    let mask = document.querySelector('.mask');
    let palette = new Palette(canvas, ctx, mask);
    let label = document.querySelectorAll('label');
    let xian = document.querySelector('.icon-xian');
    let arc = document.querySelector('.icon-yuan');
    let poly = document.querySelector('.icon-duobianxing');
    let pencil = document.querySelector('.icon-qianbi');
    let rect = document.querySelector('.icon-juxing');
    let arcRect = document.querySelector('.icon-yuanjiaojuxing');
    let star = document.querySelector('.icon-wujiaoxingkongdi');
    let dottedLine = document.querySelector('.icon-xuxian');
    let d=document.querySelector('.icon-caiqie')
    let copy=document.querySelector('.copy')
    let maskbtn=document.querySelector('.icon-xiangpi');
    let rubber = document.querySelector('.rubber');
    let word = document.querySelector('.icon-wenzi');

    let newMask=document.querySelector('.icon-iconfontxinjian');
    let save = document.querySelector('.icon-baocun');
    let back = document.querySelector('.icon-weibiaoti545');
    let bian = document.querySelector('.polnum');
    let jiao = document.querySelector('.stnum');
    let dx = document.querySelector('.dx');
    let quanping=document.querySelector('.icon-quanping')
    let tianchong=document.querySelector('.icon-tianchong ');
    let miaobian=document.querySelector('.icon-miaobian');
    let flcol=document.querySelector('.flcol');
    let skcol=document.querySelector('.skcol');
//线
    xian.onclick = function () {
        palette.line();
    }
//圆
    arc.onclick = function () {
        palette.arc();
    }
//多边形
    poly.onclick = function () {
        palette.bian = bian.value;
        palette.poly();
    }
//画笔
    pencil.onclick = function () {
        palette.pencil();
    }
//矩形
    rect.onclick = function () {
        palette.rect();
    }
//圆角矩形
    arcRect.onclick = function () {
        palette.arcRect();
    }
//多角形
    star.onclick = function () {
        palette.jiao = jiao.value;
        palette.star();
    }
//虚线
    dottedLine.onclick = function () {
        palette.dottedLine();
    },
//裁剪
      d.onclick=function () {
         // let selectAreaobj=copy;
         palette.clip(copy);
      }
//橡皮擦
        maskbtn.onclick = function () {
            let w = palette.size = dx.value;
            palette.rubber(w, w, rubber);
        }
//文字
    word.onclick = function () {
        palette.word();
    }
//新建
    newMask.onclick=function(){
        palette.xinjian();
    }
//保存
    save.onclick = function () {
        palette.save();
    }
//返回
    back.onclick = function () {
        palette.back();
    }
    document.body.onkeydown = function (e) {
        if (e.ctrlKey && e.keyCode == 90) {
            palette.back();
        }
    }
//全屏
    quanping.onclick=function() {
        palette.qp();

    }


//更换颜色
    flcol.onchange=function(){
        palette.fillStyle=this.value;
    }
    skcol.onchange=function(){
        palette.strokeStyle=this.value;
    }
    miaobian.onclick=function () {
        palette.type='stroke';
    }
    tianchong.onclick=function () {
        palette.type='fill';
    }



}
