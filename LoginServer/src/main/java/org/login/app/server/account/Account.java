package org.login.app.server.account;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "users", schema = "security")
@JsonIgnoreProperties(allowGetters = false, allowSetters = true, value = {"password","enabled"})
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    private boolean enabled;
}
