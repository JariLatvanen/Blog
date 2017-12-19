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
        console.log(json)
        createRow(json);
        })
    }


    function buildComments() {
    console.log("buildcomments")
        let burl = 'http://localhost:8080/blogpost/comments'
        fetch(burl).then((response) => response.json()).then((json) => {
        console.log(json)
        createCommentRow(json);
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
            header.setAttribute('class', 'post-title')
            header.innerHTML = item.header;

            let writer = document.createElement('a')
            writer.setAttribute('class', 'post')
            writer.setAttribute('class', 'post-writer')
            writer.innerHTML = item.writer + "  ";

            let delb = document.createElement('button')
            delb.setAttribute('class', 'pure-button-primary')
            delb.setAttribute('id', 'delete' + item.id)
            delb.innerHTML = "Delete  ";

            let modb = document.createElement('button')
            modb.setAttribute('class', 'pure-button-primary')
            modb.setAttribute('id', 'get' + item.id)
            modb.innerHTML = "Modify";

            let comb = document.createElement('button')
            comb.setAttribute('class', 'pure-button-primary')
            comb.setAttribute('id', 'comment' + item.id)
            comb.innerHTML = "Comment";

            let text = document.createElement('p')
            text.setAttribute('id', 'post' + item.id)
            text.setAttribute('class', 'post')
            text.setAttribute('class', 'post-description')
            text.innerHTML = item.text;

            let date = document.createElement('span')
            date.setAttribute('class', 'post')
            date.setAttribute('class', 'post-description')
            date.innerHTML = item.date + "   ";

            let h = document.createElement('h1')
            h.setAttribute('class', 'content-subhead')


            let tr = document.getElementById('main')
            section=tr.appendChild(section)
            section.appendChild(header)
            section.appendChild(writer)
            section.appendChild(date)
            if (user == "admin") {
                section.appendChild(delb)
                section.appendChild(modb)
                hideCommentBtn(item.id)
            }
            section.appendChild(comb)
            section.appendChild(text)
            section.appendChild(h)

            if (user == "viewer") {
                document.getElementById("formbtn").style.visibility = "hidden"
            } else {
                document.getElementById("formbtn").style.visibility = "visible"
                document.getElementById('delete' + item.id).addEventListener('click', deleteIt);
                document.getElementById('get' + item.id).addEventListener('click', modifyIt);
            }

            document.getElementById('comment' + item.id).addEventListener('click', commentIt);

            document.getElementById("form").style.display = "none"
            document.getElementById("modform").style.display = "none"
            document.getElementById("comform").style.display = "none"

        }
//        document.getElementById('searchtxt').addEventListener('onsearch', search);
//        document.getElementById('search').addEventListener('click', search);
          buildComments();
    }

    /**
    * delete blog entry
    *
    */

    function createCommentRow(json) {
        for (let item of json) {
            posts++;
            let section = document.createElement('com_section')
            section.setAttribute('id', 'com_section' + item.blogid)


            let header = document.createElement('header')
            header.setAttribute('id', 'header' + item.blogid)
            header.setAttribute('class', 'post')
            header.setAttribute('class', 'comm-title')
            header.innerHTML = item.header;

            let writer = document.createElement('a')
            writer.setAttribute('class', 'post')
            writer.setAttribute('class', 'post-writer')
            writer.innerHTML = item.writer + "  ";

            let delb = document.createElement('button')
            delb.setAttribute('class', 'button-xsmall pure-button-secondary')
            delb.setAttribute('id', 'deletecom' + item.id)
            delb.innerHTML = "Delete  ";

            let modb = document.createElement('button')
            modb.setAttribute('class', 'button-xsmall pure-button-secondary')
            modb.setAttribute('id', 'getcom' + item.id)
            modb.innerHTML = "Modify";

            let text = document.createElement('p')
            text.setAttribute('id', 'post' + item.blogid)
            text.setAttribute('class', 'post')
            text.setAttribute('class', 'post-description')
            text.innerHTML = item.text;

            let date = document.createElement('span')
            date.setAttribute('class', 'post')
            date.setAttribute('class', 'post-description')
            date.innerHTML = item.date + "   ";

            let h = document.createElement('h1')
            h.setAttribute('class', 'content-subhead')

            console.log('section'+item.blogid)
            let tr = document.getElementById('section'+item.blogid)
            section=tr.appendChild(section)
            section.appendChild(header)
            section.appendChild(writer)
            section.appendChild(date)

            section.appendChild(delb)
            section.appendChild(modb)

            section.appendChild(text)
            section.appendChild(h)

            if (user == "viewer") {
                document.getElementById("formbtn").style.visibility = "hidden"
            } else {
                document.getElementById("formbtn").style.visibility = "visible"
            }
            document.getElementById('deletecom' + item.id).addEventListener('click', deleteIt);
            document.getElementById('getcom' + item.id).addEventListener('click', modifyCom);


            document.getElementById("form").style.display = "none"
            document.getElementById("modform").style.display = "none"
            document.getElementById("comform").style.display = "none"

        }
    }


    function deleteIt(e) {
        var url=''
        var secid=0;
        console.log("del:"+ e.target.id)
        if (e.target.id.search("com") < 0) {
        url = "http://localhost:8080/blogpost/"
        } else
        {
        url = "http://localhost:8080/blogcomment/"
        }
        var xmlobj = new XMLHttpRequest();
        xmlobj.open("DELETE", url + e.target.id, true);
        xmlobj.send();

        window.location.href = "http://localhost:8080/index";
    }

    /**
    * modify blog entry
    *
    */

    function modifyIt(e) {
     var url=''
     console.log("mod:"+ e.target.id)
        if (e.target.id.search("com") < 0) {
        url = "http://localhost:8080/blogpost/"
        } else
        {
        url = "http://localhost:8080/blogcomment/"
        }

    let burl = url + e.target.id
    console.log(burl)

    fetch(burl).then((response) => response.json()).then((json) => {
    document.getElementById("modid").value=json.id ;
    document.getElementById("modid").style.display = "none";
    document.getElementById("header").value=json.header ;

    document.getElementById("writer").value=json.writer ;
    document.getElementById("text").value=json.text ;
    })
    showModform();
    }

    function modifyCom(e) {
     var url=''
     console.log("mod:"+ e.target.id)
        if (e.target.id.search("com") < 0) {
        url = "http://localhost:8080/blogpost/"
        } else
        {
        url = "http://localhost:8080/blogcomment/"
        }

    let burl = url + e.target.id
    console.log(burl)

    fetch(burl).then((response) => response.json()).then((json) => {
    console.log(json)
    document.getElementById("comid").disabled = ""
    document.getElementById("comid").value=json.id ;
    document.getElementById("comid").style.display = "none";
    document.getElementById("blogid").value=json.blogid ;
//    document.getElementById("comheader").value=json.header ;

    document.getElementById("comwriter").value=json.writer ;
    document.getElementById("comtext").value=json.text ;
    })
    showComform();
    }



   function commentIt(e) {
    document.getElementById("blogid").value=e.target.id.substring(7)
    document.getElementById("comid").disabled = "true"
    showComform();
    }

    function hideCommentBtn(id) {
        let burl = 'http://localhost:8080/blogpost/comments/'+id
        fetch(burl).then((response) => response.json()).then((json) => {
        console.log(json.length)
            if (json.length >0) {
            document.getElementById('delete' + id).style.display = "none"
            }
        })
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
        document.getElementById("comform").style.display = "none"
        document.getElementById("main").style.display = "none"
    }

    function showModform() {
        document.getElementById("modform").style.display = ""
        document.getElementById("form").style.display = "none"
        document.getElementById("comform").style.display = "none"
        document.getElementById("main").style.display = "none"

    }

    function showComform() {
        document.getElementById("modform").style.display = "none"
        document.getElementById("form").style.display = "none"
        document.getElementById("comform").style.display = ""
        document.getElementById("main").style.display = "none"
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


