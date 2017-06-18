//引入gulp
var gulp=require("gulp"),
    livereload=require("gulp-livereload"),
    webserver=require("gulp-webserver"),
    sass=require("gulp-ruby-sass"),
    uglify=require("gulp-uglify"),
    imagemin=require("gulp-imagemin"),
    pngquant=require("imagemin-pngquant"),
    jshint=require("gulp-jshint"),
    rename=require("gulp-rename");
    // sourcemaps=require("gulp-sourcemaps");

gulp.task("webserver",function () {
    gulp.src("./dist").
    pipe(webserver({
        livereload:true,
        open:true
    }));
});

gulp.task("html",function () {
    return gulp.src("src/**/*.html").
    pipe(gulp.dest("dist/"))
});

gulp.task("sass",function () {
    return sass("src/sass/**/*.scss",{style:"compact"})
        .on("error",function (err) {
            console.log("编译sass出错%s",err.message)
        })
        .pipe(gulp.dest("dist/css/"))
});
gulp.task("css",function(){
    return gulp.src("src/**/*.css").
    pipe(gulp.dest("dist/"))
});
gulp.task("js",function () {
    return gulp.src("src/js/**/*.js")
        // .pipe(sourcemaps.init())
        .pipe(rename({suffix:".min"}))
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"));
});
gulp.task("script",function () {
    gulp.src("./src/js/**/*.js")
        .pipe(jshint())
        .pipe(jshint.reporter("default"))
});
gulp.task("imagemin",function(){
    return gulp.src("src/images/**/*.{png,jpg,gif,svg}")
        .pipe(imagemin({
            progressive:true,
            svgoPlugins:[{removeViewBox:false}],
            use:[pngquant()]
        }))
        .pipe(gulp.dest("dist/images"))
});

gulp.task("default",["sass","js","css","imagemin","html","webserver"])