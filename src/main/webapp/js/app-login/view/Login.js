Ext.define('appLogin.view.Login', {
    extend: 'Ext.window.Window',
    alias: 'widget.loginWindow',
    itemId: 'loginWindow',
    controller: ['Login'],
    title:  'Controle de Acesso',
    layout: {
        type: 'fit'
    },
    modal: true,
    closable : false,
    draggable: false,
    resizable: false,
    width: 350,
    bodyPadding: '5',
    icon: 'resources/icons/home.png',
    items: [
        {
            xtype: 'form',
            itemId: 'loginForm',
            labelWidth:80,
            url:'j_spring_security_check',
            frame:true,
            baseCls: 'x-plain',
            defaults: {
                xtype: 'textfield',
                anchor: '100%',
                allowBlank: false
            },
            items: [
                {
                    fieldLabel: '<b>Usuário</b>',
                    name: 'j_username',
                    itemId: 'edUsuario',
                    money: false,
                    enableKeyEvents: true
                },
                {
                    fieldLabel: '<b>Senha</b>',
                    inputType: 'password',
                    name: 'j_password',
                    itemId: 'edSenha'
                },
                {
                    xtype: 'label',
                    text: 'Esqueceu sua senha?',
                    itemId: 'lblNovaSenha',
                    listeners: {
                        element : 'el',
                        mouseover : {
                            element : 'el',
                            fn : function(){
                                this.setStyle("cursor", "pointer");
                            }
                        },
                        click: function() {
                            var edUsuario = Ext.ComponentQuery.query('#loginWindow #edUsuario')[0];
                            if (edUsuario.getValue() != "") {
                                Ext.create("Ext.form.Panel").submit({
                                    url: 'login/esqueciSenha.action',
                                    method: 'post',
                                    waitMsg: 'Aguarde, gerando nova senha...',
                                    params: {
                                        login: edUsuario.getValue()
                                    },
                                    success: function(form, action) {
                                        var data = Ext.decode(action.response.responseText);
                                        Ext.MessageBox.show({
                                            title: 'Recuperar Senha',
                                            msg: data.message,
                                            icon: Ext.MessageBox.INFO,
                                            buttons: Ext.Msg.OK
                                        });
                                    },
                                    failure: function(proxy, response, operation) {
                                        var data = Ext.decode(response.response.responseText);
                                        Ext.MessageBox.show({
                                            title: 'Recuperar Senha',
                                            msg: data.message,
                                            icon: Ext.MessageBox.ERROR,
                                            buttons: Ext.Msg.OK
                                        });
                                    }
                                });
                            } else {
                                Ext.MessageBox.show({
                                    title: 'Recuperar Senha',
                                    msg: 'Informe seu nome de Usuário.',
                                    icon: Ext.MessageBox.INFO,
                                    buttons: Ext.Msg.OK
                                });
                            }
                        }
                    }
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    itemId: 'toolBotoes',
                    border: false,
                    dock: 'bottom',
                    baseCls: 'x-plain',
                    items: [
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            text: 'Entrar',
                            itemId: 'bbtEntrar',
                            icon: 'resources/icons/check.png',
                            formBind: true
                        },
                        {
                            xtype: 'button',
                            text: 'Limpar',
                            itemId: 'bbtLimpar',
                            icon: 'resources/icons/blank-page.png'
                        }
                    ]
                }
            ]
        }
    ]
});