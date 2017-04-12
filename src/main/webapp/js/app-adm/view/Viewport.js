Ext.define('AppAdm.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: [],
    itemId: 'viewport',
    layout: 'border',
    items: [
        //{
        //    xtype: 'box',
        //    region: 'north',
        //    margin: '10 00 15 10',
        //    html: '<img src="resources/imagens/logo2.png" width="100" height="40"'
        //
        //},
        {
            xtype: 'toolbar',
            itemId: 'menu_principal',
            defaults: {
                bodyStyle: 'padding:5px'
            },
            baseCls: 'x-plain',
            region: 'north',
            margin: '30 10 00 10',
            items: [
                {
                    text: 'Cadastros',
                    itemId: 'menuCadastros',
                    hidden: false,
                    menu: new Ext.menu.Menu({
                        items: [
                            {
                                text: 'Usuários',
                                itemId: 'mmnUsuarios',
                                icon: 'resources/icons/users.png'
                            }
                        ]
                    })
                },
                {
                    text: 'Movimentos',
                    itemId: 'menuMovimentos',
                    hidden: false,
                    menu: new Ext.menu.Menu({
                        items: [

                        ]
                    })
                },
                {
                    text: 'Configurações',
                    itemId: 'menuConfigs',
                    hidden: false,
                    menu: new Ext.menu.Menu({
                        items: [
                            {
                                text: 'Alterar Senha',
                                itemId: 'mmnAltSenha',
                                icon: 'resources/icons/users.png'
                            }
                        ]
                    })
                },

                {
                    text: 'Ajuda',
                    itemId: 'menuAjuda',
                    hidden: false,
                    menu: new Ext.menu.Menu({
                        items: [

                        ]
                    })
                },

                {xtype: 'tbfill'},
                {xtype: 'label',text: 'Seja Bem Vindo',itemId: 'lblUsuario'},
                {
                    xtype: 'button',
                    tooltip: 'Efetuar Logoff',
                    itemId: 'mmnLogoff',
                    icon: 'resources/icons/logout.png'
                }
            ]

        },
        {
            itemId: 'tabs',
            xtype: 'tabpanel',
            plain: true,
            activeTab: 0,
            minWidth: 880,
            minHeight: 500,
            region: 'center',
            margin: '10 10 10 10',
            defaults: {
                autoDestroy: true,
                closeAction : "destroy"
            },
            items: [
                {
                    xtype: 'panel',
                    title: 'Dashboard',
                    icon: 'resources/icons/home.png'
                }
            ]
        }
    ]
});