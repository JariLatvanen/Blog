package fi.company;


import org.springframework.stereotype.Service;

@Service
class HtmlHelperImpl implements htmlHelper {

    public String createH1(String title) {
        String s = "<h1>" + title + "</h1>";
        return s;
    }
}
