

setTimeout(function(){
	motai('.motai','close');
},800)

	function motai(mo,close){
		var oMotai=document.querySelector(mo);
		var oBox=oMotai.querySelector('.box');
		var oBtn_close=document.getElementById(close);
		
			oMotai.classList.add('transition');
			setTimeout(function(){
				oBox.classList.add('box_tran');
			},500);
			
		oBtn_close.onclick=function(){
			oMotai.classList.remove('transition');
			oBox.classList.remove('box_tran');
		};	
	}