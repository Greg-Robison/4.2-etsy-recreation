/*
  (url: String, callback: Function) -> undefined

  Execute a callback function with the JSON results from the url specified.

  Examples
      var url = "https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=yarn&includes=Images,Shop";

      fetchJSONP(url, function(data) {
        // do something with data
      });

      // OR

      function logData(data) {
        console.log(data);
      }

      fetchJSONP(url, logData);
*/

//puts handlebars and juery in your project!!//

var Handlebars = require("handlebars");
var $ = require("jquery");

//gets the API from the internet//

var url = "https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=photography&includes=Images,Shop&sort_on=score";

//====#row-template is from the id of the script tag from the template on html===//

var source = $('#row-template').html();

//this compiles the template

var template = Handlebars.compile(source);
function logData(data) {
  console.log(data.results);
  data.results.forEach(function(product){
    console.log(product);
    $("#product-container").append(template(product));

  })
}
fetchJSONP(url, logData);



function fetchJSONP(url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    var script = document.createElement('script');

    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}
