$(function(){
  for(i=0; localStorage.length>i; i++){
    var storedIdeaBox = JSON.parse(localStorage.getItem(localStorage.key(i)));
    createIdeaBox(storedIdeaBox);
  }
});

function IdeaBox(title, idea, id){
  this.title = title;
  this.idea = idea;
  this.id = id;
  this.quality = "swill";
};

function createIdeaBox(ideabox){
  $(".idea-container").prepend(
    `<section class="idea-card" id="`+ideabox.id+`">
      <button class="delete-btn"></button>
       <p class="idea-title" contenteditable>`+ideabox.title+`</p>
       <p class="idea-body" contenteditable>`+ideabox.idea+`</p>
       <button class="up-vote"></button>
       <button class="down-vote"></button>
       <article>
         <h3>quality:<h3>
         <p class="quality">`+ideabox.quality+`</p>
       </article>
     </section>
    `
  )
}

$("textarea").on("keyup", function(){
  $(this).css("height", $(this)[0].scrollHeight+"px");
})

$(".idea-container").on("focus", ".idea-title, .idea-body", function(){
  var selector = $(this).closest(".idea-card");
  var key = selector.attr("id");
  var ideabox = JSON.parse(localStorage.getItem(key));
  $(this).on("keydown", function(event){
    if(event.keyCode === 13){
      event.preventDefault();
      $(this).blur();
      return false;
    }
  })
  $(this).on("blur", function(){
    ideabox.title = selector.find(".idea-title").text();
    ideabox.idea = selector.find(".idea-body").text();
    localStorage.setItem(key, JSON.stringify(ideabox));
  })
})

$(".save-btn").on("click", function(){
  var title = $(".title-input").val();
  var idea = $(".idea-input").val();
  var ideabox = new IdeaBox(title, idea, Date.now());
  var key = ideabox.id;
  localStorage.setItem(key, JSON.stringify(ideabox));
  createIdeaBox(ideabox);
  emptyInput();
  $(".title-input").focus();
})

$(".title-input, .idea-input").on("keydown", function(event){
  if(event.keyCode === 13)
    $(".save-btn").click();
})

$(".idea-container").on("click", ".up-vote, .down-vote", function(){
  var ideaCard = $(this).closest(".idea-card");
  var selector = $(this).attr("class");
  var quality = ideaCard.find(".quality");
  var newQuality = getNewQuality(selector, quality.text());
  var key = ideaCard.attr("id");
  var ideabox = JSON.parse(localStorage.getItem(key));
  ideabox.quality = newQuality;
  localStorage.setItem(key, JSON.stringify(ideabox));
  quality.text(newQuality);
})

$(".idea-container").on("click", ".delete-btn", function(){
  var selector = $(this).closest(".idea-card");
  localStorage.removeItem(selector.attr("id"));
  selector.remove();
})

$(".input-search").on("keyup", function() {
   var searchValue = $(this).val().toLowerCase();
   $(".idea-card").each(function(){
     var titleText = $(this).find(".idea-title").text().toLowerCase();
     var bodyText = $(this).find(".idea-body").text().toLowerCase();

     titleText.indexOf(searchValue) != -1 || bodyText.indexOf(searchValue) != -1 ? $(this).show() : $(this).hide();

  });
});



function emptyInput() {
  $(".title-input").val("");
  $(".idea-input").val("");
  $(".idea-input").css("height", "42px");
}

function getNewQuality(selector, quality){
  if(selector === "up-vote"){
    return upVote(quality);
  } else {
    return downVote(quality);
  }
}

function upVote(quality){
  switch (quality) {
    case "swill":
      return "plausible";
    case "plausible":
      return "genius";
    default:
      return "genius";
  }
}

function downVote(quality){
  switch (quality) {
    case "genius":
      return "plausible";
    case "plausible":
      return "swill";
    default:
      return "swill";
  }
}
