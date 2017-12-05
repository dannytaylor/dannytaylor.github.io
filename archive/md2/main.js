
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
        if(value.content.length >160){
          var thehtml = '<h2><a href="' + value.link + '" target="_blank"><div class="box"><div class="poster">' + value.author + ' says:</div>' + value.content.substring(0, 160) + '...</div></a></h2>';
        }
        else{
        var thehtml = '<h2><a href="' + value.link + '" target="_blank"><div class="box"><div class="poster">' + value.author + ' says:</div>' + value.content.substring(0, 160) + '</div></a></h2>';}
        $(container).append(thehtml);
      });
    }
  });
}

$(document).ready(function() {
  $("[data-toggle]").click(function() {
    $('.sidebar').toggleClass("open-sidebar");
    $('.content').toggleClass("open-content");
    $('#bdov').addClass('bactive');
    $('.biobar').fadeIn();
    $('.forum').fadeIn();
    $('.links').fadeOut();
    $('.footer').fadeIn();
  });
});

$('.landing').on('click', function(){
    $('body').toggleClass('bcolor');
    $('.landing').fadeOut(200);
    $('.links').fadeIn();
    $('#tdov').fadeIn();
});

$('#dov2').on('click', function(){
    $('#tdov2').fadeOut();
    $('.nactive').removeClass('nactive');
    $('.hactive').removeClass('hactive');
    $('.bactive').removeClass('bactive');
    $('.ractive').removeClass('ractive');
    $('.sidebar').toggleClass("open-sidebar");
    $('.content').toggleClass("open-content");
    $('body').toggleClass('bcolor');
    $('.forum').fadeOut(200);
    $('.biobar').fadeOut();
    $('.target').fadeOut(200);
    $('.footer').fadeOut(function(){
      $('.landing').fadeIn();
    });
});
$('li').on('click', function(){
  /* id name setup */
    var hid = 'h' + this.id.substr(1,3);
    var nid = 'n' + hid.substr(1,3);
    var bid = 'b' + hid.substr(1,3);


    /* highlight in roster list */
    $(this).addClass('ractive').siblings().removeClass('ractive');

    /* if on crew/forum page */
    if($('#tdov').css('display')!='none'){
      $('.forum').fadeOut('fast');
      $('#tdov').fadeOut('fast',function(){
        $('#tdov2').fadeIn('fast');
        /* change active name */
        $('.nactive').removeClass('nactive');
        $('#'+nid).addClass('nactive');


        /* change BIO info */
          $('.bactive').removeClass('bactive');
          $('#'+bid).addClass('bactive');

        /* targeting ui */
        if($('.target').css('display')=='none'){
          $('.target').css('display', 'inline-block');
          $('.target').css('opacity', '0.2');
        }
        $('.target').animate({height:'102%', opacity: '0.4',top: '-8px'}, 100);
        $('.target').animate({height:'100%', opacity: '0.8',top: '0px'}, 200);

      });
    }else {
      /* change active name */
      $('.nactive').removeClass('nactive');
      $('#'+nid).addClass('nactive');


      /* change BIO info */
        $('.bactive').removeClass('bactive');
        $('#'+bid).addClass('bactive');

      /* targeting ui */
      if($('.target').css('display')=='none'){
        $('.target').css('display', 'inline-block');
        $('.target').css('opacity', '0.2');
      }
      $('.target').animate({height:'102%', opacity: '0.4',top: '-8px'}, 100);
      $('.target').animate({height:'100%', opacity: '0.8',top: '0px'}, 200);
    }
  });
