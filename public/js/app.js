$(function() {
    $.ajax({
        url: "/company"
        , type: "GET"
        , success: function(data){
            if(data.status == "success"){
                console.log(data.records);
                var companiesList = new Companies(data.records);
                var companiesListView = new CompaniesView({
                    collection: companiesList,
                    el: $('#companies')
                });
                companiesListView.render();
            }
        }
    });
});