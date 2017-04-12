package br.com.admin.dao;

import br.com.admin.model.Usuario;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.inject.Inject;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by diego.freire on 24/11/2016.
 */

@Repository
public class UsuarioDao implements _Dao<String, Usuario> {

    @Inject
    private JdbcTemplate db;
    @Inject
    private NamedParameterJdbcTemplate dbNP;

    @Override
    public void insert(Usuario usuario) {
        try {
            Map namedParameters = new HashMap();
            String sql = " UPDATE USUAR SET\n" +
                    "  Des_User  = :Des_User,\n" +
                    "  Des_Senha = :Des_Senha,\n" +
                    "  Des_Nome  = :Des_Nome,\n" +
                    "  Des_Acesso= :Des_Acesso,\n" +
                    "  Flg_Ativo = :Flg_Ativo\n" +
                    "WHERE\n" +
                    "  Des_User = :Des_User\n" +
                    "IF @@ROWCOUNT = 0\n" +
                    "INSERT INTO USUAR VALUES (:Des_User, :Des_Senha, :Des_Nome, :Des_Acesso, :Flg_Ativo) ";

            namedParameters.put("Des_Nome", usuario.getDes_Nome());
            namedParameters.put("Des_Senha", usuario.getDes_Senha());
            namedParameters.put("Des_User", usuario.getDes_User());
            namedParameters.put("Des_Acesso", usuario.getDes_Acesso());
            namedParameters.put("Flg_Ativo", usuario.getFlg_Ativo());
            dbNP.update(sql, namedParameters);
        } catch (DataAccessException e) {
            throw e;
        }
    }

    @Override
    public List<Usuario> view(int start, int limit, String paramName, String value) {
        try {
            String sql = " SELECT * FROM usuar ";
            if (!paramName.isEmpty() && !value.isEmpty()) {
                sql = sql + " WHERE "+paramName+" LIKE '%"+value+"%'";
            }
            sql = sql + " ORDER BY des_nome LIMIT "+limit+" OFFSET "+start;
            return db.query(sql, mapperUsuario);
        } catch (EmptyResultDataAccessException e) {
            return new ArrayList<Usuario>(0);
        } catch (DataAccessException e) {
            throw e;
        }
    }

    @Override
    public Long count(String paramName, String value) {
        try {
            String sql = " SELECT COUNT(Des_User) FROM USUAR ";
            if (!paramName.isEmpty() && !value.isEmpty()) {
                sql = sql + " WHERE "+paramName+" LIKE '%"+value+"%'";
            }
            return db.queryForObject(sql, Long.class);
        } catch (DataAccessException e) {
            throw e;
        }
    }

    @Override
    public void delete(String Des_User) {
        try {
            db.update("DELETE FROM USUAR WHERE Des_User=?", Des_User);
        } catch (DataAccessException e) {
            throw e;
        }
    }

    private RowMapper<Usuario> mapperUsuario = new RowMapper<Usuario>() {
        @Override
        public Usuario mapRow(ResultSet rs, int rowNum) throws SQLException {
            Usuario u = new Usuario();
            u.setDes_Nome(rs.getString("Des_Nome"));
            u.setDes_User(rs.getString("Des_User"));
            u.setDes_Senha(rs.getString("Des_Senha"));
            u.setDes_Acesso(rs.getString("Des_Acesso"));
            u.setFlg_Ativo(rs.getBoolean("Flg_Ativo"));
            return u;
        }
    };

}
