app.controller('BarChartController', function ($scope) {
    "ngInject";

  $scope.labels = ['2006', '2007', '2008'];
  $scope.series = ['Series A', 'Series B'];

  $scope.data = [
    [65, 59, 80],
    [28, 48, 40]
  ];

  $scope.colors = ['#2196F3','#FF9800'];
  
  $scope.datasetOverride = [
            {
                fill: true,
                backgroundColor: "#2196F3"
            },
            {
                fill: true,
                backgroundColor: "#FF9800"
            }];

});