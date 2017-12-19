package fi.company;

import javax.persistence.*;

@Entity
public class BlogComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    private BlogEntry blogEntry;
    private long blogid;
    private String header;
    private String text;
    private String writer;
    private String date;

    public BlogComment() {
    }


    public BlogComment(long id, BlogEntry blogEntry, long blogid, String header, String text, String writer, String date) {
        this.id = id;
        this.blogEntry = blogEntry;
        this.blogid = blogid;
        this.header = header;
        this.text = text;
        this.writer = writer;
        this.date = date;
    }

    @Override
    public String toString() {
        return "BlogComment{" +
                "id=" + id +
                ", blogEntry" + blogEntry +
                ", blogid=" + blogid +
                ", header='" + header + '\'' +
                ", text='" + text + '\'' +
                ", writer='" + writer + '\'' +
                ", date='" + date + '\'' +
                '}';
    }

    public BlogEntry getBlogEntry() {
        return blogEntry;
    }

    public void setBlogEntry(BlogEntry blogentry) {
        this.blogEntry = blogentry;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getBlogid() {
        return blogid;
    }

    public void setBlogid(long blogid) {
        this.blogid = blogid;
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

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }


}
