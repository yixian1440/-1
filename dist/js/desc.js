console.log("加载成功")

//配置模块   AMD规范
require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "nav": "nav",
        "goodsDesc": "goodsDesc"
    },
    shim: {
        //依赖关系
        "jquery-cookie": ["jquery"]

    }
})


require(['nav', 'goodsDesc'], function(nav, goodsDesc) {
    nav.download();
    nav.banner();
    nav.leftNavDownload();
    nav.leftNavTab();
    nav.topNavDownload();
    nav.topNavtab();
    nav.searchTab();
    nav.allgoodsTab();
    goodsDesc.download();
    goodsDesc.banner();

})