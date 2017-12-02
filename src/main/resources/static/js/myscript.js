(function () {
    'use strict'
    window.addEventListener('load', doIt)

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

    function doIt() {
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
            b.setAttribute('class', 'button')
            b.setAttribute('class', 'pure-button-primary')
            b.setAttribute('id', 'delete' + item.id)
            b.innerHTML = "Delete";

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
            }
            tr.appendChild(td3)

            if (user == "viewer") {
                document.getElementById("formbtn").style.visibility = "hidden"
            } else {
                document.getElementById("formbtn").style.visibility = "visible"
                document.getElementById('delete' + item.id).addEventListener('click', deleteIt);
            }
            document.getElementById("form").style.display = "none"
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


