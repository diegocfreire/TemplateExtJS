/**
 * Created by diego on 15/03/2016.
 */
Ext.define('AppAdm.controller.Usuario', {
    extend: 'Ext.app.Controller',
    stores: ['Usuario'],
    models: ['Usuario'],
    views: [
        'AppAdm.view.usuar.UsuTab', 'AppAdm.view.usuar.UsuGrid', 'AppAdm.view.usuar.UsuWindow', 'AppAdm.view.usuar.UsuAltSenha'
    ],
    refs: [
        {ref: 'UsuGrid', selector: 'UsuGrid'},
        {ref: 'UsuWindow', selector: 'UsuWindow'},
        {ref: 'UsuAltSenha', selector: 'UsuAltSenha'}
    ],
    init: function () {
        this.control({
            'UsuGrid dataview': {
                itemdblclick: this.editUsu
            },
            'UsuGrid #botoesGrid #btnNovoUsu': {
                click: this.editUsu
            },
            'UsuGrid #botoesGrid #btnExcluirUsu': {
                click: this.deleteUsu
            },
            'UsuWindow #formUsuario #btnSaveUsuario': {
                click: this.saveUsu
            },
            'UsuAltSenha #formUsuAltSenha #btnSaveAltSenha': {
                click: this.saveAltSenha
            }
        });
    },

    editUsu: function(grid, record) {
        var edit = Ext.create('AppAdm.view.usuar.UsuWindow').show();
        var edLoginUsuario = Ext.ComponentQuery.query('UsuWindow #formUsuario #edLoginUsuario')[0];
        var edNomeUsuario = Ext.ComponentQuery.query('UsuWindow #formUsuario #edNomeUsuario')[0];
        edLoginUsuario.focus('', 100);
        if(record.data!=null){
            edit.down('form').loadRecord(record);
            if (edLoginUsuario.getValue() != '') {
                edLoginUsuario.setReadOnly(true);
                edNomeUsuario.focus('', 100);
            } else {
                edLoginUsuario.setReadOnly(false);
            };
        }
    },

    saveUsu: function(button) {
        var edLoginUsuario = Ext.ComponentQuery.query('UsuWindow #formUsuario #edLoginUsuario')[0];
        edLoginUsuario.setDisabled(false);
        var win    = button.up('window'),
            form   = win.down('form'),
            record = form.getRecord(),
            values = form.getValues(),
            store = this.getUsuarioStore();
        record = Ext.create('AppAdm.model.Usuario');
        record.set(values);
        var r = store.find('des_User', edLoginUsuario.getValue());

        if (record.data.flg_Ativo == true) {
            record.data.flg_Ativo = 1
        } else if (record.data.flg_Ativo == false) {
            record.data.flg_Ativo = 0
        }

        if (r == -1) {
            store.add(record);
            store.sync();
            win.close();
        } else {
            function showResult(btn){
                if (btn == 'yes') {
                    store.add(record);
                    store.sync();
                    win.close();
                }
            }
            Ext.Msg.show({
                title:'Cadastro de Usuários.',
                msg: 'Usuário já existe. Deseja atualizar informações existentes?',
                buttons: Ext.Msg.YESNO,
                fn: showResult,
                icon: Ext.MessageBox.QUESTION
            });
        }
    },

    deleteUsu: function() {
        var grid = this.getUsuGrid(),
            record = grid.getSelectionModel().getSelection(),
            store = this.getUsuarioStore();
        function showResult(btn){
            if (btn == 'yes') {
                record[0].data.flg_Ativo=0;
                store.remove(record);
                store.sync();
            }
        }
        Ext.Msg.show({
            title:'Excluir Registro?',
            msg: 'Excluir registro selecionado?',
            buttons: Ext.Msg.YESNO,
            fn: showResult,
            icon: Ext.MessageBox.QUESTION
        });
    },
    saveAltSenha: function() {
        var win = Ext.ComponentQuery.query('UsuAltSenha')[0];
        var edAltSenhaAtual = krUtil.CriptMd5(Ext.ComponentQuery.query('UsuAltSenha #formUsuAltSenha #edAltSenhaAtual')[0].getValue(),false);
        var edAltSenhaNova  = Ext.ComponentQuery.query('UsuAltSenha #formUsuAltSenha #edAltSenhaNova')[0].getValue();
        var edAltSenhaConfNova = Ext.ComponentQuery.query('UsuAltSenha #formUsuAltSenha #edAltSenhaConfNova')[0].getValue();

        if (edAltSenhaAtual != snHash) {
            Ext.Msg.show({
                title:'Erro',
                msg: 'Confirmação da Senha atual inválida.',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
        } else if (edAltSenhaNova != edAltSenhaConfNova) {
            Ext.Msg.show({
                title:'Erro',
                msg: 'Confirmação da Senha diverge da Nova Senha.',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
        } else if ((edAltSenhaNova == edAltSenhaConfNova) && (edAltSenhaNova == Ext.ComponentQuery.query('UsuAltSenha #formUsuAltSenha #edAltSenhaAtual')[0].getValue())) {
            Ext.Msg.show({
                title:'Erro',
                msg: 'Nova senha não pode ser igual a senha antiga.',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.ERROR
            });
        } else {
            var record = Ext.create('AppAdm.model.Usuario');
            var store  = Ext.create('AppAdm.store.Usuario');

            record.data.des_User=lg;
            record.data.des_Nome=nm;
            record.data.des_Senha=krUtil.CriptMd5(edAltSenhaNova,false);
            record.data.des_Acesso=ac;
            record.data.flg_Ativo=1;

            store.add(record);
            store.sync({
                success: function(batch) {
                    Ext.create("Ext.form.Panel").submit({
                        url: 'usuar/logged',
                        method: 'post',
                        success: function (f, action) {
                            lg = action.result.data[0].des_User;
                            nm = action.result.data[0].des_Nome;
                            ac = action.result.data[0].des_Acesso;
                            snHash = action.result.data[0].des_Senha;
                        }
                    });
                    Ext.Msg.show({
                        title:'Sucesso',
                        msg: 'Alteração realizada com sucesso.',
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.INFO
                    });
                    win.close();
                }
            });
        }
    }
});