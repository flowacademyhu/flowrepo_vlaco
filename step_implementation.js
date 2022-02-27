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
    resizeWindow
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

step("The user is on the gamer videocard category subpage", async () => {
    await goto("https://ipon.hu/shop/csoport/szamitogep-alkatresz/videokartya/463?545=1");
});

step("Click on the 'ASUS TUF-RX6800XT-O16G-GAMING RX 6800 XT 16GB GDDR6 TUF Gaming PCIE' product", async () => {
    await click($(`div:nth-child(36)`));
});

step("Check the product name", async function() {
    var expectedResult='ASUS TUF-RX6800XT-O16G-GAMING RX 6800 XT 16GB GDDR6 TUF Gaming PCIE';
    var actualResult=await $(`h1.product__title`).text();
    expect(expectedResult).to.equal(actualResult); 
    });

step("Uncheck the b2b products", async function() {
    await click('Mutasd mind');
    await click('B2B elrejtése'); {navigationTimeout: 60000}
});

step("Click on the lower price textbox", async function () {
    await click($('#price-min'),{navigationTimeout: 60000});
});

step("Set the lower price to 500 000", async () => {
    await press('Backspace'),{navigationTimeout: 60000};
    await press('Backspace') 
    await press('Backspace') 
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
    await write("500000", into($(`#price-min`)))
});

step("Click on the upper price textbox", async () => {
    await click($('#price-max')); 
});

step("Set the upper price to 1 800 000", async () => {
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
    await write("1800000", into($(`#price-max`)))
});

step("Check the price on the product page", async function () {
let actualResult;
let expectedResult=true;
let actualRawData=await $(`div.product__price`).text();
let actualResText=actualRawData.replace(/\s/g, '')
let actualResInt=parseInt(actualResText);
if (actualResInt>=500000 && actualResInt<=1800000) {
    actualResult=true; 
}
else {
    actualResult=false;
};
expect(expectedResult).to.equal(actualResult)
});
   

step("Select a random product", async function () {
    var randomNumber=Math.floor(Math.random() * 10)+1;
    var randomProduct=`div.shop-product>div>div:nth-child(${randomNumber})`;
    let a=((await $(`div.shop-product>div>div:nth-child(${randomNumber})`).text()));
    console.log("Selected product: "+a);
    await click($(randomProduct))
});

step("Check the chipset type 'AMD' on the product page", async function() {
    var expectedResult='AMD';
    var actualResult=await $(`div.product-box__accordion__content.product-specification__accordion__content.collapse.show>table>tbody>tr:nth-child(1)>td:nth-child(2)`).text();
    expect(expectedResult).to.equal(actualResult); 
    });



step("Select the 'AMD' checkbox", async function () {
    await click($(`//*[@id="app"]/div[1]/main/div[2]/aside/div[2]/div[5]/div[2]/div/ul/li[1]/div/label/span`
    ))
});

step("Select the 'ASUS' checkbox", async function () {
    await checkBox('ASUS'); 
});

step("Select the 'Biostar' checkbox", async function () {
    await click('ASUS');
    await click('Biostar')
});

step("Check the manufacturer type 'ASUS' on the product page", async function() {
    var expectedResult='ASUS';
    var actualResult=await $(`div.product-box__accordion__content.product-specification__accordion__content.collapse.show>table>tbody>tr:nth-child(1)>td:nth-child(2)`).text();
    expect(expectedResult).to.equal(actualResult); 
    });

step("Check the manufacturer type 'Biostar' on the product page", async function() {
    var expectedResult='Biostar';
    var actualResult=await $(`div.product-box__accordion__content.product-specification__accordion__content.collapse.show>table>tbody>tr:nth-child(1)>td:nth-child(2)`).text();
    expect(expectedResult).to.equal(actualResult); 
    });

step("Select a random product and check the name 'Biostar'", async function () {
    var randomNumber=Math.floor(Math.random() * 10)+1;
    var randomProduct=`div.shop-product>div>div:nth-child(${randomNumber})`;
    let a=((await $(`div.shop-product>div>div:nth-child(${randomNumber})`).text()));
    console.log("Selected product: "+a);
    await click($(randomProduct));
    expect(a).to.include('Biostar');
});


    























/*
#app > div.site-content-wrapper.js-site-content-wrapper > main > div.sidebar-layout.sidebar-layout--left.js-shop-event-bus > section > div > section > div.shop-product > div.grid.product-list__grid--cards > div:nth-child(36)

step("Complete tasks <table>", async function (table) {
    for (var row of table.rows) {
        await click(checkBox(toLeftOf(row.cells[0])));
    }
});

step("Clear all tasks", async function () {
    await evaluate(() => localStorage.clear());
});

step("Open todo application", async function () {
    await goto("todo.taiko.dev");
});

step("Must not have <table>", async function (table) {
    for (var row of table.rows) {
        assert.ok(!await text(row.cells[0]).exists(0, 0));
    }
});

step("Must display <message>", async function (message) {
    assert.ok(await text(message).exists(0, 0));
});



step("Add tasks <table>", async function (table) {
    for (var row of table.rows) {
        await write(row.cells[0]);
        await press('Enter');
    }
});

step("Must have <table>", async function (table) {
    for (var row of table.rows) {
        assert.ok(await text(row.cells[0]).exists());
    }
});

step("Open <page> with headless mode <isheadless>", async function (page, isheadless) {
    //var headlessParam = isheadless.toLowerCase() === 'true';
    await openBrowser({headless: headlessParam});
    await resizeWindow({width: 700, height: 800});
    await goto(page);
});

step("Click on Documentation button", async function () {
    await click("Documentation");
});

step("Click on Search input", async function () {
    await click($(`#search`));
});

step("Click on error button", async function () {
    /*try {
        await click($(`#error`));
    } catch(e) {
        console.log('Az error gomb nem található');
        console.log(e);
    }
});

step("Hover on Blog button", async function() {
	await hover($(`.link_examples`));
});

step("Write <searchParam> in the search field", async function(searchParam) {
	await write(searchParam, $(`#search`));
});

step("Press Enter", async function() {
	await press('Enter');
});

step("Find Plugins nav item", async function() {
    var pluginsListItem = await listItem('Plugins');
    console.log(await pluginsListItem.attribute('class'));
    if (pluginsListItem.isVisible() == true) {
	    await click(pluginsListItem);
    }
});

step("Find Plugins nav item2", async function() {
    var pluginsListItem = await $(`.link_plugins`);
    console.log(await pluginsListItem.attribute('class'));
    if (pluginsListItem.isVisible() == true) {
	    await click(pluginsListItem);
    }
});

step("Click on bejelentkezes", async function() {
	var loginBtn = await $(`a[class='site-sub-nav__link site-sub-nav__link--has-icon']`);
    var hamburgerMenu = await $(`.hamburger-box`);
    var megjelent = await hamburgerMenu.isVisible();
    if (megjelent == true) {
        await click(hamburgerMenu);
        await click($(`a[href='/belepes']`));
    } else {
        await click(loginBtn);
    }
});
*/