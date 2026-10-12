// =========================================
// Wedding Invitation
// Mohamed & Mariam
// =========================================


// =========================================
// العناصر
// =========================================

const openBtn = document.getElementById("openBtn");
const welcomeScreen = document.getElementById("welcomeScreen");
const content = document.querySelector(".content");

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

const shareBtn = document.getElementById("shareBtn");


// =========================================
// فتح الدعوة
// =========================================

openBtn.addEventListener("click", function(){

    welcomeScreen.style.opacity = "0";

    setTimeout(function(){

        welcomeScreen.style.display = "none";

        content.style.display = "block";

        if(music){

            music.play().catch(function(){});

        }

        startHearts();

        revealElements();

    },800);

});


// =========================================
// الموسيقى
// =========================================

musicBtn.addEventListener("click",function(){

    if(music.paused){

        music.play().catch(function(){});

        musicBtn.innerHTML =
            '<i class="fa-solid fa-volume-high"></i>';

    }else{

        music.pause();

        musicBtn.innerHTML =
            '<i class="fa-solid fa-volume-xmark"></i>';

    }

});


// =========================================
// مشاركة الدعوة
// =========================================

shareBtn.addEventListener("click",async function(){

    const shareData = {

        title:"محمد & مريم - دعوة الزفاف",

        text:"يسعدنا دعوتكم لمشاركة فرحتنا ❤️",

        url:window.location.href

    };


    if(navigator.share){

        try{

            await navigator.share(shareData);

        }catch(error){}

    }else{

        try{

            await navigator.clipboard.writeText(
                window.location.href
            );

            alert("تم نسخ رابط الدعوة ❤️");

        }catch(error){

            alert("انسخ رابط الصفحة من المتصفح وشاركه مع ضيوفك.");

        }

    }

});


// =========================================
// القلوب المتحركة
// =========================================

let heartInterval = null;


function createHeart(){

    const heart = document.createElement("div");

    heart.className = "heart";

    heart.innerHTML =
        '<i class="fa-solid fa-heart"></i>';

    heart.style.left =
        Math.random() * 100 + "vw";

    heart.style.top = "-30px";

    heart.style.color =
        "#c4a05b";

    heart.style.fontSize =
        10 + Math.random() * 14 + "px";

    heart.style.opacity =
        0.15 + Math.random() * 0.4;

    document.body.appendChild(heart);


    const duration =
        5000 + Math.random() * 4000;


    const startX =
        Math.random() * 60 - 30;


    const endX =
        Math.random() * 100 - 50;


    const animation = heart.animate(

        [

            {
                transform:
                    `translate(${startX}px,0) rotate(0deg)`
            },

            {
                transform:
                    `translate(${endX}px,110vh) rotate(360deg)`
            }

        ],

        {

            duration:duration,

            easing:"linear"

        }

    );


    animation.onfinish = function(){

        heart.remove();

    };

}


function startHearts(){

    if(heartInterval) return;

    createHeart();

    heartInterval =
        setInterval(createHeart,1200);

}


// =========================================
// العد التنازلي
// =========================================

const weddingDate =
    new Date(
        "November 20, 2026 19:00:00"
    ).getTime();


function updateCountdown(){

    const now =
        new Date().getTime();

    const distance =
        weddingDate - now;


    const days =
        document.getElementById("days");

    const hours =
        document.getElementById("hours");

    const minutes =
        document.getElementById("minutes");

    const seconds =
        document.getElementById("seconds");


    if(distance <= 0){

        days.textContent = "00";
        hours.textContent = "00";
        minutes.textContent = "00";
        seconds.textContent = "00";

        document.querySelector(
            ".countdown-section h2"
        ).textContent =
            "اليوم هو يومنا الكبير ❤️";

        return;

    }


    const d =
        Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
        );


    const h =
        Math.floor(
            (distance %
            (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );


    const m =
        Math.floor(
            (distance %
            (1000 * 60 * 60)) /
            (1000 * 60)
        );


    const s =
        Math.floor(
            (distance %
            (1000 * 60)) /
            1000
        );


    days.textContent =
        String(d).padStart(2,"0");

    hours.textContent =
        String(h).padStart(2,"0");

    minutes.textContent =
        String(m).padStart(2,"0");

    seconds.textContent =
        String(s).padStart(2,"0");

}


updateCountdown();

setInterval(
    updateCountdown,
    1000
);


// =========================================
// RSVP
// =========================================

let rsvpList =
    JSON.parse(
        localStorage.getItem("weddingRSVP")
    ) || [];


function sendRSVP(status){

    const nameInput =
        document.getElementById("rsvpName");

    const result =
        document.getElementById("rsvpResult");


    const name =
        nameInput.value.trim();


    if(!name){

        result.textContent =
            "من فضلك اكتب اسمك أولًا ❤️";

        return;

    }


    rsvpList.unshift({

        name:name,

        status:status,

        date:
            new Date()
            .toLocaleDateString("ar-EG")

    });


    localStorage.setItem(
        "weddingRSVP",
        JSON.stringify(rsvpList)
    );


    if(status === "yes"){

        result.textContent =
            "شكرًا يا " + name +
            " ❤️ في انتظارك في يومنا الكبير!";

    }else{

        result.textContent =
            "شكرًا يا " + name +
            " ❤️ نتمنى أن نراك في مناسبة قادمة.";

    }


    nameInput.value = "";

}


// =========================================
// الرسائل
// =========================================

let messages =
    JSON.parse(
        localStorage.getItem("weddingMessages")
    ) || [];


function sendMessage(){

    const name =
        document.getElementById("name")
        .value
        .trim();


    const message =
        document.getElementById("message")
        .value
        .trim();


    if(!name || !message){

        alert(
            "من فضلك اكتب اسمك ورسالتك ❤️"
        );

        return;

    }


    messages.unshift({

        name:name,

        message:message,

        date:
            new Date()
            .toLocaleDateString("ar-EG")

    });


    localStorage.setItem(
        "weddingMessages",
        JSON.stringify(messages)
    );


    document.getElementById("name").value = "";

    document.getElementById("message").value = "";


    alert(
        "تم إرسال تهنئتك بنجاح ❤️"
    );

}


// =========================================
// أرشيف التهاني
// =========================================

function openArchive(){

    const passwordBox =
        document.getElementById(
            "passwordBox"
        );


    passwordBox.style.display =
        passwordBox.style.display === "block"
            ? "none"
            : "block";

}


function checkArchivePassword(){

    const password =
        document.getElementById(
            "archivePassword"
        ).value;


    const passwordError =
        document.getElementById(
            "passwordError"
        );


    // غيّر كلمة المرور هنا
    const correctPassword =
        "1234";


    if(password === correctPassword){

        passwordError.textContent = "";


        document.getElementById(
            "allMessages"
        ).style.display = "block";


        showMessages();

    }else{

        passwordError.textContent =
            "كلمة المرور غير صحيحة";

    }

}


function showMessages(){

    const allMessages =
        document.getElementById(
            "allMessages"
        );


    allMessages.innerHTML = "";


    if(messages.length === 0){

        allMessages.innerHTML =
            `
            <p class="empty-messages">
                لا توجد تهنئات حتى الآن ❤️
            </p>
            `;

        return;

    }


    messages.forEach(function(item){

        const msg =
            document.createElement("div");

        msg.className = "msg";


        const title =
            document.createElement("h3");

        title.textContent =
            "♥ " + item.name;


        const text =
            document.createElement("p");

        text.textContent =
            item.message;


        const date =
            document.createElement("small");

        date.textContent =
            item.date;


        msg.appendChild(title);

        msg.appendChild(text);

        msg.appendChild(date);


        allMessages.appendChild(msg);

    });

}


// =========================================
// Gallery Lightbox
// =========================================

const galleryItems =
    document.querySelectorAll(
        ".gallery-item"
    );


const lightbox =
    document.getElementById(
        "lightbox"
    );


const lightboxImage =
    document.getElementById(
        "lightboxImage"
    );


const closeLightbox =
    document.getElementById(
        "closeLightbox"
    );


const prevImage =
    document.getElementById(
        "prevImage"
    );


const nextImage =
    document.getElementById(
        "nextImage"
    );


const galleryImages =
    Array.from(
        document.querySelectorAll(
            ".gallery-item img"
        )
    );


let currentImage = 0;


galleryItems.forEach(
    function(item,index){

        item.addEventListener(
            "click",
            function(){

                currentImage = index;

                showLightboxImage();

                lightbox.classList.add(
                    "active"
                );

            }
        );

    }
);


function showLightboxImage(){

    lightboxImage.src =
        galleryImages[
            currentImage
        ].src;

}


closeLightbox.addEventListener(
    "click",
    function(){

        lightbox.classList.remove(
            "active"
        );

    }
);


prevImage.addEventListener(
    "click",
    function(){

        currentImage--;

        if(currentImage < 0){

            currentImage =
                galleryImages.length - 1;

        }

        showLightboxImage();

    }
);


nextImage.addEventListener(
    "click",
    function(){

        currentImage++;

        if(
            currentImage >=
            galleryImages.length
        ){

            currentImage = 0;

        }

        showLightboxImage();

    }
);


lightbox.addEventListener(
    "click",
    function(e){

        if(e.target === lightbox){

            lightbox.classList.remove(
                "active"
            );

        }

    }
);


document.addEventListener(
    "keydown",
    function(e){

        if(
            !lightbox.classList.contains(
                "active"
            )
        ){

            return;

        }


        if(e.key === "Escape"){

            lightbox.classList.remove(
                "active"
            );

        }


        if(e.key === "ArrowLeft"){

            nextImage.click();

        }


        if(e.key === "ArrowRight"){

            prevImage.click();

        }

    }
);


// =========================================
// Scroll Reveal
// =========================================

const revealTargets =
    document.querySelectorAll(
        ".quick-box, .detail-card, .timeline-item, .gallery-item, .rsvp-box, .message-form, .thanks"
    );


revealTargets.forEach(
    function(element){

        element.classList.add("reveal");

    }
);


function revealElements(){

    revealTargets.forEach(
        function(element){

            const position =
                element.getBoundingClientRect()
                .top;


            if(
                position <
                window.innerHeight - 80
            ){

                element.classList.add(
                    "show"
                );

            }

        }
    );

}


window.addEventListener(
    "scroll",
    revealElements
);


// =========================================
// تنظيف القلوب
// =========================================

window.addEventListener(
    "beforeunload",
    function(){

        if(heartInterval){

            clearInterval(
                heartInterval
            );

        }

    }
);


// =========================================
// Console
// =========================================

console.log(
    "Mohamed & Mariam Wedding Invitation Loaded ❤️"
);
