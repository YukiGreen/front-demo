import './index.css';
import $ from 'jquery';
// var json = require('./data.json');
console.log('json', 1234565);

$.ajax({
    url: 'http://localhost:9091/data.json',
    success: function (data) {
        console.log(data);
    },
    error: function () {
        console.log('error')
    }
})
// 监听js的热更新
if(module.hot){
    module.hot.accept()
}