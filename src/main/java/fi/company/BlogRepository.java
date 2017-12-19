package fi.company;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

interface BlogRepository extends CrudRepository<BlogEntry, Long> {

}

interface CommentRepository extends CrudRepository<BlogComment, Long> {
    List<BlogComment> findByBlogid(Long blogid);

}

