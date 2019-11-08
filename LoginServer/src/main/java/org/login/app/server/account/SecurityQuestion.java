package org.login.app.server.account;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Range;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@Entity
public class SecurityQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @NotBlank
    private String question;
    @NotBlank
    private String answer;
    private String hint;
    private boolean caseSensitive = false;
    private boolean ignoreSpaces = true;
    @NotNull
    @Range(min = 1L)
    private long accountId;
}
