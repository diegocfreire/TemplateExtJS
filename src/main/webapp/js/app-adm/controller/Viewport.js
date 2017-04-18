Ext.define('AppAdm.controller.Viewport', {
    extend: 'Ext.app.Controller',
    requires: ['AppAdm.view.usuar.UsuTab'],
    refs: [{
        ref: 'tabs', selector: 'viewport #tabs'}
    ],

    init: function() {

        this.control({
            'viewport #mmnLogoff': {
                click: this.onBtnLogoffClick
            },
            'viewport #mmnUsuarios': {
                click: this.onUsuariosClick
            },
            'viewport #mmnAltSenha': {
                click: this.onAltSenha
            },
            'viewport #mmnEstados': {
                click: this.onEstadosClick
            }
        });
    },
    onBtnLogoffClick: function(){
        window.location = '/admin/logout';
    },
    onUsuariosClick: function () {
        var tabs = this.getTabs();
        var tab = tabs.child('#UsuTab');
        if (!tab) {
            tab = tabs.add(Ext.create('AppAdm.view.usuar.UsuTab', {itemId: 'UsuTab'}));
            Ext.ComponentQuery.query('UsuTab #UsuGrid')[0].store.load();
        }
        tabs.setActiveTab(tab);
    },
    onAltSenha: function() {
        var edit = Ext.create('AppAdm.view.usuar.UsuAltSenha').show().center();
        var edLogin = Ext.ComponentQuery.query('UsuAltSenha #formUsuAltSenha #edAltSenhaLogin')[0];
        var edNome = Ext.ComponentQuery.query('UsuAltSenha #formUsuAltSenha #edAltSenhaNome')[0];
        edLogin.setValue(lg);
        edNome.setValue(nm);
    },
    onEstadosClick: function() {

    }
});
