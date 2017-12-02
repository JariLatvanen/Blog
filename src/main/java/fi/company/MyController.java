package fi.company;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.PostConstruct;

// This class acts as a controller.
// Usually when using @Controller, you will use also @RequestMapping
@Controller
public class MyController {

    @RequestMapping("/index")
    public String greeting() {
        return "view";
    }

    @RequestMapping("/blogform")
    public String showform() {
        return "view2";
    }

}