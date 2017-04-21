app.controller('PieChartController', function ($scope) {
    "ngInject";

    $scope.pie_chart_options = {
        chart: {
            type: 'pieChart',
            height: 220,
            showLabels: false,
            duration: 500,
            labelThreshold: 0.01,
            labelSunbeamLayout: false
        }
    };

    $scope.pie_chart_data = [
        {
            key: "One",
            y: 5
        },
        {
            key: "Two",
            y: 2
        },
        {
            key: "Three",
            y: 9
        }
    ];
});