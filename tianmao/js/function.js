/*banner*/
window.onload =function(){
	    let banner=document.querySelector('.banner');
		let tabCon=document.querySelector('.tabCon');
		let imgs=document.querySelectorAll('.tabCon li');
		let imgWidth=parseInt(getComputedStyle(tabCon,null).width);
		let btn=document.querySelectorAll('.btn');
        let btns=document.querySelectorAll('.btn li');
		let current=0,next=0;
		let t;
        /*鼠标移入图片上时停止滚动*/
		t=setInterval(move,2000);
		banner.onmouseenter=function(){
			clearInterval(t)
		}
		banner.onmouseleave=function(){
			t=setInterval(move,2000);
		}
		for(let i=0;i<imgs.length;i++){
			if(i == 0){
				continue;
			}
			imgs[i].sxtyle.left=imgWidth+'px';
		}
      
		function move(){
		    next++;
		    if(next==imgs.length){
			    next=0;
		    }
		    btns[current].className='';
            btns[next].className='hot';
		    imgs[next].style.left=imgWidth+'px';
		    animate(imgs[current],{left:-imgWidth});
		    animate(imgs[next],{left:0});
		    current=next;
	    }

	     // 轮波点点击操作		
		for(let i=0;i<btns.length;i++){
            btns[i].index=i;
            btns[i].onclick=function(){
                btns[current].className='';
                this.className='hot';
                imgs[this.index].style.left=imgWidth+'px';
                animate(imgs[current],{left:-imgWidth});
                animate(imgs[this.index],{left:0});
                currnet=next=this.index;
            }
        }
}

/*搜索导航、左侧固定栏*/
    let nav=document.querySelector('nav');
    let zuo=document.querySelector('.zuo');
    let ch=window.innerHeight;
    let jiazai=document.querySelectorAll('.jia')
    let arr=[];
    let n=0,flag=true;
    window.onscroll=function(){
    	let tops=document.body.scrollTop;
    	let lefts=document.body.scrollLeft;
        if(tops>=750){
			    animate(nav,{top:0})
	    }else if(tops<750){
			    animate(nav,{top:-100})
	    }
        if(tops>=550){
			animate(zuo,{left:0})
	    }else if(tops<550){
			animate(zuo,{left:-100})
	    }

//按需加载
    jiazai.forEach(function(value,index){
    	arr.push(value.offsetTop)
    })
    if(!flag){
    	return;
    }
    arr.forEach(function(value,index){
        for(let i=0;i<arr.length;i++){
    	    if(tops+ch>arr[i]+150){

    		    let imgs=jiazai[i].getElementsByTagName('img');
    		    for(let j=0;j<imgs.length;j++){
    			    imgs[j].src=imgs[j].title
    		    }
    	    }
        }
    })



// 左侧固定栏
	let tian=document.querySelectorAll('.tiao1');
	let bo=document.querySelectorAll('.bot>a');
    let ar=[];
    tian.forEach(function(value,index){
    	ar.push(value.offsetTop)
    })
    // 点击操作
    for(let i=0;i<bo.length;i++){
    	bo[i].onclick=function(){
    		bo[n].classList.remove('hot')
    		this.classList.add('hott')
    		n=i
             animate(document.body,{scrollTop:ar[i]})
    	}
    }
}   