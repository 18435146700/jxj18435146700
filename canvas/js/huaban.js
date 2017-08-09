function Palette(obj,ctx,mask){
    //obj=canvas   ctx=环境
    this.obj=obj;
    this.ctx=ctx;
    this.mask=mask;
    this.bian=5;
    this.jiao=5;
    //
    this.text='20px sans-serif';
    this.textAlign='center';
    this.textBaseline='middle';
    //画板宽高
    this.width=obj.width;
    this.height=obj.height;
    //默认的样式
    this.lineCap='round';
    this.lineWidth=2;
    this.fillStyle="#000";
    this.strokeStyle="#000";
    //设置填充或者描边
    this.type="stroke"
    //历史记录
    this.history=[];
}
Palette.prototype={
    //初始化样式
    init:function(){
        this.ctx.setLineDash([]);
        this.bian=this.bian;
        this.jiao=this.jiao;
        this.ctx.lineWidth=this.lineWidth;
        this.ctx.strokeStyle=this.strokeStyle;
        this.ctx.fillStyle=this.fillStyle;
        this.ctx.lineCap=this.lineCap;
    },
//线
    line:function(){
        let self=this
        self.mask.onmousedown=function(e){
            let ox=e.offsetX,oy=e.offsetY;
            self.mask.onmousemove=function(e){
                let mx=e.offsetX,my=e.offsetY;
                self.init();
                self.ctx.clearRect(0,0,self.width,self.height);
                if(self.history.length>0){
                    self.ctx.putImageData(self.history[self.history.length-1],0,0)
                }
                self.ctx.beginPath();
                self.ctx.moveTo(ox,oy);
                self.ctx.lineTo(mx,my);
                self.ctx.closePath()
                self.ctx.stroke();
            }
            self.mask.onmouseup=function(){
                self.history.push(self.ctx.getImageData(0,0,self.width,self.height))
                self.mask.onmouseup=null;
                self.mask.onmousemove=null;
            }
        }
    },
//圆
    arc:function(){
        let self=this
        self.mask.onmousedown=function(e){
            let ox=e.offsetX,oy=e.offsetY;
            self.mask.onmousemove=function(e){
                let mx=e.offsetX,my=e.offsetY;
                self.init();
                let r = Math.sqrt((mx - ox) * (mx - ox) + (my - oy) * (my - oy))
                self.ctx.clearRect(0,0,self.width,self.height);
                if(self.history.length>0){
                    self.ctx.putImageData(self.history[self.history.length-1],0,0)
                }
                self.ctx.beginPath();
                self.ctx.arc(ox,oy,r,0,Math.PI*2);
                self.ctx.closePath()
                self.ctx[self.type]();
            }
            self.mask.onmouseup=function(){
                self.history.push(self.ctx.getImageData(0,0,self.width,self.height))
                self.mask.onmouseup=null;
                self.mask.onmousemove=null;
            }
        }
    },
//多边形
    poly:function () {
        let self=this
        //
        let angle=2/self.bian*Math.PI;
        self.mask.onmousedown=function (e) {
            let ox = e.offsetX, oy = e.offsetY;
            self.mask.onmousemove = function (e) {
                let mx = e.offsetX, my = e.offsetY;
                self.init();
                let radius = Math.sqrt(Math.pow(mx - ox,2)  + Math.pow(my - oy,2) )
                self.ctx.clearRect(0,0,self.width,self.height);
                if(self.history.length>0){
                    self.ctx.putImageData(self.history[self.history.length-1],0,0)
                }
                self.ctx.beginPath();
                self.ctx.moveTo(ox + radius, oy);

                for (let i = 0; i <self.bian; i++) {
                    self.ctx.lineTo(ox + radius * Math.cos(angle * i), oy + radius * Math.sin(angle * i));
                }
                self.ctx.closePath();
                self.ctx[self.type]();
            }
            self.mask.onmouseup = function () {
                self.history.push(self.ctx.getImageData(0,0,self.width,self.height))
                self.mask.onmousemove = null;
                self.mask.onmouseup = null;
            }
        }
    },
//画笔
    pencil:function () {
        let self=this;
        self.mask.onmousedown = function(e){
            self.ctx.clearRect(0,0,self.width,self.height);
            let ox=e.offsetX,oy=e.offsetY;
            if(self.history.length>0){
                self.ctx.putImageData(self.history[self.history.length-1],0,0)
            }
            self.ctx.beginPath();
            self.ctx.moveTo(ox,oy);
            self.mask.onmousemove = function(e){
                let cx=e.offsetX,cy=e.offsetY;
                self.ctx.lineTo(cx,cy);
                self.ctx.stroke();
            };
            self.mask.onmouseup = function(){
                self.ctx.closePath();
                self.history.push(self.ctx.getImageData(0,0,self.width,self.height))
                self.mask.onmousemove = null;
                self.mask.onmouseup = null;
            };
        }
    },
//矩形
    rect:function () {
        let self=this
        self.mask.onmousedown=function(e){
            let ox=e.offsetX,oy=e.offsetY;
            self.mask.onmousemove=function(e){
                let mx=e.offsetX,my=e.offsetY;
                self.init();
                self.ctx.clearRect(0,0,self.width,self.height);
                if(self.history.length>0){
                    self.ctx.putImageData(self.history[self.history.length-1],0,0)
                }
                self.ctx.beginPath();
                self.ctx.rect(ox,oy,mx-ox,my-oy);
                self.ctx.closePath()
                self.ctx[self.type]();
            }
            self.mask.onmouseup=function(){
                self.history.push(self.ctx.getImageData(0,0,self.width,self.height))
                self.mask.onmouseup=null;
                self.mask.onmousemove=null;
            }
        }
    },
//圆角矩形
    arcRect:function () {
        let self=this;
        let r=10;
        self.mask.onmousedown=function(e){
            let ox=e.offsetX,oy=e.offsetY;
            self.mask.onmousemove=function(e){
                let mx=e.offsetX,my=e.offsetY;
                let w=mx-ox,h=my-oy;
                self.init();
                self.ctx.clearRect(0,0,self.width,self.height);
                if(self.history.length>0){
                    self.ctx.putImageData(self.history[self.history.length-1],0,0,0,0,self.width,self.height)
                }
                self.ctx.beginPath();
                self.ctx.moveTo(ox-w+r,oy-h);
                self.ctx.lineTo(mx-r,oy-h);
                self.ctx.quadraticCurveTo(mx,oy-h,mx,oy-h+r);
                self.ctx.lineTo(mx,my-r);
                self.ctx.quadraticCurveTo(mx,my,mx-r,my);
                self.ctx.lineTo(ox-w+r,my);
                self.ctx.quadraticCurveTo(ox-w,my,ox-w,my-r)
                self.ctx.lineTo(ox-w,oy-h+r)
                self.ctx.quadraticCurveTo(ox-w,oy-h,ox-w+r,oy-h);
                self.ctx.closePath()
                self.ctx[self.type]();
            }
            self.mask.onmouseup=function(){
                self.history.push(self.ctx.getImageData(0,0,self.width,self.height))
                self.mask.onmouseup=null;
                self.mask.onmousemove=null;
            }
        }
    },
//多角形
    star:function(){
        let self=this
        //
        let angle=360/(self.jiao*2)*Math.PI/180;
        self.mask.onmousedown=function (e) {
            let ox = e.offsetX, oy = e.offsetY;
            self.mask.onmousemove = function (e) {
                let mx = e.offsetX, my = e.offsetY;
                self.init();
                let radius = Math.sqrt(Math.pow(mx - ox,2)  + Math.pow(my - oy,2) );
                let radius1=radius/3
                self.ctx.clearRect(0,0,self.width,self.height);
                if(self.history.length>0){
                    self.ctx.putImageData(self.history[self.history.length-1],0,0)
                }
                self.ctx.beginPath();
                self.ctx.moveTo(ox + radius, oy);

                for (let i = 0; i <self.jiao*2; i++) {
                    if(i%2==0){
                        self.ctx.lineTo(ox + radius * Math.cos(angle * i), oy + radius * Math.sin(angle * i));
                    }else{
                        self.ctx.lineTo(ox + radius1 * Math.cos(angle * i), oy + radius1 * Math.sin(angle * i));
                    }

                }
                self.ctx.closePath();
                self.ctx[self.type]();
            }
            self.mask.onmouseup = function () {
                self.history.push(self.ctx.getImageData(0,0,self.width,self.height))
                self.mask.onmousemove = null;
                self.mask.onmouseup = null;
            }
        }
    },
//虚线
    dottedLine:function(){
        let self=this
        self.mask.onmousedown=function(e){
            self.ctx.setLineDash([5,15]);
            let ox=e.offsetX,oy=e.offsetY;
            self.mask.onmousemove=function(e){
                let mx=e.offsetX,my=e.offsetY;
                self.ctx.clearRect(0,0,self.width,self.height);
                if(self.history.length>0){
                    self.ctx.putImageData(self.history[self.history.length-1],0,0)
                }
                self.ctx.beginPath();
                self.ctx.moveTo(ox,oy);
                self.ctx.lineTo(mx,my);
                self.ctx.closePath()
                self.ctx.stroke();
            }
            self.mask.onmouseup=function(){
                self.history.push(self.ctx.getImageData(0,0,self.width,self.height))
                self.mask.onmouseup=null;
                self.mask.onmousemove=null;
            }
        }
    },
//新建
    xinjian:function(){
        let self=this;

        self.ctx.clearRect(0,0,self.width,self.height);
    },
//保存
    save:function(){
        let self=this;
        let data=self.mask.toDataURL('img/png').replace('data:image/png','data:stream/octet');
        location.href=data
    },
//返回
    back:function(){
        let self=this
        this.history.pop();
        if(this.history.length==0){
            self.ctx.clearRect(0,0,this.width,this.height);
            setTimeout(function(){
                alert("已经最后一步了");
            },0)
        }else if(this.history.length>0){
            self.ctx.putImageData(self.history[self.history.length-1],0,0);
        }
    },
//全屏
    qp:function(){
        let self=this
        if (document.documentElement.RequestFullscreen) {
            document.body.RequestFullscreen();
        }
        else if (document.documentElement.webkitRequestFullscreen) {
            document.body.webkitRequestFullscreen();
        }
    },

//橡皮擦
      rubber:function(w,w,rubber){
       let self=this;
        self.mask.onmousedown=function () {
            rubber.style.display='block';
            rubber.style.width=`${w}px`;
            rubber.style.height=`${w}px`;
            if(self.history.length>0){
                self.ctx.putImageData(self.history[self.history.length-1],0,0)
            }
            self.mask.onmousemove=function (e) {
                let mx=e.offsetX-w,my=e.offsetY-w;
                //检测橡皮不会超出mask区域
                if(mx>self.width-self.w){
                    mx=self.width-self.w;
                }if(mx<=0){
                    mx=0
                }if(my>self.width-self.w){
                    my=self.width-self.w;
                }if(my<=0){
                    my=0
                }
                rubber.style.left=mx+'px';
                rubber.style.top=my+'px';
                self.ctx.clearRect(mx,my,w,w);

            }
            self.mask.onmouseup=function(){
                rubber.style.display='none';
                self.history.push(self.ctx.getImageData(0,0,self.width,self.height))
                self.mask.onmouseup=null;
                self.mask.onmousemove=null;
            }
        }
    },
//文字
    word:function () {
        let self=this;
        self.mask.onmousedown=function(e){
                let ox=e.offsetX,oy=e.offsetY;
                let div=document.createElement('div');
                div.style.cssText=`
                min-width:50px;
                height:30px;
                position:absolute;
                left:${ox}px;
                top:${oy}px;
                border:1px solid #000000;
                `;
                div.contentEditable=true;
                self.mask.appendChild(div);
                self.mask.onmousedown=null;
                self.div1=div;
            self.div1.onmousedown=function(e){
                let ox=e.clientX-this.offsetLeft,
                    oy=e.clientY-this.offsetTop;
                self.mask.onmousemove=function(e){
                    let mx=e.clientX,my=e.clientY;
                    let lefts=mx-ox,
                        tops=my-oy;
                    if(self.history.length>0){
                        self.ctx.putImageData(self.history[self.history.length-1],0,0)
                    }
                    self.div1.style.left=lefts+'px';
                    self.div1.style.top=tops+'px';
                }
                self.div1.onmouseup=function(){
                    self.mask.onmousemove=null;
                    self.div1.onmouseup=null;

                }
            }


        self.div1.onblur=function () {
            self.ctx.font=self.text;
            self.ctx.textBaseline=self.textBaseline;
            self.ctx.textAlign=self.textAlign;
            self.ctx.fillText(this.innerText,this.offsetLeft,this.offsetTop)
            self.history.push(self.ctx.getImageData(0,0,self.width,self.height))
            this.parentNode.removeChild(this);
            self.div1=null;
        }
        }
    },
//裁切
    clip: function (mask) {
        let that = this;
        that.init();
        that.mask=mask;
        that.mask.onmousedown = function (e) {
            let startx = e.offsetX;
            let starty = e.offsetY;
            let minx, miny, w, h;
            that.init();
            that.mask.onmousemove = function (e) {
                that.init();
                let endx = e.offsetX;
                let endy = e.offsetY;
                minx = startx > endx ? endx : startx;
                miny = starty > endy ? endy : starty;
                w = Math.abs(endx - startx);
                h = Math.abs(endy - starty);
                mask.style.display="block";
                mask.style.left= minx+'px';
                mask.style.top= miny+'px';
                mask.style.width= w+'px';
                mask.style.height= h+'px';
            }
            that.mask.onmouseup = function (e) {
                that.mask.onmouseup = null;
                that.mask.onmousemove = null;
                that.temp = that.ctx.getImageData(minx, miny, w, h);
                that.ctx.clearRect(minx, miny, w, h)
                that.history.push(that.ctx.getImageData(0, 0, that.width, that.height))
                that.ctx.putImageData(that.temp, minx, miny);
                that.drag(minx, miny, w, h, mask);
            }
        }
    },
    drag: function (x, y, w, h, mask) {
        let that = this;
        that.mask.onmousemove = function (e) {
            let ox = e.offsetX;
            let oy = e.offsetY;
            if (ox > x && ox < w + x && oy > y && oy < h + y) {
                that.mask.style.cursor = "move";
            } else {
                that.mask.style.cursor = "default";
            }
        }
        that.mask.onmousedown = function (e) {
            let ox = e.offsetX;
            let oy = e.offsetY;
            //鼠标相对于div左上角的位置
            let cx = ox - x;
            let cy = oy - y;
            if (ox > x && ox < w + x && oy > y && oy < h + y) {
                that.mask.style.cursor = "move";
            } else {
                that.mask.style.cursor = "default";
                return;
            }
            that.mask.onmousemove = function (e) {
                that.ctx.clearRect(0, 0, that.width, that.height);
                if (that.history.length != 0) {
                    that.ctx.putImageData(that.history[that.history.length - 1], 0, 0)
                }
                let endx = e.offsetX;
                let endy = e.offsetY;
                let left = endx - cx;
                let top = endy - cy;
                if(left<0){
                    left=0;
                }
                if(left>that.width-w){
                    left=that.width-w
                }

                if(top<0){
                    top=0;
                }
                if(top>that.height-h){
                    top=that.height-h
                }
                mask.style.left= left+'px';
                mask.style.top=top+'px';
                x=left;
                y=top;
                that.ctx.putImageData(that.temp, left, top);
            }
            that.mask.onmouseup = function () {
                that.mask.onmouseup = null;
                that.mask.onmousemove = null;
                that.drag(x, y, w, h, mask)
            }
        }

    },

}
