var gulp = require('gulp');
var sass = require('gulp-sass');


gulp.task('build', function () {
    gulp.src('public/assets/scss/style.scss') // Gets all files ending with .scss in app/scss and children dirs
        .pipe(sass().on('error', sass.logError)) // Passes it through a gulp-sass, log errors to console
        .pipe(gulp.dest('public/assets/css/')); // Outputs it in the css folder

    return gulp.src('public/assets/scss/style_dark.scss') // Gets all files ending with .scss in app/scss and children dirs
        .pipe(sass().on('error', sass.logError)) // Passes it through a gulp-sass, log errors to console
        .pipe(gulp.dest('public/assets/css/')); // Outputs it in the css folder
});