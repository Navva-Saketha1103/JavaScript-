let x = new URLSearchParams(location.search);

let did = x.get('id');
let container = document.querySelector('.container');
url = "https://jsonplaceholder.typicode.com/posts?userId=" + did;
fetch(url)
    .then(function(req) {
        return req.json();
    }).then(function(data) {
        let pid = ((did - 1) * 10) + 1;
        for (let i = 0; i < data.length; i++) {

            function create(element) {
                let x = document.createElement(element);
                return x;
            }

            function setAttr(element, attr1, attr2) {
                element.setAttribute(attr1, attr2);
            }

            let label = create('label');
            setAttr(label, "class", "label");
            let input = create("input");
            input.setAttribute("type", "checkbox");

            input.addEventListener("click", () => {
                let input = document.querySelectorAll('input:checked');
                if (input.length > 1) {
                    let delete_button = document.querySelector(".Button");
                    delete_button.classList.add("active");
                } else {
                    delete_button.classList.remove("active");
                }
            })

            setAttr(input, "class", "cb1");
            let box = create('div');
            setAttr(box, "class", "box");
            let bin = create("a");
            setAttr(bin, "class", "fa fa-trash-o");
            setAttr(bin, "data-del-icon", "#popup");

            bin.addEventListener('click', () => {
                let popup = document.querySelector("#popup");
                open(popup);
            })

            let edit = create("a");
            setAttr(bin, "href", "#");
            edit.setAttribute("class", "fa fa-edit");
            let diva = create("div");
            diva.setAttribute("class", "de");

            let title = create("div");
            title.setAttribute("class", "title");
            let body = create("div");
            body.setAttribute("class", "body");

            let divb = create("div");
            divb.setAttribute("class", "d");

            let comment = create("div");
            comment.setAttribute("class", "ch");
            let comments_3 = create("div");
            comments_3.setAttribute("class", "comments");


            title.textContent = data[i].title;
            body.textContent = data[i].body;
            comment.textContent = "Comments:";


            url = "https://jsonplaceholder.typicode.com/comments?postId=" + (pid + i);
            fetch(url)
                .then(function(res) {
                    return res.json();
                }).then(function(res) {
                    for (let i = 0; i < 3; i++) {
                        let name = create("div");
                        let body = create("div");
                        let email = create("div");


                        name.innerHTML = "<b>Name: </b>" + res[i].name;
                        body.innerHTML = "<b>Body: </b>" + res[i].body;
                        email.innerHTML = "<b>Email: </b>" + res[i].email;


                        let s_no = create("div");
                        s_no.setAttribute("class", "c1");
                        s_no.textContent = (i + 1) + ".";

                        let content = create("div");
                        content.setAttribute("class", "cd");

                        let Comment_box = create("div");
                        Comment_box.setAttribute("class", "c");

                        content.append(name);
                        content.append(body);
                        content.append(email);

                        Comment_box.append(s_no);
                        Comment_box.append(content);

                        comments_3.append(Comment_box);
                    }
                })
            label.append(input);

            diva.append(bin);
            diva.append(edit);

            box.append(diva);

            divb.append(title);
            divb.append(body);

            box.append(divb);

            box.append(comment);
            box.append(comments_3);

            label.append(box);
            container.append(label);

        }


        //Selects close modal, delete card buttons in Alert modal.
        let icon_popup_clse = document.querySelectorAll('[data-icon-popup-close]');
        let icon_popup_dele = document.querySelectorAll('[data-icon-popup-delete]');

        //To close the modal when we don't want to delete the selected card for now.
        icon_popup_clse.forEach(cls => {
            cls.addEventListener('click', () => {
                let cls = document.querySelector(".popup");
                close(cls);
                let input = document.querySelector('input:checked');
                if (input != null) {
                    input.checked = false;
                    let delete_button = document.querySelector(".Button.active");
                    delete_button.classList.remove("active");
                }
            })
        })

        //To delete the selected card.
        icon_popup_dele.forEach(dl => {
            dl.addEventListener('click', () => {
                let cls = document.querySelector(".popup");
                close(cls);
                let input = document.querySelector("input:checked");
                if (input != null) {
                    input.checked = false;
                    label = input.parentNode;
                    label.classList.add("hide");
                    let delete_button = document.querySelector(".Button.active");
                    delete_button.classList.remove("active");
                }
            })
        })

        let overlay = document.querySelector("#overlay");
        //Open delete alert popup
        function open(popup) {
            if (popup == null) {
                return;
            }
            popup.classList.add('active');
            overlay.classList.add('active');
        }

        //Close delete alert popup
        function close(popup) {
            if (popup == null) {
                return;
            }
            popup.classList.remove('active');
            overlay.classList.remove('active');
        }

        //Animation
        overlay.addEventListener("click", () => {
            let x = document.querySelector(".popup.active");
            if (x != null) {
                x.classList.add("mymove");
                setTimeout(() => x.classList.remove("mymove"), 1000);
            }
            let y = document.querySelector(".popup1.active");
            if (y != null) {
                y.classList.add("mymove");
                setTimeout(() => y.classList.remove("mymove"), 1000);
            }
        })

        //Selects delete button for deleting all selected cards.
        let delete_button = document.querySelector('.Button');

        //To display delete alert modal when we click on delete button
        delete_button.addEventListener("click", () => {
            let popup = document.querySelector("#popup1");
            open(popup);
        })

        //Selects close modal, delete card buttons in Alert modal.
        let close_delete_popup = document.querySelectorAll('[data-cls-button]');
        let delete_selected_cards = document.querySelectorAll('[data-dlt-button]');

        //To close the modal when we don't want to delete all the selected cards.
        close_delete_popup.forEach(cls => {
            cls.addEventListener('click', () => {
                let cls = document.querySelector(".popup1");
                close(cls);
                let input = document.querySelectorAll('input');
                input.forEach(inp => {
                    if (inp.checked) {
                        inp.checked = false;
                    }
                })
                let delete_button = document.querySelector(".Button.active");
                delete_button.classList.remove("active");
            })
        })

        //To delete all the selected cards
        delete_selected_cards.forEach(dl => {
            dl.addEventListener('click', () => {

                let cls = document.querySelector(".popup1");
                close(cls);

                let input = document.querySelectorAll('input');
                input.forEach(inp => {
                    if (inp.checked) {
                        let label = inp.closest(".label");
                        label.classList.add("hide");
                        inp.checked = false;
                    }
                })

                let inp_checked = document.querySelectorAll('input:checked');
                if (inp_checked.length == 0) {
                    delete_button.classList.remove("active");
                }
            })
        })
    })