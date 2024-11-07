package org.ikapiar.security.services;

import io.quarkus.elytron.security.common.BcryptUtil;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import org.ikapiar.security.errors.PenggunaAlreadyExists;
import org.ikapiar.security.errors.PenggunaNotFound;
import org.ikapiar.security.errors.WrongPassword;
import org.ikapiar.security.models.Pengguna;
import org.ikapiar.security.models.Peranan;

@ApplicationScoped
public class AuthService {

    @Transactional
    public Pengguna registerPengguna(String username, String email, String password) {
        if (Pengguna.find("email", email).firstResult() != null) {
            throw new PenggunaAlreadyExists(String.format("user with email %s already exists", email));
        }

        var pengguna = new Pengguna();
        pengguna.setUsername(username);
        pengguna.setEmail(email);
        pengguna.setPassword(BcryptUtil.bcryptHash(password));
        var peranan = Peranan.build(Peranan.EVERYONE);
        pengguna.setPeranan(peranan);
        pengguna.persistAndFlush();

        return pengguna;
    }

    public Pengguna authenticatePengguna(String email, String password) {
        Pengguna pengguna = Pengguna.find("email", email).firstResult();
        if (pengguna == null) {
            throw new PenggunaNotFound(String.format("Pengguna %s not found", email));
        }
        var isPasswordMatch = BcryptUtil.matches(password, pengguna.getPassword());
        if (!isPasswordMatch) {
            throw new WrongPassword(String.format("Wrong password for %s", email));
        }
        return pengguna;
    }

}
