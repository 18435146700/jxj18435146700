$(function () {
    //52张 花色  数字
    // [{huase:"h",num:"5"},{huase:"s",num:"5"}.....]
    //biao={h_5:true,s_5:true}
    let poke=[];
    let biao={};
    let color=['h','s','c','d'];
    // let dir={
    //
    // }
    //产生
    while(poke.length<52){
        let huase=color[Math.floor(Math.random()*4)];
        let shuzi=Math.floor(Math.random()*13+1);
        //biao[c_9]  {huase:'s',shuzi:5}  biao['s_5']=true
        if(!biao[huase+'_'+shuzi]){
            biao[huase+'_'+shuzi]=true;
            poke.push({huase,shuzi});
            // document.write(`${huase}--${shuzi}`)
        }
    }
    //记录当前发的第几张牌
    let index=0;
    for(let i=0;i<7;i++){
        for(let j=0;j<=i;j++){
            let item=poke[index];
            //item={huase:'s',shuzi:5}
            index++;
            //ulr(image/5s.png
            // let src='url(pokeimg/'+item.shuzi+item.huase+'.png)';
            let src='url(image/'+item.shuzi+item.huase+'.png)';
            $('<div>').addClass('poke')
                .css('backgroundImage',src)
                .delay(index*40)
                .data('num',item.shuzi)
                .prop('id',i+'_'+j)
                .animate({left:300-50*i+100*j,top:55*i,opacity:1})
                .appendTo('.table')
        }
    }
    //剩余的牌
    for(;index<poke.length;index++){
        let item=poke[index];
        // let src='url(pokeimg/'+item.shuzi+item.huase+'.png)';
        let src='url(image/'+item.shuzi+item.huase+'.png)';

        $('<div>').addClass('poke zuo')
            .css('backgroundImage',src)
            .delay(index*40)
            .data('num',item.shuzi)
            .animate({left:100,top:490,opacity:1})
            .appendTo('.table')
    }
    let first=null;
    $('.poke').click(function(){
        let coords=$(this).prop('id').split('_');
        //'1_1 '   2_1  2_2    元素  $(#2_2)
        //'1','1'
        // coords[0],coords[1]         //点击当时的牌的坐标
       // parseInt(coords[0])+1,parseInt(coords[1]+1)     //可能压住点击的牌的两个坐标
        //`#${parseInt(conrds[0])+1}_${parseInt(coords[1])+1}`   元素
        let ele=`#${parseInt(coords[0])+1}_${coords[1]}`
        let ele1=`#${parseInt(coords[0])+1}_${parseInt(coords[1])+1}`
        if($(ele).length==1||$(ele1).length==1){
            return;
        }
        $(this).toggleClass('active');
        if($(this).hasClass('active')){
            $(this).animate({top:'-=20'})
        }else{
            $(this).animate({top:'+=20'})
        }
        if(!first){
            first=this;
            let sum=$(first).data('num');
            if(sum==13) {
                $('.active').animate({top:0,left:600}, function () {
                    $(this).remove()
                });
            }
        }else{
            let sum=$(first).data('num')+$(this).data('num');
            if(sum==13) {
                $('.active').animate({top:0,left:600}, function () {
                    $(this).remove()
                });
            }else{
                    $('.active').animate({top: '+=20'}).removeClass('active')


                }
                first=null;
            }

    })
  let moveR=$('.moveR');
  let moveL=$('.moveL');

    let z=1
    moveR.on('click',function(){
        z++;
        $('.zuo:last')
            .removeClass('zuo')
            .addClass('you')
            .css('zIndex',z)
            .animate({left:'+=300'});
    })
    moveL.on('click',function(){
        let you=$('.you');
        if(you.length==0){
            return;
        }
        for(let i=you.length-1;i>=0;i--){
            $(you[i])
                .delay(200*i)
                .animate({left:'-=300'},function(){
                $(this).css('zIndex',0)
                })
                .addClass('zuo')
                .removeClass('you');
        }
    })
})