console.log('加载成功');


//配置模块   AMD规范
require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie:": "jquery",
        "nav": "nav",
        "slide": "slide",
        "data": "data"
    },
    shim: {
        "jquery-cookie": ["jquery"]
    }
})


require(["nav", "slide", "data"], function(nav, slide, data) {
    nav.download();
    nav.banner();
    nav.leftNavDownload();
    nav.leftNavTab();
    nav.topNavDownload();
    nav.topNavtab();
    nav.searchTab();
    slide.download();
    slide.slideTab();
    data.download();
    data.tabMenu();

})