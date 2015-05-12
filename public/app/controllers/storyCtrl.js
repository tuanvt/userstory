angular.module('storyCtrl',['storyService'])

	.controller('StoryController', function(Story, socketio)
	{
		var vm = this;

		Story.allStory().success(function(data){

			vm.stories = data;


		})

		vm.create = function(){
			vm.message = '';
			console.log(vm.storyData);
			Story.create(vm.storyData)
				.success(function (data){

					// clear the form
					vm.storyData = '';

					vm.message = data.message;


				});
		}

		socketio.on('story', function (data){
			vm.stories.push(data);
		});




	})
  .controller('AllStoriesController', function(stories, socketio){
    var vm = this;

    vm.stories = stories.data;

    socketio.on('story', function(data){
      vm.stories.push(data);
    })

  });
