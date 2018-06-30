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

		$scope.map = true;

		$scope.switchMap = function() {
			$scope.map = !$scope.map;
		}

		$scope.render = true;

		$http.get('http://localhost:5984/testdb/e83f2c41ef59980f21f3e4ba3c000df1').success(function(data)
			{
				$scope.worldData = data["countries"];
				$scope.render = false;

				setTimeout(function() {
					$scope.$apply(function () {
						$scope.render = true;
					});
				}, 200);
			});

		$scope.valueRange = [0,100];
		$scope.colorRange = ["#F03B20", "#FFEDA0"];
		$scope.dimension = 600;
		$scope.mapWidth = 900;
		$scope.descriptiveText = '';
		$scope.countryFillColor = "#aaa";
		$scope.countryBorderColor = "#fff";
		$scope.worldData = [];

	}]);
