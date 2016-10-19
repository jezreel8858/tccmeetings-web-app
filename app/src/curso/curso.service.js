/**
 * Created by jezreel on 17/10/16.
 */
(function (angular) {
    'use strict';
    angular.module('tccmeetings')
        .service('CursoSrv',CursoSrv);

    CursoSrv.$inject = ['GenericoRestSrv','SERVICE_PATH'];
    function CursoSrv(GenericoRestSrv,SERVICE_PATH){

        // Opcional Variavel
        // var promisse = ''

        var url = SERVICE_PATH.PRIVATE_PATH + '/curso';

        var service = {
            salvar: salvar,
            editar: editar,
            buscarId: buscarId,
            buscarAll: buscarAll,
            buscarFilter: buscarFilter,
            deletar: deletar
        };

        return service;

        function salvar(curso,callback){
            GenericoRestSrv.salvar(url,curso,callback);
        }

        function editar(curso,callback){
            GenericoRestSrv.editar(url,curso,callback);
        }

        function buscarId(){

        }

        function buscarAll(callback){
            GenericoRestSrv.buscarAll(url,callback);
        }

        function buscarFilter(urlFilter,callback) {
            GenericoRestSrv.buscarAll(url+urlFilter,callback);
        }

        function deletar(curso,callback){
            GenericoRestSrv.deletar(url,curso,callback);
        }

    }

})(angular);