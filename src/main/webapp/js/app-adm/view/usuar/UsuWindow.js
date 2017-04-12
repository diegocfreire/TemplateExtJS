/**
 * Created by diego on 15/03/2016.
 */
Ext.define('AppAdm.view.usuar.UsuWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.UsuWindow',
    layout: 'fit',
    width: '550',
    modal: true,
    title: 'Usuários',
    draggable: false,
    initComponent: function() {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                itemId: 'formUsuario',
                padding: '10 10 10 10',
                border: false,
                style: 'background-color: #fff;',
                items: [
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        bodyPadding: 10,
                        padding: '5 5 5 5',
                        fieldDefaults: {
                            labelAlign: 'top',
                            allowBlank: false,
                            msgTarget: 'side',
                            blankText: 'Campo Obrigatório',
                            enableKeyEvents: true
                        },
                        items: [
                            {
                                xtype: 'textfield',
                                name : 'des_User',
                                itemId: 'edLoginUsuario',
                                fieldLabel: 'E-Mail (Login)',
                                flex: 2,
                                padding: '0 0 0 0'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        bodyPadding: 10,
                        padding: '5 5 5 5',
                        fieldDefaults: {
                            labelAlign: 'top',
                            allowBlank: false,
                            msgTarget: 'side',
                            blankText: 'Campo Obrigatório',
                            enableKeyEvents: true
                        },
                        items: [
                            {
                                xtype: 'textfield',
                                name : 'des_Nome',
                                id: 'edNomeUsuario',
                                fieldLabel: 'Nome Completo',
                                labelWidth: '60',
                                padding: '0 5 0 0',
                                flex: 1,
                                listeners: {
                                    change: function(field, newValue, oldValue){
                                        field.setValue(newValue.toUpperCase());
                                    }
                                }
                            },
                            {
                                xtype: 'combobox',
                                name : 'des_Acesso',
                                store: Ext.create('Ext.data.Store', {
                                    fields: ['value', 'display'],
                                    data : [
                                        {"value":"ROLE_ADM", "display":"Administrador"}
                                        //{"value":"ROLE_EMP", "display":"Empresa"},
                                        //{"value":"ROLE_MOB", "display":"Mobile"}
                                    ]
                                }),
                                displayField: 'display',
                                valueField: 'value',
                                editable: false,
                                fieldLabel: 'Acesso',
                                labelWidth: '60',
                                flex: 1
                            }
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        bodyPadding: 10,
                        padding: '5 5 5 5',
                        fieldDefaults: {
                            labelAlign: 'top',
                            allowBlank: false,
                            msgTarget: 'side',
                            blankText: 'Campo Obrigatório',
                            enableKeyEvents: true
                        },
                        items: [
                            {
                                xtype: 'textfield',
                                inputType: 'password',
                                allowBlank: true,
                                padding: '0 5 0 0',
                                name : 'des_Senha',
                                flex:1,
                                id: 'edSenhaUsuario',
                                fieldLabel: 'Senha (Gerada Automáticamente)',
                                //labelWidth: '25%',
                                readOnly: true
                            },
                            {
                                xtype: 'checkboxfield',
                                boxLabel: 'Ativo',
                                name: 'flg_Ativo',
                                itemId: 'cbxFlgAtivo',
                                inputValue: '1',
                                padding: '20 0 0 0'
                            }
                        ]
                    }
                ],
                buttons: [
                    {
                        icon: 'resources/icons/accept.png',
                        itemId: 'btnSaveUsuario',
                        formBind: true,
                        text: 'Confirmar'
                    },
                    {
                        icon: 'resources/icons/cancel.png',
                        text: 'Cancelar',
                        scope: this,
                        handler: this.close
                    }

                ]
            }
        ];
        this.callParent(arguments);
    }
});