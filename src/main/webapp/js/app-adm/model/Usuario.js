/**
 * Created by diego on 15/03/2016.
 */
Ext.define('AppAdm.model.Usuario', {
    extend: 'Ext.data.Model',
    fields: [
        'des_User', 'des_Nome', 'des_Senha', 'des_Acesso',
        {name: 'flg_Ativo', type: 'boolean'}
    ]
});