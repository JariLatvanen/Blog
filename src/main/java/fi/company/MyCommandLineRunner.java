package fi.company;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class MyCommandLineRunner implements CommandLineRunner {

    @Autowired
    htmlHelper hp;

    @Override
    public void run(String... strings) throws Exception {
        System.out.println( hp.createH1("hello") );


    }
}