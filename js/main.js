//ES6
var obj;
var api;
var param;
var val;
var api_string = "";

setapi();

function setapi() {
    api = 'https://api.punkapi.com/v2/beers' + api_string;
    console.log(api);

    const getBeersInformation = () =>
    fetch(api);

    getBeersInformation()
        .then(response => response.json())
        .catch(e => console.error('You failed'))
        .then(response => {
        obj = response;
        createTable();
    });
}

function createTable() {
    var txt = "<table border='5px' style='border-collapse: collapse;  width: 100%; border-color: #FFBBBB #FFACEC'>";

    txt += "<tr style='background-color: #CFFEF0;'>";
    txt += "<th>" + "Image" + "</th>";
    txt += "<th>" + "Beer name" + "</th>";
    txt += "<th>" + "Description" + "</th>";
    txt += "<th>" + "First brewed" + "</th>";
    txt += "<th>" + "Tag line" + "</th>";
    txt += "<th>" + "Food pairing" + "</th>";
    txt += "<th>" + "Yeast" + "</th>";
    txt += "</tr>";

    for (var x = 0; x < obj.length; x++) {
        // console.log(obj[x]);
        txt += "<tr>";
        txt += "<td class='cell_padding'>" + "<img src='" + obj[x].image_url + "' style='width: 50px; padding: 10px' />" + "</td>";
        txt += "<td class='cell_padding'>" + obj[x].name + "</td>";
        txt += "<td class='cell_padding'>" + obj[x].description + "</td>";
        txt += "<td class='cell_padding'>" + obj[x].first_brewed + "</td>";
        txt += "<td class='cell_padding'>" + obj[x].tagline + "</td>";
        txt += "<td class='cell_padding'>" + obj[x].food_pairing + "</td>";
        txt += "<td class='cell_padding'>" + obj[x].ingredients.yeast + "</td>";
        txt += "</tr>";
    }

    txt += "</table>";
    document.getElementById("table_result").innerHTML = txt;
}

$(document).ready(function () {
   $(".btn_search").click(function () {
       onclick();
   });
});

function onclick() {
    var x = 0;
    var search_name = document.getElementById("beer_name").value;
    var search_food = document.getElementById("food").value;
    var search_brewed_before = document.getElementById("brewed").value;

    if (search_name == "" && search_food == "" && search_brewed_before == "") {
        api_string = "";
    } else {
        api_string = "";
        api_string += "?";

        if (search_name != "") {
            x = x +1;
        }
        if (search_food != "") {
            x = x + 1;
        }
        if (search_brewed_before != "") {
            x = x + 1;
        }

        for (var i = 0; i < x; i++) {
            if (search_name != "") {
                param = "beer_name";
                val = search_name;
                search_name = "";
            }
            else if (search_food != "") {
                param = "food";
                val = search_food;
                search_food = "";
            }
            else if (search_brewed_before != "") {
                param = "brewed_before";
                val = search_brewed_before;
                search_brewed_before = "";
            }
            if (i == 0) {
                api_string += param + "=" + val;
            } else {
                api_string += "&" + param + "=" + val;
            }
            param = "";
            val = "";
        }
    }

    console.log(api_string);
    setapi();
}