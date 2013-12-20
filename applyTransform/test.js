var transformer = require('./transformer.js');
var aURL = "http://www.rottentomatoes.com/m/the_hunger_games_catching_fire/";
var transformerFile = "/Users/jessicalam/Development/manet/applyTransform/transformer-sample.json";

transformer.transformURLWithTransformerFile(aURL, transformerFile);