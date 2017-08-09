//向上滑动
$(function(){
	 $('.box').fullpage({
	 	navigation:true,
	 	menu: '#menu',anchors: ['page1', 'page2', 'page3', 'page4', 'page5']
	 });
	 $('.fp-tooltip').css({'color':'#8B9FA9','font-size':'12px'});
});

var bei=$('.bei');
function resize(){
	var cx=document.documentElement.clientWidth;
	var cy=document.documentElement.clientHeight;
	bei.css({width:cx,height:cy});
};
resize();
window.addEventListener('resize',resize)
var din=$('.stn1 .din');
var p=$(".stn1 .din p");
var num=0;
var next=0;
din.eq(0).css({transform:'scale(1)'});
//作品轮播
function lunbo(){
	next++;
	if(next==din.length){
		next=0;
	}
	din.eq(num).css({transform:'scale(1)'}).find('p').css({color:'#fff',fontWeight:''});
	din.eq(next).css({transform:'scale(1.2)'}).find('p').css({color:'#35B9A2',fontWeight:'bold'});
	num=next;
}
var t=setInterval(lunbo,1000)
din.hover(function(){
	clearInterval(t)
},function(){
	t=setInterval(lunbo,1000)
})



var boxs=document.querySelectorAll('.stn4>.nr>.nrs>.boxs');
for(var i=0;i<boxs.length;i++){
	boxs[i].onmouseover=function(){
		for(var j=0;j<boxs.length;j++){
			boxs[j].classList.remove('active');
		}
		this.classList.add('active');
	}
}








