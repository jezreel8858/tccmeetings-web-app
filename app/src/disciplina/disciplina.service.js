/**
 * Created by jezreel on 13/10/16.
 */
(function (angular) {
    'use strict';
    angular.module('tccmeetings')
        .service('DisciplinaSrv',DisciplinaSrv);

    DisciplinaSrv.$inject = ['GenericoRestSrv','SERVICE_PATH'];
    function DisciplinaSrv(GenericoRestSrv,SERVICE_PATH){

        // Opcional Variavel
        // var promisse = ''

        var url = SERVICE_PATH.PRIVATE_PATH + '/disciplina';

        var service = {
            salvar: salvar,
            editar: editar,
            buscarId: buscarId,
            buscarAll: buscarAll,
            buscarFilter: buscarFilter,
            deletar: deletar
        };

        return service;

        function salvar(disciplina,callback){
            GenericoRestSrv.salvar(url,disciplina,callback);
        }

        function editar(disciplina,callback){
            GenericoRestSrv.editar(url,disciplina,callback);
        }

        function buscarId(){

        }

        function buscarAll(callback){
            GenericoRestSrv.buscarAll(url,callback);
        }

        function buscarFilter(urlFilter,callback) {
            GenericoRestSrv.buscarAll(url+urlFilter,callback);
        }

        function deletar(disciplina,callback){
            GenericoRestSrv.deletar(url,disciplina,callback);
        }

    }

})(angular);