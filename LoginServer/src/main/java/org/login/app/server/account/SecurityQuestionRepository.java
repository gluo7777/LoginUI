package org.login.app.server.account;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

//@PreAuthorize("hasRole('ADMIN')")
@RepositoryRestResource(collectionResourceRel = "questions", path = "questions", exported = true)
public interface SecurityQuestionRepository extends CrudRepository<SecurityQuestion, Long> {

//    @PreAuthorize("hasRole('ANONYMOUS')")
    @RestResource(exported = true)
    SecurityQuestion findByAccountId(String userId);
}
