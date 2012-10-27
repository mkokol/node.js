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

var ModalWindow = Backbone.View.extend({
  className: 'modal',
  events: {
    'click .closeModal': 'close'
  },
  render: function() {
    return this.$el
  },
  appendToDom: function() {
    $('body').append(this.$el);
    return this;
  },
  show: function(){
    this.$el.modal('show');
    return this;
  },
  close: function() {
    this.$el.modal('hide');
    return this;
  },
  destroy: function() {
    this.$el.remove();
  }
});


//_.extend(Backbone.Validation.callbacks, {
//    valid: function(view, attr, selector) {
//        console.log("sacess");
//        return false;
//    },
//    invalid: function(view, attr, error, selector) {
//        console.log("error");
//        return false;
//    }
//});