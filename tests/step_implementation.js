/* globals gauge*/
"use strict";
const path = require('path');
const {
    $,
    openBrowser,
    write,
    closeBrowser,
    goto,
    press,
    screenshot,
    above,
    click,
    checkBox,
    listItem,
    toLeftOf,
    link,
    text,
    into,
    textBox,
    evaluate,
    hover,
    resizeWindow,
    waitFor,
    button,
    dropDown,
    radioButton,
    currentURL,
} = require('taiko');
const assert = require("assert");
const { Console } = require('console');
const { TIMEOUT } = require('dns');
const headless = process.env.headless_chrome.toLowerCase() === 'true';
const expect = require("chai").expect;


beforeSuite(async () => {
   await openBrowser({headless: headless, args:['--window-size=1920,1080']})
}); 

afterSuite(async () => {
    await closeBrowser();
});

// Return a screenshot file name
gauge.customScreenshotWriter = async function () {
    const screenshotFilePath = path.join(process.env['gauge_screenshots_dir'],
        `screenshot-${process.hrtime.bigint()}.png`);

    await screenshot({
        path: screenshotFilePath
    });
    return path.basename(screenshotFilePath);
};

step("The user is on the homapage of www.ipon.hu", async () => {
    await goto("www.ipon.hu");
});

step("Move the mouse over the shop menu", async () => {
    await click('Shop menü'), {navigationTimeout: 12000};
});

step("Move the mouse over 'Számítógép alkatrész'", async () => {
    await hover('Számítógép alkatrész'), {navigationTimeout: 12000};
});

step("Click on 'Gamer videókártya'", async () => {
    await click('Gamer videókártya'), {navigationTimeout: 12000};
});

step("Check the URL: <URL>", async function (URL) {
    let actualResult=await currentURL();
    console.log(actualResult);
    expect(URL).to.equal(actualResult)
});

step("The user is on the gamer videocard category subpage", async () => {
    await goto("https://ipon.hu/shop/csoport/szamitogep-alkatresz/gamer-videokartya/18215");
});

step("Select a random product and match the product names", async function() {
    let NumberOfProdRaw=(await $(`div.shop-list__header__item-count`).text());
    let NumberOfProdClean=NumberOfProdRaw.slice(1,5);
    let NumberOfProducts=parseInt(NumberOfProdClean);
    if (NumberOfProducts>36) {
        NumberOfProducts=36;
        };
    let randomNumber=Math.floor(Math.random() * (NumberOfProducts-1))+1;
    let randomProduct=`div.shop-product>div>div:nth-child(${randomNumber})`;
    let prodList=await $(`.shop-card__title`).elements();
    let listResult=await prodList[randomNumber-1].text();
    console.log("kiválasztva: "+listResult);
    await click($(randomProduct)), {navigationTimeout: 6000};
    let prodResult=await $(`h1.product__title`).text();
    expect(listResult).to.equal(prodResult); 
        });    


step("Check the 'B2B elrejtése' checkbox", async function() {
    await click('Mutasd mind');
    await click('B2B elrejtése'), {navigationTimeout: 60000};
});

step("Click on the lower price textbox", async function () {
    await click($('#price-min'),{navigationTimeout: 60000});
});

step("Set the lower price to 500 000", async () => {
    await press('Backspace'),{navigationTimeout: 60000};
    await press('Backspace'); 
    await press('Backspace'); 
    await press('Backspace');
    await press('Backspace');
    await press('Backspace');
    await press('Backspace');
    await press('Backspace');
    await press('Backspace');
    await press('Backspace');
    await press('Backspace');
    await press('Backspace');
    await press('Delete');
    await press('Delete');
    await press('Delete');       
    await press('Delete');
    await press('Delete');
    await press('Delete');
    await press('Delete');
    await press('Delete');
    await press('Delete');       
    await press('Delete');
    await press('Delete');
    await press('Delete');
    await write("500000", into($('#price-min')))
});

step("Click on the upper price textbox", async () => {
    await click($('#price-max')); 
});

step("Set the upper price to 1 800 000", async () => {
    await press('Backspace'), {navigationTimeout: 60000}; 
    await press('Backspace');
    await press('Backspace');
    await press('Backspace');
    await press('Backspace');
    await press('Backspace');
    await press('Delete');
    await press('Delete');
    await press('Delete');
    await press('Delete');
    await press('Delete');
    await press('Delete');
    await write("1800000", into($('#price-max')));
});

step("Match the price range with the product list", async function () {
let NumberOfProdRaw=(await $('div.shop-list__header__item-count').text());
let NumberOfProdClean=NumberOfProdRaw.slice(1,5);
let NumberOfProducts=parseInt(NumberOfProdClean);
if (NumberOfProducts>36) {
    NumberOfProducts=36
};
let actualPrice;
let actualPriceStr;
let priceList=[];
let priceListStr = await $('.shop-card__price').elements();
for (let i=0; i<NumberOfProducts; i++) {
    actualPriceStr=(await priceListStr[i].text()).replace(/\s/g, '');
    actualPrice=parseInt(actualPriceStr); 
    if (isNaN(actualPrice)===false) {
        priceList.push(actualPrice);
}       
};
for (let y=0; y<priceList.length; y++) {
    assert.ok(priceList[y]>=500000 && priceList[y]<=1800000);
}          
}); 

step("Select a random product", async function () {
let NumberOfProdRaw=(await $('div.shop-list__header__item-count').text());
let NumberOfProdClean=NumberOfProdRaw.slice(1,5);
let NumberOfProducts=parseInt(NumberOfProdClean);
if (NumberOfProducts>36) {
    NumberOfProducts=36;
};
let randomNumber=Math.floor(Math.random() * (NumberOfProducts-1))+1;
let randomProduct=`div.shop-product>div>div:nth-child(${randomNumber})`;
let a=((await $(`div.shop-product>div>div:nth-child(${randomNumber})`).text()));
console.log("Selected product: "+a);
await click($(randomProduct))
});

step("Check the chipset type 'AMD' on the product page", async function() {
    let expectedResult='AMD';
    let actualElements=await $(`.product-table__td`).elements();
    let actualResult=await actualElements[1].text();
    console.log(actualResult);
    expect(expectedResult).to.equal(actualResult); 
    });



step("Select the 'AMD' checkbox", async function () {
    await click($(`//*[@id="app"]/div[1]/main/div[2]/aside/div[2]/div[5]/div[2]/div/ul/li[1]/div/label/span`
    ))
});


step("Select the 'Biostar' checkbox", async function () {
     await click('Biostar')
});

step("Check the manufacturer type 'Biostar' in the shown product names", async function() {
let NumberOfProdRaw=(await $(`div.shop-list__header__item-count`).text());
let NumberOfProdClean=NumberOfProdRaw.slice(1,5);
let NumberOfProducts=parseInt(NumberOfProdClean);
if (NumberOfProducts>36) {
    NumberOfProducts=36;
}
let prodList=await $(`.shop-card__title`).elements();
for (let i=0; i<NumberOfProducts; i++) {
    expect(await prodList[i].text()).to.include("Biostar");
}
});
    

step("Go to the second page and match the product names with the first one", async function () {
let NumberOfProdRaw=(await $(`div.shop-list__header__item-count`).text());
let NumberOfProdClean=NumberOfProdRaw.slice(1,5);
let NumberOfProducts=parseInt(NumberOfProdClean);
if (NumberOfProducts>36) {
    NumberOfProducts=36;
    };
let prodListPage1=await $(`.shop-card__title`).elements();
await click (button({class: 'forum-pagination__button--next forum-pagination__button button forum-pagination__button--active'})), {navigationTimeout: 6000}
let prodListPage2=await $(`.shop-card__title`).elements();
for (let y=0; y<NumberOfProducts; y++) { 
    for (let i=0; i<=y; i++) {
    assert.ok(prodListPage1[i].text()!= prodListPage2[y]);
    }
}
});

step("Check the 'Ipon Gamer' filter marker", async function () {
let actualResBoolean=await $(`.shop-list__filter-tags__item`).exists();
let actualResText=await $(`.shop-list__filter-tags__item`).text();
assert.ok(actualResText=="iPon Gamer: Igen" && actualResBoolean);
});

step("Check the product list where 'B2B' marked price labels are not shown", async function () {
    let NumberOfProdRaw=(await $(`div.shop-list__header__item-count`).text());
    let NumberOfProdClean=NumberOfProdRaw.slice(1,5);
    let NumberOfProducts=parseInt(NumberOfProdClean);
    if (NumberOfProducts>36) {
        NumberOfProducts=36
    };
    let actualPrice;
    let actualPriceStr;
    let priceListStr=await $('.shop-card__price').elements();
    for (let i=0; i<NumberOfProducts; i++) {
        actualPriceStr=(await priceListStr[i].text()).replace(/\s/g, '');
        actualPrice=parseInt(actualPriceStr); 
        assert.ok(isNaN(actualPrice)===false) 
    }          
    });     

step("Set the interval between <min> and <max>", async function (min,max) {
    await click($('#guarantee-month-min'),{navigationTimeout: 60000});
    await press('Backspace'), 
    await press('Backspace');
    await press('Delete');
    await press('Delete'), {navigationTimeout: 60000};
    await write(min, into($('#guarantee-month-min'))), {navigationTimeout: 60000},
    await click($('#guarantee-month-max'),{navigationTimeout: 60000});
    await press('Backspace'), 
    await press('Backspace');
    await press('Delete');
    await press('Delete'), {navigationTimeout: 60000};
    await write(max, into($('#guarantee-month-max'))), {navigationTimeout: 60000};    
});


step("Check the warranty on the product page in interval <min> to <max>", async function(min,max) {
    let warrantyStr=await $(`.product__guarantee-list-link`).text();
    let warrantyInt=(parseInt(warrantyStr))*12;
    assert.ok(warrantyInt>=min && warrantyInt<=max);
    });

step("Click on the search bar", async () => {
    await click($('div.shop-list__search'));
});    

step("Write into the input field: <text>", async function (text) {
    await write(text);
});    

step("Check <text> in the product names", async function(text) {
    let NumberOfProdRaw=(await $(`div.shop-list__header__item-count`).text());
    let NumberOfProdClean=NumberOfProdRaw.slice(1,5);
    let NumberOfProducts=parseInt(NumberOfProdClean);
    if (NumberOfProducts>36) {
        NumberOfProducts=36;
    }
    let prodList=await $(`.shop-card__title`).elements();
    for (let i=0; i<NumberOfProducts; i++) {
        expect(await prodList[i].text()).to.include(text);
    }
    });

step("Turn on the DVI filter", async function() {
    await click(text('DVI', above('HDMI')));
});
    
step("Turn on radio button: 'Igen'", async function() {
    await click(text('Igen' , above('HDMI')));
});

step("Check the DVI specification on the product page", async function() {
    let expectedResult='Igen';
    let actualElements=await $(`.product-table__td`).elements();
    let actualResult=await actualElements[19].text();
    expect(expectedResult).to.equal(actualResult); 
    });


    

























