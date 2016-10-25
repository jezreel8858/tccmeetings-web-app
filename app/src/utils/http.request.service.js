/**
 * Created by jezreel on 13/10/16.
 */
(function (angular) {
    'use strict';

    angular.module('tccmeetings')
        .service('HttpRequestSrv', HttpRequestSrv)


    HttpRequestSrv.$inject = ['$http', 'ngNotify'];
    function HttpRequestSrv($http, ngNotify) {

        var service = {
            parametros: parametros
        };

        return parametros;

        function parametros(url, method, data, callback) {
            var requestParams = {
                method: method,
                url: url,
                headers: {'Content-Type': 'application/json'},
                data: data
            };

            $http(requestParams).then(

                function successCallback(response) {
                    callback && callback(response.data);
                },
                function errorCallback(response) {
                    ngNotify.set('Error: ' + response.headers.Date + '.', 'error');
                });
        };
    }
})(angular);