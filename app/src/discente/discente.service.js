/**
 * Created by jezreel on 17/10/16.
 */
(function (angular) {
    'use strict';
    angular.module('tccmeetings')
        .service('DiscenteSrv',DiscenteSrv);

    DiscenteSrv.$inject = ['GenericoRestSrv','SERVICE_PATH'];
    function DiscenteSrv(GenericoRestSrv,SERVICE_PATH){

        // Opcional Variavel
        // var promisse = ''

        var url = SERVICE_PATH.PRIVATE_PATH + '/discente';

        var service = {
            salvar: salvar,
            editar: editar,
            buscarId: buscarId,
            buscarAllAnonymous: buscarAllAnonymous,
            buscarAll: buscarAll,
            buscarFilter: buscarFilter,
            deletar: deletar
        };

        return service;

        function salvar(discente,callback){
            GenericoRestSrv.salvar(url,discente,callback);
        }

        function editar(discente,callback){
            GenericoRestSrv.editar(url,discente,callback);
        }

        function buscarId(){

        }

        function buscarAllAnonymous(callback){
            GenericoRestSrv.buscarAll(url+"/findAllAnonymous",callback);
        }

        function buscarAll(urlRequest,callback){
            GenericoRestSrv.buscarAll(url+urlRequest,callback);
        }

        function buscarFilter(urlFilter,callback) {
            GenericoRestSrv.buscarAll(url+urlFilter,callback);
        }

        function deletar(discente,callback){
            GenericoRestSrv.deletar(url,discente,callback);
        }

    }

})(angular);