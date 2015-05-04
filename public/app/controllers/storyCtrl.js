angular.module('storyCtrl',['storyService'])

	.controller('StoryController', function(Story))
	{
		var vm = this;

		Story.allStory().success(function(data){

			vm.stories = data;

		})

		vm.createStory - function() {
			vm.message = '';
			Story.create(vm.storyData)
				.success(function (data){

					// clear the form 
					vm.storyData = '';

					vm.message = data.message;
				})
		}

		vm.get
	}