$(function() {
  // running custom RSS functions
  parseRSS('http://www.guildportal.com/RSS/Feed.aspx?Type=GuildForumsMR&ID=202108&p=538269479&g=00000000-0000-0000-0000-000000000000', '#rsstitle');
});

function parseRSS(url, container) {
  $.ajax({
    url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=2&callback=?&q=' + encodeURIComponent(url),
    dataType: 'jsonp',
    success: function(data) {
      console.log(data.responseData.feed.entries);
      $.each(data.responseData.feed.entries, function(key, value) {
        if(value.content.length >280){
          var thehtml = '<h2><a href="' + value.link + '" target="_blank"><div class="box"><div class="name">' + value.author + ' says:</div>' + value.content.substring(0, 280) + '...</div></a></h3>';
        }
        else{
        var thehtml = '<h2><a href="' + value.link + '" target="_blank"><div class="box"><div class="name">' + value.author + ' says:</div>' + value.content.substring(0, 280) + '</div></a></h3>';}
        $(container).append(thehtml);
      });
    }
  });
}