package fi.company;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.servlet.ModelAndView;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;



@Controller

public class MyRestController {
    @Autowired
    BlogRepository database;

    @Autowired
    CommentRepository database2;


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



    @RequestMapping(value = "/blogpost/delete{id}", method = RequestMethod.DELETE)
    public @ResponseBody
    String delEntry(@PathVariable long id) {
        database.delete(id);
        return null;
    }

    @RequestMapping(value = "/blogpost/get{id}", method = RequestMethod.GET)
    public @ResponseBody
    BlogEntry findOne(@PathVariable long id) {
        return database.findOne(id);
    }

    @RequestMapping(value = "/blogpost", method = RequestMethod.POST)
    public String saveBlogEntry(BlogEntry b) {
        System.out.println(b);
        Date date = new Date();
        b.setDate(date.toString());
        database.save(b);
        return "view";
    }

    @RequestMapping(value = "/blogcomment", method = RequestMethod.POST)
    public String saveBlogComment(BlogComment c) {
        System.out.println("blog comment");
        System.out.println(c);
        Date date = new Date();
        c.setDate(date.toString());
        database2.save(c);
        return "view";
    }


    @RequestMapping(value = "/blogpost/comments{id}", method = RequestMethod.GET)
    public @ResponseBody
    Iterable<BlogComment> findComments(@PathVariable long id) {
        System.out.println("get");
        return database2.findAll();
    }

    @RequestMapping(value = "/blogcomment/getcom{id}", method = RequestMethod.GET)
    public @ResponseBody
    BlogComment findComm(@PathVariable long id) {
        return database2.findOne(id);
    }


    @RequestMapping(value = "/blogcomment/deletecom{id}", method = RequestMethod.DELETE)
    public @ResponseBody
    String delComment(@PathVariable long id) {
        database2.delete(id);
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
        blogEntry3.setText("Add commenting of blog entry. Improve error handling.");
        blogEntry3.setDate(date.toString());
        database.save(blogEntry3);

        BlogEntry blogEntry4 = new BlogEntry();
        blogEntry4.setHeader("Free-text search added");
        blogEntry4.setWriter("Jari");
        blogEntry4.setText("Free-text search now available.");
        blogEntry4.setDate(date.toString());

        BlogComment blogComm = new BlogComment();
        blogComm.setBlogid(4);
        blogComm.setHeader("Blog comment added");
        blogComm.setWriter("Jari");
        blogComm.setText("Free-text search now available.");
        blogComm.setDate(date.toString());

        BlogComment blogComm2 = new BlogComment();
        blogComm2.setBlogid(4);
        blogComm2.setHeader("Blog comment #2 added");
        blogComm2.setWriter("Jari");
        blogComm2.setText("Comment for item #4");
        blogComm2.setDate(date.toString());


        Set comments = new HashSet<BlogComment>(){{
            add(blogComm);
            add(blogComm2);
        }};

        blogEntry4.setComments(comments);
        System.out.println(blogEntry4);
        //ei tallenna kommentteja
        database.save(blogEntry4);
        database2.save(comments); //tallentaa
    }


}




