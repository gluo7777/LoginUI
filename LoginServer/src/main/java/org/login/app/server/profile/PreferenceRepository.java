package org.login.app.server.profile;

import org.login.app.server.security.Rules;
import org.springframework.data.repository.CrudRepository;
import org.springframework.security.access.annotation.Secured;

import java.util.Optional;

@Secured({Rules.ROLE_ADMIN})
public interface PreferenceRepository extends CrudRepository<Preference, Long> {

    @Secured({Rules.ROLE_ADMIN,Rules.ROLE_USER})
    Optional<Preference> findByUserId(long userId);
}
