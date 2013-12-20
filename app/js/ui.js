(function() {
  var uiContainer, currentHoverbox;

  var setHoverboxNode = function(hoverbox, node){
    var rect = node.getBoundingClientRect();
    hoverbox.style.left = rect.left + "px";
    hoverbox.style.top = rect.top + "px";
    hoverbox.style.width = rect.width + "px";
    hoverbox.style.height = rect.height + "px";
    hoverbox.originalNode = node;
  };


  var setupHoverboxEvents = function(hoverbox){
    var remove = hoverbox.querySelector(".remove");
    remove.addEventListener("click", function(e){
      hoverbox.parentElement.removeChild(hoverbox);
    });
  };

  var matches = function(el, selector){
    if (!el || el.nodeType !== Node.ELEMENT_NODE){
      return false;
    }

    var matchesSelector = el.webkitMatchesSelector || el.mozMatchesSelector ||
                      el.oMatchesSelector || el.matchesSelector;

    return matchesSelector.call(el, selector);
  };


  var hoverboxHtml = '<div class="remove"></div><div class="options"><input type="text" placeholder="Name"><div class="duplicate"></div></div>';

  var createHoverboxFromNode = function(node){
    var hoverbox = document.createElement("div");
    hoverbox.classList.add("hoverbox");
    setHoverboxNode(hoverbox, node);
    hoverbox.innerHTML = hoverboxHtml;
    setupHoverboxEvents(hoverbox);
    return hoverbox;
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
      var hoverbox = hoverboxes[i];
      if(hoverbox.originalNode == target){
        return false;
      }
    }

    return true;
  };


  var drawHoverbox = function(e){
    var target = e.target;
    if(targetIsValid(target)){
      currentHoverbox.style.display = "";
      setHoverboxNode(currentHoverbox, target);
    }
  };

  var removeHoverbox = function(e){
    currentHoverbox.style.display = "none";
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

    currentHoverbox = createHoverboxFromNode(document.body);
    container.querySelector(".potential").appendChild(currentHoverbox);

    return container;
  };


  uiContainer = createContainer();
  attachListeners();
}());