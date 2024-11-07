package org.ikapiar.security.resources;

import jakarta.annotation.security.PermitAll;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import org.ikapiar.common.ResponseBody;
import org.ikapiar.security.services.AuthService;
import org.jboss.resteasy.reactive.RestResponse;

import java.util.UUID;

@Path("/api/v1/auth")
public class AuthenticationResource {

    AuthService authService;

    public AuthenticationResource(AuthService authService) {
        this.authService = authService;
    }

    @POST
    @Path("/register")
    @PermitAll
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public RestResponse<ResponseBody<String>> register(RequestRegisterUser request) {
        var randomID = UUID.randomUUID().toString().substring(0, 8);
        var username = String.format("%s_%s", request.email.split("@")[0], randomID);

        var user = authService.registerPengguna(username, request.email, request.password);

        return ResponseBody.okBuild(user.getUsername(), "ok");
    }

    public record RequestRegisterUser(String email, String password) {}
}
