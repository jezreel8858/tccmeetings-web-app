/**
 * Created by jezreel on 17/10/16.
 */
// role.constants.js
(function (angular) {
    'use strict';
    angular.module('tccmeetings')
        .constant('ROLE',
            'ROLE_ADMIN',
            'ROLE_DOCENTE',
            'ROLE_DISCENTE'
        );
})(angular);