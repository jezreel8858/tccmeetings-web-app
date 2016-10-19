/**
 * Created by jezreel on 13/10/16.
 */

(function (angular) {
    'use strict';

    angular.module('tccmeetings')
        .controller('DisciplinaCtrl', DisciplinaCtrl);

    DisciplinaCtrl.$inject = ['DisciplinaSrv', 'SessionSrv', 'ngNotify', '$mdDialog'];
    function DisciplinaCtrl(DisciplinaSrv, SessionSrv, ngNotify, $mdDialog) {

        var vm = this;

        // variaveis do escopo Disciplinas
        vm.entity = {};
        vm.disciplinas = [];

        // Filter Definição
        vm.filterColumn = 'Todos';
        vm.filterCampo = '';

        vm.columnDefs = [
            {
                displayName: 'Todos'
            },
            {
                displayName: 'Nome'
            }
        ];
        vm.selectColumnDefs = {};

        // Disciplina Service Funções
        vm.listar = listar;
        vm.deletar = deletar;
        vm.buscarFilter = buscarFilter;

        // Permissoes Service
        vm.permissao = permissao;

        // Disciplina Funções Locais
        vm.editDis = editDis;
        vm.renewEntity = renewEntity;


        function listar() {
            if(vm.filterColumn == 'Todos' || vm.filterCampo == ''){
                vm.renewEntity();
                DisciplinaSrv.buscarAll(function (listDisciplina) {
                    vm.disciplinas = listDisciplina;
                });
            } else {
                buscarFilter();
            }

        };

        function deletar(disciplina) {
            if (disciplina.id != '') {
                DisciplinaSrv.deletar(disciplina, function () {
                    listar();
                    ngNotify.set('Disciplina \'' + disciplina.nome + '\' removida com Sucesso.', 'success');
                });
            }
        };

        function buscarFilter() {
            var urlFilter = "/filter/" + vm.filterColumn + "/" + vm.filterCampo;
            DisciplinaSrv.buscarFilter(urlFilter,function (listDisciplina) {
                vm.disciplinas = listDisciplina;
            });
        };

        function permissao(authorities) {
            return SessionSrv.permissao(authorities);
        };

        function editDis(disciplina) {
            vm.entity = angular.copy(disciplina);
        };

        function renewEntity() {
            vm.entity = undefined;
        };

        listar();

        // Modal Material Angular
        vm.showForm = showForm;

        function showForm(title) {
            $mdDialog.show({
                controller: DialogController,
                controllerAs: 'vm',
                bindToController: true,
                templateUrl: 'src/disciplina/disciplina.form.html',
                clickOutsideToClose: true,
                locals: {
                    entity: angular.copy(vm.entity),
                    title: title,
                    DisciplinaSrv: DisciplinaSrv,
                }
            })
                .then(function (answer) {
                    vm.listar();
                }, function () {
                    vm.renewEntity();
                });
        };

        // Controller Modal
        function DialogController($mdDialog, entity, title, DisciplinaSrv) {
            var vm = this;

            vm.title = title;

            vm.entity = entity;

            vm.aplicar = aplicar;
            vm.cancel = cancel;
            vm.salvar = salvar;
            vm.editar = editar;


            function aplicar() {
                if (title === 'Cadastrar') {
                    vm.salvar();
                    $mdDialog.hide();
                } else if (title === 'Editar') {
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
})(angular);