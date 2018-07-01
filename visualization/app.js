parameterName  = "event";
parameterValue = "";

location.search.substr(1).split("&").forEach(function (item)
{
    tmp = item.split("=");

    if (tmp[0] === parameterName)
    {
        parameterValue = decodeURIComponent(tmp[1]);
    }
});

var myApp = angular.module('myApp', ['angular-maps']);

myApp.controller('Ctrl', ['$scope', '$http', function($scope, $http)
{

    $scope.allDataOfOneEvent = [];
    $scope.dataEventCounter = 0;
    $scope.currentData = {};



    // Map operations
    $scope.map = true;

    $scope.switchMap = function() {
        $scope.map = !$scope.map;
    };

    $scope.render = true;

    $http.get('http://localhost:5984/event_code_020/_all_docs?include_docs=true').success(function(data)
    {
        $scope.allDataOfOneEvent = data['rows'];
        $scope.dataEventCounter = data['rows'].length - 1;

        // $scope.worldData = data['rows'][0]['doc']["countries"];
        $scope.worldData = data['rows'][$scope.dataEventCounter]['doc']["countries"];
        $scope.currentData = data['rows'][$scope.dataEventCounter]['doc'];

        $scope.doRerender();

    });

    $scope.doRerender = function() {
        $scope.render = false;
        setTimeout(function() {
            $scope.$apply(function () {
                $scope.render = true;
            });
        }, 200);
    }

    $scope.valueRange = [-5,5];
    $scope.colorRange = ["#F03B20", "#FFEDA0"];
    $scope.dimension = 600;
    $scope.mapWidth = 900;
    $scope.descriptiveText = '';
    $scope.countryFillColor = "#aaa";
    $scope.countryBorderColor = "#fff";
    $scope.worldData = [];

    // Enter an event
    $scope.topicInput = "";


    $scope.sendTopic = function () {
        // Update topic
        console.log($scope.topicInput);
    };

    $scope.possibleEvents = ["Type 1", "Type 2", "Type 3"];


    // Trending topics
    $scope.allTrendingTopics = ["Topic one", "Topic two", "Topic three"];

    // Date picker
    $scope.before = function() {
        if ($scope.dataEventCounter > 0) {
            $scope.dataEventCounter = $scope.dataEventCounter - 1;
            $scope.worldData = $scope.allDataOfOneEvent[$scope.dataEventCounter]['doc']["countries"];
            $scope.currentData = $scope.allDataOfOneEvent[$scope.dataEventCounter]['doc'];

            $scope.doRerender();
        }
    };

    $scope.next = function() {
        if ($scope.dataEventCounter < $scope.allDataOfOneEvent.length - 1) {
            $scope.dataEventCounter = $scope.dataEventCounter + 1;
            $scope.worldData = $scope.allDataOfOneEvent[$scope.dataEventCounter]['doc']["countries"];
            $scope.currentData = $scope.allDataOfOneEvent[$scope.dataEventCounter]['doc'];
            $scope.doRerender();
        }

    };

}]);
