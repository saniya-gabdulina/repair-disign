/*
document.addEventListener("DOMContentLoaded", function(event) {
    const modal = document.querySelector('.modal');
    const modalBtn = document.querySelectorAll('[data-toggle=modal]');
    const closeBtn = document.querySelector('.modal__close');
    const switchModal = () => {
        modal.classList.toggle('modal--visible');
    }
    modalBtn.forEach(element => {
        element.addEventListener('click', switchModal);
    });

    closeBtn.addEventListener('click', switchModal);

});
*/

$(document).ready(function () {
    var modal = $('.modal'),
        modalBtn = $('[data-toggle=modal]'),
        closeBtn = $('.modal__close');
  
    modalBtn.click(function () {
        modal.toggleClass('modal--visible');
    });
    closeBtn.on('click', function () {
        modal.toggleClass('modal--visible');
    });   

    var mySwiper = new Swiper ('.swiper-container', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
    })

    var next = $('.swiper-button-next');
    var prev = $('.swiper-button-prev');
    var bullets = $('.swiper-pagination');

    next.css('left', prev.width() + 10 + bullets.width() + 10)
    bullets.css('left', prev.width() + 10)

    new WOW().init();
    
    function lazyLoad() {
        let img = document.querySelectorAll('.lazyImg');
        img.forEach(item => {
            $(document).scroll(function () {
                if (($(document).scrollTop() + $(window).height()) > $(item).offset().top) {
                    let imgSrc = item.dataset.src;
                    item.src = imgSrc;
                }
            })
            $(document).ready(function () {
                if (($(document).scrollTop() + $(window).height()) > $(item).offset().top) {
                    let imgSrc = item.dataset.src;
                    item.src = imgSrc;
                }
            })
        })
    };

    $(document).scroll(function() {
        console.log($('.types .section-title__heading').offset());
        if (($(document).scrollTop() + $(window).height()) > $('.types .section-title__heading').offset().top) {
            $('.types .section-title__heading').addClass('myAnimation');
        }
    })

    $('.modal__form').validate({
        errorClass: "invalid",
        errorElement: "em",
        rules: {
            // строчное правило
            userName: {
                required: true,
                minlength: 2,
                maxlength: 15,
            },
            userPhone: "required",
            // правило-объект
            userEmail: {
              required: true,
              email: true
            }
        }, // сообщения при выводе ошибки
        messages: {
            userName: {
                required: "Имя обязательно",
                minlength: "Имя не короче 2 букв",
                maxlength: "Имя не длиннее 15 букв",
            }, 
            userPhone: "Телефон обязателен",
            userEmail: {
                required: "Обязательно укажите email",
                email: "Введите в формате: name@domain.com"
            }
        },
        submitHandler: function(form) {
            $.ajax({
                type: "POST",
                url: "send.php",
                data: $(form).serialize(),
                success: function (response) {
                    alert('Форма отправлена, мы свяжемся с вами через 10 минут');
                    $(form)[0].reset();
                    modal.removeClass('modal--visible');
                }
            });
        }
    });
    $('.footer__form').validate({
        errorClass: "invalid",
        errorElement: "div",
        rules: {
            // одно строчное правило
            userName: {
            required: true,
            minlength: 2,
            maxlength: 15
            },
            userPhone: "required",
            // правила-объект (блок правил)
            userEmail: {
                required: true,
                email: true
            }
        }, /* сообщения при выводе ошибки */
        messages: {
            userName: {
                required: "Имя обязательно",
                minlength: "Имя не короче 2 букв",
                maxlength: "Имя не длиннее 15 букв"
            },
            userPhone: "Телефон обязателен",
            }
          });
        
        $('.control__form').validate({
            errorClass: "invalid",
            errorElement: "div",
            rules: {
              // одно строчное правило
                userName: {
                required: true,
                minlength: 2,
                maxlength: 15
                },
                userPhone: "required",
                // правила-объект (блок правил)
                userEmail: {
                    required: true,
                    email: true
                }
            }, /* сообщения при выводе ошибки */
            messages: {
                userName: {
                    required: "Имя обязательно",
                    minlength: "Имя не короче 2 букв",
                    maxlength: "Имя не длиннее 15 букв"
                },
                userPhone: "Телефон обязателен",
            }
          });
    

    // Маска для телефона
    $('[type=tel]').mask('+7(000) 00-00-000', {placeholder: "+7 (___) ___-__-__"});
    
    var isAddedMap = false;

        $(window).scroll(function() {
            var el = $('.map');
            if ($(this).scrollTop() > el.offset().top - 800) {
                if(isAddedMap) return;
                isAddedMap = true;
                var script = document.createElement('script');
                script.src = "https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A3640a6472e0817484e41c82f3bab31623c39b2a8835bc6ba7b8029c7367f5a4f&amp;width=100%25&amp;height=100%&amp;lang=ru_RU&amp;scroll=false";
                el.append(script);
            };
        });
});
