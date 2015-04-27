angular.module('authService', [])

.factory('Auth', function($http, $q, AuthToken) {

	var authFactory = {};
	authFactory.login = function (username, password)
	{
		return $http.post()

	}
})