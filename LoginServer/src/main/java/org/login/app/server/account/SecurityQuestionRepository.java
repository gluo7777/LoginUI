package org.login.app.server.account;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.security.access.prepost.PreAuthorize;

@PreAuthorize("hasRole('ADMIN')")
@RepositoryRestResource(collectionResourceRel = "questions", path = "questions", exported = true)
public interface SecurityQuestionRepository extends CrudRepository<SecurityQuestion, Long> {

//    @RestResource(exported = false)
//    Iterable<SecurityQuestion> findAll();

    @PreAuthorize("hasRole('ANONYMOUS')")
    @RestResource(exported = true)
    SecurityQuestion findByAccountId(String userId);
}
