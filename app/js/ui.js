angular.module("app", ["hoverbox"]).
factory("ui", function(Hoverbox) {
  var uiContainer, currentHoverbox;


  var matches = function(el, selector){
    if (!el || el.nodeType !== Node.ELEMENT_NODE){
      return false;
    }

    var matchesSelector = el.webkitMatchesSelector || el.mozMatchesSelector ||
                      el.oMatchesSelector || el.matchesSelector;

    return matchesSelector.call(el, selector);
  };


  var targetIsValid = function(target){
    if(target.tagName === "BODY"){
      return false;
    }

    if(matches(target, ".manet-container *")){
      return false;
    }

    var currentContainer = uiContainer.querySelector(".current");
    var hoverboxes = currentContainer.querySelectorAll(".hoverbox");
    for (var i = hoverboxes.length - 1; i >= 0; i--) {
      var hoverboxEl = hoverboxes[i];
      if(hoverboxEl.hoverbox.node == target){
        return false;
      }
    }

    return true;
  };


  var drawHoverbox = function(e){
    var target = e.target;
    if(targetIsValid(target)){
      currentHoverbox.hoverbox.style.display = "";
      currentHoverbox.setNode(target);
    }
  };


  var removeHoverbox = function(e){
    currentHoverbox.hoverbox.style.display = "none";
  };



  var addCurrentHoverbox = function(e){
    e.preventDefault();
    var target = e.target;
    if(targetIsValid(target)){
      var hoverbox = createHoverboxFromNode(target);
      uiContainer.querySelector(".current").appendChild(hoverbox);
    }
  };


  var redrawHoverboxes = function(e){
    var hoverboxes = uiContainer.querySelectorAll(".hoverbox");
    for (var i = hoverboxes.length - 1; i >= 0; i--) {
      var hoverbox = hoverboxes[i];
      setHoverboxNode(hoverbox, hoverbox.originalNode);
    }
  };


  var attachListeners = function(){
    document.addEventListener("mouseover", drawHoverbox);
    document.addEventListener("mouseout", removeHoverbox);
    document.addEventListener("click", addCurrentHoverbox);
    document.addEventListener("scroll", redrawHoverboxes);
  };


  var containerHtml = '<div class="potential"></div><div class="current"></div>';

  var createContainer = function(){
    var container = document.createElement("div");
    container.classList.add("manet-container");
    container.innerHTML = containerHtml;
    document.body.appendChild(container);

    currentHoverbox = new Hoverbox(document.body);
    container.querySelector(".potential").appendChild(currentHoverbox);

    return container;
  };


  uiContainer = createContainer();
  attachListeners();
});