  $(document).ready(function() {
    function getQueryStringParametersOf (parameter) {
      var strings = location.search.slice(1).split("&"), length = strings.length;
      var stringVars = {}, tempArr = [];
      while (length--) {
        tempArr = strings[length].split("=");
        stringVars[tempArr[0]] = tempArr[1];
      }
      return stringVars[parameter].split(",");
    }

    if (location.search) {
      var Ids = getQueryStringParametersOf("Ids").reverse();
      $.each(Ids, function() {
        var x = $( "#"+this+"" )
        setTimeout( function() {
          x.trigger( "click" );
        }, 1);
      });
    }

    var aElem = $( '.main a:only-child' );

    aElem.bind("click", function(e) {
      var activeElem = $(this).parents( ".dcjq-parent-li" ).children( "a" );
      var Ids = "";
      $.each(activeElem, function() {
        Ids = Ids + ""+$(this).attr( "id" )+",";
      })
      Ids = Ids.slice(0, -1);
      var hrefValue = $(this).attr( "href" );
      $(this).attr("href", hrefValue + "?Ids="+Ids+"");
    })
  })