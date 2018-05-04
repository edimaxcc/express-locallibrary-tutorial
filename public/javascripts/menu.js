
// This function make the navbar apear and deseaper
$(function(){
  $('#btn-menu').click(function() {
      $("nav").toggleClass("show");
  });
});

// Get the Div class .summary_book and limited the number of characteres
$(function(){
   $(".summary_book").each(function(i){
      len=$(this).text().length;
      if(len>80)
   { $(this).text($(this).text().substr(0,180)+'...'); } });
});
