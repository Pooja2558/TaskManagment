(function () {
    'use strict';

    angular
        .module('app')
        .service('ApiService', function ($http) {
            var baseUrl = 'http://localhost:8080/tasks';

            this.getTasks = function () {
                return $http.get(baseUrl).then(function (res) {
                    return res.data;
                });
            };

            this.getTask = function (id) {
                return $http.get(baseUrl + '/' + id).then(function (res) {
                    return res.data;
                });
            };

            this.createTask = function (task) {
                console.log("addTask createTask");

                return $http.post(baseUrl, task).then(function (res) {
                    return res.data;
                });
            };

            // add updateTask, deleteTask similarly if needed
        });
})();