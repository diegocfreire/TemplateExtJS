/**
 * Created by diego on 15/03/2016.
 */
Ext.define('AppAdm.view.usuar.UsuTab', {
    extend: 'Ext.panel.Panel',
    controller: 'Usuario',
    requires: [
        'AppAdm.view.usuar.UsuGrid'
    ],
    alias: 'widget.UsuTab',
    title: 'Usuários',
    layout: 'fit',
    icon: 'resources/icons/users.png',
    closable: true,
    initComponent: function () {
        this.items = [
            {xtype: 'UsuGrid'}
        ];
        this.callParent(arguments);
    }
});