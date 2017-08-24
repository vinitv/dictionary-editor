angular.module('plunker', ['ui.bootstrap']);
var ModalDemoCtrl = function($scope, $modal, $log, $http) {

    var ss = $('#selectSilo').val();
    var apiKey = $('#apiKey').val();
    var dikey = $('#udictionary').val();
    $scope.user = {
        dictionary_key: dikey,
        description: "Description goes here"
    };

    $scope.open = function() {
        $modal.open({
            templateUrl: 'myModalContent.html',
            backdrop: true,
            windowClass: 'modal',
            controller: function($scope, $modalInstance, $log) {
            $scope.data = {
                    nameudictionary:""
                };

                $scope.submit = function() {
                    $scope.data.nameudictionary=$('#nameudictionary').val();
                    //alert($scope.data.nameudictionary);
                    var markers = "dId=" + $scope.data.nameudictionary + "&reqType=create&apiKey=" + $('#apiKey').val();
                    $http({
                        method: 'POST',
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},  
                        url: "components/controller/poster.php",
                        data: markers
                    }).then(function(response) {
                        //$(".allresults").show();
                        $("#dikey").val($scope.data.nameudictionary);
                        $('#getAllChecks1').attr('disabled', false);
                        $modalInstance.dismiss('cancel');
                    }, function(response) {

                        $modalInstance.dismiss('cancel');
                    });
                    //$modalInstance.dismiss('cancel'); // dismiss(reason) - a method that can be used to dismiss a modal, passing a reason
                }
                $scope.cancel = function() {
                    $modalInstance.dismiss('cancel');
                };
            },
            resolve: {
                user: function() {
                    return $scope.user;
                }
            }
        }); //end of modal.open
    }; // end of scope.open function
};