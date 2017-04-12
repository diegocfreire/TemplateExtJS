package br.com.admin.model;

/**
 * Created by diego.freire on 24/11/2016.
 */
public class Usuario {

    private String Des_User;
    private String Des_Senha;
    private String Des_Nome;
    private String Des_Acesso;
    private Boolean Flg_Ativo;

    public String getDes_User() {
        return Des_User;
    }

    public void setDes_User(String des_User) {
        Des_User = des_User;
    }

    public String getDes_Senha() {
        return Des_Senha;
    }

    public void setDes_Senha(String des_Senha) {
        Des_Senha = des_Senha;
    }

    public String getDes_Nome() {
        return Des_Nome;
    }

    public void setDes_Nome(String des_Nome) {
        Des_Nome = des_Nome;
    }

    public String getDes_Acesso() {
        return Des_Acesso;
    }

    public void setDes_Acesso(String des_Acesso) {
        Des_Acesso = des_Acesso;
    }

    public Boolean getFlg_Ativo() {
        return Flg_Ativo;
    }

    public void setFlg_Ativo(Boolean flg_Ativo) {
        Flg_Ativo = flg_Ativo;
    }
}
