var DEditor = angular.module("DEditor", ['ngResource', 'ui.bootstrap']);

    DEditor.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
    }]);

    DEditor.controller("DEditorCtrl", function($scope) {
        $scope.dkey = "Vinit Varghese";
    });



    DEditor.controller("KeyValCtrl", ['$scope', '$http', function($scope, $http) {
        $scope.dictionarydata = [];



        $scope.sendpost = function() {
        var data = "aa";
        var ss=$('#selectSilo').val();
        $http.get("https://api-wpm"+ss+".apicasystem.com/v3/scenarios/proxysniffer/dictionaries/"+$scope.dikey+"?auth_ticket="+$scope.apiKey).success(function(data, status) {
            //$scope.hello = data;
            var result = data;
            $scope.dictionarydata=[];
                $scope.dkey = '';
                $scope.dvalue = '';
            $.each(result, function(k, v) {

                $scope.dictionarydata.push({ 'dkey': k, 'dvalue': v});
            });
            console.log(data);
        })
         };


        $scope.addRow = function() {
            $scope.dictionarydata.push({ 'dkey': $scope.dkey, 'dvalue': $scope.dvalue });
            $scope.dkey = '';
            $scope.dvalue = '';
        };

        $scope.addRowAsyncAsNV = function() {
            $scope.dictionarydata.push({ 'dkey': $scope.dkey, 'dvalue': $scope.dvalue });
            // Writing it to the server
            //		
            var data = 'dkey=' + $scope.dkey + '&dvalue=' + $scope.dvalue;
            $http.post('/savecompany', data)
                .success(function(data, status, headers, config) {
                    $scope.message = data;
                })
                .error(function(data, status, headers, config) {
                    alert("failure message: " + JSON.stringify({ data: data }));
                });
            // Making the fields empty
            //
            $scope.dkey = '';
            $scope.dvalue = '';
            $scope.headoffice = '';
        };

        $scope.removeRow = function(dkey) {
            var index = -1;
            var comArr = eval($scope.dictionarydata);
            for (var i = 0; i < comArr.length; i++) {
                if (comArr[i].dkey === dkey) {
                    index = i;
                    break;
                }
            }
            if (index === -1) {
                alert("Something gone wrong");
            }
            $scope.dictionarydata.splice(index, 1);
        };


    }]);

