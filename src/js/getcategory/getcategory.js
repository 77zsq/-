/**
 * 渲染商品分类标题：
 * 1、请求接口获取列表数据
 * 2、使用模版引擎得到数据渲染后的html，插入到页面指定位置
 * */
// $.get('http://139.199.192.48:9090/api/getcategorytitle', function(data) {
//     console.log(data);
//     $('.briefin').html(template('goodsTitle', data.result));
//     /* 切换点击事件 实现table的显示和隐藏功能 */
//     $('.briefin a').on('click', function() {
//         console.log($(this));
//         console.log($(this).parents()[0]);
//         var id = $(this).attr("data-id");
//         var self = $(this); //a
//         console.log($(this).parent()[0]);
//         $.get('http://139.199.192.48:9090/api/getcategory', { titleid: id }, function(data) {
//             console.log(data);

//             self.parent().append(template('goodsList', data.result));
//             self.parent().siblings('table').toggle();
//             // $(this).parent().siblings('table').toggle();
//         });
//     })
// });

$.get('http://139.199.192.48:9090/api/getcategorytitle', function(data) {
    console.log(data);
    console.log(typeof data);
    console.log(data.result);
    console.log(typeof data.result);
    $('.briefin').html(template('goodsTitle', data.result));
    $('.briefin a').on('click', function() {
        console.log($(this));
        var self = $(this);
        var id = $(this).attr("data-id");
        console.log(id);
        $.get('http://139.199.192.48:9090/api/getcategory', { titleid: id }, function(data) {
            console.log(data);
        });

    });
});




// $(document).ready(function() {
//     $('table').hide();
//     $('.fl_t').click(
//         function() {
//             if ($(this).next().css("display") == "none") {
//                 $(this).siblings('.fl_t').find('a').css("background-image", "url(http://www.zuyushop.com/wap/images/arrow1.gif)");
//                 $(this).siblings('table').hide();
//                 $(this).find('a').css("background-image", "url(http://www.zuyushop.com/wap/images/arrow2.gif)");
//                 $(this).next().show();

//             } else {
//                 $(this).find('a').css("background-image", "url(http://www.zuyushop.com/wap/images/arrow1.gif)");
//                 $(this).next().hide();
//             }

//         }
//     );
// });