
document.getElementById("url").addEventListener("keyup", function (event) {
  if(event.code === 'Enter' || event.keyCode === 13){
    document.getElementById('submitbtn').click()
  }
});

//https://en.wikipedia.org/api/rest_v1/#/Page%20content/get_page_summary__title_

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
      
      document.querySelector('.content').style.display = "block";
      document.querySelector(".page_title").innerHTML = `${json.title}`;
      document.querySelector(".discription").innerHTML = `${json.description}`;
      document.querySelector(
        ".url_flag"
      ).innerHTML = `${json.content_urls.desktop.page}`;
      document.querySelector(
        ".url_flag"
      ).href = `${json.content_urls.desktop.page}`;
      document.querySelector(".article").innerHTML = `${json.extract_html}`;

      document.querySelector(".content").style.visibility = "visible";
      
        const container = document.querySelector('.center-container');
        container.style.position = "static";
        container.style.transform = "unset";
    })
    .catch((err) => {
      console.log(err);
      document.getElementById("error").textContent =
        "Oops! That article doesn't exist!";
      document.querySelector('.content').style.display = "none";
    });
});

//https://en.wikipedia.org/api/rest_v1/#/Page%20content/get_page_summary__title_

