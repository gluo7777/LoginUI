package org.gluo7777.springreactsession.page;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/in-secure")
public class InsecureAPIController {
    @GetMapping("/bypass/login")
    public String bypass(HttpServletRequest httpServletRequest) {
        // set authentication directly
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken("dummy1", "dummy1", Arrays.asList(new SimpleGrantedAuthority("ROLE_USER")));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return "successfully bypassed login!";
    }

    @GetMapping("/cors")
    public ResponseEntity<String> testCorsAllowed(){
        return ResponseEntity.ok("You should see this!");
    }

    @PostMapping("/cors")
    public ResponseEntity<String> testCorsNotAllowed(){
        return ResponseEntity.ok("You should not see this!");
    }
}
