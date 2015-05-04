angular.module('storyService',[])

.factory ('Story', function($http){

	var storyFactory = {};

	storyFactory.create = function( storyData){
		return $http.post('/api', storyData)
	}

	storyFactory.getStory = function()
	{
		return $http.get('/api');
	}

	return storyFactory

})