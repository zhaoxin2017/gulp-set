var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');

gulp.task('default', function() {
    console.log('OK');
});

gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: './'
        },
    })
});

gulp.task('sass', function() {
    return gulp.src('./sass/**/*.scss')
        //nested           嵌套
        //compact        紧凑
        //expanded       扩展
        //compressed   压缩
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('useref', function() {
    return gulp.src('js/**/*.js')
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['browserSync', 'sass'], function() {
    gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch('./*.html', browserSync.reload);
    gulp.watch('./js/*.js', browserSync.reload);
    console.log('MISSION SUCCESS!')
});
