package br.com.admin.controller;

import br.com.admin.model.EstadoWrapper;
import br.com.admin.service.EstadoService;
import br.com.admin.util.Rotinas;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.List;
import java.util.Map;

/**
 * Created by diego on 18/04/17.
 */
@RequestMapping("/estad")
@RestController
public class EstadoController {

    @Inject
    private EstadoService estadoService;

    @RequestMapping(value = "/api/insert")
    public
    @ResponseBody
    Map<String, ? extends Object> insert(@RequestBody EstadoWrapper estado) {
        try {
            return Rotinas.mapOK();
        } catch (Exception e) {
            return Rotinas.mapError("Erro ao criar um novo Estado. " + e.getMessage());
        }
    }

    @RequestMapping(value = "/view")
    public
    @ResponseBody
    Map<String, ? extends Object> view(
            @RequestParam int start, @RequestParam int limit, @RequestParam String paramName, @RequestParam String value) throws Exception {
        try {
            return Rotinas.mapOK();
        } catch (Exception e) {
            return Rotinas.mapError("Erro ao obter Estado. " + e.getMessage());
        }
    }

    @RequestMapping(value = "/delete")
    public
    @ResponseBody
    Map<String, ? extends Object> delete(@RequestBody EstadoWrapper data) throws Exception {
        try {
            return Rotinas.mapOK();
        } catch (Exception e) {
            return Rotinas.mapError("Erro ao apagar o Estado. " + e.getMessage());
        }
    }


}
