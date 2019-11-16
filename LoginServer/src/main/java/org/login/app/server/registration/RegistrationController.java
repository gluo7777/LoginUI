package org.login.app.server.registration;

import org.login.app.server.account.*;
import org.login.app.server.security.Rules;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

/**
 * TODO: all operations against this requires csrf token
 */
@Validated
@RestController
@RequestMapping("/api")
public class RegistrationController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthorityRepository authorityRepository;

    @Autowired
    private SecurityQuestionRepository securityQuestionRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Secured({Rules.ROLE_ANONYMOUS, Rules.RUN_AS_SUPER_USER})
    @PostMapping(path = "/registration", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> createAccount(@Valid @RequestBody User user){
        User foundUser = userRepository.findByUsername(user.getUsername()).orElse(null);
        if(foundUser != null){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.getSecurityQuestions().forEach(securityQuestion -> securityQuestion.setUser(user));
        User savedUser = userRepository.save(user);
        Authority authority = new Authority();
        authority.setUser(savedUser);
        authority.setAuthority(Rules.ROLE_USER);
        authorityRepository.save(authority);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

}
