let openbuttons = document.querySelectorAll('[data-popup-button]');
let closebuttons = document.querySelectorAll('[data-close-button]');
let overlay = document.getElementById('overlay');

openbuttons.forEach(button => {
    button.addEventListener('click', () => {
        let popup = document.querySelector(button.dataset.popupButton)
        open(popup);
    })
})

closebuttons.forEach(button => {
    button.addEventListener('click', () => {
        let popup = button.closest('.popup');
        close(popup);
    })
})

//Animation
overlay.addEventListener("click",()=>{
    let x = document.querySelectorAll(".popup.active");
    x.forEach(popup=>{
        if(popup != null){
            popup.classList.add("mymove");
            setTimeout(()=>popup.classList.remove("mymove"),1000);
        }
    })
})

function open(popup){
    if(popup == null){
        return;
    }
    popup.classList.add('active');
    overlay.classList.add('active');
}

function close(popup){
    if(popup == null){
        return;
    }
    popup.classList.remove('active');
    overlay.classList.remove('active');
}

