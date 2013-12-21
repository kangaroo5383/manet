var spider = require('./spider.js');
var testURL = "http://rottentomatoes.com/";

var response = {
	url: "http://www.rottentomatoes.com/",
	transformer: [{
		key: "comments",
		selector: "html DIV.body_main DIV.col#mainColumn DIV#mobPanel DIV.content DIV.content_box#contentReviews DIV.content_body DIV#reviews DIV.quote_bubble DIV.review_quote DIV.quote_contents DIV.media_block_content"
	},
	{
		key: "characters",
		selector: "html DIV.body_main DIV.col#mainColumn DIV#mobPanel DIV.content DIV.clearfix DIV.col_p DIV.content_box#cast-info DIV.content_body DIV.moreContainer DIV.more-list UL.clearfix LI.media_block DIV.media_block_content SPAN.characters"
	},
	{
		key: "title",
		selector: "html DIV.body_main DIV.col#mainColumn DIV#mobPanel DIV.content DIV.content_box DIV.content_body DIV.media_block_content H1.movie_title"
	}]};

var processInput = function (inputDictionary) {
	var transformer = inputDictionary.transformer;
	var result = {};
	for (var aKey in transformer) {
		result[transformer[aKey]["key"]] = transformer[aKey]["selector"];
	}
	return result;
};

var transformerDictionary = processInput(response);
spider.run(testURL, transformerDictionary);