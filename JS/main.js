///<reference types="../@types/jquery"/>
"use strict";
// -----------------------GLOBAL VARS-----------------------------
const closeNav = document.getElementById("closeNav")
const signToOpenNav =document.getElementById("signToOpenNav")
const sideNav = document.getElementById("sideNav")
const closeInfo = document.getElementById("closeInfo")
const signToCloseNav = document.getElementById("signToCloseNav")
const search = document.getElementById("search")
const Searchdiv= document.getElementById("Searchdiv")
const contact = document.getElementById("contact")
const contactNav = document.getElementById("contactNav")
const categoriesNav = document.getElementById("categoriesNav")
const displayCategories = document.getElementById("displayCategories")
const dislayArea = document.getElementById("dislayArea")
const areaDisplaying = document.getElementById("areaDisplaying")
const Ingredientsdisplaying = document.getElementById("Ingredientsdisplaying")
const categorieLayer = document.getElementById("categorieLayer")
const mealLayer = document.getElementById("MealLayer")
const mealsRow = document.getElementById("mealsRow")
const mealImg = document.getElementById("mealImg")
const mealh2 = document.getElementById("mealh2")
const openCategorie = document.getElementById("openCategorie")
const showRecibes = document.getElementById("showRecibes")
const warning = document.getElementById("warning")
// ------------------------Validation Vars-----------------
// const nameInput = document.getElementById("nameInput")
const nameAlert = document.getElementById("nameAlert")
const nameInput = document.getElementById("nameInput")
const emilInput = document.getElementById("emilInput")
const emilAlert = document.getElementById("emilAlert")
const phoneInput = document.getElementById("phoneInput")
const phoneAlert = document.getElementById("phoneAlert")
const ageInput = document.getElementById("ageInput")
const passwordInput = document.getElementById("passwordInput")
const agepasswordAlert = document.getElementById("passwordAlert")
const repasswordInput = document.getElementById("repasswordInput")
const repasswordAlert = document.getElementById("repasswordAlert")
const submitButton = document.getElementById("submitButton")
const success = document.getElementById("success")
// ------------------------Search------------------------
search.addEventListener("click" , function(){
    Searchdiv.classList.remove("d-none");
    contact.classList.add("d-none");
    $("#closeInfo").addClass("d-none")
    Ingredientsdisplaying.classList.add("d-none")
    $("#displayCategories").addClass("d-none")
    $("#showRecibes").addClass("d-none")
    areaDisplaying.classList.add("d-none")
    $("#mealsRow").addClass("d-none")
    closingNav();
})
// ---------------------End-Search-----------------------
async function displayfirst(){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    response = await response.json()
    console.log(response.meals.slice(0 , 20))
    $("#mealsRow").removeClass("d-none")
    displayMeals(response.meals.slice(0, 20))
}
displayfirst()
async function searchByName(inputValue){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
    response = await response.json()
    console.log(response.meals)
    $("#mealsRow").removeClass("d-none")
    response.meals ? displayMeals(response.meals) : displayMeals([])
}
async function searchByWord(term){
    if(term.length==1){
        $("#warning").addClass("d-none")
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response = await response.json()
    $("#mealsRow").removeClass("d-none")
    response.meals ? displayMeals(response.meals) : displayMeals([])
    }else{
        $("#warning").removeClass("d-none")
    }
    if(term.length==0){
        $("#warning").addClass("d-none")
    }
}
//-----------------------START-NAVBAR--------------------------------
$("#signToCloseNav").on("click" , function(){
    $("#closeNav").animate({left :'80%'} , 700) ; 
    $("#closeInfo").fadeTo(2400,1);
    $("#closeInfo").removeClass("d-none")

        signToCloseNav.classList.add("d-none")
        signToOpenNav.classList.remove("d-none")
})
$("#signToOpenNav").on("click" , function(){
    $("#closeNav").animate({left :'0'} , 800) ; 
    $("#closeInfo").fadeTo(2400,0);
    $("#closeInfo").addClass("d-none")

    signToCloseNav.classList.remove("d-none")
        signToOpenNav.classList.add("d-none")
    })
//-----------------------END-NAVBAR-----------------------------------


//-----------------------Start-Categories-----------------------------
async function getCategoreisData(){
    let rowData = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    rowData = await rowData.json();
    displayingCategories(rowData.categories)
}
getCategoreisData()

function getCategories(){
$("#categoriesNav").on("click" , function(){
$("#closeInfo").addClass("d-none")
$("#displayCategories").removeClass("d-none")
Searchdiv.classList.add("d-none");
Ingredientsdisplaying.classList.add("d-none")
$("#showRecibes").addClass("d-none")
contact.classList.add("d-none");
areaDisplaying.classList.add("d-none")
$("#mealsRow").addClass("d-none")
closingNav();
})
}
function displayingCategories(Data){
    let cartona= ``;
    for( let i = 0 ; i<Data.length;i++ ){
        cartona+=`
        <div class="col-md-3 mt-4">
                <div id="openCategorie" class="categoriesImg position-relative" onclick="getIngredientsMeals('${Data[i].strCategory}')"  >
                    <img id="imgHide" src="${Data[i].strCategoryThumb}" alt="beef" class="w-100">
                    <div id="categorieLayer" class="layer position-absolute">
                        <h2 id="categorieH3" class="text-center">${Data[i].strCategory}</h2>
                        <p id="categorieP" class="ps-2 pb-4">${Data[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
    `
    }
    displayCategories.innerHTML=cartona ;
}
getCategories()

async function getIngredientsMeals(newData){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${newData}`)
    response = await response.json()
    console.log(response.meals.slice(0 , 20))
    $("#mealsRow").removeClass("d-none")
    $("#displayCategories").addClass("d-none")
    displayMeals(response.meals.slice(0 , 20))
}

function displayMeals(myData){
    let cartona = ``;
    for(let i=0;i<myData.length;i++){
        cartona+=`
        <div class="col-md-3 mt-4">
                <div class="categoriesImg position-relative" onclick="getDetails('${myData[i].idMeal}')">
                    <img id="imgHide" src="${myData[i].strMealThumb}" alt="beef" class="w-100">
                    <div id="categorieLayer" class="layer position-absolute">
                        <h2 id="categorieH3" class="text-center pt-5">${myData[i].strMeal}</h2>
                    </div>
                </div>
        </div>
        `
    }
    mealsRow.innerHTML=cartona ; 
}
//-----------------------End-Categories-----------------------------
//-----------------------Start-Area-----------------------------
async function getAreaData(){
    let rowData2 = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    rowData2 = await rowData2.json();
    displayingArea(rowData2.meals)
}
getAreaData()


function getArea(){
    $("#dislayArea").on("click" , function(){
        $("#closeInfo").addClass("d-none")
        $("#displayCategories").addClass("d-none")
        Searchdiv.classList.add("d-none");
        contact.classList.add("d-none");
        Ingredientsdisplaying.classList.add("d-none")
        $("#showRecibes").addClass("d-none")
        areaDisplaying.classList.remove("d-none")
        $("#mealsRow").addClass("d-none")
        closingNav();
    })
    }
    
getArea();
function displayingArea(myData){
let cartona = ``
for(let i=0;i<myData.length; i++){
    cartona+=`
    <div onclick="getAreaMeals('${myData[i].strArea}')" class="col-3 my-3 move" >
                <i id="pointr" class="fa-solid fa-house-laptop fa-4x text-white"></i>
                <h3 class="text-white">${myData[i].strArea}</h3>
            </div>
    `
}
areaDisplaying.innerHTML=cartona ; 
}
async function getAreaMeals (area){
    let response =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()
    console.log(response.meals.slice(0 , 20))
    areaDisplaying.classList.add("d-none")
    $("#mealsRow").removeClass("d-none")
    displayMeals(response.meals.slice(0 , 20))
}
//-----------------------End-Area-----------------------------
//-----------------------Start-Ingredients-----------------------------
async function getIngredData(){
    let rowData3 = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    rowData3 = await rowData3.json();
    displayingIngredients(rowData3.meals.slice(0, 20))
}
getIngredData()
function getIngredients(){
    $("#diplayIngred").on("click" , function(){
        $("#closeInfo").addClass("d-none")
        $("#displayCategories").addClass("d-none")
        Searchdiv.classList.add("d-none");
        contact.classList.add("d-none");
        $("#showRecibes").addClass("d-none")
        areaDisplaying.classList.add("d-none")
        Ingredientsdisplaying.classList.remove("d-none")
        $("#mealsRow").addClass("d-none")
        closingNav();
    })
    }
getIngredients();
function displayingIngredients(myData1){
    let cartoona= ``;
    for(let i=0;i < myData1.length ; i++){
        cartoona+=`
        <div  onclick="getMealsIngred('${myData1[i].strIngredient}')" class="col-sm-3 text-center my-2 www">
                <i class="fa-solid fa-drumstick-bite fa-4x text-white"></i>
                <h3 class="text-white">${myData1[i].strIngredient}</h3>
                <p class="text-white">${myData1[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
            </div>
        `
        }
        Ingredientsdisplaying.innerHTML=cartoona;
}
async function getMealsIngred(myIngred){

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${myIngred}`)
    response = await response.json()
    console.log(response.meals.slice(0 , 20))
    $("#mealsRow").removeClass("d-none")
    Ingredientsdisplaying.classList.add("d-none")
    $("#showRecibes").addClass("d-none")
    displayMeals(response.meals.slice(0, 20))
}
//-----------------------End-Ingredients-----------------------------

// ----------------------------Details-------------------------------
async function getDetails(idDetails){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idDetails}`);
    response = await response.json();
    console.log(response.meals[0])
    displayDitals(response.meals[0])
}
function displayDitals(meal){
    let recibes = ``;
    
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            recibes += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }
    let tags = meal.strTags?.split(",")
    if (!tags) tags = []
    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `<li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
}

let cartona = `
<div class="col-md-4">
                <img src="${meal.strMealThumb}" alt="" class="w-100 rounded-3">
                <h3 class="text-white text-center">${meal.strMeal}</h3>
            </div>
            <div class="col-md-8">
                <h2 class="text-white">Instructions</h2>
                <p class="text-white">${meal.strInstructions}</p>
                <h3 class="text-white"><span class="fw-bolder text-white">Area : </span>${meal.strArea}</h3>
                <h3 class="text-white"><span class="fw-bolder text-white">Category : </span>${meal.strCategory}</h3>
                <h3 class="text-white">Recipes :</h3>
                <ul class="d-flex flex-wrap g-3">
                ${recibes}
                </ul>
                <h3 class="text-white">Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap text-white">
                ${tagsStr}
                </ul>
                <a target="_blank" href="${meal.strSource}" class="btn btn-success mb-3">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger mb-3">Youtube</a>
            </div>
`
$("#mealsRow").addClass("d-none")
$("#showRecibes").removeClass("d-none")

showRecibes.innerHTML = cartona ; 
}
// -----------------------------------END-Details--------------------------
// -----------------------------------Start-Validation------------------------
let nameInputUsed = false ; 
let emailInputUsed = false ; 
let passwordInputUsed = false ; 
let repasswordInputUsed = false ; 
let ageInputUsed = false ; 
let phoneInputUsed = false ;


function usingInuts(){
    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputUsed = true
    })
    document.getElementById("emilInput").addEventListener("focus", () => {
        emailInputUsed = true
    })
    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputUsed = true
    })
    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputUsed = true
    })
    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputUsed = true
    })
    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputUsed = true
    })
}
usingInuts()
function nameValidation() {
    let text1 = nameInput.value
    let regexName = /^[a-zA-Z ]+$/
    return regexName.test(text1)
}

function emailValidation() {
    let text2 = emilInput.value
    let regexName2 = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regexName2.test(text2)
}

function phoneValidation() {
    let text3 = phoneInput.value
    let regexName3 = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    return regexName3.test(text3)
}

function ageValidation() {
    let text4 = ageInput.value
    let regexName4 = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/
    return regexName4.test(text4)
}

function passwordValidation() {
    let text5 = passwordInput.value
    let regexName5 = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/
    return regexName5.test(text5)
}

function repasswordValidation() {
    if(passwordInput.value==repasswordInput.value){
        return true;
    }
    
}
function inputsValidation(){
    if(nameInputUsed==true){
        if(nameValidation()==true){
        $("#nameInput").addClass("is-valid")
        $("#nameInput").removeClass("is-invalid")
        $("#nameAlert").addClass("d-none")
        }
        else{
            $("#nameInput").addClass("is-invalid")
        $("#nameInput").removeClass("is-valid")
        $("#nameAlert").removeClass("d-none")
        }
    }
    if(emailInputUsed==true){
        if(emailValidation()==true){
        $("#emilInput").addClass("is-valid")
        $("#emilInput").removeClass("is-invalid")
        $("#emilAlert").addClass("d-none")
        }
        else{
            $("#emilInput").addClass("is-invalid")
        $("#emilInput").removeClass("is-valid")
        $("#emilAlert").removeClass("d-none")
        }
    }
    if(phoneInputUsed==true){
        if(phoneValidation()==true){
        $("#phoneInput").addClass("is-valid")
        $("#phoneInput").removeClass("is-invalid")
        $("#phoneAlert").addClass("d-none")
        }
        else{
        $("#phoneInput").addClass("is-invalid")
        $("#phoneInput").removeClass("is-valid")
        $("#phoneAlert").removeClass("d-none")
        }
    }
    
    if(ageInputUsed==true){
        if(ageValidation()==true){
        $("#ageInput").addClass("is-valid")
        $("#ageInput").removeClass("is-invalid")
        $("#ageAlert").addClass("d-none")
        }
        else{
        $("#ageInput").addClass("is-invalid")
        $("#ageInput").removeClass("is-valid")
        $("#ageAlert").removeClass("d-none")
        }
    }
    if(passwordInputUsed==true){
        if(passwordValidation()){
        $("#passwordInput").addClass("is-valid")
        $("#passwordInput").removeClass("is-invalid")
        $("#passwordAlert").addClass("d-none")
        }
        else{
        $("#passwordInput").addClass("is-invalid")
        $("#passwordInput").removeClass("is-valid")
        $("#passwordAlert").removeClass("d-none")
        }
    }
    if(repasswordInputUsed==true){
        if(repasswordValidation()==true){
        $("#repasswordInput").addClass("is-valid")
        $("#repasswordInput").removeClass("is-invalid")
        $("#repasswordAlert").addClass("d-none")
        }
        else{
        $("#repasswordInput").addClass("is-invalid")
        $("#repasswordInput").removeClass("is-valid")
        $("#repasswordAlert").removeClass("d-none")
        }
    }
    if(nameValidation() == true && ageValidation()==true && emailValidation()==true && phoneValidation()==true && passwordValidation()==true && repasswordValidation()==true ){
        submitButton.removeAttribute("disabled")
    }else{
        submitButton.setAttribute("disabled", true)
        success.classList.add("d-none")

    }
    submitButton.addEventListener("click" , function(){
        success.classList.remove("d-none")
    })
    
}


inputsValidation()







// -----------------------------------END-Validation--------------------------
//-----------------------Start-Contact-----------------------------------
contactNav.addEventListener("click", function(){
    contact.classList.remove("d-none");
    Searchdiv.classList.add("d-none");
    $("#closeInfo").addClass("d-none")
    Ingredientsdisplaying.classList.add("d-none")
    areaDisplaying.classList.add("d-none")
    $("#displayCategories").addClass("d-none")
    $("#mealsRow").addClass("d-none")
    closingNav();
})
// -----------------------------Functions--------------------

function closingNav(){
    $("#closeNav").animate({left :'0'} , 1000) ; 
    // $("#closeInfo").fadeTo(0,0);
    signToCloseNav.classList.remove("d-none")
    signToOpenNav.classList.add("d-none")
}