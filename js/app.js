(function() {
    
    //registerPartials();
    renderPage();
    renderDogs();
    
    // function registerPartials() {
    //     Handlebars.registerPartial('dog', $('#dog-template').html());
    // }
    
    function renderPage() {
        // var template = $('#index-template').html();
        // var compiled = Handlebars.compile(template);
        var rendered = App.templates.index(window.language);
        $('#main').html(rendered);
        $('#languageSwitch').click(function() {
            DogPack.switchLanguage();
        });
    }
    
    function renderDogs() {
        // var template = $('#dogs-template').html();
        // var compiled = Handlebars.compile(template);
        var filteredDogs = DogPack.getFilteredDogs(DogPack.dogs);
        var rendered = App.templates.dogs({
            dogs: DogPack.getPaginatedDogs(filteredDogs), 
            language: window.language});
        $('#theDogs').html(rendered);
        attachDogButtons();
        renderPages(filteredDogs);
        renderScore();
    }
    
    function renderScore() {
        // var template = $('#score-template').html();
        // var compiled = Handlebars.compile(template);
        var rendered = App.templates.score({
            dogs: DogPack.dogs,
            language: window.language
        });
        $('#score').html(rendered);
        
        $('#score').find('small').click(function() {
            DogPack.clearDogs();
            window.location.href = '?' + Handlebars.helpers.getLanguageFilter(window.language.langId);
        });
    }
    
    function renderPages(dogs) {
        // var template = $('#page-template').html();
        // var compiled = Handlebars.compile(template);
        var rendered = App.templates.page({dogs: dogs});
        $('#pagination').html(rendered);
    }
    
    function attachDogButtons() {
        $('.dog-button').click(function() {
            var id = $(this).closest('.dog-card').data('dog-id');
            DogPack.chooseDog(id);
            renderDogs();
        });
        
        $('.not-dog-button').click(function() {
            var id = $(this).closest('.dog-card').data('dog-id');
            DogPack.chooseNotDog(id);
            renderDogs();
        });
    }
})();