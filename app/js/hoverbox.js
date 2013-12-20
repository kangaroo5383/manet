angular.module("ui", []).
factory("Hoverbox", function() {

  var hoverboxHtml = '<div class="remove"></div>';

  var Hoverbox = function(node){
    this.setupEl_();
    this.setNode(node);
    this.setupEvents_();
  };


  /*
    Public
  */

  Hoverbox.prototype.setNode = function(node){
    node.hoverbox = this;
    this.node = node;
    this.sizeNode_();
  };


  /*
    Setup
  */

  Hoverbox.prototype.setupEl_ = function(){
    this.hoverbox = document.createElement("div");
    this.hoverbox.classList.add("hoverbox");
    this.hoverbox.innerHTML = hoverboxHtml;
  };


  Hoverbox.prototype.setupEvents_ = function(){
    var remove = this.hoverbox.querySelector(".remove");
    remove.addEventListener("click", this.remove_.bind(this));

    document.addEventListener("scroll", this.sizeNode_.bind(this));
  };


  /*
    Events
  */

  Hoverbox.prototype.remove_ = function(e){
    this.hoverbox.parentElement.removeChild(this.hoverbox);
  };


  /*
    Private
  */

  Hoverbox.prototype.sizeNode_ = function(){
    var rect = this.node.getBoundingClientRect();
    this.hoverbox.style.left = rect.left + "px";
    this.hoverbox.style.top = rect.top + "px";
    this.hoverbox.style.width = rect.width + "px";
    this.hoverbox.style.height = rect.height + "px";
  };

  return Hoverbox;
});