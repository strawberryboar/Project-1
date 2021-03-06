const drinkSearchResults = document.getElementById("drinkSearchResults");
const drinkDetails = document.getElementById("drinkDetails");

function loadSavedDrinks () {
    let savedDrinks = JSON.parse(localStorage.getItem("savedDrinks"));

    if (savedDrinks === null || savedDrinks.length === 0) {
        $("#drinkErrorMsg").text ("You haven't added any drinks to your saved drink list. Start saving drinks to see the list.")
    } else {
        for (var i = 0; i < savedDrinks.length; i++) {
            var drinkID = savedDrinks[i];
            var APIurl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkID;

            $.ajax({
                url: APIurl,
                method: "GET"
            }).then(function(response){
                let drinkObject = response.drinks[0];
                let resultDiv = $("<div>");
                resultDiv.attr("id", drinkObject.idDrink);
                resultDiv.attr("class", "drinkSearchResult");
                let title = $("<h1>").text(drinkObject.strDrink);
                title.attr("id", drinkObject.idDrink);
                resultDiv.append(title);

                let drImg = $("<img>").attr("src", drinkObject.strDrinkThumb);
                drImg.width(150);
                resultDiv.append(drImg);
                $("#drinkSearchResults").append(resultDiv);
            });
        }
    }
}

loadSavedDrinks()

$(document).on("click", ".drinkSearchResult", function(){
    let drId = $(this).attr("id");
    var APIurl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drId;
    drinkSearchResults.classList.add("hidden");
    generateDrinkDetails(APIurl);
    drinkDetails.classList.remove("hidden");
});

$(document).on("click", ".returnDrinkResults", function(){
    drinkSearchResults.classList.remove("hidden");
    drinkDetails.classList.add("hidden");
    $("#drinkIMG").attr("src", "");
    $("#drinkIngredientList").html("");
    $("#drinkSearchResults").html("");
    loadSavedDrinks();
});