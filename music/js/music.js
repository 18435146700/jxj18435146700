window.onload=function() {
    let audio = document.querySelector('audio');
    let song = document.querySelector('.song');
    let author = document.querySelector('.author');
    let lyrics = document.querySelector('.lyrics')
    let playBtn = document.querySelector('.play');
    let prevBtn=document.querySelector('.prev');
    let nextBtn=document.querySelector('.next');
    let img = document.querySelector('img');
    let info = document.querySelector('.info');
    let cTime = document.querySelector('.cTime');
    let dTime = document.querySelector('.dTime');
    let playProgress=document.querySelector('.playProgress');
    let showProgress=document.querySelector('.showProgress');
    let volume=document.querySelector('.volume');
    let volumeBtn=document.querySelector('.volumey');
    let volumes=document.querySelector('.volumes')
    let volumey=document.querySelector('.volumey')
    let index = 0;
    //初始化加载
    render(database[0]);


    //暂停和播放
    playBtn.onclick = function () {
        if (audio.paused) {
            audio.play();
            playBtn.classList.toggle('icon-bofang');
        } else {
            audio.pause();
            playBtn.classList.toggle('icon-bofang');
        }
    }
    // 音量
    let sz=volume.offsetTop;
    let vtop=volumes.offsetHeight;
    let max=
        min=
    volumeBtn.onmousedown=function(e){
        let oy=e.offsetY
        volumeBtn.onmousemove=function(e){
            let cy=e.clientY;
            tops=oy-vtop
            this.style.top=tops+'px';
            volumes.style.height=tops-oy+'px';
            audio.volume=1
            }
        volumeBtn.onmouseup=function(e){
            volumeBtn.onmousemove=null;
            volumeBtn.onmouseup=null;
        }
    }
    //上一首歌曲
    prevBtn.onclick=function(){
        index--;
        if(index=database[0]){
            index=0
        }
        render(database[index])
    }
    //下一首歌曲
   nextBtn.onclick=function(){
       index++;
       console.log(database.length)
       if(index>database.length-1){
           index=0
       }
       render(database[index]);
   }

    //歌词
    let d=i=0
    audio.ontimeupdate= function() {
        let current = format(audio.currentTime);
        // let duration =format(audio.duration);
        let duration=database[index].alltime;
        let string = '';
        cTime.innerText = current;
        dTime.innerText = duration;
        lyrics.innerHTML='';
        //通过time查找相对应的对象
        database[index]['lyrics'].forEach(function(value,tt){
            if( value.time == current ){
                d = i = tt  ;
                 console.log(i)
                if(d<2){
                     i=0
                }else{
                    i=d-2
                }
                 //进度条
                let percent = audio.currentTime/audio.duration;
                // let percent =current/duration
                showProgress.style.width = percent* (playProgress.offsetWidth)+ "px";
            }
        })
        //通过时间找出相对应的lyric，并且将hot属性添加在当前的lyric
        for(let j=i;j<database[index]['lyrics'].length;j++){
            if(j==d){
                string+=`
             <li class="hot">
                ${database[index]['lyrics'][j]['lyric']}
             </li>`;
            }else{
                string+=`
             <li >
                ${database[index]['lyrics'][j]['lyric']}
             </li>`;
            }

        }
        lyrics.innerHTML = string;
    }

    //格式化时间
    function  format(time){
        let mi =  Math.floor(time /60) >=10 ? Math.floor(time /60) :  '0'+Math.floor(time /60);
        let sc =  Math.floor(time % 60) >=10 ? Math.floor(time % 60) :  '0'+Math.floor(time % 60);
        return `${mi}:${sc}`;
    }
    //初始化事件
    function render(obj) {
        //歌词
        let string = '';
        // song.innerText = obj.songs;
        // author.innerText = obj.name;
        audio.src = obj.src;
        //进度条
        info.innerText=`${obj.name}-${obj.songs}`;
        img.src=obj.photo;
        cTime.innerText='00:00';
        dTime.innerText=obj.alltime;
        obj.lyrics.forEach(function (value, index) {
            string += `<li>${value.lyric}</li>`;
        })
        lyrics.innerHTML = '';
        lyrics.innerHTML = string;
    }
}