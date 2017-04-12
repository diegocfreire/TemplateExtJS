Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'appLogin',
    appFolder: 'js/app-login',
    requires: ['appLogin.view.Login'],
    controllers: ['Login'],
    launch: function () {
        appLogin = this;
        Ext.widget('loginWindow').show();
        Ext.ComponentQuery.query('loginWindow #edUsuario')[0].focus('', 200);
    }
});