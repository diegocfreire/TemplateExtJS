package br.com.admin.security;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by diego.freire on 24/11/2016.
 */

@Component
public class CustomAuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {

        logger.info(exception.getMessage());
        request.getSession().setAttribute("error", exception.getMessage());

        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Falha na autenticação: " + exception.getMessage());

    }

}