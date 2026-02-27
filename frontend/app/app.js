(function() {
    'use strict';

    angular.module('app', ['ui.router'])
        .config(function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/tasks');

            $stateProvider
                .state('tasks', {
                    url: '/tasks',
                    templateUrl: 'app/tasks/tasks-list.html',
                    controller: 'TaskController as vm',
                    resolve: {
                        tasks: function(TaskService) {
                            return TaskService.getTasks();
                        }
                    }
                })
                .state('taskDetails', {
                    url: '/tasks/:id',
                    templateUrl: 'app/tasks/task-details.html',
                    controller: 'TaskDetailsController as vm',
                    resolve: {
                        task: function($stateParams, TaskService) {
                            return TaskService.getTask($stateParams.id);
                        }
                    }
                })
                .state('taskEdit', {
                    url: '/tasks/:id/edit',
                    templateUrl: 'app/tasks/task-edit.html',
                    controller: 'TaskController as vm',
                    resolve: {
                        task: function($stateParams, TaskService) {
                            return TaskService.getTask($stateParams.id);
                        }
                    }
                });
        });
})();