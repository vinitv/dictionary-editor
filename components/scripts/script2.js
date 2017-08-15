angular.module('plunker', ['ui.bootstrap']);
var ModalDemoCtrl = function ($scope, $modal, $log,$http) {

    var ss=$('#selectSilo').val();
    var apiKey=$('#apiKey').val();
    var dikey=$('#udictionary').val();
    $scope.user = {
          dictionary_key: dikey,
          description: "Description goes here"
  };

   

    $scope.open = function () {
        $modal.open({
            templateUrl: 'myModalContent.html', 
            backdrop: true,
            windowClass: 'modal',
            controller: function ($scope, $modalInstance, $log, user) {

                
                $scope.submit = function () {
                    $http({
                    method: 'POST', 
                    url: "https://api-wpm"+$('#selectSilo').val()+".apicasystem.com/v3/scenarios/proxysniffer/dictionaries/?auth_ticket="+$('#apiKey').val(),
                    data: { "dictionary_key": $('#udictionary').val(),
                          "description": "Description goes here"}
                }).then(function (response) {
                  
                   $modalInstance.dismiss('cancel'); 
                }, function (response) {
                   
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