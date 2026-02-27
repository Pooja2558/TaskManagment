
(function () {
    'use strict';


    angular
        .module('app')
        .service('TaskService', function ($http) {
            var baseUrl = 'http://localhost:8080/tasks'; // make sure backend is running

            this.getTasks = function () {
                return $http.get(baseUrl).then(function (res) {
                    return res.data;
                });
            };

            this.createTask = function (task) {
                console.log("addTask task service 123");

                return $http.post(baseUrl, task).then(function (res) {
                    return res.data;
                });
            };

            this.deleteTask = function(taskId) {
                return $http.delete(baseUrl + '/' + taskId);
            };

            this.updateTask = function(task) {
                return $http.put(baseUrl + '/' + task.id, task)
                    .then(function(res) {
                        return res.data;
                    });
            };
        });
})();

