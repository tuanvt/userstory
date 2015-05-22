angular.module('MyApp',['appRoutes','mainCtrl','authService','userCtrl','userService','storyCtrl','storyService','reverseDirective'])
.config(function($httpProvider){
	$httpProvider.interceptors.push('AuthInterceptor')
})
