$.ajax({
				type:"get",
				url:"json/data.json",
				async:false,			// 是否异步,默认是异步,慎用
				dataType:"json",
				data:{},		//请求数据
				success:function(res){
					//console.log(res)
					
					 JsonData=res;		//保存响应的数据
					
				}
		});

var map = new AMap.Map('container',{
            resizeEnable: true,
            zoom: 10,
            center: [116.480983, 40.0958]
       });
var map1 = new AMap.Map('container1',{
            resizeEnable: true,
            zoom: 10,
            center: [116.480983, 40.0958]
       });
       
       //获取当前位置的经纬度
        mapObj = new AMap.Map('container');
		mapObj.plugin('AMap.Geolocation', function () {
	    geolocation = new AMap.Geolocation({
	        enableHighAccuracy: true,//是否使用高精度定位，默认:true
	        timeout: 1000,          //超过10秒后停止定位，默认：无穷大
	        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
	        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
	        showButton: true,        //显示定位按钮，默认：true
	        buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
	        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
	        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
	        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
	        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
	        zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
	    });
		    mapObj.addControl(geolocation);
		    geolocation.getCurrentPosition();
		    AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
		    AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
		});
		    //解析定位结果
		   var  My_Lng=null;
		   var  My_Lat=null;
		   var oP=document.getElementById('juli');
	    function onComplete(data) {
			My_Lng = data.position.getLng();
			My_Lat = data.position.getLat();
			
			// 距离最近的门店	
//	         My_Lng=113.924692;
//		     My_Lat=23.804795;
		     var arr=[];
		     for(var i=0;i<JsonData.length;i++){
			     map.setFitView();
			     var lnglat = new AMap.LngLat(My_Lng, My_Lat);
			    // console.log(i)
				 var juli = lnglat.distance([JsonData[i].JD, JsonData[i].WD]);
				 arr.push(juli);
		     }
		     var Min=Math.min.apply(null,arr);
		     var index=0;
		     for(var i=0;i<arr.length;i++){
		     	if(arr[i] == Min){
		     		index=i;
		     	}
		     };
		     oP.innerHTML = '您离最近的兑换点的距离约为:' + parseInt(arr[index]) + '米';
		     map1.setZoomAndCenter(18, [JsonData[index].JD, JsonData[index].WD]);
	       var marker = new AMap.Marker({
	       			map:map1,
		            position: [JsonData[index].JD, JsonData[index].WD]
		    });
		    marker.setMap(map1);
		    marker.on('click',function(e){
		      infowindow.open(map1,e.target.getPosition());
		    })
		    AMap.plugin('AMap.AdvancedInfoWindow',function(){
				        panToLocation: true;    //定位成功后将定位到的位置作为地图中心点，默认：true
				        zoomToAccuracy:true  ;    //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
				
		       infowindow = new AMap.AdvancedInfoWindow({
		        content: '<div class="info-title">' + JsonData[index].shop_name +  '</div><div class="info-content">'+
		                '<img src="img/logo.png"><br />'+ '地址:'
		                + JsonData[index].address +'<br />'+
		                '电话:' + JsonData[index].mobile +'</div>',
		        offset: new AMap.Pixel(0, -30)
		      });
		      infowindow.open(map1,[JsonData[index].JD, JsonData[index].WD]);
		    })	
	    }
	    //解析定位错误信息
	    function onError(data) {
	       alert('定位失败'); 
	        
	    }
		


