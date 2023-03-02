let video;
let SceneNum = 2;



function preload() {
  let getting_ip_adress = "https://api.ipify.org?format=json";
  loadJSON(getting_ip_adress, gotData_one);
  data = loadJSON("2022_data.json");
}

function gotData_one(data) {
  ipadress = data.ip;
}

function gotData_two(data) {
  all_information = data;
  country = data.country_name;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.size(windowWidth, windowHeight);
  video.hide();

  // getting the user's coordinates by passing in the IP Adress into the Query String of another API Adress
  let url = "https://json.geoiplookup.io/";
  let getting_coordinates = url.concat(ipadress);
  loadJSON(getting_coordinates, gotData_two);

  // console.log(video.pixels);
  sel = createSelect();
  sel.position(windowWidth - 300, 200);

  // creating an option in the menu for each country
  for (let i = 0; i < 162; i++) {
    sel.option(str(data[i].Country_EN))
  }


  sel.selected('kiwi');

}

function draw() {
  switch (SceneNum) {
    case 1:
      select_country();
      break;

    case 2:
      pixelate_video();
      break;
  }
}
