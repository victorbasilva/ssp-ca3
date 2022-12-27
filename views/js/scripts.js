/*!
* Start Bootstrap - Bare v5.0.8 (https://startbootstrap.com/template/bare)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-bare/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

/**
 * Empty div with id results if there is some content inside
 * Get data from request  /get/html and append it to div with id results
 */
function draw_table(){
    $("#results").empty(); // Empty div with id results
    // ajax get request function
    $.getJSONuncached = function(url){
        return $.ajax(
        {
            url: url,
            type: 'GET',
            cache: false,
            success: function(html){
                // on success append result to div with id results
                $("#results").append(html);
            }
        });
    };
    // Make get request to url /get/html
    $.getJSONuncached("/get/html")
};

const getFeatures =  function getFeatures(){
    $("#features-id").empty(); // Empty div with id features-id
    // ajax get request function
    $.getJSONuncached = function(url){
        return $.ajax(
        {
            url: url,
            type: 'GET',
            cache: false,
            success: function(html){
                // on success append result to div with id results
                $("#features-id").append(html);
            }
        });
    };
    // Make get request to url /get/features
    $.getJSONuncached("/get/features")
}

/**
 * Find all selected rows (that have checkbox selected) and
 * make delete request to delete all selected
 */
const deleteSelectedRows = function deleteSelectedRows (){
    // get all selected
    let selectedArray =[];
    $("input[type=checkbox]:checked").each(function(){
        let genre = $(this).attr("data-genre"); // get genre to remove from
        let entree = $(this).attr("data-position") - 1; // to get game position in xml remove -1
        selectedArray.push({genre: genre, entree:entree});
    });
    deleteFromXML(selectedArray)
}

/**
 * Post data to delete endpoint
 * @param {*} data 
 */
const deleteFromXML = function deleteFromXML(data){
    $.ajax({
        url: "/post/delete",
        type: "POST",
        data: {data:data},
        cache: false,
        success: setTimeout(draw_table, 1000)
    });
}

/**
 * Add all selected items to basket
 */
const addToBasket = function addToBasket(){
    // get all selected
    let selectedArray =[];
    $("input[type=checkbox]:checked").each(function(){
       let name = $(this).parent().siblings("[name='game']").text() 
       let price = $(this).parent().siblings("[name='price']").text();
       selectedArray.push({name: name, price:price});
    });
    calcTotal(selectedArray)
}

/**
 * Calculate totla price of selected items and 
 * append it to div totalPrice
 * @param {*} items 
 */
const calcTotal = function calcTotal(items){
    let total = 0;
    for(i=0; i<items.length; i++){
        total += parseFloat(items[i].price);
    }
    $("#totalPrice").empty();
    $("#totalPrice").append(total.toFixed(2));
}

/**
 * When document is ready call function draw_table
 * jQuery method ready used.
 */
$(document).ready(function(){
    draw_table();
    getFeatures();
});