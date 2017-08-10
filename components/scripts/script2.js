angular.module('plunker', ['ui.bootstrap']);
var ModalDemoCtrl = function ($scope, $modal, $log,$http) {
    $scope.user = {
        email: '',
        password: null,
    };

    $scope.open = function () {
        $modal.open({
            templateUrl: 'myModalContent.html', // loads the template
            backdrop: true, // setting backdrop allows us to close the modal window on clicking outside the modal window
            windowClass: 'modal', // windowClass - additional CSS class(es) to be added to a modal window template
            controller: function ($scope, $modalInstance, $log, user) {
                $scope.user = user;
                $scope.submit = function () {
                    $log.log('Submiting user info.'); // kinda console logs this statement
                    $log.log(user);
                    $http({
                    method: 'POST', 
                    url: 'https://mytesturl.com/apihit',
                    headers: {
                        "Content-type": undefined
                    }
                    , data: user
                }).then(function (response) {
                    console.log(response);
                   $modalInstance.dismiss('cancel'); 
                }, function (response) {
                    console.log('i am in error');
                   $modalInstance.dismiss('cancel'); 
                    });
                    //$modalInstance.dismiss('cancel'); // dismiss(reason) - a method that can be used to dismiss a modal, passing a reason
                }
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel'); 
                };
            },
            resolve: {
                user: function () {
                    return $scope.user;
                }
            }
        });//end of modal.open
    }; // end of scope.open function
};