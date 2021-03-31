		
		var oInput=document.getElementById('exchange');
		var oBtn=document.getElementById('btn');
		var oButton =document.getElementsByTagName('button')[0];
		oBtn.onclick=function(){
			if(oInput.value == ''){
				motai('.motai1','close');
			}else{
				motai('.motai','close1');
			}
		}
		
		function motai(mo,close){
			var oMotai=document.querySelector(mo);
			var oBox=oMotai.querySelector('.box');
			var oBtn_close=document.getElementById(close);
			console.log(oMotai)
				oMotai.classList.add('transition');
				setTimeout(function(){
					oBox.classList.add('box_tran');
				},500);
				
			oBtn_close.onclick=function(){
				oMotai.classList.remove('transition');
				oBox.classList.remove('box_tran');
			};	
			oButton.onclick=function(){
				oMotai.classList.remove('transition');
				oBox.classList.remove('box_tran');
				oInput.focus();
			}
		}
