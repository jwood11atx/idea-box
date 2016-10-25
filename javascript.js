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
       <p class="quality">`+this.quality+`</p>
       <button class="up-vote">Up Vote</button>
       <button class="down-vote">Down Vote</button>
       <button class="delete-btn">Delete</button>
     </section>
    `
  )
}


$(".submit-btn").on("click", function(){
  var title = $(".title-input").val();
  var idea = $(".idea-input").val();
  var ideabox = new IdeaBox(title, idea);
  ideabox.createIdeaBox();
  
})

$(".idea-container").on("click", ".up-vote, .down-vote", function(){
  var selector = $(this).text();
  var quality = $(this).closest(".idea-card").find(".quality");
  var newQuality = getNewQuality(selector, quality.text());
  quality.text(newQuality);
})

$(".idea-container").on("click", ".delete-btn", function(){
  $(this).closest(".idea-card").remove();
})

function getNewQuality(selector, quality){
  if(selector === "Up Vote"){
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
