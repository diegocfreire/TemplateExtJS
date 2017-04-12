package br.com.admin.service;

import br.com.admin.dao.UsuarioDao;
import br.com.admin.model.Usuario;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by diego.freire on 24/11/2016.
 */

@Service
public class UsuarioService {

    @Inject
    private UsuarioDao usuarioDao;

    @Transactional
    public List<Usuario> insert(Usuario u) {
        usuarioDao.insert(u);
        List<Usuario> usuarios = new ArrayList<Usuario>();
        usuarios.add(u);
        return usuarios;
    }

    @Transactional(readOnly=true)
    public List<Usuario> view(int start, int limit, String paramName, String value){
        return usuarioDao.view(start, limit, paramName, value);
    }

    public Long count(String paramName, String value){
        return usuarioDao.count(paramName,  value);
    }

    @Transactional
    public void delete(Usuario usuario) {
        usuarioDao.delete(usuario.getDes_User());
    }

    public UserDetails getUserDetails() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            return null;
        } else {
            return (UserDetails) authentication.getPrincipal();
        }
    }

    public String getUsername() {
        if (getUserDetails() == null) {
            return null;
        } else {
            return getUserDetails().getUsername();
        }
    }

}