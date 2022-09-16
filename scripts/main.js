//подключение анимаций WOW js
new WOW({
    animateClass: 'animate__animated',
}).init();

//слайдер с видео
$('.carousel').slick({
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear'
});

//слайдер с отзывами
$(function () {
    if ($(window).width() < 1000) {
        $('.cards').slick({
            lazyLoad: 'ondemand',
            slidesToShow: 1,
            slidesToScroll: 1
        })
    } else $('.cards').slick({
        lazyLoad: 'ondemand',
        slidesToShow: 2,
        slidesToScroll: 1
    });
})

//скролл к меню
$(".button-menu").click(function () { // ID откуда кливаем
    $('html, body').animate({
        scrollTop: $(".menu-title").offset().top // класс объекта к которому приезжаем
    }, 1000); // Скорость прокрутки
});

//скролл к брони
$(".button-table").click(function () { // ID откуда кливаем
    $('html, body').animate({
        scrollTop: $(".booking").offset().top // класс объекта к которому приезжаем
    }, 1000); // Скорость прокрутки
});

//валидация полей
document.getElementById('booking-button').onclick = function () {
    let name = document.getElementById('name');
    let phone = document.getElementById('phone');
    let time = document.getElementById('time');
    let hasError = false;

    if (!name.value) {
        document.getElementById('name').style.borderColor = 'red';
        name.nextElementSibling.style.display = 'block'
        hasError = true;
    } else {
        document.getElementById('name').style.borderColor = '#ffffff';
        name.nextElementSibling.style.display = 'none'
    }
    if (!phone.value) {
        document.getElementById('phone').style.borderColor = 'red';
        phone.nextElementSibling.style.display = 'block'
        hasError = true;
    } else {
        document.getElementById('phone').style.borderColor = '#ffffff';
        phone.nextElementSibling.style.display = 'none'
    }
    if (!time.value) {
        document.getElementById('time').style.borderColor = 'red';
        time.nextElementSibling.style.display = 'block'
        hasError = true;
    } else {
        document.getElementById('time').style.borderColor = '#ffffff';
        time.nextElementSibling.style.display = 'none'
    }

    //POST запрос и лоадер
    if (hasError === false) {
        // loader.css('display', 'flex');
        $.ajax({
            method: "POST",
            url: 'https://testologia.site/checkout',
            data: {name: name.value, phone: phone.value, time: time.value}
        })
            .done(function (msg) {

                console.log(msg);

                if (msg.success) {
                    if ($(window).width() < 380) {
                        document.getElementById('tnx-mobile').style.display = 'block';
                    } else {
                        document.getElementById('actions').style.display = 'none';
                        document.getElementById('booking-title').style.display = 'none';
                        document.getElementById('tnx').style.display = 'block';
                    }

                } else {
                    alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ')
                }
                // loader.hide();
            })
    }
}

//запрет ввода в инпут времени
document.getElementById('time').disabled = true;

//выпадающий список
document.getElementById('input-time').onclick = function () {
    document.getElementById('current-times').style.display = 'grid';
    document.getElementById('time').style.backgroundColor = '#ffffff';
}

//вставка выбранного времени в инпут
function clickTime(id) {
    document.getElementById('current-times').style.display = 'none';
    let valueTime = document.getElementById(id).innerText;
    document.getElementById('time').value = valueTime;
    document.getElementById('time').style.backgroundColor = 'transparent';
}

//выпадающее бургерное меню
document.getElementById('burger').onclick = function () {
    document.getElementById('burger-menu').style.display = 'block'
}

//скрыть выпадающее меню
document.getElementById('burger-menu-close').onclick = function () {
    document.getElementById('burger-menu').style.display = 'none'
}

//закрыть мобильную форму "Спасибо"
document.getElementById('tnx-mobile-close').onclick = function () {
    document.getElementById('tnx-mobile').style.display = 'none'
}

//замена фона видео ПОЧЕМУ ТО НЕ РАБОТАЕТ
let videoBg = document.getElementsByClassName('ytp-cued-thumbnail-overlay-image');
videoBg.style.backgroundImage = "url('../images/video-background.png')"