/**
 * fetching view templates with caching them
 *
 * @param path
 * @param done
 * @return {*}
 */

var fetchTemplate = function (path, done) {
    var JST = window.JST = window.JST || {};
    var def = new $.Deferred();
    if (JST[path]) {
        if (_.isFunction(done)) {
            done(JST[path]);
        }
        return def.resolve(JST[path]);
    }
    $.ajax({
        url:path
        , type: "GET"
        , dataType: "text"
        , cache: false
        , global: false
        , beforeSend: function () {
        }
        , success: function (contents) {
            JST[path] = _.template(contents);
            if(_.isFunction(done)){
                done(JST[path]);
            }
            def.resolve(JST[path]);
        }
    });
    return def.promise();
}