//Бургер
$(document).ready(function(){
    $('.header__burger').click(function name(event) {
        $('.header__burger,.header__menu').toggleClass('burger-active');
    });
});

//анимация табов
const tabsBtn = Array.from(document.querySelectorAll('#tab__btn'));
const tabIndicator = document.querySelector('#tab__indicator');
const tabItem = Array.from(document.querySelectorAll('#tab__item'));

tabsBtn[0].classList.add('active-btn');
tabItem[0].classList.add('active-tab');

let activeBtn = tabsBtn[0];
let activeItem = tabItem[0];

tabsBtn.forEach((el) =>{
    el.addEventListener('click', onTabBtnClick);
});

function onTabBtnClick(e) {
    tabItem.forEach((el) =>{
        el.classList.remove('active-tab');
    });
    e.preventDefault();
    const btn = e.target.closest('#tab__btn');
    changeBtn(btn);
}

function changeBtn(btn) {
    if(btn.classList.contains('active-btn')){
        return;
    }
    activeBtn.classList.remove('active-btn');
    btn.classList.add('active-btn');
    activeBtn = btn;
    changeIndicator(btn);
}

function changeIndicator(btn){
    const indexBtn = tabsBtn.indexOf(btn);
    tabIndicator.style.left = `calc(${indexBtn}*100%/3)`;
    changeSlide(indexBtn)
}
function changeSlide(index){
    activeItem.classList.remove('active-tab');
    tabItem[index].classList.add('active-tab');
    activeItem = tabItem[index];
}

// Отдельные кнопки на странице, которые работают с табами
// Скролл
const tabAboutBtn = document.querySelector('#tab__about__btn');
const tabAbout = document.querySelector('#tab__about');

function onTabAboutBtnClick() {
    tabAbout.scrollIntoView({
        block: "center",
        behavior: "smooth",
    })
}

tabAboutBtn.addEventListener('click', onTabAboutBtnClick);

// Переключение таба по отдельной кнопке
const tabCatalogBtn = document.querySelector('#tab__catalog__btn');
const tabIntro = tabItem[0];
const tabCatalog = tabItem[1];
const tabCatalogIndicator = tabIndicator;

tabCatalogBtn.addEventListener('click', onTabCatalogBtnClick);

function onTabCatalogBtnClick() {
    tabIntro.classList.remove('active-tab');
    tabCatalog.classList.add('active-tab');
    tabCatalogIndicator.style.left = `calc(100%/3)`;
    activeBtn.classList.remove('active-btn');
    tabCatalogBtn.classList.add('active-btn');
    activeBtn = tabCatalogBtn;

    changeUserHeight();
}

function changeUserHeight() {
    let windowScrollTop = window.pageYOffset;
    window.scrollTo({
        top: -windowScrollTop,
        left: 0,
        behavior:'smooth'
    });
}

// слайдер
const slider = document.querySelector(".slider")
if(slider){
    $(document).ready(function(){
        $('.slider').slick({
            dots: false,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 3000,
            slidesToShow: 1,
        });
        $('.single-item').slick();
    });
}

// Переключение в подвале
const footerLink = Array.from(document.querySelectorAll('#footer__link'));

footerLink.forEach((el) =>{
    el.addEventListener('click', onFooterLinkClick);
});

function onFooterLinkClick(e) {
    e.preventDefault();
    const btn = e.target.closest('#footer__link');
    changeFooterIndicator(btn);
}

function changeFooterIndicator(btn){
    const indexBtn = footerLink.indexOf(btn);
    tabIndicator.style.left = `calc(${indexBtn}*100%/3)`;
    changeSlide(indexBtn)
}

function changeSlide(index){
    activeItem.classList.remove('active-tab');
    tabItem[index].classList.add('active-tab');
    activeItem = tabItem[index];

    changeUserHeight();
}

// Открытие и закртиые корзины
const headerButtonSmall = document.querySelector('.header__button-small');
const tabShopping = document.querySelector('.tab__shopping');
const shopping = document.querySelector('.shopping')
const shoppingExit = document.querySelector('#shopping__exit');

headerButtonSmall.addEventListener('click', onHeaderButtonSmallClick);
function onHeaderButtonSmallClick(){
    tabShopping.classList.toggle('active-shopping');
    shopping.classList.toggle('active-shopping');
    
    // Подсчет в коризине
    const numberOfProducts = document.querySelectorAll('.shopping__input');
    const catalogPrice = document.querySelectorAll('#price');
    const catalogTotalPriceProduct = document.querySelectorAll('#total-price');
    const catalogTotalPrice = document.querySelector('.shopping__total');
    let sumOfProduct = 0;
    let sumOfProducts = 0;

    for (let i = 0; i < numberOfProducts.length; i++) {
        sumOfProduct = Number(numberOfProducts[i].value) * parseInt(catalogPrice[i].innerHTML);
        catalogTotalPriceProduct[i].innerHTML =`${sumOfProduct} руб.`;
        sumOfProducts += sumOfProduct;
    }

    // Подсчет изменившегося кол-ва товаров
    const calculatedSeparateItem = (shoppingItem, action) =>{
    const input = shoppingItem.querySelector('.shopping__input');
    // Получаем только те элементы, которые находятся в блоке с нажатым инпутом
    const catalogPriceOnce = shoppingItem.querySelector('#price');
    const catalogTotalPriceProductOnce = shoppingItem.querySelector('#total-price'); 
            
        switch (action) {
            case 'plus':
                input.value++;
                catalogTotalPrice.innerHTML = `К оплате: ${parseInt(catalogTotalPrice.dataset.value) + parseInt(catalogPriceOnce.innerHTML)} руб.`;
                catalogTotalPrice.dataset.value = `${parseInt(catalogTotalPrice.dataset.value) + parseInt(catalogPriceOnce.innerHTML)} руб.`;
                break;
            case 'minus':
                if (input.value > 0) {
                    input.value--;
                    catalogTotalPrice.innerHTML = `К оплате: ${parseInt(catalogTotalPrice.dataset.value) - parseInt(catalogPriceOnce.innerHTML)} руб.`;
                    catalogTotalPrice.dataset.value = `${parseInt(catalogTotalPrice.dataset.value) - parseInt(catalogPriceOnce.innerHTML)} руб.`;
                }
                break;
        }

        catalogTotalPriceProductOnce.innerHTML = `${Number(input.value) * parseInt(catalogPriceOnce.innerHTML)} руб.`
    };
    // Изменение кол-во товаров
    document.getElementById('shopping').addEventListener('click', (event) =>{
        if (event.target.classList.contains('btn-minus')) {
            calculatedSeparateItem(
                event.target.closest('.shopping__item'),
                'minus'  
            );
        }
        if (event.target.classList.contains('btn-plus')) {
            calculatedSeparateItem(
                event.target.closest('.shopping__item'),
                'plus'
            );
        }
    });

    catalogTotalPrice.dataset.value = sumOfProducts;
    catalogTotalPrice.innerHTML = `К оплате: ${sumOfProducts} руб.`;
};

shoppingExit.addEventListener('click', onShoppingExitClick);
function onShoppingExitClick(){
    tabShopping.classList.remove('active-shopping');
    shopping.classList.remove('active-shopping');
};

// подвал
if (window.screen.width < 992){
    $(document).ready(function(){
        $('.block__title').click(function name(event) {
            $(this).toggleClass('footer-active').next().slideToggle(300);
        });
    });
}


