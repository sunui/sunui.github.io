var weathers = ['晴', '多云', '阴', '阵雨', '雷阵雨', '雷阵雨并伴有冰雹', '雨夹雪', '小雨', '中雨', '大雨', '暴雨', '大暴雨', '特大暴雨', '阵雪', '小雪', '中雪', '大雪', '暴雪', '雾', '冻雨', '沙尘暴', '小雨 - 中雨', '中雨 - 大雨', '大雨 - 暴雨', '暴雨 - 大暴雨', '大暴雨 - 特大暴雨', '小雪 - 中雪', '中雪 - 大雪', '大雪 - 暴雪', '浮尘', '扬沙', '强沙尘暴', '飑', '龙卷风', '弱高吹雪', '轻雾', '霾'];

(function () {
    var geocoder, autocomplete, geolocation, weather;
    var positonInput = document.getElementById("positon")
    var nweather = document.getElementById("nweather")

    // 地理编码与逆地理编码服务，用于地址描述与坐标间的相互转换
    AMap.service('AMap.Geocoder', function () {
        geocoder = new AMap.Geocoder({});
    })
    // 输入提示，根据输入关键字提示匹配信息
    AMap.plugin('AMap.Autocomplete', function () {
        autocomplete = new AMap.Autocomplete({
            input: "positon"
        });
    })
    //根据城市天气查询
    AMap.service('AMap.Weather', function () {
        weather = new AMap.Weather();
    })

    AMap.plugin('AMap.Geolocation', function () {
        geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonPosition: 'RB'
        });
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
        AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
    })

    function onComplete(data) {
        var lnglatXY = [data.position.getLng(), data.position.getLat()]
        geocoder.getAddress(lnglatXY, function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
                //输入信息
                positon.value = result.regeocode.formattedAddress;
                getWeather(result.regeocode.addressComponent.adcode)
            } else {
                //获取地址失败
            }
        });
    }
    function onError(data) {
        console.log(data)
    }


    function getWeather(adcode) {
        //查询实时天气信息, 查询的城市到行政级别的城市，如朝阳区、杭州市
        weather.getLive(adcode, function (err, data) {
            if (!err) {
                var str = [];
                str.push('<div>城市/区：' + data.city + '</div>');
                str.push('<div>天气：' + data.weather + '</div>');
                str.push('<div>温度：' + data.temperature + '℃</div>');
                str.push('<div>风向：' + data.windDirection + '</div>');
                str.push('<div>风力：' + data.windPower + ' 级</div>');
                str.push('<div>空气湿度：' + data.humidity + '</div>');
                str.push('<div>发布时间：' + data.reportTime + '</div>');
                nweather.innerHTML = str.join('')
            }
        });
    }




    // 点击输入框执行智能补全
    positon.onclick = function () {
        autocomplete.search(positon.value)
    }
    AMap.event.addListener(autocomplete, "select", function (e) {
        getWeather(e.poi.adcode)
    })

})()







