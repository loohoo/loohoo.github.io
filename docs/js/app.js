/**
 * @author rex
 * @date 2018/10/22
 * @desc
 */
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
define(["require", "exports", "pixi.js"], function (require, exports, PIXI) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    PIXI = __importStar(PIXI);
    // The application will create a renderer using WebGL, if possible,
    // with a fallback to a canvas render. It will also setup the ticker
    // and the root stage PIXI.Container
    var app = new PIXI.Application();
    var Point = PIXI.Point;
    // The application will create a canvas element for you that you
    // can then insert into the DOM
    document.body.appendChild(app.view);
    // load the texture we need
    PIXI.loader.add('bunny', 'ass/img.png').load(function (loader, resources) {
        // This creates a texture from a 'bunny.png' image
        var bunny = new PIXI.Sprite(resources.bunny.texture);
        // Setup the position of the bunny
        bunny.x = app.renderer.width / 2;
        bunny.y = app.renderer.height / 2;
        // Rotate around the center
        bunny.anchor.x = 0.5;
        bunny.anchor.y = 0.5;
        // Add the bunny to the scene we are building
        app.stage.addChild(bunny);
        // Listen for frame updates
        app.ticker.add(function () {
            // each frame we spin the bunny around a bit
            bunny.rotation += 0.11;
        });
    });
});
