package org.gluo7777.springreactsession.page;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/secure")
public class SecureAPIController {
    @GetMapping("/user")
    public Object userInfo(){
        Map<String, Object> response = new ConcurrentHashMap<>();
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            response.put("username",((UserDetails)principal).getUsername());
        }
        return response;
    }
}
