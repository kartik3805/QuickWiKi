document.getElementById("submitbtn").addEventListener("click", function () {
  console.log(document.getElementById("url").value);

  let inputurl = document.getElementById("url").value;

  console.log(inputurl.replace(/^[^.]+\.wikipedia.org\/wiki\//g, ""));
  let pagetitle = inputurl.replace(/^[^.]+\.wikipedia.org\/wiki\//g, "");
if (pagetitle == ""){
  document.getElementById("error").textContent =
        "Please Enter a link!";
        return;
}
  fetch("https://en.wikipedia.org/api/rest_v1/page/summary/" + pagetitle)
    .then(function (response) {
      if (response.status === 404) {
        throw new Error();
      }
      document.getElementById("error").textContent = "";
      return response.json();
    })
    .then(function (json) {
      console.log(json);
      //this is common that page don't have thumbnails so its will be good to handle it separatly 
      //so more links will open 
      //example: https://en.wikipedia.org/wiki/Shiv_Smarak
      try{
        document.querySelector(
          ".image"
        ).innerHTML = `<img src="${json.thumbnail.source}" alt="">`;
      }catch(error){
        document.querySelector(
          ".image"
        ).innerHTML = `<img src="images/no-thumbnail.jpg" height="320" alt="">`;
      }
      document.querySelector('.page_title').innerHTML = `${json.title}`
      document.querySelector('.discription').innerHTML = `${json.description}`
      document.querySelector('.flag_title').innerHTML = `Page URL | ${json.content_urls.desktop.page}`
      document.querySelector('.flag_title').href = `${json.content_urls.desktop.page}`
      document.querySelector('.article').innerHTML = `${json.extract_html}`

      document.querySelector(".content").style.visibility = "visible";
    })
    .catch((err) => {
      console.log(err);
      document.getElementById("error").textContent =
        "Oops! That article doesn't exist!";
    });
});

//https://en.wikipedia.org/api/rest_v1/#/Page%20content/get_page_summary__title_