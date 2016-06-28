
;
(function ($) {
    jQuery.extend({
        wsajax: function (url, method, data, callback, errorCallback) {
            var para = data;
            if (para != null) {
                para = $.toJSON(data);
            }
            
            $.ajax({
                url: url + "/" + method,
                type: "post",
                contentType: "application/json",
                data: para,
                dataType:"json",
                success: function (data) {
                    callback(data.d);
                },
                error: function (e, status) {
                    errorCallback != undefined ? errorCallback(e, status) : "";
                }
            });
        }
    });
})(jQuery);