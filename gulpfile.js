// const {src, dest, watch, series} = require('gulp');
// const browserSync = require('browser-sync').create();
// const sass = require('gulp-sass');
// const autoprefixer = require('gulp-autoprefixer');
// const cleanCSS = require('gulp-clean-css');
// const minify = require('gulp-minify');
// const htmlmin = require('gulp-htmlmin');
// const tinypng = require('gulp-tinypng-compress'); 


// // Static server
// function bs() {
//     serveSass();
//     browserSync.init({
//         server: {
//             baseDir: "./"
//         }
//     });
//     watch("./*.html").on('change', browserSync.reload);
//     watch("./sass/**/*.sass", serveSass);
//     watch("./sass/**/*.scss", serveSass);
//     watch("./js/*.js").on('change', browserSync.reload);

// };

// // Compile sass into CSS & auto-inject into browsers
// function serveSass() {
//     return src("./sass/**/*.sass", "./sass/**/*.scss")
//         .pipe(sass())
//         .pipe(autoprefixer({
//             cascade: false
//         }))
//         .pipe(dest("./css"))
//         .pipe(browserSync.stream());
        
// };
// function buildCSS(done) {
//     src('css/**/**.css')
//         .pipe(cleanCSS({compatibility: 'ie8'}))
//         .pipe(dest('dist/css/'));
//     done();
// }
// function buildJS(done) {
//     src(['js/**.{js,css}', '!js/**.min.js'])
//         .pipe(minify({ext:{
//                 min:'.js'
//             }
//         }))
//         .pipe(dest('dist/js/'))
//     done();
//     src('js/**.min.js').pipe(dest('dist/js/'))
// }
// function html(done) {
//     src('**.html')
//     .pipe(htmlmin({ collapseWhitespace: true }))
//     .pipe(dest('dist/'));
//     done();
// }
// function php(done) {
//     src(['**.php'])
//         .pipe(dest('dist/'));
//     src('phpmailer/**/**')
//         .pipe(dest('dist/phpmailer/'));

//     done();
// }
// function fonts(done) {
//     src('fonts/**/**')
//     .pipe(dest('dist/fonts'));
//     done();
// }
// function imagemin(done) {
//     src('img/**/**.{png,jpg,jpeg}')
//         .pipe(tinypng({ key: 'kk7H74701gt4BFHQn4rFGK0r5xlb0vXb', }))
//         .pipe(dest('dist/img/'))
//     src('img/**/*.svg')
//         .pipe(dest('dist/img/')) 
//     done();
// }


// exports.serve = bs;
// exports.build = series(buildCSS, buildJS, html, php, fonts, imagemin);

const { src, dest, watch, series } = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const htmlmin = require('gulp-htmlmin');
const tinypng = require('gulp-tinypng-compress');


// Static server
function bs() {
    serveSass();
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    watch("./*.html").on('change', browserSync.reload);
    watch("./sass/**/*.sass", serveSass);
    watch("./sass/**/*.scss", serveSass);
    watch("./js/*.js").on('change', browserSync.reload);

};

// Compile sass into CSS & auto-inject into browsers
function serveSass() {
    return src("./sass/**/*.sass", "./sass/**/*.scss")
        .pipe(sass())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(dest("./css"))
        .pipe(browserSync.stream());

};
function buildCSS(done) {
    src([
        'css/animate.css',
        'css/swiper.min.css',
        'css/style.css'
    ])
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(concat('styles.css'))
        .pipe(minify({
            ext: {
                min: '.min.css'
            },
            preserveComments: true
        }))
        .pipe(dest('css/'))
        .pipe(dest('dist/css/'));
    done();
}
function buildJS(done) {
    src([
        'js/jquery-3.4.1.min.js',
        'js/swiper.min.js',
        'js/wow.min.js',
        'js/jquery.validate.min.js',
        'js/jquery.mask.min.js',
        'js/main.js'
    ])
        .pipe(concat('script.js'))
        .pipe(minify({
            ext: {
                min: '.min.js'
            },
            preserveComments: true
        }))
        .pipe(dest('dist/js/'))
        .pipe(dest('js/'))
    done();
}
// function buildJS(done) {
//     src(['js/.js', '!js/.min.js']) //завернули в массив и сказали, что уже минимизированные файлы брать не надо /
//         .pipe(minify({ext:{  //настройка из плагина, чтобы не переименовывал файлы, кот. в него поступают /
//               min:'.js'
//             }
//         }))
//       .pipe(dest('dist/js/'));
//     src('js/**.min.js').pipe(dest('dist/js/'));  //добавляем все файлы min.js в папку тоже, т.к. готовим все файлы к публикации  
//     done();
// }
function html(done) {
    src('**.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest('dist/'));
    done();
}
function php(done) {
    src(['**.php'])
        .pipe(dest('dist/'));
    src('phpmailer/**/**')
        .pipe(dest('dist/phpmailer/'));

    done();
}
function fonts(done) {
    src('fonts/**/**')
        .pipe(dest('dist/fonts'));
    done();
}
function imagemin(done) {
    src('img/**/**.{png,jpg,jpeg}')
        .pipe(tinypng({ key: 'kk7H74701gt4BFHQn4rFGK0r5xlb0vXb', }))
        .pipe(dest('dist/img/'))
    src('img/**/*.svg')
        .pipe(dest('dist/img/'))
    done();
}


exports.serve = bs;
exports.build = series(buildCSS, buildJS, html, php, fonts, imagemin);