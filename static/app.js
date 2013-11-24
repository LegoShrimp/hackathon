(function (){
	var app = angular.module('getStuffDone',['ngRoute']);
	
	app.config(function($routeProvider){
		$routeProvider
			.when("/",
				{
					templateUrl:"/views/login.html"
				})
			.when("/room",
				{
					controller:"boardControl",
					templateUrl:"/views/room.html"
				})

			.otherwise(
				{
					redirectTo:"/"
				});
	});

	app.factory('simpleFact', function(){
		var customers = [
			{name:"manny"},
			{name:"John"},
			{name:"Skyler"},
			{name:"Walt"},
			{name:"Jessie"}
		];
		
		return customers;
	});
	
	app.factory('socket',socketFunc);
	
	app.controller('boardControl', boardControl);
	app.controller('control', function($scope, simpleFact, socket ){
		$scope.customers = simpleFact;
		//socket.emit('hello');
	
	});
}());
