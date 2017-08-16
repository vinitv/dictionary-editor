var DEditor = angular.module("DEditor", ['ngResource', 'ui.bootstrap', 'ngSanitize']);

DEditor.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
}]);

DEditor.controller("DEditorCtrl", function($scope) {
    $scope.dkey = "Vinit Varghese";
});



DEditor.controller("KeyValCtrl", ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
    $scope.dictionarydata = [];



    $scope.sendpost = function() {
        var data = "aa";
        var ss = $('#selectSilo').val();
        $http.get("https://api-wpm" + ss + ".apicasystem.com/v3/scenarios/proxysniffer/dictionaries/" + $scope.dikey + "?auth_ticket=" + $scope.apiKey)

            .then(function(data, status) {
                //$scope.hello = data;
                var result = data.data;
                $scope.dictionarydata = [];
                $scope.dkey = '';
                $scope.dvalue = '';
                $.each(result, function(k, v) {

                    $scope.dictionarydata.push({ 'dkey': k, 'dvalue': v });
                });
                $scope.addStatus("Dictionary Loaded Successfully!","success", 3000);
            })
            .catch(function(data) {
                console.log(data);
                if (data.status == 404) {
                    $scope.addStatus(data.data.Message,"danger", 3000);

                } else {
                    $scope.addStatus(data.data,"danger", 3000);
                }
            });
    };


    $scope.addRow = function() {
        $scope.statusmessage = '';
        var mindex = $scope.dictionarydata.findIndex(item => item.dkey === $scope.dkey);
        if (mindex === -1) {

            $scope.dictionarydata.push({ 'dkey': $scope.dkey, 'dvalue': $scope.dvalue });
            $scope.dkey = '';
            $scope.dvalue = '';
        } else {
            $scope.addStatus("Key '" + $scope.dkey + "' already exists in the dictionary", "warning", 4500);
        }
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


    $scope.addStatus = function(statusmessage, statustype, statustimer) {
        $scope.statusmessage = "<div style='width:300px;' class='alert alert-" + statustype + "' role='alert'>" + statusmessage + "</div>";
        $timeout(function() {
            $scope.statusmessage = '';
        }, statustimer);
    };


    $scope.editRow = function(dkey) {
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
        console.log($scope.dictionarydata[index].dkey);
        $scope.dkey = $scope.dictionarydata[index].dkey;
        $scope.dvalue = $scope.dictionarydata[index].dvalue;
    };


}]);