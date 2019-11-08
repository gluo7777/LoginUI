package org.login.app.server.page;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api")
public class DataController {
    @GetMapping("/user")
    public Object userInfo(){
        Map<String, Object> response = new ConcurrentHashMap<>();
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            response.put("username",((UserDetails)principal).getUsername());
        }
        return response;
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
