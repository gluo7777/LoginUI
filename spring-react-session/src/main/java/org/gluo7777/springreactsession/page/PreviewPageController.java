package org.gluo7777.springreactsession.page;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/preview")
public class PreviewPageController {

    @GetMapping("/login-page")
    public String loginPage(){
        return "login";
    }
}
