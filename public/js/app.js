$(function() {
	var bootData = [{
		name: 'epam',
		street: 'O.Stepanivny',
		street_number: 45,
		city: 'Lviv',
		zip_code: 'ja ipy',
		url: 'epam.com',
		contact: '123123 123'
	}, {
		name: 'globalogic',
		street: 'Zaliznu4na',
		street_number: 32,
		city: 'Lviv',
		zip_code: 124234,
		url: 'gl.com',
		contact: '093 456 456'
	}];
	var additionalCompany = {
		name: 'SoftServe',
		street: 'V.Velykogo',
		street_number: 12,
		city: 'Lviv',
		zip_code: 45655,
		url: 'ss.com',
		contact: '093 34543 456'
	}
	var companiesList = new Companies(bootData);
	var companiesListView = new CompaniesView({
		collection: companiesList,
		el: $('#companies')
	});
	companiesListView.render();

	setTimeout(function() {
		companiesList.add(additionalCompany);
	}, 5000);
});