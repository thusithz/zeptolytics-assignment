var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var cache = require('gulp-cache');
var imagemin = require('gulp-imagemin');
var del = require('del');
var runSequence = require('run-sequence');
var plumber = require('gulp-plumber');
var shell = require('gulp-shell');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

/***************************************
*                                      *
*                                      *
*                                      *
*	            PATHS                  *
*                                      *
*                                      *
*                                      *
****************************************/
var STATIC_DIR = 'www/';
var DIST_DIR = 'www/dist/';
var VENDOR_DIR = 'www/lib/';

/***************************************
*                                      *
*                                      *
*                                      *
*	    DEVELOPMENT TASKS              *
*                                      *
*                                      *
*                                      *
*                                      *
***************************************/
// COMPILE SASS INTO CSS
gulp.task('sass', function() {
	return gulp.src(STATIC_DIR + 'scss/**/*.scss')
	.pipe(plumber())
	.pipe(sass({errLogToConsole: true}))
	.on('error', catchErr)
	.pipe(gulp.dest(STATIC_DIR + 'css'))
	// inject new CSS styles into the browser whenever
	// the sass task is run
	.pipe(browserSync.reload({
		stream: true
	}));
});

function catchErr(e) {
  console.log(e);
  this.emit('end');
}

gulp.task('css', function(){
	return gulp.src(STATIC_DIR + 'css/**/*.css')
	.pipe(browserSync.reload({
		stream: true
	}));
});
// RELOAD BROWSER WHENEVER SCSS, JS, CSS, OR HTML FILE IS SAVED
gulp.task('browserSync', function() {
	browserSync.init({
		port: 3333,
		server: {
			baseDir: STATIC_DIR
		},
		reloadOnRestart: false
	});
});

// Running 'gulp' will start up the browserSync server on port 3333.
// When you edit and save a SCSS, CSS, HTML, or JS file within the project, 
// it will automatically (1) re-compile SCSS into CSS and (2)reload the hcanged 
// file back into the browser.  
gulp.task('default', ['browserSync', 'sass', 'css'], function() {
	/**
	 	Run the 'sass' task whenever a Sass file in the 
	 	specified directory is saved.
	*/
	gulp.watch(STATIC_DIR + 'scss/**/*.scss', ['sass']);
	gulp.watch(STATIC_DIR + 'css/**/*.css', ['css']);
	gulp.watch(STATIC_DIR + '/**/*.html', browserSync.reload);
	gulp.watch(STATIC_DIR + 'js/**/*.js', browserSync.reload);
});

// Run NPM SPARREST API SERVER
gulp.task('sparrest', shell.task([
	'node ./node_modules/node-sparrest/node-sparrest.js'
]));

/*********************************************
*                                            *
*                                            *
*                                            *
*   		  PRODUCTION TASKS               *
*                                            *
*                                            *
*                                            *
*********************************************/
// MINIFY CSS AND JS FILES FOR PRODUCTION
gulp.task('useref', function() {
	return gulp.src(STATIC_DIR + '*.html')
	.pipe(useref())
	.pipe(gulpIf('*.js', uglify())) // minify js file using gulp-uglify
	.pipe(gulpIf('*.css', cssnano())) // minify css file using cssnano
	.pipe(gulp.dest(DIST_DIR));
});

//Override js minify function
gulp.task('scripts', function() {

  return gulp.src(STATIC_DIR + 'js/**/*.js')
    .pipe(concat('app.js'))
	//.pipe(uglify({keepBreaks: true}))
	.pipe(rename({
            suffix: '.min'
    }))
    .pipe(gulp.dest(DIST_DIR+ 'js/prod'));
});

//Verdor js minify function 
gulp.task('vendor_js', function() {

  return gulp.src([
	  VENDOR_DIR + 'angular/angular.js',
	  VENDOR_DIR + 'angular-jquery/dist/angular-jquery.js',
	  VENDOR_DIR + 'bootstrap-css/js/bootstrap.js',
	  VENDOR_DIR + 'angular-route/angular-route.js',
  ])
    .pipe(concat('vendor.js'))
	.pipe(uglify({keepBreaks: true}))
	.pipe(rename({
            suffix: '.min'
    }))
    .pipe(gulp.dest(DIST_DIR+ 'js/prod'));
});


// Bring business logic JS to dist (NOT MINIFIED)
gulp.task('businesslogic_js', function() {
	return gulp.src(STATIC_DIR + 'js/**/*.js')
	.pipe(gulp.dest(DIST_DIR + 'js'));
});
// Bring business logic CSS to dist (NOT MINIFIED)
gulp.task('businesslogic_css', function() {
	return gulp.src(STATIC_DIR + 'css/**/*.css')
	.pipe(gulp.dest(DIST_DIR + 'css'));
});

// COPY FONTS FOR PRODUCTION
gulp.task('fonts', function() {
	return gulp.src(STATIC_DIR + 'fonts/**/*')
	.pipe(gulp.dest(DIST_DIR + 'fonts'));
});
// DELETE DIST FOLDER
gulp.task('clean:dist', function() {
	return del.sync(DIST_DIR);
});

// Run 'gulp run-build-prod' to minify files and optimize
// images and fonts and prepare files for production.
gulp.task('build-prod', function(callback) {
	console.log("Building files sequentially...........");
	runSequence('clean:dist', 'sass', 'css','useref', 'businesslogic_js', 'businesslogic_css','fonts', 'scripts', 'vendor_js' , callback);
});
