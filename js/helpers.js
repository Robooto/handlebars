Handlebars.registerHelper('isChosen', function(type) {
    if (type === this.chosen) {
        return 'mdl-button--colored';
    }
});

Handlebars.registerHelper('getLanguageFilter', function(langId){
   var queryParam = '';
   if(langId) {
       queryParam = '$language=' + + Handlebars.escapeExpression(langId);
   }
   return Handlebars.SafeString(queryParam); 
});