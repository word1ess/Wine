class Shopping{
    handleClear(){
        ROOT_SHOPPING.innerHTML = `
            <div>Ваша корзина пуста</div>
            <div class="shopping__clear" onclick='handleClear();'><button>Очистить корзину</button></div>
            <div class="shopping__total shopping__price">К оплате: 0 руб.</div>	
        `
    }

    render(){
        const productsStore = localStorageUtils.getProducts();
        let htmlCatalog = '';
        const clientWidth = window.screen.width;
        catalog.forEach(({ id, img, name, country, price}) =>{
            if (productsStore.indexOf(id) !== -1){
                if (clientWidth > 992) {
                    htmlCatalog += `
                        <tr style="margin-bottom: 48px;" class='shopping__item'>
                            <td rowspan="5" class="shopping__td"><img src="${img}" alt=""></td>
                            <td class='td__product'>
                                <p class="shopping__title">${name}</p>
                                <p class="shopping__text">Артикул: 032020</p>
                                <p class="shopping__text">${country}</p>
                                <div class="shopping__counter">
                                    <button type="button" class="shopping__btn btn-minus">-</button>
                                    <input type="number" value="1" class="shopping__input" disabled>
                                    <button type="button" class="shopping__btn btn-plus">+</button>
                                </div>
                            </td>
                            <td width="240" class="shopping__flex">
                                <p class="shopping__price" id='price'>${price} руб.</p>
                            </td>
                            <td width="136" class="shopping__flex">
                                <p class="shopping__price" id='total-price'>${price} руб.</p>
                            </td>
                        </tr>
                    `; 
                }else{
                    htmlCatalog +=`
                        <div class="shopping__small-img"><img src="${img}" alt=""></div>
                        <div class='shopping__small-inner shopping__item'>
                            <p class="shopping__title">${name}</p>
                            <p class="shopping__text">Артикул: 032020</p>
                            <p class="shopping__text" style='margin-bottom:32px;'>${country}</p>
                            <div class="shopping__text">Цена за 1шт.</div>
                            <div class="shopping__flex">
                                <p class="shopping__price" id='price'>${price} руб.</p>
                            </div>
                            <div width="136" class="shopping__text">Сумма</div>
                            <div width="136" class="shopping__flex">
                                <p class="shopping__price" id='total-price'>${price} руб.</p>
                            </div>
                            <div class="shopping__counter">
                                <button type="button" class="shopping__btn btn-minus">-</button>
                                <input type="number" value="1" class="shopping__input" disabled>
                                <button type="button" class="shopping__btn btn-plus">+</button>
                            </div>
                        </div>
                    `;
                }
                // sumCatalog += price;
            }
        });
        if (clientWidth > 992){
            const html = `
            <table>
                <tr style="margin-bottom: 32px; display: block;">
                    <td width="273"></td><td class="shopping__text td__product">Товары</td>
                    <td width="260" class="shopping__text" style="text-align: center;">Цена за 1шт.</td>
                    <td width="126" class="shopping__text" style="text-align: center;">Сумма</td>
                </tr>
                ${htmlCatalog}
            </table>
            <div class="shopping__total shopping__price">К оплате: xxxx руб.</div> 	
            `;
            ROOT_SHOPPING.innerHTML = html;
        }else{
            const html = `${htmlCatalog}
                <div class="shopping__total shopping__price">К оплате: xxxx руб.</div> 
            `;
            ROOT_SHOPPING.innerHTML = html;
        }
    }
}

const shoppingPage = new Shopping();