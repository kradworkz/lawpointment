const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */


mix.js('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css')
   // .sass('resources/sass/vertical.scss', 'public/css')
   .sass('resources/sass/horizontal.scss', 'public/css')
   .sass('resources/sass/frontend.scss', 'public/css')
//    .scripts([
//       'public/bower_components/popper.js/js/popper.min.js',
//       'public/assets/pages/waves/js/waves.min.js',
//       'public/bower_components/jquery-slimscroll/js/jquery.slimscroll.js',
//       'public/assets/pages/chart/float/jquery.flot.js',
//       'public/assets/pages/chart/float/jquery.flot.categories.js',
//       'public/assets/pages/chart/float/curvedLines.js',
//       'public/assets/pages/chart/float/jquery.flot.tooltip.min.js',
//       'public/bower_components/chartist/js/chartist.js',
//       'public/assets/pages/widget/amchart/amcharts.js',
//       'public/assets/pages/widget/amchart/serial.js',
//       'public/assets/pages/widget/amchart/light.js',
//       'public/assets/js/pcoded.min.js',
//       'public/assets/js/vertical/vertical-layout.min.js',
//       'public/assets/pages/dashboard/custom-dashboard.min.js',
//       'public/assets/js/script.min.js'
//   ], 'public/js/vertical.js')
  .scripts([
      'public/bower_components/popper.js/js/popper.min.js',
      'public/assets/pages/waves/js/waves.min.js',
      'public/bower_components/jquery-slimscroll/js/jquery.slimscroll.js',
      'public/bower_components/modernizr/js/modernizr.js',
      'public/bower_components/modernizr/js/css-scrollbars.js',
      'public/assets/pages/prism/custom-prism.js',
      'public/assets/pages/chart/float/jquery.flot.js',
      // 'public/assets/pages/chart/float/jquery.flot.categories.js',
      // 'public/assets/pages/chart/float/curvedLines.js',
      // 'public/assets/pages/chart/float/jquery.flot.tooltip.min.js',
      // 'public/bower_components/chartist/js/chartist.js',
      // 'public/assets/pages/widget/amchart/amcharts.js',
      // 'public/assets/pages/widget/amchart/serial.js',
      // 'public/assets/pages/widget/amchart/light.js',
      'public/bower_components/stroll/js/stroll.js',
      'public/assets/pages/list-scroll/list-custom.js',
      'public/assets/js/pcoded.min.js',
      'public/assets/js/vertical/menu/menu-hori-fixed.js',
      'public/assets/js/jquery.mCustomScrollbar.concat.min.js',
      'public/assets/js/vertical/horizontal-layout.min.js',
      'public/assets/js/script.min.js',
   ], 'public/js/horizontal.js')
   .scripts([
      'public/frontend/js/jquery-2.2.4.min.js',
      'public/frontend/js/common_scripts.min.js',
      'public/frontend/js/functions.js',
   ], 'public/js/frontend.js')
