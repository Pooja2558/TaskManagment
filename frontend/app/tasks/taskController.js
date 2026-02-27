(function () {
    'use strict';

    angular
        .module('app')
        .controller('TaskController', function (TaskService) {
            var vm = this;

            vm.tasks = [];
            vm.newTask = { status: 'OPEN' }; // default status

            // Load tasks from backend
            vm.loadTasks = function () {
                TaskService.getTasks().then(function (data) {
                    vm.tasks = data;
                }, function (error) {
                    console.error('Error loading tasks', error);
                });
            };


// Delete task
            vm.deleteTask = function(task) {
                if (confirm('Are you sure you want to delete this task?')) {
                    TaskService.deleteTask(task.id).then(function() {
                        vm.tasks = vm.tasks.filter(t => t.id !== task.id);
                    }, function(error) {
                        console.error('Error deleting task', error);
                    });
                }
            };


            vm.isEditing = false;

// Load the task into form for editing
            vm.editTask = function(task) {
                vm.newTask = angular.copy(task); // populate form
                vm.isEditing = true; // flag that we're editing
            };
            

            vm.errorMessages = null;
            vm.showErrorModal = false;

            vm.closeErrorModal = function() {
                vm.showErrorModal = false;
            };
            vm.addTask = function () {
                if (!vm.newTask.title) return; // Prevent empty titles

                if (vm.isEditing) {
                    // Update existing task
                    TaskService.updateTask(vm.newTask).then(function (updatedTask) {
                        // Update task in the list
                        for (var i = 0; i < vm.tasks.length; i++) {
                            if (vm.tasks[i].id === updatedTask.id) {
                                vm.tasks[i] = updatedTask;
                                break;
                            }
                        }
                        vm.newTask = { status: 'OPEN' }; // Reset form
                        vm.isEditing = false;           // Exit editing mode
                        vm.errorMessages = null;        // Clear any previous errors
                    }, function (error) {
                        // Show error modal
                        vm.errorMessages = error.data.message || { general: "Server Error" };
                        vm.showErrorModal = true;
                    });
                } else {
                    // Add new task
                    TaskService.createTask(vm.newTask).then(function (createdTask) {
                        vm.tasks.push(createdTask);       // Add to list
                        vm.newTask = { status: 'OPEN' };  // Reset form
                        vm.errorMessages = null;          // Clear any previous errors
                    }, function (error) {
                        // Show error modal
                        vm.errorMessages = error.data.message || { general: "Server Error" };
                        vm.showErrorModal = true;
                    });
                }
            };

            vm.loadTasks();
        });



})();

