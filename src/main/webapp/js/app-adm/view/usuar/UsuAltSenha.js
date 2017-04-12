/**
 * Created by diego.freire on 02/12/2016.
 */

Ext.define('AppAdm.view.usuar.UsuAltSenha', {
    extend: 'Ext.window.Window',
    alias: 'widget.UsuAltSenha',
    itemId: 'UsuAltSenha',
    layout: 'fit',
    controller: ['Usuario'],
    width: '550',
    title: 'Alteração de Senha',
    modal: true,
    draggable: false,
    initComponent: function() {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                itemId: 'formUsuAltSenha',
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
                                name : 'login',
                                itemId: 'edAltSenhaLogin',
                                fieldLabel: ' Login',
                                labelWidth: '25%',
                                padding: '0 5 0 0',
                                disabled: true,
                                listeners: {
                                    change: function(field, newValue, oldValue){
                                        field.setValue(newValue.toUpperCase());
                                    }
                                }
                            },
                            {
                                xtype: 'textfield',
                                name : 'nome',
                                itemId: 'edAltSenhaNome',
                                fieldLabel: 'Nome Completo',
                                labelWidth: '60',
                                flex: 1,
                                disabled: true,
                                listeners: {
                                    change: function(field, newValue, oldValue){
                                        field.setValue(newValue.toUpperCase());
                                    }
                                }
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
                                padding: '0 5 0 0',
                                name : 'senha',
                                itemId: 'edAltSenhaAtual',
                                fieldLabel: 'Senha Atual',
                                labelWidth: '25%',
                                flex: 1
                            },
                            {
                                xtype: 'textfield',
                                inputType: 'password',
                                padding: '0 5 0 0',
                                name : 'senha',
                                itemId: 'edAltSenhaNova',
                                fieldLabel: 'Nova Senha',
                                labelWidth: '25%',
                                flex: 1
                            },
                            {
                                xtype: 'textfield',
                                inputType: 'password',
                                padding: '0 5 0 0',
                                name : 'senha',
                                itemId: 'edAltSenhaConfNova',
                                fieldLabel: 'Confirmar Nova Senha',
                                labelWidth: '25%',
                                flex: 1
                            }
                        ]
                    }
                ],
                buttons: [
                    {
                        icon: 'resources/icons/accept.png',
                        itemId: 'btnSaveAltSenha',
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