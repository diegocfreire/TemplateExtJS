/**
 * Created by diego on 15/03/2016.
 */
Ext.define('AppAdm.store.Estado', {
    extend: 'Ext.data.Store',
    model: 'AppAdm.model.Estado',
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
            read   : 'estad/view',
            create : 'estad/api/insert',
            update : 'estad/api/insert',
            destroy: 'estad/delete'
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
                    title: 'Erro: Estados',
                    msg: data.message,
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }
    }
});