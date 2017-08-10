var DEditor = angular.module("DEditor", ['ngResource', 'ui.bootstrap']);

    DEditor.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
    }]);

    DEditor.controller("DEditorCtrl", function($scope) {
        $scope.dkey = "Vinit Varghese";
    });



    DEditor.controller("KeyValCtrl", ['$scope', '$http', function($scope, $http) {
        $scope.dictionarydata = [{
                'dkey': 'Infosys Technologies',
                'dvalue': 125000
            },
            {
                'dkey': 'Cognizant Technologies',
                'dvalue': 100000
            },
            {
                'dkey': 'Wipro',
                'dvalue': 115000
            },
            {
                'dkey': 'Tata Consultancy Services (TCS)',
                'dvalue': 150000
            },
        ];


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

    var helloAjaxApp = angular.module("helloAjaxApp", ['ui.bootstrap']);

    helloAjaxApp.controller("KeyValCtrl", ['$scope', '$http', function($scope, $http) {
        $scope.dictionarydata = [{
                'dkey': 'Infosys Technologies',
                'dvalue': 125000
            },
            {
                'dkey': 'Cognizant Technologies',
                'dvalue': 100000
            },
            {
                'dkey': 'Wipro',
                'dvalue': 115000
            },
            {
                'dkey': 'Tata Consultancy Services (TCS)',
                'dvalue': 150000
            },
        ];

        $scope.addRowAsyncAsJSON = function() {
            $scope.dictionarydata.push({ 'dkey': $scope.dkey, 'dvalue': $scope.dvalue, 'headoffice': $scope.headoffice });
            // Writing it to the server
            //		
            var dataObj = {
                dkey: $scope.dkey,
                dvalue: $scope.dvalue
            };
            var res = $http.post('/savecompany_json', dataObj);
            res.success(function(data, status, headers, config) {
                $scope.message = data;
            });
            res.error(function(data, status, headers, config) {
                alert("failure message: " + JSON.stringify({ data: data }));
            });
            // Making the fields empty
            //
            $scope.dkey = '';
            $scope.dvalue = '';

        };
    }]);