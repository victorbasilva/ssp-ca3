/*!
* Start Bootstrap - Bare v5.0.8 (https://startbootstrap.com/template/bare)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-bare/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

function draw_table(){
    $("#results").empty();
    $.getJSONuncached = function(url){
        return $.ajax(
        {
            url: url,
            type: 'GET',
            cache: false,
            success: function(html){
                $("#results").append(html);
                //select_row();
            }
        });
    };
    $.getJSONuncached("/get/html")
};

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

const deleteFromXML = function deleteFromXML(data){
    $.ajax({
        url: "/post/delete",
        type: "POST",
        data: {data:data},
        cache: false,
        success: setTimeout(draw_table, 1000)
    });
}

/*function select_row(){
    $("#menuTable tbody tr[id]").click(function(){
        $(".selected").removeClass("selected");
        $(this).addClass("selected");
        var section = $(this).prevAll("tr").children("td[colspan='4']").length - 1;
        var entree = $(this).attr("id") - 1;
        delete_row(section, entree);
    });
};

function delete_row(sec, ent){
    $("#delete").click(function (){
        $.ajax({
            url: "/post/delete",
            type: "POST",
            data: {
                section: sec,
                entree: ent
            },
            cache: false,
            success: setTimeout(draw_table, 1000)
        });
    });
};*/

$(document).ready(function(){
    draw_table();
});