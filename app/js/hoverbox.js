angular.module("ui").
factory("Hoverbox", function() {

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
    this.hoverbox.hoverbox = this;
  };


  Hoverbox.prototype.setupEvents_ = function(){
    document.addEventListener("scroll", this.sizeNode_.bind(this));
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