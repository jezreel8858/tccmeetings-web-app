/**
 * Created by jezreel on 17/10/16.
 */
(function (angular) {
    'use strict';
    angular.module('tccmeetings')
        .service('DocenteSrv',DocenteSrv);

    DocenteSrv.$inject = ['GenericoRestSrv','SERVICE_PATH'];
    function DocenteSrv(GenericoRestSrv,SERVICE_PATH){

        // Opcional Variavel
        // var promisse = ''

        var url = SERVICE_PATH.PRIVATE_PATH + '/docente';

        var service = {
            salvar: salvar,
            editar: editar,
            buscarId: buscarId,
            buscarAll: buscarAll,
            buscarAllAnonymous: buscarAllAnonymous,
            buscarFilter: buscarFilter,
            deletar: deletar
        };

        return service;

        function salvar(docente,callback){
            GenericoRestSrv.salvar(url,docente,callback);
        }

        function editar(docente,callback){
            GenericoRestSrv.editar(url,docente,callback);
        }

        function buscarId(){

        }

        function buscarAllAnonymous(callback){
            GenericoRestSrv.buscarAll(url+"/findAll",callback);
        }

        function buscarAll(urlRequest,callback){
            GenericoRestSrv.buscarAll(url+urlRequest,callback);
        }

        function buscarFilter(urlFilter,callback) {
            GenericoRestSrv.buscarAll(url+urlFilter,callback);
        }

        function deletar(docente,callback){
            GenericoRestSrv.deletar(url,docente,callback);
        }

    }

})(angular);