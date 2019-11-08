package org.login.app.server.account;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Entity
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @NotBlank
    private String firstName;
    @NotBlank
    private String lastName;
    @NotBlank
    private String email;
    private LocalDate dateOfBirth;
    @NotBlank
    private String username;
    @NotBlank
    private String password;
    @OneToMany(mappedBy = "accountId")
    @Valid
    private List<SecurityQuestion> securityQuestions;
}
