package org.login.app.server.account;

import org.login.app.server.security.Rules;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PostAuthorize;

import java.util.Optional;

@Secured(Rules.ROLE_ADMIN)
@RepositoryRestResource
public interface UserRepository extends PagingAndSortingRepository<User, Long> {

    @Secured(Rules.ROLE_USER)
    @PostAuthorize("returnObject.orElse(null)?.username == authentication.principal.username")
    @Override
    Optional<User> findById(Long aLong);
}
