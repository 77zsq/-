/**
 * 数据回显：
 * 1、拿到location.search里面的cs_id
 * 2、通过这个id请求接口获取数据
 * 3、得到数据渲染后的模版，插入页面指定的位置
 * */
$.get('http://139.199.192.48:9090/api/getbrand', { brandTitleId: brandTitleId }, function(data) {
    console.log(data);
    //  data.result.editIndex = 1;
    $('.tenBigbrand').html(template('tenBigbrand', data.result));

});