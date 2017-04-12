/**
 * Created by diego on 15/03/2016.
 */
Ext.define('AppAdm.view.usuar.UsuGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'Usuario',
    alias : 'widget.UsuGrid',
    store: 'Usuario',
    itemId: 'UsuGrid',
    columns: [
        {text: 'E-Mail',  dataIndex: 'des_User', width: 400},
        {text: 'Nome', dataIndex: 'des_Nome', flex: 2},
        {
            text: 'Acesso', dataIndex: 'des_Acesso', align: 'center', width:300,
            renderer: function(v) {
                switch (v) {
                    case 'ROLE_ADM' : return 'Administrador';break;
                    case 'ROLE_EMP' : return 'Empresa';break;
                    case 'ROLE_MOB' : return 'Mobile';break;
                }
            }
        }
    ],
    initComponent: function() {
        this.dockedItems = [
            {
                dock: 'top',
                xtype: 'toolbar',
                itemId: 'botoesGrid',
                items: [
                    {text: 'Novo', itemId: 'btnNovoUsu', icon: 'resources/icons/add.gif'},
                    '-',
                    {text: 'Excluir', itemId: 'btnExcluirUsu', icon: 'resources/icons/delete.gif'},
                    {xtype: 'tbfill'},
                    {
                        xtype: 'combobox',
                        itemId: 'cbxTipoBusca',
                        fieldLabel: 'Busca',
                        editable: false,
                        width: 130,
                        labelWidth: 32,
                        store: Ext.create('Ext.data.Store', {
                            fields: ['value', 'display'],
                            data : [
                                {"value":"des_User", "display":"E-Mail"},
                                {"value":"des_Nome", "display":"Nome"}
                            ]
                        }),
                        displayField: 'display',
                        valueField: 'value',
                        value: 'des_User',
                        listeners : {
                            'select' : function(combo, record){
                                var campoBusca = Ext.ComponentQuery.query('#edBuscaUsuario')[0];
                                campoBusca.paramName = combo.getValue();
                            }
                        }
                    },
                    {
                        xtype: 'campoBusca',
                        itemId: 'edBuscaUsuario',
                        store: Ext.getStore('Usuario'),
                        paramName: 'des_User',
                        width: 400
                    }
                ]
            },
            {
                xtype: 'pagingtoolbar',
                store: Ext.getStore('Usuario'),
                beforeLoad: function() {
                    var prx = Ext.getStore('Usuario').proxy;
                    var vlr = Ext.ComponentQuery.query('#edBuscaUsuario')[0].value;
                    var combo = Ext.ComponentQuery.query('#cbxTipoBusca')[0];
                    prx.extraParams = {
                        paramName: combo.getValue(),
                        value: vlr
                    }
                },
                dock: 'bottom',
                displayInfo: true,
                emptyMsg: 'Não há registros a serem exibidos',
                displayMsg: 'Exibindo {0} - {1} de {2} registro(s)'
            }
        ];
        this.callParent(arguments);
    }
});