const fetch = require('node-fetch');
const cheerio = require('cheerio');
const delay = require('delay');
const readlineSync = require('readline-sync');
const { URLSearchParams } = require('url');
var randomize = require('randomatic')

const getSession = () => new Promise((resolve, reject) => {
    fetch(`https://diropia.com/sign-up/`, {
        method: 'GET',
        headers: {
            'Host': 'diropia.com',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': 1,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
            'Sec-Fetch-Dest': 'document',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-User': '?1',
            'Referer': 'https://diropia.com/',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9',
            //'Cookie': sasi
        }
    }).then(async res => {
        const $ = cheerio.load(await res.text());
        const result = {
            cookie: res.headers.raw()['set-cookie']
        }

        resolve(result)
    })
    .catch(err => reject(err))
});

const functionRegist = (realCookie, username) => new Promise((resolve, reject) => {
    const params = new URLSearchParams;
    params.append('user_name', username)
    params.append('email', `${username}@gmail.com`)
    params.append('pass1', 'Japro908@')
    params.append('pass2', 'Japro908@');
    params.append('form_type', 'wpqa-signup');
    params.append('action', 'wpqa_ajax_signup_process');
    params.append('redirect_to', 'https%3A%2F%2Fdiropia.com%2Fsign-up%2F');
    params.append('_wp_http_referer', '%2Fsign-up%2F');
    params.append('wpqa_signup_nonce', 'a4327cd001');

    fetch('https://diropia.com/sutoruh/includes/ajax.php', { 
        method: 'POST', 
        body: params,
        headers: {
            'Host': 'diropia.com',
            'Connection': 'keep-alive',
            'Content-Length': 258,
            'Accept': '*/*',
            'Sec-Fetch-Dest': 'empty',
            'X-Requested-With': 'XMLHttpRequest',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Origin': 'https://diropia.com',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-Mode': 'cors',
            'Referer': 'https://diropia.com/sign-up/',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9',
            'Cookie': realCookie
        }
    })
    .then(res => res.json())
    .then(result => {
    //const $ = cheerio.load(result);
    //const resText = $('h7').text();
        resolve(result);
    })
    .catch(err => reject(err))
});

(async () => {
    try {
        const reff = readlineSync.question('[?] Reff: ')
        const cookie = await getSession()
        const username = randomize('a', 10)
        const realCookie = `__cfduid=d49f6aa5a6bda784666ca90d920a6e7a11582966624; cookielawinfo-checkbox-necessary=yes; cookielawinfo-checkbox-non-necessary=yes; mycred_refmycred_default=${reff}; signup_refmycred_default=${reff}; PHPSESSID=5fcc6f689098da8424b53a9a13ded429; _ga=GA1.2.509264323.1582963294; _gid=GA1.2.1304023330.1582963294; _gat=1; sc_is_visitor_unique=rx12113944.1582963294.6715241A8B044FF2060A95AA9276A194.1.1.1.1.1.1.1.1.1; viewed_cookie_policy=yes`
        const regist = await functionRegist(realCookie, username)
        console.log(regist)
    } catch (e) {
        console.log(e);
}
})()
