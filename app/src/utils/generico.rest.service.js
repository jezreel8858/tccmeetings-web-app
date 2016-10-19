/**
 * Created by jezreel on 13/10/16.
 */
(function (angular) {
    'use strict';

    angular.module('tccmeetings')
        .service('GenericoRestSrv', GenericoRestSrv);

    GenericoRestSrv.$inject = ['HttpRequestSrv'];
    function GenericoRestSrv(HttpRequestSrv) {

        var service = {
            salvar: salvar,
            editar: editar,
            buscarId: buscarId,
            buscarAll: buscarAll,
            buscarFilter: buscarFilter,
            deletar: deletar
        };

        return service;

        ////////////////////////////////////////////////

        function salvar(url, data, callback) {
            HttpRequestSrv(url, 'POST', data, callback);
        };

        function editar(url, data, callback) {
            HttpRequestSrv(url, 'PUT', data, callback);
        };

        function buscarId(url, data, callback) {
            HttpRequestSrv(url, 'GET', {}, callback);
        };

        function buscarAll(url, callback) {
            HttpRequestSrv(url, 'GET', {}, callback);
        };

        function buscarFilter(url,callback) {
            HttpRequestSrv(url,'GET',{},callback);
        }

        function deletar(url, data, callback) {
            HttpRequestSrv(url, 'DELETE', data, callback);
        };

    }


})(angular);