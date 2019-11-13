package org.login.app.server.account;

import org.login.app.server.security.Rules;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@PreAuthorize(Rules.ROLE_ADMIN)
@RepositoryRestResource(collectionResourceRel = "questions", path = "questions", exported = true)
public interface SecurityQuestionRepository extends CrudRepository<SecurityQuestion, Long> {

    @PreAuthorize(Rules.ROLE_USER)
    @RestResource(exported = true)
    List<SecurityQuestion> findByUserId(String userId);
}
