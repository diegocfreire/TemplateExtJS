/**
 * Created by diego on 15/03/2016.
 */
Ext.define('AppAdm.store.Usuario', {
    extend: 'Ext.data.Store',
    model: 'AppAdm.model.Usuario',
    autoLoad: false,
    pageSize: 35,
    proxy: {
        type: 'ajax',
        extraParams: {
            start: 0,
            limit: 35,
            paramName: '',
            value: ''
        },
        api: {
            read   : 'usuar/view',
            create : 'usuar/api/insert',
            update : 'usuar/api/insert',
            destroy: 'usuar/delete'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        },
        writer: {
            type: 'json',
            writeAllFields: true,
            encode: false,
            root: 'data'
        },
        listeners: {
            exception: function(proxy, response, operation){
                var data = Ext.decode(response.responseText);
                Ext.MessageBox.show({
                    title: 'Erro: Usuários',
                    msg: data.message,
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }
    }
});