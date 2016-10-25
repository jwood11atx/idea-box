function IdeaBox(title, idea){
  this.title = title;
  this.idea = idea;
  this.quality = "swill";
};

IdeaBox.prototype.createIdeaBox = function(){
  $(".idea-container").prepend(
    `<section class="idea-card">
       <h2>`+this.title+`</h2>
       <p>`+this.idea+`</p>
       <button class="up-vote"><img src="images/upvote.svg"></button>
       <button class="down-vote"><img src="images/downvote.svg"></button>
       <article>
         <h3>quality:<h3>
         <p class="quality">`+this.quality+`</p>
       </article>
       <button class="delete-btn"><img src="images/delete.svg"></button>
     </section>
    `
  )
}

$("textarea").on("keyup", function(){
  $(this).css("height", $(this)[0].scrollHeight+"px");
})

$(".submit-btn").on("click", function(){
  var title = $(".title-input").val();
  var idea = $(".idea-input").val();
  var ideabox = new IdeaBox(title, idea);
  ideabox.createIdeaBox();
  
})

$(".idea-container").on("click", ".up-vote, .down-vote", function(){
  var selector = $(this).find("img").attr("src");
  var quality = $(this).closest(".idea-card").find(".quality");
  var newQuality = getNewQuality(selector, quality.text());
  quality.text(newQuality);
})

$(".idea-container").on("click", ".delete-btn", function(){
  $(this).closest(".idea-card").remove();
})


<!--//Button mouseover image swap-->
$(".idea-container").on({
  mouseenter:  function(){
    $(this).find("img").prop("src", "images/upvote-hover.svg");
  },
  mouseleave: function(){
    $(this).find("img").prop("src", "images/upvote.svg");
  }
}, ".up-vote")

$(".idea-container").on({
  mouseenter:  function(){
    $(this).find("img").prop("src", "images/downvote-hover.svg");
  },
  mouseleave: function(){
    $(this).find("img").prop("src", "images/downvote.svg");
  }
}, ".down-vote")

$(".idea-container").on({
  mouseenter:  function(){
    $(this).find("img").prop("src", "images/delete-hover.svg");
  },
  mouseleave: function(){
    $(this).find("img").prop("src", "images/delete.svg");
  }
}, ".delete-btn")



function getNewQuality(selector, quality){
  if(selector === "images/upvote-hover.svg"){
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
      return "genius"
  }
}

function downVote(quality){
  switch (quality) {
    case "genius":
      return "plausible";
    case "plausible":
      return "swill"
  }
}
