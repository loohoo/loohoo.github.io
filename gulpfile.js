let gulp = require('gulp');

let log = require('fancy-log');

let ts = require('gulp-typescript');


let through = require('through2');

let fs = require('fs');

let path = require('path');


// let source_map = require('gulp-sourcemap');

let libs = [
    'node_modules/requirejs/require.js'
];

let posix_path = function (path_str) {

    return path_str.split(path.sep).join('/');
};

let out_dir = 'bin/'
let out_js = 'bin/js/';
let out_ass = 'bin/ass/';


gulp.task('cp', ()=>{


    return gulp.src(libs)
        .pipe(through.obj(function(file, enc, cb){

            if (!file.isNull()) {

                if (!fs.existsSync(out_js + path.basename(file.path))) {

                    this.push(file);
                }
            }

            cb();

        }))
        .pipe(gulp.dest(out_js));

});


gulp.task('ass', ()=>{

    return gulp.src('src/ass/**/*')
        .pipe(gulp.dest(out_ass));

});
gulp.task('html', ()=>{

    return gulp.src('src/index.html')
        .pipe(gulp.dest(out_dir));

});

gulp.task('ts', ()=>{


    let tsProject = ts.createProject('tsconfig.json');

    return gulp.src("src/ts/*.ts")
        .pipe(tsProject())
        .pipe(gulp.dest(out_js)).on('error', log);

});

gulp.task('default', ['cp','html','ass','ts'], function(){

    gulp.watch('src/ts/*.ts', ['ts']);
    gulp.watch('src/ass/**/*', ['ass']);
    gulp.watch('src/index.html', ['html']);

});

