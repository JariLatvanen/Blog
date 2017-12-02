package fi.company;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.List;

@Controller

public class MyRestController {
    @Autowired
    BlogRepository database;

    @Autowired
    private HttpServletRequest request;

    @PostConstruct
    public void init() {
        initDb();
    }

    @RequestMapping(value = "/blogpost", method = RequestMethod.GET)
    public @ResponseBody
    Iterable<BlogEntry> findAll() {
        return database.findAll();
    }


    @RequestMapping(value = "/blogpost", method = RequestMethod.POST)
    public String saveBlogEntry(BlogEntry b) {
        Date date = new Date();
        b.setDate(date.toString());
        database.save(b);
        return b.toString();
    }

    @RequestMapping(value = "/blogpost/delete{id}", method = RequestMethod.DELETE)
    public @ResponseBody
    String delEntry(@PathVariable long id) {
        database.delete(id);
        return null;
    }

    public void initDb() {
        BlogEntry blogEntry = new BlogEntry();
        blogEntry.setHeader("Homework for Frontend mestari class");
        blogEntry.setWriter("Jari");
        blogEntry.setText("Assignement: Try to create a backend for a blogging site. So RESTful interface for adding, retrieving, deleting blog posts." +
                "You can also try to implement Front-end to the app.");
        Date date = new Date();
        blogEntry.setDate(date.toString());
        database.save(blogEntry);

        BlogEntry blogEntry2 = new BlogEntry();
        blogEntry2.setHeader("User profiles");
        blogEntry2.setWriter("Jari");
        blogEntry2.setText("The end user (viewer) can view blog texts. The admin user can add, remove and modify blog texts." +
                "No authentication at this point.");
        blogEntry2.setDate(date.toString());
        database.save(blogEntry2);

        BlogEntry blogEntry3 = new BlogEntry();
        blogEntry3.setHeader("ToDo");
        blogEntry3.setWriter("Jari");
        blogEntry3.setText("Add editing and commenting of blog entry. Add search capabilities and sorting." +
                "Improve error handling. ");
        blogEntry3.setDate(date.toString());
        database.save(blogEntry3);
    }

}

