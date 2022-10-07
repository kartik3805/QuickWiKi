document.getElementById('submitbtn').addEventListener('click', function () {
    console.log(document.getElementById('url').value)

    let inputurl = document.getElementById('url').value
    let results_status = false;
    let pagetitle;
    if (inputurl == '') {
        console.log("No url Given");
        return;
    }
    try {
        console.log(inputurl.replace(/^[^.]+\.wikipedia.org\/wiki\//g, ""))
        pagetitle = inputurl.replace(/^[^.]+\.wikipedia.org\/wiki\//g, "")
        results_status = true;
    } catch (error) {
        console.log(error);
        document.querySelector('.content').style.visibility = 'hidden'
        document.querySelector('.not-found').style.visibility = 'visible'
        results_status = false;
    }

    if (results_status == true) {
        fetch('https://en.wikipedia.org/api/rest_v1/page/summary/' + pagetitle)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                // console.log(json)
                try {
                    document.querySelector('.image').innerHTML = `<img src="${json.thumbnail.source}" alt="">`
                    document.querySelector('.page_title').innerHTML = `${json.title}`
                    document.querySelector('.discription').innerHTML = `${json.description}`
                    document.querySelector('.url_flag').innerHTML = `${json.content_urls.desktop.page}`
                    document.querySelector('.url_flag').href = `${json.content_urls.desktop.page}`
                    document.querySelector('.article').innerHTML = `${json.extract_html}`
                    document.querySelector('.not-found').style.visibility = 'hidden'

                    document.querySelector('.content').style.visibility = 'visible'
                } catch (error) {
                    document.querySelector('.content').style.visibility = 'hidden'
                    document.querySelector('.not-found').style.visibility = 'visible'

                }
            })
    } else {
        document.querySelector('.content').style.visibility = 'hidden'
        document.querySelector('.not-found').style.visibility = 'visible'
    }

})




//https://en.wikipedia.org/api/rest_v1/#/Page%20content/get_page_summary__title_