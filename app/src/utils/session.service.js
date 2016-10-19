/**
 * Created by jezreel on 13/10/16.
 */
(function (angular) {
    'use strict';

    angular.module('tccmeetings')
        .service('SessionSrv',SessionSrv);

    SessionSrv.$inject = ['$rootScope'];
    function SessionSrv($rootScope) {

        var service = {
            permissao: permissao
        };

        return service;

        function permissao(authorities) {
            var isPermission = false;

            $rootScope.authDetails.permissions.forEach(function (permission) {

                authorities.forEach(function (authority) {
                    if (permission.authority === authority) {
                        isPermission = true;
                    }
                });
            });
            return isPermission;
        }
    }
})(angular);