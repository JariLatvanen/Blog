package fi.company;

import javax.persistence.*;
import javax.xml.stream.events.Comment;
import java.util.Set;

@Entity
public class BlogEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String header;
    private String text;
    private String writer;
    private String date;
    @OneToMany(mappedBy = "blogEntry", cascade = CascadeType.ALL)
    private Set<BlogComment> comments;


    public BlogEntry() {
    }

    public BlogEntry(String header, String text, String writer, String date) {
        this.header = header;
        this.text = text;
        this.writer = writer;
        this.date = date;
    }


    public Set<BlogComment> getComments() {
        System.out.println("get comments (blogentry)");
        System.out.println(comments);
        return comments;
    }

    public void setComments(Set<BlogComment> comments) {
        this.comments = comments;
    }


    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getHeader() {
        return header;
    }

    public void setHeader(String header) {
        this.header = header;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getWriter() {
        return writer;
    }

    public void setWriter(String writer) {
        this.writer = writer;
    }

    @Override
    public String toString() {
        String result ="BlogEntry" + "id=" + id +", header='" + header + "!";

        if (comments != null) {
            System.out.println("here");
            System.out.println(comments.isEmpty());

            for (BlogComment comment : comments) {
                result += String.format(
                        "Comment[id=%d, name='%s',text='%s']%n",
                        comment.getId(), comment.getHeader(),comment.getText());
            }
        }

        return result;
    }
}

