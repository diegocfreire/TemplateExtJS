package br.com.admin.dao;

import br.com.admin.model.Estado;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.inject.Inject;
import java.util.List;

/**
 * Created by diego on 18/04/17.
 */
@Repository
public class  EstadoDao implements _Dao<String, Estado> {

    @Inject
    private JdbcTemplate db;
    @Inject
    private NamedParameterJdbcTemplate dbNP;

    @Override
    public void insert(Estado estado) {

    }

    @Override
    public List<Estado> view(int start, int limit, String paramName, String value) {
        return null;
    }

    @Override
    public Long count(String paramName, String value) {
        return null;
    }

    @Override
    public void delete(String s) {

    }

}
