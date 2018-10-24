/**
 * @author rex
 * @date 2018/10/22
 * @desc
 */

let req:any = require;

req.jsExtRegExp = /^\/|:|\?$/;

require.config({
    baseUrl : "js",
    paths : {
        "pixi.js" : "https://cdnjs.cloudflare.com/ajax/libs/pixi.js/4.8.2/pixi.min"
    }
});


require(["app"]);
