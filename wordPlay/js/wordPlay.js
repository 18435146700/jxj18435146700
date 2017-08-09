
    function Game(){
        this.charArr=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M'];
            // this.charArr= [
            // ['Q','[img/2.jpg]'],
            // ['W','[img/2.jpg]'],
            // ['E','[img/2.jpg]'],
            // ['R','[img/2.jpg]'],
            // ['T','[img/2.jpg]'],
            // ['Y','[img/2.jpg]'],
            // ['U','[img/2.jpg]'],
            // ['I','[img/2.jpg]'],
            // ['O','[img/2.jpg]'],
            // ['P','[img/2.jpg]'],
            // ['A','[img/2.jpg]'],
            // ['S','[img/2.jpg]'],
            // ['D','[img/2.jpg]'],
            // ['F','[img/2.jpg]'],
            // ['G','[img/2.jpg]'],
            // ['H','[img/2.jpg]'],
            // ['J','[img/2.jpg]'],
            // ['K','[img/2.jpg]'],
            // ['L','[img/2.jpg]'],
            // ['Z','[img/2.jpg]'],
            // ['X','[img/2.jpg]'],
            // ['C','[img/2.jpg]'],
            // ['V','[img/2.jpg]'],
            // ['B','[img/2.jpg]'],
            // ['N','[img/2.jpg]'],
            // ['M','[img/2.jpg]'],
            // ];
        this.charLength=5;
        this.cw=window.innerWidth;
        this.currentEle=[];
        this.currentpos=[];
        this.speed=10
        this.gqm=1
        this.sm=10;
        this.score=0;
        this.gqmElement=document.querySelector('.gqm');
        this.smElement=document.querySelector('.sm');
        // this.sm1Element=document.querySelector('.sm1');
        this.scoreElement=document.querySelector('.score');
        this.gq=10;
	}
	Game.prototype={
		start:function(){
			//创建元素
            this.getElements(this.charLength);
            this.drop();
            this.key();
		},//产生字符
		getElements:function(length){
            for(let i=0;i<length;i++){
              this.getChar();
            }
		},
        //查看是否存在相同的元素
        checkRepeat:function(text){
            return this.currentEle.some(function(value){
                  return text==value.innerText;
            })
        },
         //查看是否存在相同的位置
        checkePosition:function(lefts){
            return this.currentpos.some(function(value){
                return value+70>lefts && lefts+70>value
            })
        },
        //随机产生一个字符
		getChar:function(){
			//产生随机下标  this.charArr[num]
			let num=Math.floor(Math.random()*this.charArr.length);
            // let text=this.charArr[num]
            while(this.checkRepeat(this.charArr[num])){
                num=Math.floor(Math.random()*this.charArr.length);
            }
			//创建div元素，将字符至于div中
            let ele=document.createElement('div');
            ele.innerText=this.charArr[num][0];
            let tops=Math.random()*200,
                lefts=Math.random()*(this.cw-200)+100;
            while(this.checkePosition(lefts)){
                lefts=Math.random()*(this.cw-200)+100;
            }
            ele.style.cssText=`width:70px;height:70px;border-radius:50%;font-size:34px;text-align:center;line-height:70px;color:#000;text-shadow:#fff 2px 2px 2px;font-width:bold;box-shadow: rgb(255, 255, 255) 0px 0px 10px 5px inset;background-image: url('image/w2.jpg');background-position: center;background-size: 90%;background-repeat: no-repeat; position:absolute;left:${lefts}px;top:${tops}px;`;
            document.body.appendChild(ele);
            this.currentEle.push(ele);
            this.currentpos.push(lefts);
		},
		drop:function(){
			let self=this;
            self.t=setInterval(function(){
                for(let i=0;i<self.currentEle.length;i++){
                    let tops=self.currentEle[i].offsetTop+self.speed;
                    self.currentEle[i].style.top=tops+'px';
                    //当当前字符的位置大于500时，删除字符
                    if(tops>450){
                   	    document.body.removeChild(self.currentEle[i]);
                   	    self.currentEle.splice(i,1);
                        self.currentpos.splice(i,1);
                        //分数增加
                        self.sm--;
                        self.smElement.innerText=self.sm;
                        // self.sm1Element.style.width=self.sm/10*100+'%';
                        if(self.sm==0){
                            let flag=window.confirm('生命量不足，是否再来一次？');
                            if(flag){
                                self.restart();
                            }else{
                                close();
                            }
                        }
                    }
            	}
            	//当当前字符长度低于5个时，随机产生一个
                if(self.currentEle.length<self.charLength){
            	    self.getChar();
                }
            },500)
		},
		key:function(){
			// let self=this;
			document.body.onkeydown=function(e){
				//e.keyCode  a~:65~   ele.inner.Text A B C
				let code=String.fromCharCode(e.keyCode);
				for(let i=0;i<this.currentEle.length;i++){
                    if(code==this.currentEle[i].innerText){
                    	document.body.removeChild(this.currentEle[i]);
                    	this.currentEle.splice(i,1);
                        //删除位置
                        this.currentpos.splice(i,1);
                        this.score++;
                        this.scoreElement.innerText=this.score;
                        if(this.score==this.gq){
                            this.next();
                            this.gqm++;
                            this.gqmElement.innerText=this.gqm;
                        }
                    }
				}
				if(this.currentEle.length<this.charLength){
					this.getChar();
				}

			}.bind(this)   //绑定this   使this指向Game()
		},
        restart:function(){
            clearInterval(this.t);//停止元素掉下来
            for(let i=0;i<this.currentEle.length;i++){
                document.body.removeChild(this.currentEle[i]);
            }
            this.currentEle=[];
            this.currentpos=[];
            this.sm=10;
            this.smElement.innerText=this.sm;
            this.score=0;
            this.scoreElement.innerText=this.score;
            this.gqm=1;
            this.gqmElement.innerText=this.gqm;
            this.start();
        },
        next:function(){
            clearInterval(this.t);//停止元素掉下来
            for(let i=0;i<this.currentEle.length;i++){
                document.body.removeChild(this.currentEle[i]);
            }
            this.currentEle=[];
            this.currentpos=[];
            if(this.score<=70){
                this.charLength++;
                this.gq+=10;
                this.start();
            }
            if(this.score>70){
                this.speed++;
                this.gq+=10;
                this.start();
            }  
        },
}
