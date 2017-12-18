(function () {
    'use strict'
    window.addEventListener('load',  startView)

    var user = "viewer"
    var posts=0;

    /**
    * get user info from cookie and get blogpost data (json)
    *
    */

    function startView() {
        var x = document.cookie;
        user = x.substring(5, x.length);
        if (user == "") {
        user = "viewer"
        }
        buildPage();
    }

    function buildPage() {
    console.log("build")
        let burl = 'http://localhost:8080/blogpost'
        fetch(burl).then((response) => response.json()).then((json) => {
            createRow(json);
        })
    }

    /**
    * build the page
    *
    */

    function createRow(json) {
        for (let item of json) {
            posts++;
            let section = document.createElement('section')
            section.setAttribute('id', 'section' + item.id)


            let header = document.createElement('header')
            header.setAttribute('id', 'header' + item.id)
            header.setAttribute('class', 'post')
            header.setAttribute('class', 'post-title')
            header.innerHTML = item.header;

            let writer = document.createElement('a')
            writer.setAttribute('class', 'post')
            writer.setAttribute('class', 'post-writer')
            writer.innerHTML = item.writer + "  ";

            let delb = document.createElement('a')
            delb.setAttribute('class', 'delbtn')
            delb.setAttribute('class', 'pure-button-primary')
            delb.setAttribute('id', 'delete' + item.id)
            delb.innerHTML = "Delete  ";

            let modb = document.createElement('a')
            modb.setAttribute('class', 'modbtn')
            modb.setAttribute('class', 'pure-button-primary')
            modb.setAttribute('id', 'get' + item.id)
            modb.innerHTML = "Modify";

            let text = document.createElement('p')
            text.setAttribute('id', 'post' + item.id)
            text.setAttribute('class', 'post')
            text.setAttribute('class', 'post-description')
            text.innerHTML = item.text;

            let date = document.createElement('span')
            date.setAttribute('class', 'post')
            date.setAttribute('class', 'post-description')
            date.innerHTML = item.date + "   ";

            let tr = document.getElementById('main')
            section=tr.appendChild(section)
            section.appendChild(header)
            section.appendChild(writer)
            section.appendChild(date)
            if (user == "admin") {
                tr.appendChild(delb)
                tr.appendChild(modb)
            }
            section.appendChild(text)

            if (user == "viewer") {
                document.getElementById("formbtn").style.visibility = "hidden"
            } else {
                document.getElementById("formbtn").style.visibility = "visible"
                document.getElementById('delete' + item.id).addEventListener('click', deleteIt);
                document.getElementById('get' + item.id).addEventListener('click', modifyIt);
            }
            document.getElementById("form").style.display = "none"
            document.getElementById("modform").style.display = "none"
        }
//        document.getElementById('searchtxt').addEventListener('onsearch', search);
//        document.getElementById('search').addEventListener('click', search);

    }

    /**
    * delete blog entry
    *
    */

    function deleteIt(e) {
        var xmlobj = new XMLHttpRequest();
        xmlobj.open("DELETE", "http://localhost:8080/blogpost/" + e.target.id, true);
        xmlobj.send();
        window.location.href = "http://localhost:8080/index";
    }

    /**
    * modify blog entry
    *
    */

    function modifyIt(e) {
    let burl = 'http://localhost:8080/blogpost/' + e.target.id
            fetch(burl).then((response) => response.json()).then((json) => {
    document.getElementById("modid").value=json.id ;
    document.getElementById("modid").style.display = "none";
    document.getElementById("header").value=json.header ;

    document.getElementById("writer").value=json.writer ;
    document.getElementById("text").value=json.text ;
    })
    showModform();

    }


   /**
    * change user: admin or viewer
    *
    */
    function userChange(e) {
        var user = e.target.id
        document.cookie = "user=" + user;
        window.location.href = "http://localhost:8080/index";
    }

    function showForm() {
        document.getElementById("form").style.display = ""
        document.getElementById("modform").style.display = "none"
    }

    function showModform() {
        document.getElementById("modform").style.display = ""
        document.getElementById("form").style.display = "none"
    }

 /**
    * freetext search on header and blogtext
    *
    */
   function search() {
    var i=1;
    var text='';
    var searchtext=document.getElementById("searchtxt").value;

    for (i=1; i <= posts; i++) {
        text = document.getElementById("post"+i).innerHTML + document.getElementById("header"+i).innerHTML
        document.getElementById("section"+i).style.display = "none"
    if (text.indexOf(searchtext) !== -1) {
        document.getElementById("section"+i).style.display = ""
        }
    }
   }
    /**
    * add event listeners
    *
    */
    window.addEventListener('load', (event) => {

//        console.log("window add event listener")
//        startView()
        document.getElementById('admin').addEventListener('click', userChange);
        document.getElementById('viewer').addEventListener('click', userChange);
        document.getElementById('formbtn').addEventListener('click', showForm);

        document.getElementById('searchtxt').addEventListener('keydown', search);
//        document.getElementById('search').addEventListener('click', search);

    })

}())


