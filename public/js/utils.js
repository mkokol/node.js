var fetchTemplate = function(path, done) {
    var JST = window.JST = window.JST || {};
    var def = new $.Deferred();
    // Should be an instant synchronous way of getting the template, if it
    // exists in the JST object.
    if(JST[path]) {
      if(_.isFunction(done)) {
        done(JST[path]);
      }
      return def.resolve(JST[path]);
    }
    // Fetch it asynchronously if not available from JST, ensure that
    // template requests are never cached and prevent global ajax event
    // handlers from firing.
    $.ajax({
      url: path,
      type: "get",
      dataType: "text",
      cache: false,
      global: false,
      beforeSend: function() {
        // 'show loading screen'
      },
      success: function(contents) {
        // 'remove loading screen'
        JST[path] = _.template(contents);

        // Set the global JST cache and return the template
        if(_.isFunction(done)) {
          done(JST[path]);
        }

        // Resolve the template deferred
        def.resolve(JST[path]);
      }
    });

    // Ensure a normalized return value (Promise)
    return def.promise();
  }

$(document).ready(function() {

  $('#create-new-company-btn').click(function() {
    var modal = $("#modal-wnd"),
      newCompany = new Company(),
      newCompanyView = new CompanyView({
        model: newCompany
      });

    modal.modal("show");
    newCompanyView.drawForm(function(renderedForm) {
      modal.html(renderedForm);
    });

  });

  $(".closeModal").click(function() {
    $('#modal-wnd').modal("hide");
  });

});