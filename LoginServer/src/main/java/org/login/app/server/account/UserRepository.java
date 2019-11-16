package org.login.app.server.account;

import org.login.app.server.security.Rules;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.Optional;

@Secured({Rules.ROLE_ADMIN})
@RepositoryRestResource
public interface UserRepository extends PagingAndSortingRepository<User, Long> {

    @Secured({Rules.ROLE_ADMIN,Rules.ROLE_USER})
    @PostAuthorize(Rules.HAS_ROLE_ADMIN + Rules.OR + Rules.OPTIONAL_USERNAME_IS_LOGGED_IN)
    @Override
    Optional<User> findById(Long aLong);

    @PreAuthorize(Rules.HAS_ROLE_ADMIN + Rules.OR + Rules.HAS_ROLE_RUN_AS_SUPER_USER + Rules.OR + "#username == authentication.principal.username")
    Optional<User> findByUsername(String username);

    @Secured({Rules.ROLE_ADMIN,Rules.ROLE_RUN_AS_SUPER_USER})
    @Override
    <S extends User> S save(S entity);
}
