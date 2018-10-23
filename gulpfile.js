let gulp = require('gulp');

let log = require('fancy-log');

let ts = require('gulp-typescript');


let through = require('through2');

let fs = require('fs');

let path = require('path');


// let source_map = require('gulp-sourcemap');

let libs = [
    'node_modules/pixi.js/dist/pixi.min.js',
    'node_modules/requirejs/require.js'
];

let posix_path = function (path_str) {

    return path_str.split(path.sep).join('/');
};



gulp.task('cp', ()=>{


    return gulp.src(libs)
        .pipe(through.obj(function(file, enc, cb){

            if (!file.isNull()) {

                if (!fs.existsSync('build/js/' + path.basename(file.path))) {

                    this.push(file);
                }
            }

            cb();

        }))
        .pipe(gulp.dest("build/js"));

});

gulp.task('css', ()=>{

    return gulp.src('src/css/**/*')
        .pipe(gulp.dest('build/css/'));

});

gulp.task('ass', ()=>{

    return gulp.src('src/ass/**/*')
        .pipe(gulp.dest('build/ass'));

});
gulp.task('html', ()=>{

    return gulp.src('src/index.html')
        .pipe(gulp.dest('build/'));

});

gulp.task('ts', ()=>{


    let tsProject = ts.createProject('tsconfig.json');

    return gulp.src("src/ts/*.ts")
        .pipe(tsProject())
        .pipe(gulp.dest('build/js')).on('error', log);

});

gulp.task('default', ['cp','html','css','ass','ts'], function(){

    gulp.watch('src/ts/*.ts', ['ts']);
    gulp.watch('src/ass/**/*', ['ass']);
    gulp.watch('src/css/**/*', ['css']);
    gulp.watch('src/index.html', ['html']);

});

