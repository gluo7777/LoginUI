package org.login.app.server.account;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface SecurityQuestionRepository extends CrudRepository<SecurityQuestion, Long> {
}
