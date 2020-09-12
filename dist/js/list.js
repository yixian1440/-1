console.log("加载成功")

require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        //引入banner图效果
        "nav": "nav",
        "goodslist": "goodslist"

    },
    shim: {
        //设置依赖关系  先引入jquery.js  然后在隐去jquery-cookie
        "jquery-cookie": ["jquery"],
        //声明当前模块不遵从AMD
    }
})


require(["nav", "goodslist"], function(nav, goodslist) {
    nav.topNavDownload();
    nav.topNavtab();
    nav.searchTab();
    // nav.allGoodsTab();
    // //侧边栏加载
    nav.leftNavDownload();
    // //给侧边栏添加移入移出效果
    nav.leftNavTab();
    nav.allgoodsTab();
    goodslist.download();
    goodslist.banner();
})