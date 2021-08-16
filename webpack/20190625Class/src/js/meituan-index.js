// 引入样式
import '../css/reset.css';
import '../css/list.css';
import '../css/meituanIndex.css';
import '../webfont/iconfont.css';//报错是因为配置文件不识别

import $ from 'jquery';
window.$ = $;
function getData() {
    $.ajax({
        url: 'http://localhost:9191/api/list.json',
        success: function (data) {
            console.log(data.list);
            addDom(data.list);
        },
        error: function () {
            console.log('error');
        }
    });
}

getData();
function addDom(list) {
    var str = '';
    list.forEach(function (ele, i) {
        str += '<li class="foodspic">\
            <a href = "http://localhost:9191/detail.html?id=' + ele.id + '" class="clearfix">\
                <img src="'+ ele.info.imgurl + '" alt="">\
                    <dl><dt>'+ ele.info.name + '</dt><dd>\
                            <p class="foodtitle">'+ ele.info.des + '</p>\
                            <p class="price">\
                                <span><strong>'+ ele.info.price + '</strong><i>元</i></span>\
                                <span>'+ ele.info.newUser + '</span>\
                                <span>'+ ele.info.sale + '</span>\
                             </p></dd></dl></a></li>'
    });
    $('.guess-foodlist .list').html(str);
}