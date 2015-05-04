angular.module('MyApp',['appRoutes','mainCtrl','authService','userCtrl','userService','storyCtrl','storyService'])
.config(function($httpProvider){
	$httpProvider.interceptors.push('AuthInterceptor')
})
