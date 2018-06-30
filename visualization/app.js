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
	if(parameterValue === "")
	{
		$http.get('http://localhost:5984/testdb/1090ea098e2b0cdb136a7512a4000019').success(function(data)
		{
			$scope.valueRange = [0,100];
			$scope.colorRange = ["#F03B20", "#FFEDA0"];
			$scope.dimension = 800;
			$scope.mapWidth = 1240;
			$scope.descriptiveText = '';
			$scope.countryFillColor = "#aaa";
			$scope.countryBorderColor = "#fff";
			$scope.worldData = data["countries"];
		});
	}
	else
	{
	}
}]);