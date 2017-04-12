package br.com.admin.dao;

import java.util.List;

/**
 * Created by diego.freire on 24/11/2016.
 */

public interface _Dao<K, T> {
    public void insert(T t);
    public List<T> view(int start, int limit, String paramName, String value);
    public Long count(String paramName, String value);
    public void delete(K k);
}

