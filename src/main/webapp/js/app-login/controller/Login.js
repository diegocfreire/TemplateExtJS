Ext.define('appLogin.controller.Login', {
    extend : 'Ext.app.Controller',
    refs   : [
        {
            ref : 'loginWindow',
            selector : 'loginWindow'
        }
    ],
    init: function() {
        this.control({
            'loginWindow #bbtEntrar':{
                click:this.processaLogin
            },
            'loginWindow #bbtLimpar':{
                click:this.resetaLogin
            }
        });
    },
    resetaLogin: function() {
        Ext.ComponentQuery.query('loginWindow #loginForm')[0].getForm().reset();
    },
    processaLogin: function(button) {
        var form = Ext.ComponentQuery.query('loginWindow #loginForm')[0];
        form.submit({
            method:'POST',
            success: function(form, action) {
               window.location = '/admin';
            },
            failure: function(form, action) {
                var statusCode = action.response.status;
                if(statusCode == 401){
                Ext.Msg.alert('Erro','Falha no Login: Usuário ou senha incorretos');
                }

                if(statusCode >= 500 && statusCode <= 505){
                    Ext.Msg.alert('Erro no servidor','Problema ao realizar login. Favor tentar novamente.');
                }
            }
        });
    }
});