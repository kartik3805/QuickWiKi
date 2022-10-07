






document.getElementById('submitbtn').addEventListener('click', function(){
  console.log(document.getElementById('url').value)

  let inputurl  = document.getElementById('url').value

  console.log(inputurl.replace(/^[^.]+\.wikipedia.org\/wiki\//g, ""))
  let pagetitle = inputurl.replace(/^[^.]+\.wikipedia.org\/wiki\//g, "")

  fetch('https://en.wikipedia.org/api/rest_v1/page/summary/' + pagetitle)
.then(function(response) {
  return response.json();
})
.then(function(json) {
console.log(json)

document.querySelector('.image').innerHTML = `
<img src="${json.thumbnail.source}" alt="">
`
document.querySelector('.page_title').innerHTML = `${json.title}`
document.querySelector('.discription').innerHTML = `${json.description}`
document.querySelector('.flag_title').innerHTML = `Page URL | ${json.content_urls.desktop.page}`
document.querySelector('.flag_title').href = `${json.content_urls.desktop.page}`
document.querySelector('.article').innerHTML = `${json.extract_html}`

document.querySelector('.content').style.visibility = 'visible'

})

})




//https://en.wikipedia.org/api/rest_v1/#/Page%20content/get_page_summary__title_



//https://en.wikipedia.org/api/rest_v1/#/Page%20content/get_page_summary__title_
