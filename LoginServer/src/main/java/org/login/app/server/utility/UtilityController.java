package org.login.app.server.utility;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Profile("local")
@RestController
@RequestMapping("/utility")
public class UtilityController {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping(path = "/bcrypt", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> encrypt(@RequestParam("raw") String rawText) {
        Map<String, Object> response = new HashMap<>();
        try {
            response.put("original", rawText);
            response.put("encrypted", passwordEncoder.encode(rawText));
        } catch (Exception e) {
            response.put("error", "Failed to encrypt text");
        }
        return ResponseEntity.ok(response);
    }
}