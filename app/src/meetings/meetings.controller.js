/**
 * Created by jezreel on 05/10/16.
 */
(function () {
    'use strict';
    angular.module('tccmeetings')
        .controller('MeetingsCtrl', MeetingsCtrl);

    MeetingsCtrl.$inject = ['MeetingsSrv', 'DocenteSrv', '$mdDialog', 'SessionSrv', '$rootScope', 'ngNotify'];
    function MeetingsCtrl(MeetingsSrv, DocenteSrv, $mdDialog, SessionSrv, $rootScope, ngNotify) {

        var vm = this;

        vm.entity = {};
        vm.reunioes = [];

        // Filter Definição
        vm.filterColumn = 'Todos';
        vm.filterCampo = '';

        vm.columnDefs = [
            {
                displayName: 'Todos'
            },
            {
                displayName: 'Data'
            }
        ];
        vm.selectColumnDefs = {};

        // Permissoes Service
        vm.permissao = permissao;

        function permissao(authorities) {
            return SessionSrv.permissao(authorities);
        };

        // Reuniao Service Funções
        vm.listar = listar;
        vm.deletar = deletar;
        vm.buscarFilter = buscarFilter;


        // Disciplina Funções Locais
        vm.editReuniao = editReuniao;
        vm.renewEntity = renewEntity;

        function listar() {
            if(vm.filterColumn == 'Todos' || vm.filterCampo == ''){
                vm.renewEntity();
                MeetingsSrv.buscarAll(function (listReunioes) {
                    vm.reunioes = listReunioes;
                });
            } else {
                buscarFilter();
            }

        };

        function deletar(disciplina) {
            if (disciplina.id != '') {
                MeetingsSrv.deletar(reuniao, function () {
                    listar();
                    ngNotify.set('Reuniao removida com Sucesso.', 'success');
                });
            }
        };

        function buscarFilter() {
            var urlFilter = "/filter/" + vm.filterColumn + "/" + vm.filterCampo;
            MeetingsSrv.buscarFilter(urlFilter,function (listReunioes) {
                vm.reunioes = listReunioes;
            });
        };

        function editReuniao(reuniao) {
            vm.entity = angular.copy(reuniao);
        };

        function renewEntity() {
            vm.entity = undefined;
        };

        listar();



        //Modal Material Angular Usar para confirmação de edição e remoção
        vm.showForm = showForm;

        function showForm(title) {
            $mdDialog.show({
                controller: DialogController,
                controllerAs: 'vm',
                bindToController: true,
                templateUrl: 'src/meetings/meetings.form.html',
                clickOutsideToClose: true,
                locals: {
                    entity: angular.copy(vm.entity),
                    title: title,
                    MeetingsSrv: MeetingsSrv
                }
            })
                .then(function (answer) {
                    vm.listar();
                }, function () {
                    vm.renewEntity();
                });
        };

        //Controller Modal
        function DialogController($mdDialog, entity, title, MeetingsSrv) {
            var vm = this;

            vm.title = title;

            vm.entity = entity;

            vm.aplicar = aplicar;
            vm.cancel = cancel;
            vm.salvar = salvar;
            vm.editar = editar;


            function aplicar() {
                if (title === 'Cadastrar Reunião') {
                    vm.salvar();
                    $mdDialog.hide();
                } else if (title === 'Editar Reunião') {
                    vm.editar();
                    $mdDialog.hide();
                }
            };
            function cancel() {
                $mdDialog.cancel();
            };

            function salvar() {
                if (vm.entity != undefined) {
                    DisciplinaSrv.salvar(vm.entity, function (response) {
                        ngNotify.set('Disciplina \'' + vm.entity.nome + '\' cadastrada com Sucesso.', 'success');
                    });
                }
            };

            function editar() {
                if (vm.entity != undefined) {
                    DisciplinaSrv.editar(vm.entity, function (response) {
                        ngNotify.set('Disciplina \'' + vm.entity.nome + '\' alterada com Sucesso.', 'success');
                    });
                }
            };


        }


    }

})();

angular.module('MyApp', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])

    .controller('AppCtrl', function ($scope, $mdDialog) {
        $scope.status = '  ';
        $scope.customFullscreen = false;

        $scope.showAlert = function (ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            // Modal dialogs should fully cover application
            // to prevent interaction outside of dialog
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('This is an alert title')
                    .textContent('You can specify some description text in here.')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Got it!')
                    .targetEvent(ev)
            );
        };

        $scope.showConfirm = function (ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title('Would you like to delete your debt?')
                .textContent('All of the banks have agreed to forgive you your debts.')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Please do it!')
                .cancel('Sounds like a scam');

            $mdDialog.show(confirm).then(function () {
                $scope.status = 'You decided to get rid of your debt.';
            }, function () {
                $scope.status = 'You decided to keep your debt.';
            });
        };

        $scope.showPrompt = function (ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.prompt()
                .title('What would you name your dog?')
                .textContent('Bowser is a common name.')
                .placeholder('Dog name')
                .ariaLabel('Dog name')
                .initialValue('Buddy')
                .targetEvent(ev)
                .ok('Okay!')
                .cancel('I\'m a cat person');

            $mdDialog.show(confirm).then(function (result) {
                $scope.status = 'You decided to name your dog ' + result + '.';
            }, function () {
                $scope.status = 'You didn\'t name your dog.';
            });
        };

        $scope.showAdvanced = function (ev) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'dialog1.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
                .then(function (answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
        };

        $scope.showTabDialog = function (ev) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'tabDialog.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            })
                .then(function (answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function () {
                    $scope.status = 'You cancelled the dialog.';
                });
        };

        $scope.showPrerenderedDialog = function (ev) {
            $mdDialog.show({
                controller: DialogController,
                contentElement: '#myDialog',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        };

        function DialogController($scope, $mdDialog) {
            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.answer = function (answer) {
                $mdDialog.hide(answer);
            };
        }
    });