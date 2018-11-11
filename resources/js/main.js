// wanneer document helemaal geladen is init uitvoeren.
window.addEventListener("load", init);

// content laden.
function loadText(target, textfile) {
    // even tijdelijke tekst neer zetten.
    let elem = document.getElementById(target);
    elem.innerHTML = "aan het laden";
    // url waar het tekst bestand te vinden is.
    let url = "resources/txt/" + textfile;
    // een nieuwe request aanmaken
    let file = new XMLHttpRequest();
    // file aanvraag maken, true voor asynchrone aanvraag.
    file.open("GET", url, true);
    // wanneer geladen functie om bestand te gebruiken
    file.onload = function() {
        if (file.readyState === 4 && file.status === 200) {  // bestand gevonden en klaar om aan html gevoerd te worden.
            let myLoader = document.getElementById("idLoader");
            elem.removeChild(myLoader);
            let text = file.responseText;
            document.getElementById(target).innerHTML = text;
        }
    }
    let myLoader = document.createElement("div");
    myLoader.id = "idLoader";
    myLoader.className += "loader";
    elem.appendChild(myLoader);
    // file aanvraag versturen.
    file.send();
}

function navSelect(str) {
    switch (str) {
        case "me":
        loadText("idAside","contentMeLeft.txt");
        loadText("idMain","contentMeRight.txt");
        break;
        case "portfolio":
        loadText("idAside","portfolioLeft.txt");
        loadText("idMain","portfolioRight.txt");
        break;
        case "experience":
        loadText("idAside","experienceLeft.txt");
        loadText("idMain","experienceRight.txt")
        break;
        case "contact":
        loadText("idAside","contactLeft.txt");
        loadText("idMain","contactFormulier.txt")
        break;
    }
}

function startSlider() {
    var swiper = new Swiper('.swiper-container', {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
          delay: 3500,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
}


function init() {
    // beginnen met tekst laden in html
    loadText("idAside","contentMeLeft.txt");
    loadText("idMain","contentMeRight.txt");

    // CodeGorilla Logo en slogan animeren
    TweenMax.from("#idLogo", 2, {x:300, rotation:360, scale:0.0, opacity:0});
    TweenMax.from("#idSlogan", 2, {opacity:0, delay:2});
    
    startSlider();
    //F11 fullscreen listener
    //document.addEventListener("keypress",F_Elf_test)
}



/* F11 fullscreen listener functies TODO: kijken hoe je video weer fullscreen kan maken
function F_Elf_test(ev)
{
    var code = ev.keyCode || event.which;
    if (code == 122) {
        setTimeout(function(){checkWH();},1000);
   }
}

function checkWH(){
    if((window.outerWidth-screen.width) ==0 && (window.outerHeight-screen.height) ==0 ) {
        // fullscreen dus video schermvullend maken
        let varVideo = document.getElementById("idVideo");
        // hieronder werkt niet.
        varVideo.style.width = "100%";
        varVideo.style.height = "100%";
    }
}
*/
