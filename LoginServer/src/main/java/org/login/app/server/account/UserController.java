package org.login.app.server.account;

import org.login.app.server.security.Rules;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.security.RolesAllowed;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserRetrievalService userRetrievalService;

    @RolesAllowed(Rules.ROLE_USER)
    @GetMapping("/current")
    public User getLoggedInUser(){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = userDetails.getUsername();
        return userRetrievalService.retrieveUserDetails(username);
    }
}
