(function () {
    'use strict'
    window.addEventListener('load',  buildPage)

    var user = "viewer"

    /**
    * get user info from cookie and get blogpost data (json)
    *
    */

    function startView() {
        var x = document.cookie;
        user = x.substring(5, x.length);

        let burl = 'http://localhost:8080/blogpost'
        fetch(burl).then((response) => response.json()).then((json) => {
        })
    }

    function buildPage() {
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
            let td1 = document.createElement('section')
            td1.setAttribute('class', 'post')
            td1.setAttribute('class', 'post-title')
            td1.innerHTML = item.header;

            let td2 = document.createElement('a')
            td2.setAttribute('class', 'post')
            td2.setAttribute('class', 'post-writer')
            td2.innerHTML = item.writer + "  ";

            let b = document.createElement('a')
            b.setAttribute('class', 'delbtn')
//            b.setAttribute('class', 'button')
            b.setAttribute('class', 'pure-button-primary')
            b.setAttribute('id', 'delete' + item.id)
            b.innerHTML = "Delete  ";

            let b2 = document.createElement('a')
            b2.setAttribute('class', 'modbtn')
//            b2.setAttribute('class', 'button')
            b2.setAttribute('class', 'pure-button-primary')
            b2.setAttribute('id', 'get' + item.id)
            b2.innerHTML = "Modify";

            let td3 = document.createElement('p')
            td3.setAttribute('class', 'post')
            td3.setAttribute('class', 'post-description')
            td3.innerHTML = item.text;

            let td4 = document.createElement('span')
            td4.setAttribute('class', 'post')
            td4.setAttribute('class', 'post-description')
            td4.innerHTML = item.date + "   ";

            let tr = document.getElementById('main')
            tr.appendChild(td1)
            tr.appendChild(td2)
            tr.appendChild(td4)
            if (user == "admin") {
                tr.appendChild(b)
                tr.appendChild(b2)
            }
            tr.appendChild(td3)

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
    console.log("modify" + e.target.id);

    let burl = 'http://localhost:8080/blogpost/' + e.target.id
            fetch(burl).then((response) => response.json()).then((json) => {
    console.log(json);
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
    * add event listeners
    *
    */
    window.addEventListener('load', (event) => {
        startView()
        document.getElementById('admin').addEventListener('click', userChange);
        document.getElementById('viewer').addEventListener('click', userChange);
        document.getElementById('formbtn').addEventListener('click', showForm);
    })

}())


