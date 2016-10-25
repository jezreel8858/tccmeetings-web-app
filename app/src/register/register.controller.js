(function (angular) {
    'use strict';

    angular.module('tccmeetings')
        .controller('RegisterCtrl', RegisterCtrl);

    RegisterCtrl.$inject = ['$location', '$q', '$timeout', 'ngNotify', 'DiscenteSrv', 'DocenteSrv', 'CursoSrv', 'SERVICE_PATH'];
    function RegisterCtrl($location, $q, $timeout, ngNotify, DiscenteSrv, DocenteSrv, CursoSrv, SERVICE_PATH) {
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
        vm.funcao = { name: "Docente" };
        vm.cursos = [];
        vm.docentes = [];
        vm.selectedCurso = {};

        vm.funcoes = [
            {name: "Docente"},
            {name: "Discente"}
        ];
        // Fim


        ////////////////////////////////////////////////////////////////////////////////////
        // Declarações de todas Funções do Controller
        vm.sendRegister         =   sendRegister;
        vm.show                 =   show;
        vm.listarCursos         =   listarCursos;
        vm.listarDocentes       =   listarDocentes;
        vm.querySearch          =   querySearch;
        vm.createFilterFor      =   createFilterFor;
        vm.clearCampos          =   clearCampos;

        // Fim


        ////////////////////////////////////////////////////////////////////////////////////

        // Declaração da Função do Cadastro de Usuarios

        function sendRegister() {
            if (vm.funcao.name === 'Docente') {
                DocenteSrv.salvar(vm.docente, function () {
                    $location.path("/login");
                    ngNotify.set('Cadastro realizado com Sucesso.', 'success');
                });
            } else if (vm.funcao.name === 'Discente') {

                vm.discente.name = vm.docente.name;
                vm.discente.email = vm.docente.email;
                vm.discente.password = vm.docente.password;
                vm.discente.docente.id = vm.selectedDocente.id;
                vm.discente.curso.id = vm.selectedCurso.id;

                DiscenteSrv.salvar(vm.discente, function () {
                    $location.path("/login");
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
            DocenteSrv.buscarAll("",function (docentes) {
                vm.docentes = docentes;
                angular.forEach(vm.docentes, function (docente) {
                    docente.name = angular.uppercase(docente.name);
                })
            });
        }

        function clearCampos() {
            vm.discente = {
                name: '',
                email: '',
                password: '',
                curso: {},
                disciplina: {},
                docente: {}
            };
            vm.docente = {
                name: '',
                email: '',
                password: ''
            };
            vm.funcao = {};
            vm.selectedCurso = '';
        }

        // Carregando as Entidades
        listarCursos();
        listarDocentes();

        // ******************************
        // Internal methods
        // ******************************

        function querySearch(query) {
            var results = query ? vm.docentes.filter(createFilterFor(query)) : vm.docentes;
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