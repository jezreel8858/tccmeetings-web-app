(
    function(){
        'use strict';

        angular.module('tccmeetings')
            .controller('LoginCtrl', LoginCtrl);

        LoginCtrl.$inject = ['LoginLogoutSrv'];
        function LoginCtrl(LoginLogoutSrv) {
            var vm = this;
            vm.login = function (email, password) {
                LoginLogoutSrv.login(email, password);
            };

            vm.pressEnter = pressEnter;

            function pressEnter(event){
                if(event.which === 13){
                    return true;
                }
            }

        }
    }
)();