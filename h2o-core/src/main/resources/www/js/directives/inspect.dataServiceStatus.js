// Generated by CoffeeScript 1.5.0
(function() {
  var module;

  module = angular.module('h2o.directives.inspect');

  module.directive("dataservicestatus", function(InspectDataService) {
    return {
      restrict: "A",
      link: function(scope, element, attrs) {
        var elementClass, elementText, jqElement, updateElement;
        jqElement = $(element);
        elementClass = function() {
          if (InspectDataService.status === HTTP_STATUS.ok) {
            return "ok";
          }
          if (InspectDataService.status === HTTP_STATUS.loading) {
            return "loading";
          }
          if (InspectDataService.status === HTTP_STATUS.error) {
            return "error";
          }
          return "";
        };
        elementText = function() {
          var miliseconds, seconds;
          if (InspectDataService.status === HTTP_STATUS.ok) {
            miliseconds = InspectDataService.meta.processingTime;
            seconds = miliseconds / 1000.0;
            if (miliseconds < 5000) {
              return "Produced in " + (seconds.toFixed(3)) + " sec.";
            } else {
              return "Produced in " + (moment.duration(miliseconds).humanize()) + ".";
            }
          }
          if (InspectDataService.status === HTTP_STATUS.loading) {
            return "Loading...";
          }
          if (InspectDataService.status === HTTP_STATUS.error) {
            return "" + InspectDataService.error;
          }
          return "";
        };
        updateElement = function() {
          jqElement.removeClass('ok').removeClass('loading').removeClass('error');
          jqElement.addClass(elementClass());
          return jqElement.html("<div class=\"message\">" + (elementText()));
        };
        scope.$watch('InspectDataService.meta', updateElement);
        scope.$watch('InspectDataService.error', updateElement);
        return scope.$watch('InspectDataService.status', updateElement);
      }
    };
  });

}).call(this);
