module.exports = {

  zeroFill: function ( number, width, decimal = 0) {
    //console.log(typeof number , number);
    if (number==null || number=='null' || !number || isNaN(number*1)) {
      number=0;
    }else if(typeof number == 'string'){
      number=number*1;
    }
    let decimales = "";
    if(decimal>0){
      decimales = Math.round( ((Math.round(number%1*(10**decimal))/(10**decimal))*(10**decimal)) * 1);
      if(decimales.toString().length<decimal){
        decimales = new Array( decimal ).join( '0' ) + decimales; 
        //zeroFill(decimales, decimal);
        //console.log("recursion", decimales);
      }else if(decimales==100){
        decimales = "00";
        number = number+1;
      }else if(decimales.toString().length>decimal){
        decimales = decimales.toString().slice(0, decimal-decimales.toString().length);
      }
      decimales = "."+decimales;
      //console.log("sin recursion", decimales);
    }
    if ((number%1)>0) {
      number=(number.toString().match(/^-?\d+(?:\.\d{0,0})?/)[0].replace('.','')*1);
    }
    width -= number.toString().length; 
    if ( width > 0 ) { 
      return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number+decimales; 
    } 
    return number + ""+decimales;  
  },

  spaceFill: function ( text, width , fill=" " ){
    //console.log(typeof text, text);
    if (!text) {
      text="";
    }
    text=text.slice(0, width==1 ? 1 : width-1);
    width -= text.toString().length;
    if ( width > 0 ){
      return text + new Array( width +  1 ).join( fill );
    }
    return text + ""; // siempre devuelve tipo cadena
  },

  noEnterPress: function (e){
    if(e.key=="Enter"){
        e.preventDefault();
        //console.log(e.key+" Disabled");
        //add all elements we want to include in our selection
        var focussableElements = 'form select:not([disabled]), form input[type=text]:not([disabled]), form textarea[type=text]:not([disabled]), form [tabindex]:not([disabled]):not([tabindex="-1"])';
        if (document.activeElement && document.activeElement.form) {
            var focussable = Array.prototype.filter.call(document.activeElement.form.querySelectorAll(focussableElements),
            function (element) {
                //check for visibility while always include the current activeElement 
                return element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement
            });
            var index = focussable.indexOf(document.activeElement);
            if(index > -1) {
                var nextElement = focussable[index + 1] || focussable[0];
                nextElement.focus();
            }                    
        }
    }
  }

}