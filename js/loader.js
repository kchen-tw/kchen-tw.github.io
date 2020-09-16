var Loader = (function() {
    function Loader($wrapper) {
        this.$wrapper = $wrapper;
    }
    Loader.prototype.start = function() {
        this.$wrapper.removeClass('hide');
    };
    Loader.prototype.end = function() {
        this.$wrapper.addClass('hide');
    };
    return Loader;
}());