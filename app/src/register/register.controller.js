(function (angular) {
    'use strict';

    angular.module('tccmeetings')
        .controller('RegisterCtrl', RegisterCtrl);

    RegisterCtrl.$inject = ['$q', '$timeout', 'ngNotify', 'DiscenteSrv', 'DocenteSrv', 'CursoSrv', 'SERVICE_PATH'];
    function RegisterCtrl($q, $timeout, ngNotify, DiscenteSrv, DocenteSrv, CursoSrv, SERVICE_PATH) {
        var vm = this;

        // Declaração de Usuarios
        vm.docente = {
            name: '',
            email: '',
            password: ''
        };

        vm.discente = {
            name: '',
            email: '',
            password: '',
            curso: {},
            disciplina: {},
            docente: {}
        };
        // Fim

        // Declarações de Variaveis
        vm.funcao = {   name: "Docente" };
        vm.cursos = [];
        vm.docentes = [];
        vm.selectedCurso = {};

        vm.funcoes = [
            {name: "Docente"},
            {name: "Discente"}
        ];
        // Fim


        vm.userClear = {
            name: '',
            email: '',
            password: ''
        };
        vm.discenteClear = {
            name: '',
            email: '',
            password: '',
            curso: {},
            disciplina: {},
            docente: {}
        };





        ////////////////////////////////////////////////////////////////////////////////////
        // Declarações de todas Funções do Controller
        vm.sendRegister = sendRegister;
        vm.show = show;
        vm.listarCursos = listarCursos;
        vm.listarDocentes = listarDocentes;
        vm.querySearch = querySearch;

        // Fim


        ////////////////////////////////////////////////////////////////////////////////////

        // Declaração da Função do Cadastro de Usuarios

        function sendRegister() {
            if (vm.funcao.name === 'Docente') {
                DocenteSrv.salvar(vm.docente, function () {
                    ngNotify.set('Cadastro realizado com Sucesso.', 'success');
                });
            } else if (vm.funcao.name === 'Discente') {
                vm.discente.name = vm.docente.name;
                vm.discente.email = vm.docente.email;
                vm.discente.password = vm.docente.password;
                vm.discente.docente.id = vm.selectedDocente.id;
                vm.discente.curso.id = vm.selectedCurso.id;
                DiscenteSrv.salvar(vm.discente, function () {
                    ngNotify.set('Cadastro realizado com Sucesso.', 'success');
                })
            }
        }


        function show() {
            if (vm.funcao.name == 'Discente') {
                return true;
            }
            return false;
        }

        function listarCursos() {
            CursoSrv.buscarAll(function (cursos) {
                vm.cursos = cursos;
            });
        }

        function listarDocentes() {
            DocenteSrv.buscarAllAnonymous(function (docentes) {
                vm.docentes = docentes;
                angular.forEach(vm.docentes, function (docente) {
                    docente.name = angular.uppercase(docente.name);
                })
            });
        }

        // Carregando as Entidades
        listarCursos();
        listarDocentes();

        // ******************************
        // Internal methods
        // ******************************

        function querySearch(query) {
            var results = query ? vm.states.filter(createFilterFor(query)) : vm.states;
            var deferred = $q.defer();
            $timeout(function () {
                deferred.resolve(results);
            }, Math.random() * 3000, false);
            return deferred.promise;
        }

        function createFilterFor(query) {
            var uppercaseQuery = angular.uppercase(query);

            return function filterFn(state) {
                return (state.name.indexOf(uppercaseQuery) === 0);
            };
        }

    }


})(angular);