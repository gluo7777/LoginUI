package org.login.app.server.account;

import org.login.app.server.security.Rules;
import org.springframework.data.repository.CrudRepository;
import org.springframework.security.access.annotation.Secured;

@Secured({Rules.ROLE_ADMIN})
public interface AuthorityRepository extends CrudRepository<Authority, Long> {

    @Secured({Rules.ROLE_ADMIN, Rules.ROLE_RUN_AS_SUPER_USER})
    @Override
    <S extends Authority> S save(S entity);
}
