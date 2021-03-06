
app.controller('MainController', function ($scope) {
 "ngInject";
  
  var widgetTemp = false;

  /**Widget dialog controll */

  function widgetSet(){
      if ( widgetTemp ){
        var width = angular.element( window ).width();
        angular.element('html, body').animate({ scrollTop: 0 }, 'fast');
        angular.element('body').css("overflow", "hidden"); 
        if ( width < 678 ){
            angular.element('#widget-container').css("width", "70%");
        } else{
            angular.element('#widget-container').css("width", "40%");
        }
      } else {
        angular.element('#widget-container').css("width", "0%");
        angular.element('body').css("overflow", "auto");        
      }
  }

  $scope.widget = function(con){
      
      if ( con ||  ( angular.element("#navbar-collapse-in").hasClass("in")  
            && angular.element("#navbar-collapse-in").hasClass("collapse"))){
        widgetTemp = false;
      } else {
        widgetTemp = !widgetTemp;
      }
      widgetSet();
  };

  //window height

  function getHeight(){
    var height = angular.element( window ).height();
    height = height/2-40;
    angular.element('#widget-top').css("top", height+'px');
    angular.element('#widget-button').css("top",height+65+'px');
    angular.element('#widget-bottom').css("top", height+65+64+'px');  
  }

  angular.element(document).ready(function() {
     getHeight();   
  });
  
  angular.element(window).resize(function() {
    widgetSet();
    getHeight();  
  });

  $scope.options = {
    chart: {
        type: 'discreteBarChart',
        height: 450,
        x: function(d){ return d.label; },
        y: function(d){ return d.value; },
        showValues: true,
        valueFormat: function(d){
            return d3.format(',.4f')(d);
        },
        transitionDuration: 500,
        xAxis: {
            axisLabel: 'X Axis'
        },
        yAxis: {
            axisLabel: 'Y Axis',
            axisLabelDistance: 30
        }
    }
 };

  $scope.data = [{
        key: "Cumulative Return",
        values: [
            { "label" : "A" , "value" : -29.765957771107 },
            { "label" : "B" , "value" : 0 },
            { "label" : "C" , "value" : 32.807804682612 },
            { "label" : "D" , "value" : 196.45946739256 },
            { "label" : "E" , "value" : 0.19434030906893 },
            { "label" : "F" , "value" : -98.079782601442 },
            { "label" : "G" , "value" : -13.925743130903 },
            { "label" : "H" , "value" : -5.1387322875705 }
        ]
    }];

});