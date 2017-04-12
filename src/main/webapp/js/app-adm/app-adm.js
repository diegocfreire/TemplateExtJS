Ext.Loader.setPath('Ext.kr', 'js/util');
Ext.Loader.setPath('Ext.pad', 'js/padroes');
Ext.require(['Ext.pad.CampoBusca']);

Ext.Loader.setConfig({
    enabled: true
});

//Variáveis globais
var lg = '';
var nm = '';
var ac = '';
var snHash = '';
var krUtil;

Ext.application({
    name: 'AppAdm',
    appFolder: 'js/app-adm',
    autoCreateViewport: false,
    requires: ['AppAdm.view.Viewport'],
    controllers: ['Viewport', 'Usuario'],
    launch: function () {
        app = this;

        //Cria Viewport apenas quando obter o usuario logado, senão não faz nada!
        Ext.create("Ext.form.Panel").submit({
            url: 'usuar/logged',
            method: 'post',
            success: function (f, action) {
                lg = action.result.data[0].des_User;
                nm = action.result.data[0].des_Nome;
                ac = action.result.data[0].des_Acesso;
                snHash = action.result.data[0].des_Senha;

                krUtil = Ext.create('Ext.kr.KrUtil');

                Ext.create('AppAdm.view.Viewport');

                var lblUsuario = Ext.ComponentQuery.query('viewport #lblUsuario')[0];
                lblUsuario.setText('Seja bem vindo '+nm+' ');
            },
            failure: function(proxy, response, operation) {
                var data = Ext.decode(response.response.responseText);
                Ext.MessageBox.show({
                    title: 'Erro Inesperado.',
                    msg: 'Erro Inesperado. '+data.message,
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        });
    }
});