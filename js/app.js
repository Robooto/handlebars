(function() {
    
    registerPartials();
    renderPage();
    renderDogs();
    
    function registerPartials() {
        Handlebars.registerPartial('dog', $('#dog-template').html());
    }
    
    function renderPage() {
        var template = $('#index-template').html();
        var compiled = Handlebars.compile(template);
        var rendered = compiled(window.language);
        $('#main').html(rendered);
        $('#languageSwitch').click(function() {
            DogPack.switchLanguage();
        });
    }
    
    function renderDogs() {
        var template = $('#dogs-template').html();
        var compiled = Handlebars.compile(template);
        var rendered = compiled({dogs: DogPack.dogs, language: window.language});
        $('#theDogs').html(rendered);
        attachDogButtons();
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