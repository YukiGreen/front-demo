(function(){
    require.config({
        paths: {
            m1: './modules/m1',
            m2: './modules/m2',
            jquery: '../../libs/jquery-3.3.1'/* 必须是小写，因为jquery是导出的变量 */
        }
    });
    // 引入第二个模块
    require(['m2', 'jquery'], function(m2, $){
        m2.show();
        $('body').css('backgroundColor','#000');
    });
})();