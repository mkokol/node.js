var ModalWindow = Backbone.View.extend({
    el: "body"
    , companies: null
    , events: {
        "click .closeModal": "close"
        , "submit": "submit"
    }
    , initialize: function() {
        Backbone.Validation.bind(this);
    }
    , render: function() {
        var modelData = this.model.toJSON()
        , labels = this.model.labels
        , el = this.$el;
        fetchTemplate(this.model.formTemplate, function(tmpl) {
            var fields = {};
            for(key in modelData) {
                if(_.has(labels, key)) fields[key] = {data: modelData[key], label:labels[key]}
            }
            var renderedForm = tmpl(fields);
            el.append(renderedForm);
            el.find("#modal-wnd").modal('show');
        });

    }
    , close: function() {
        this.$el.find("#modal-wnd").modal('hide');
        this.$el.find("#modal-wnd").remove();
        return this;
    }
    , submit: function(e){
        e.preventDefault();
        $(".control-group").removeClass("error");
        $(".help-inline").html("");
        var model = this.model;
        inputList = this.$el.find("#modal-wnd").find('input').each(function(i, el) {
            // set is not working for new object
            model.attributes[$(el).attr('name')] = $(el).val();
        });
        var errors = this.model.validate();
        if(this.model.isValid()){
            this.model.save();
            if(this.companies != null){
                this.companies.fetch();
            }
            this.close();
        }else{
            for(key in errors){
                $("#control-group-" + key).addClass("error");
                $("#help-inline-" + key).html(errors[key]);
            }
        }
    }
});