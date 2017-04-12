package br.com.admin.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.SimpleUrlLogoutSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by diego.freire on 24/11/2016.
 */

@Component
public class CustomLogoutSuccessHandler extends SimpleUrlLogoutSuccessHandler {

    public CustomLogoutSuccessHandler() {
        super();
    }

    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        response.sendRedirect("/admin");

    }
}

