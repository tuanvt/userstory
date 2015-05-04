angular.module('storyService',[])

.factory ('Story', function($http){

	var storyFactory = {};

	storyFactory.createStory = function( storyData){
		return $http.post('/api', storyData)
	}

	storyFactory.getStory = function()
	{
		return $http.get('/api');
	}

	return storyFactory

})