package br.com.admin.controller;

import br.com.admin.model.Usuario;
import br.com.admin.model.UsuarioWrapper;
import br.com.admin.service.UsuarioService;
import br.com.admin.util.Rotinas;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.List;
import java.util.Map;

/**
 * Created by diego.freire on 24/11/2016.
 */

@RequestMapping("/usuar")
@RestController
public class UsuarioController {

    @Inject
    private UsuarioService usuarioService;

    @RequestMapping(value = "/api/insert")
    public
    @ResponseBody
    Map<String, ? extends Object> insert(@RequestBody UsuarioWrapper usuario) {
        try {
            if (usuario.getData().getDes_Senha().equals("")) {
                String novaSenha = Rotinas.senhaAleatoria(8);
                usuario.getData().setDes_Senha(Rotinas.md5(novaSenha));
                Rotinas.sendMail("Admin App - Cadastro", "Admin App", usuario.getData().getDes_User(), Rotinas.getCorpoEmailCadUsu(usuario.getData(), novaSenha));
            }
            List<Usuario> usuarios = usuarioService.insert(usuario.getData());
            return Rotinas.mapOK(usuarios);
        } catch (Exception e) {
            return Rotinas.mapError("Erro ao criar um novo Usuario. " + e.getMessage());
        }
    }

    @RequestMapping(value = "/view")
    public
    @ResponseBody
    Map<String, ? extends Object> view(
            @RequestParam int start, @RequestParam int limit, @RequestParam String paramName, @RequestParam String value) throws Exception {
        try {
            List<Usuario> usuarios = usuarioService.view(start, limit, paramName, value);
            Long total = usuarioService.count(paramName, value);
            return Rotinas.mapOK(usuarios, total);
        } catch (Exception e) {
            return Rotinas.mapError("Erro ao obter Usuarios. " + e.getMessage());
        }
    }

    @RequestMapping(value = "/delete")
    public
    @ResponseBody
    Map<String, ? extends Object> delete(@RequestBody UsuarioWrapper data) throws Exception {
        try {
            usuarioService.delete(data.getData());
            return Rotinas.mapOK(data.getData());
        } catch (Exception e) {
            return Rotinas.mapError("Erro ao apagar o Usuário. " + e.getMessage());
        }
    }

    @RequestMapping(value = "/logged")
    public
    @ResponseBody
    Map<String, ? extends Object> logged() throws Exception {
        try {
            String usuario = usuarioService.getUsername();
            List<Usuario> usuarios = usuarioService.view(0, 1, "des_user", usuario);
            return Rotinas.mapOK(usuarios);
        } catch (Exception e) {
            return Rotinas.mapError("Erro ao obter Usuário Logado. " + e.getMessage());
        }
    }

}

