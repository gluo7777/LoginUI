package org.login.app.server.account;

import org.login.app.server.security.Rules;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;

import javax.websocket.server.ServerEndpoint;
import java.util.List;

@Secured({Rules.ROLE_ADMIN})
@RepositoryRestResource(collectionResourceRel = "questions", path = "questions", exported = true)
public interface SecurityQuestionRepository extends CrudRepository<SecurityQuestion, Long> {

    @Secured({Rules.ROLE_ADMIN,Rules.ROLE_USER})
    @RestResource(exported = true)
    List<SecurityQuestion> findByUserId(String userId);
}
