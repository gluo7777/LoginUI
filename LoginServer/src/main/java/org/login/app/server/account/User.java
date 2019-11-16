package org.login.app.server.account;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;
import org.login.app.server.profile.Address;
import org.login.app.server.profile.Preference;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "users", schema = "security")
@JsonIgnoreProperties(allowGetters = false, allowSetters = true, value = {"password","enabled"}, ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @NotBlank
    private String firstName;
    @NotBlank
    private String lastName;
    @NotBlank
    @Email
    private String email;
    private LocalDate dateOfBirth;
    @NotBlank
    private String username;
    @NotBlank
    private String password;
    private boolean enabled;
    @JsonManagedReference
    @NotNull
    @Valid
    @OneToOne(cascade = CascadeType.ALL)
    private Address address;
    @JsonManagedReference
    @NotNull
    @Valid
    @OneToOne(cascade = CascadeType.ALL)
    private Preference preference;
    @JsonManagedReference
    @NotEmpty
    @Valid
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private List<SecurityQuestion> securityQuestions;
}
