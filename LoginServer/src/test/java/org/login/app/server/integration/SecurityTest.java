package org.login.app.server.integration;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.nio.file.Paths;
import java.util.Optional;

import org.assertj.core.util.Files;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.login.app.server.account.Authority;
import org.login.app.server.account.AuthorityRepository;
import org.login.app.server.account.User;
import org.login.app.server.account.UserRepository;
import org.login.app.server.registration.RegistrationController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

/**
 * SecurityTest
 */
@Ignore /* TODO: Fix and convert to SpringBootTest */
@RunWith(SpringRunner.class)
@WebMvcTest(RegistrationController.class)
public class SecurityTest {

    private static final Logger log = LoggerFactory.getLogger(SecurityTest.class);

    @Autowired
    private MockMvc mvc;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private AuthorityRepository authorityRepository;

    @MockBean
    private PasswordEncoder passwordEncoder;

    // @WithMockUser()
    @Test
    public void givenAnonymousUserOnRegistration_shouldSucceedWith201() throws Exception{
        // mock
        // username is not already registered
        when(userRepository.findByUsername("bobbyb71")).thenReturn(Optional.ofNullable(null));
        // encode password
        when(passwordEncoder.encode("bobbyb71")).thenReturn("encoded_bobbyb71");
        // save user
        User user = new User();
        user.setId(123);
        when(userRepository.save(any())).thenReturn(user);
        // save authorities
        when(authorityRepository.save(any())).thenReturn(new Authority());

        // request
        String payload = Files.contentOf(Paths.get("src/test/resources", "register1.json").toFile(), "utf-8");
        log.info("Registration payload:\n{}", payload);

        // test
        mvc.perform(
            MockMvcRequestBuilders.post("/registration")
            .contentType(MediaType.APPLICATION_JSON)
            .content(payload)
        ).andExpect(
            MockMvcResultMatchers.status().isCreated()
        );
    }
}