function template(name) {
    return 'templates/' + name;
}

app.config(function ($routeProvider, $locationProvider) {
    "ngInject";
    $routeProvider.when('/dashboard', 
        {
            templateUrl: template('home.html'), 
            reloadOnSearch: false
        })
        .otherwise({ redirectTo: '/dashboard' });

    $locationProvider.html5Mode(true);  

}).run(function run($rootScope, $location, $window) {
    "ngInject";

    $rootScope.$on('$locationChangeStart', function (event, next, current) {

    });
});