app.controller('LineChartController', function ($scope) {
    "ngInject";

  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40]
  ];

  $scope.onClick = function (points, evt) {
    
  };

  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
  $scope.options = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        },
        {
          id: 'y-axis-2',
          type: 'linear',
          display: false,
          position: 'right'
        }
      ]
    }
  };
});