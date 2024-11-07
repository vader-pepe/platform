package org.ikapiar.common;

import org.jboss.resteasy.reactive.RestResponse;

public class ResponseBody<T> {

    public T data;
    public String message;

    public ResponseBody(T data) {
        this.data = data;
    }

    public ResponseBody(T data, String message) {
        this.data = data;
        this.message = message;
    }

    public ResponseBody(String message) {
        this.message = message;
    }

    public static <T> RestResponse.ResponseBuilder<ResponseBody<T>> ok(T data, String message) {
        var body = new ResponseBody<>(data, message);
        return RestResponse.ResponseBuilder.ok(body);
    }

    public static <T> RestResponse.ResponseBuilder<ResponseBody<T>> ok(T data) {
        var body = new ResponseBody<>(data, "");
        return RestResponse.ResponseBuilder.ok(body);
    }

    public static <T> RestResponse.ResponseBuilder<ResponseBody<T>> ok(String message) {
        var body = new ResponseBody<T>(null, message);
        return RestResponse.ResponseBuilder.ok(body);
    }

    public static <T> RestResponse.ResponseBuilder<ResponseBody<T>> ok() {
        return RestResponse.ResponseBuilder.ok();
    }

    public static <T> RestResponse<ResponseBody<T>> okBuild(T data, String message) {
        var body = new ResponseBody<>(data, message);
        return RestResponse.ok(body);
    }

    public static <T> RestResponse<ResponseBody<T>> okBuild(T data) {
        var body = new ResponseBody<>(data, "");
        return RestResponse.ok(body);
    }

    public static <T> RestResponse<ResponseBody<T>> okBuild(String message) {
        var body = new ResponseBody<T>(null, message);
        return RestResponse.ok(body);
    }

    public static <T> RestResponse<ResponseBody<T>> okBuild() {
        return RestResponse.ok();
    }
}
