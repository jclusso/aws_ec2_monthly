// ==UserScript==
// @name         AWS EC2 Hourly to Monthly Pricing Converter
// @namespace    http://jarr.it
// @version      1.0.0
// @description  AWS EC2 Hourly to Monthly Pricing Converter
// @author       Jarrett Lusso
// @match        https://aws.amazon.com/ec2/pricing/on-demand/
// @grant        none
// ==/UserScript==

window.onload = function () {
  setTimeout(function() {
    var strings = $('tr[data-plc-offer-id]');
    $.each(strings, function(i, string) {
      var jEl = $(string).children().last();
      var priceString = jEl.text();
      var regex = /^\$(\d+\.\d+) per Hour/;
      var priceMatches = regex.exec(priceString);
      if(priceMatches == null) { return; };
      var price = parseFloat(priceMatches[1]);
      if(price == NaN) { return; };
      jEl.html('$' + (price * 750).toFixed(2) + ' per Month');
    });
  }, 1000);
}
