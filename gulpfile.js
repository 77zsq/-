//导入包包,包治百病
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var conat = require('gulp-concat');
var browserify = require('browserify');
var source = require('vinyl-source-stream'); //这个包可以把普通的数据流转为vinyl对象文件格式
var buffer = require('vinyl-buffer');
var htmlReplace = require('gulp-html-replace');

//html处理
gulp.task('html', function() {
    gulp.src(['index.html', 'src/**/*.html'])
        // .pipe(htmlReplace({
        //     style: gulp.src('src/html/common/style.html'),
        //     header: gulp.src('src/html/common/header.html'),
        //     aside: gulp.src('src/html/common/aside.html'),
        //     digest: gulp.src('src/html/common/course/digest.html'),
        //     stbyst: gulp.src('src/html/common/course/stbyst.html')
        // }))
        .pipe(htmlmin({
            collapseWhitespace: true, //去除页面空白
            minifyCSS: true, //压缩页面css
            minifyJS: true, //压缩页面js
            removeComments: true //清楚html注释
        }))
        .pipe(gulp.dest('dist'))
});

//less处理
gulp.task('less', function() {
    gulp.src('./src/less/*.less')
        .pipe(less())
        .pipe(cleanCss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/css'))

});

//js处理
//配置要打包的第三方路径
var jsLibs = [
    './node_modules/art-template/lib/template-web.js',
    './node_modules/jquery/dist/jquery.js',
    './node_modules/bootstrap/dist/js/bootstrap.js',
    './node_modules/jquery-form/dist/jquery.form.min.js',
    './node_modules/jquery.cookie/jquery.cookie.js',
    './node_modules/nprogress/nprogress.js'
];
//合并所有第三方包为一个js
gulp.task('jsLib', function() {
    gulp.src(jsLibs)
        .pipe(conat('lib.js'))
        .pipe(gulp.dest('dist/js'))
});

var jsModules = [

    //首页
    'src/js/index.js',





    //getCategory
    'src/js/getcategory/getcategory.js',
    'src/js/getcategory/getcategory1.js',
    //getbrand
    'src/js/getbrand/getbrand.js',
    'src/js/getbrand/tenBrand.js',
    'src/js/getbrand/getbrandproductlist.js',

];

//打包commentJs模块
gulp.task('js', function() {
    jsModules.forEach(function(jsPath) {
        var pathArr = jsPath.split('/'); //jsPath变成['src','js','user','login.js']
        var jsName = pathArr.pop(); //提取login.js,数组变成['src','js','user']
        pathArr.shift(); //取出src,数组变成['js','user']
        browserify(jsPath, { debug: true }).bundle() //打包index.js
            .pipe(source(jsName))
            .pipe(buffer())
            .pipe(uglify())
            .pipe(gulp.dest('dist/' + pathArr.join('/'))) //数组变成js/user
    })
});

//添加统一打包任务
gulp.task('build', function() {
    gulp.run(['html', 'less', 'jsLib', 'js'])
});
//监听
gulp.task('default', function() {
    gulp.run('build');
    gulp.watch(['/src/**/*.html', 'index.html'], function() {
        gulp.run('html')
    });
    gulp.watch('/src/less/*.less', function() {
        gulp.run('less')
    });
    gulp.watch(['/src/**/*.js'], function() {
        gulp.run('js')
    });
})