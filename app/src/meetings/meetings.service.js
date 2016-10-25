/**
 * Created by jezreel on 05/10/16.
 */
(function(){
    'use strict';
    angular.module('tccmeetings')
        .service('MeetingsSrv',MeetingsSrv);
    MeetingsSrv.$inject = ['GenericoRestSrv', 'SERVICE_PATH'];
    function MeetingsSrv(GenericoRestSrv, SERVICE_PATH) {

        // Opcional Variavel
        // var promisse = ''

        var url = SERVICE_PATH.PRIVATE_PATH + '/reuniao';

        var service = {
            salvar: salvar,
            editar: editar,
            buscarId: buscarId,
            buscarAll: buscarAll,
            buscarFilter: buscarFilter,
            deletar: deletar
        };

        return service;

        function salvar(reuniao,callback){
            GenericoRestSrv.salvar(url,reuniao,callback);
        }

        function editar(reuniao,callback){
            GenericoRestSrv.editar(url,reuniao,callback);
        }

        function buscarId(){

        }

        function buscarAll(callback){
            GenericoRestSrv.buscarAll(url,callback);
        }

        function buscarFilter(url,callback) {
            GenericoRestSrv.buscarAll(url,callback);
        }

        function deletar(disciplina,callback){
            GenericoRestSrv.deletar(url,disciplina,callback);
        }

    }

})();