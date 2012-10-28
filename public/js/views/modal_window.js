var ModalWindow = Backbone.View.extend({
    el: "body"
    , wndTemplate: "../tmpl/add-edit-form.html"
    , callBack: null
    , events: {
        "click .close-modal": "close"
        , "click .close": "close"
        , "click .modal-backdrop": "close"
        , "click .save-modal": "submit"
    }
    , initialize: function() {
        Backbone.Validation.bind(this);
    }
    , render: function(title, callBack) {
        this.callBack = callBack;
        var _this = this;
        fetchTemplate(this.wndTemplate, function(tmpl) {
            var modelData = _this.model.toJSON()
            , labels = _this.model.labels
            , fields = {};
            for(key in modelData) {
                if(_.has(labels, key)) fields[key] = {data: modelData[key], label:labels[key]}
            }
            var renderedForm = tmpl({title: title, fields: fields});
            _this.$el.append(renderedForm);
            _this.$el.find("#modal-wnd").modal('show');
        });
    }
    , close: function() {
        this.undelegateEvents();
        this.$el.find("#modal-wnd").modal('hide');
        this.$el.find("#modal-wnd").remove();
    }
    , submit: function(e){
        e.preventDefault();
        $(".control-group").removeClass("error");
        $(".help-inline").html("");
        var model = this.model;
        inputList = this.$el.find("#modal-body").find('input').each(function(i, el) {
            // model.set is not working for new object ((
            model.attributes[$(el).attr('name')] = $(el).val();
        });
        var errors = this.model.validate();
        if(this.model.isValid()){
            this.model.save(this.model.toJSON());
            this.callBack();
            this.close();
        }else{
            for(key in errors){
                $("#control-group-" + key).addClass("error");
                $("#help-inline-" + key).html(errors[key]);
            }
        }
    }
});