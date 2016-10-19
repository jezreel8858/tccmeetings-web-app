'use strict';

angular.module('tccmeetings')
  .filter('formatPermission', function() {
    return function(input) {
      switch (input) {
        case 'ROLE_ADMIN':
          return 'Administrator';
        break;

        case 'ROLE_DOCENTE':
          return 'Docente';
        break;

        case 'ROLE_DISCENTE':
          return 'Discente';
          break;


        default:
          return 'Unknown';
        break;
      };
    };
  });
