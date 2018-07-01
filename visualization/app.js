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

        $http.get('http://localhost:5984/event_code_' + $scope.topicInput + '/_all_docs?include_docs=true').success(function(data)
        {
            $scope.allDataOfOneEvent = data['rows'];
            $scope.dataEventCounter = data['rows'].length - 1;

            // $scope.worldData = data['rows'][0]['doc']["countries"];
            $scope.worldData = data['rows'][$scope.dataEventCounter]['doc']["countries"];
            $scope.currentData = data['rows'][$scope.dataEventCounter]['doc'];

            $scope.doRerender();

        });
        // Update topic
        console.log($scope.topicInput);
    };

    $scope.possibleEvents = ["Type 1", "Type 2", "Type 3"];


    // Trending topics
    $http.get('http://localhost:5984/all_topics/_all_docs?include_docs=true').success(function(data)
    {
        $scope.allTrendingTopicsAllDays = data['rows'];

        tmpTopic = data['rows'][$scope.allTrendingTopicsAllDays.length - 1]['doc']['topics'];
        $scope.setTopic(tmpTopic)

    });
    $scope.allTrendingTopicsAllDays = [];
    // $scope.allTrendingTopics = ["Topic one", "Topic two", "Topic three"];


    $scope.setTopic = function(topic) {
        $scope.allTrendingTopics = [];
        for (i = 0; i < topic .length; i++) {
            $scope.allTrendingTopics.push(topic[i]['value']);

        }
    };

    $scope.getTopicByDay = function(day) {
     $scope.allTrendingTopicsAllDays.forEach(function (topicday) {
         if (topicday['doc']['date'] == day) {
             $scope.setTopic(topicday['doc']['topics'])
         }

     })

    };

    // Date picker
    $scope.before = function() {
        if ($scope.dataEventCounter > 0) {
            $scope.dataEventCounter = $scope.dataEventCounter - 1;
            $scope.worldData = $scope.allDataOfOneEvent[$scope.dataEventCounter]['doc']["countries"];
            $scope.currentData = $scope.allDataOfOneEvent[$scope.dataEventCounter]['doc'];

            $scope.getTopicByDay($scope.currentData['date']);

            $scope.doRerender();
        }
    };

    $scope.next = function() {
        if ($scope.dataEventCounter < $scope.allDataOfOneEvent.length - 1) {
            $scope.dataEventCounter = $scope.dataEventCounter + 1;
            $scope.worldData = $scope.allDataOfOneEvent[$scope.dataEventCounter]['doc']["countries"];
            $scope.currentData = $scope.allDataOfOneEvent[$scope.dataEventCounter]['doc'];

            $scope.getTopicByDay($scope.currentData['date']);
            $scope.doRerender();
        }
    };

}]);
