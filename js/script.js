/*===== Scroll sections active link =====*/

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });
};

/*===== Sticky navbar =====*/

let header = document.querySelector('header');

header.classList.toggle('sticky', window.scrollY > 100);

/*===== Audio =====*/

function soundPlay(snd) {
    snd.currentTime = 0;
    snd.play();
}

/*===== Skill icons =====*/

let lastText = '';

function animateText(text) {
    if (text === lastText) {
        return;
    }

    if (typeof typed !== 'undefined') {
        typed.destroy();
    }

    typed = new Typed('#info', {
        strings: [text],
        typeSpeed: 5
    });

    lastText = text;
}

let canShowDescription = false;

window.addEventListener("click", () => {
    canShowDescription = true;
});

function formatIconMessage({title, subtitle, description}) {
    return `<span style="text-align: center; color: #AAFFFF"><h3>${title}</h3></span><br>
            <span style="text-align: center; color: #DDFFFF"><h4>${subtitle}</h4></span><br>
            ${description}`;
}

// default text
animateText(formatIconMessage({
    title: "⚙️ Skill Descriptions ⚙️",
    subtitle: "💡 Interact with the page to enable it!",
    description: "Move cursor around icons to get quick information about the use of these technologies in my projects."
}));

const iconSound = document.getElementById('icon-sound');

fetch('assets/data/iconMessages.json')
    .then(response => response.json())
    .then(iconMessages => {
        Object.keys(iconMessages).forEach(iconId => {
            const iconElement = document.getElementById(iconId);
            if (iconElement) {
                iconElement.addEventListener("mouseover", () => {
                    const message = formatIconMessage(iconMessages[iconId]);
                    if (canShowDescription) {
                        animateText(message);
                        soundPlay(iconSound);
                    }
                });
            }
        });
    })
    .catch(error => console.error('Error loading JSON file:', error));

/*===== Swiper =====*/

let swiper = new Swiper('.swiper-container', {
    cssMode: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    }
});

/*===== working contact form =====*/

let quill = new Quill('#message', {
    theme: 'snow',
    modules: {
        toolbar: [
            [{'size': ['small', false, 'large', 'huge']}],
            ['bold', 'italic', {'color': []}, {'background': []}],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            ['link']
        ]
    }
});

const form = document.querySelector("form");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const subject = document.getElementById("subject");

const clickSound = document.getElementById('click-sound');
const errorSound = document.getElementById('error-sound');
const sentSound = document.getElementById('sent-sound');

function sendEmail() {

    messageContent = "" + quill.root.innerHTML

    const bodyMessage = `Name: ${fullName.value} | Email: ${email.value}<br><br>
    ${messageContent}`;

    Email.send({
        SecureToken: "994aa8d0-ac86-4a96-8c32-437644b68062",
        To: "aryel.soares22@gmail.com",
        From: "aryel.soares22@gmail.com",
        Subject: subject.value,
        Body: bodyMessage
    }).then(
        message => {
            soundPlay(clickSound);
            if (message === "OK") {
                swal.fire({
                    title: "Success",
                    text: "Message sent successfully!",
                    icon: "success"
                });
                soundPlay(sentSound);
            } else {
                swal.fire({
                    title: "Error",
                    text: "Something went wrong!",
                    icon: "error"
                });
                soundPlay(errorSound);
            }
        }
    );
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    sendEmail();
});

form.addEventListener("reset", () => {
    quill.setText('');
});

/*===== ParticlesJS =====*/

particlesJS.load('particles-js', 'assets/data/particles.json', function() {
    console.log('callback - particles.js config loaded');
});

/*==== Audio events =====*/

document.querySelectorAll('.about-buttons .btn, .swiper-box a, .projects a').forEach(button => {
    button.addEventListener('click', () => {
        soundPlay(clickSound);
    });
});

const eraseSound = document.getElementById('erase-sound');

document.querySelector('.output .btn:last-of-type').addEventListener('click', () => {
    soundPlay(eraseSound);
});

const hoverSound = document.getElementById('hover-sound');

document.querySelectorAll('.navbar a').forEach(navbar => {
    navbar.addEventListener('click', () => {
        soundPlay(hoverSound);
    });
});

const swipeSound = document.getElementById('swipe-sound');

document.querySelector('.swiper-button-next').addEventListener('click', () => {
    soundPlay(swipeSound);
});

document.querySelector('.swiper-button-prev').addEventListener('click', () => {
    soundPlay(swipeSound);
});

document.querySelectorAll('.swiper-pagination-bullet').forEach(bullet => {
    bullet.addEventListener('click', () => {
        soundPlay(swipeSound);
    })
});