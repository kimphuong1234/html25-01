﻿class BaseJS {
    constructor() {
        this.getDataUrl = null;
        this.setDataUrl();
        this.initEvents();
        this.loadData();
    }

    setDataUrl() {

    }

    initEvents() {
        var me = this;
        //sự kiện click thi nhấn vào thêm ms
        $('#btnAdd').click(function () {
            //Hiển thị dialog thông tin chi tiết:
            $('.dialog-detail').show();
            $('#txtEmployeeCode').focus();
            var selects = $('select[fieldName]');
            console.log(selects);
            $.each(selects, function (index, select) {
                var api = $(select).attr('api');
                console.log(api);
                var fieldName = $(select).attr('fieldName');
                var fieldValue = $(select).attr('fieldValue');
                console.log(fieldName);
                console.log(fieldValue);
                $.ajax({
                    url: api,
                    method: "GET"
                }).done(function (res) {
                    if (res) {
                        $.each(res, function (index, obj) {
                            var option = $(`<option>dqdqw</option>`);
                            select.append(option);
                        })
                    }
                }).fail(function (res) {

                })

            })
        })

        //Load lại dữ liệu khi ấn button Load
        $('#btnRefresh').click(function () {
            //Hiểnthị customer thông tin chi tiết sau khi Load data:
            this.loadData();
        }.bind(this))

        //Ẩn form chi tiết khi ấn X:
        $('#btnX').click(function () {
            //Hiển thị customer thông tin chi tiết:
          //  dialogDetail.dialog('close');
            $('.m-dialog').hide();
        })

        //Ẩn form chi tiết khi ấn hủy:
        $('#btnCancel').click(function () {
            //Hiển thị customer thông tin chi tiết:
            $('.m-dialog').hide();

        })

        //Thực hiện lưu dữ liệu khi ấn button LƯU trên form chi tiết
        $('#btnSave').click(function () {

            //Validate dữ liệu:
            var inputvaidates = $('input[required], input[type="email"]');
            $.each(inputvaidates, function (index, input) {
                $(input).trigger('blur');
            })
            var inputNotValids = $('input[validate="false"]');
            if (inputNotValids && inputNotValids.length > 0) {
                alert("Dữ liệu không hợp lệ vui lòng kiểm tra lại.");
                inputNotValids[0].focus;
                return;
            }
            var inputs = $('input[fieldName],select[fieldName]');
            var entity = {};
            $.each(inputs, function (index, input) {
                var propertyName = $(this).attr('fieldName');
                var value = $(this).val();
                entity[propertyName] = value;
            })
            //Gọi service tương ứng thực hiện lưu dữ liệu:
            var employee;
            $.ajax({
                url: me.getDataUrl,
                method: 'POST',
                data: JSON.stringify(employee),
                contentType: 'application/json'
            }).done(function (res) {
                alert('Thêm thành công');
                $('.dialog-detail').hide();
                me.loadData();
            }).fail(function (res) {
                debugger
            })
            //Sau khi lưu thành công:
            //  + đưa ra thông báo tshành công
            //  + ẩn form chi tiết
            //  + load lại dữ liệu

            //Hiển thị dialog thông tin chi tiết:
            

        })

        // Hiển thị thông tin chi tiết khi nhấn đúp chuột chọn 1 dòng
        $('table tbody').on('dblclick', 'tr', function () {
            $(this).addClass('row-selected');
            $('.dialog-detail').show();
        })
        ///**
        // * validate chuyển đến hiện xanh
        // * createdby: abc (04/01/2021)
        // */
        //$('input[container]').focus(function () {
        //    $(this).addclass('border-green');
        //});
        /**
         * validate bắt buộc nhập:
         * CreatedBy: abc (04/01/2021)
         */

        $('input[required]').blur(function () {
            //Kiểm tra dữ liệu đã nhập, nếu để trống thì cảnh báo
            var value = $(this).val();
            if (!value) {
                $(this).addClass('border-red');
                $(this).attr('title', 'trường này không được để trống');
                $(this).attr('validate', false);
            } else {
                $(this).removeClass('border-red');
                $(this).attr('validate', true);
            }
            
        })

        /**
         * validate Email đúng định dạng:
         * CreatedBy: abc (04/01/2021)
         */
        $('input[type="email"]').blur(function () {
            var value = $(this).val();
            var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
            if (!testEmail.test(value)) {
                $(this).addClass('border-red');
                $(this).attr('title', 'Email không dúng định dạng');
                $(this).attr('validate', false);
            }
            else {
                $(this).removeClass('border-red');
                $(this).attr('validate', true);
            }
        })


    }
    /**
     * Load dữ liệu
     * CreatedBy: abc (29/12/2020)
     * */
    loadData() {
        // lấy thông tin các cột data:
        try {
            var columns = $('table thead th');
            var getDataUrl = this.getDataUrl;
            $.ajax({
                url: 'http://localhost:49782/api/v1/Employees',
                method: "GET",

            }).done(function (res) {
                $.each(res, function (index, obj) {
                    var tr = $(`<tr></tr>`);
                    //lấy thông tin dữ liệu sẽ map tương ứng vs các cột
                    $.each(columns, function (index, th) {
                        var td = $(`<td><div><span></span></div></td>`);
                        var fieldName = $(th).attr('fieldname');
                        var value = obj[fieldName];
                        var formatType = $(th).attr('formatType');
                        switch (formatType) {
                            case "ddmmyyyy":
                                td.addClass("text-align-center");
                                value = formatDate(value);
                                break;
                            case "Money":
                                td.addClass("text-align-right");
                                value = formatMoney(value);
                                break;
                            default:
                        }
                        td.append(value);
                        $(tr).append(td);
                    })
                    //debugger;
                    $('table tbody').append(tr);

                })
            }).fail(function (res) {

            })
        } catch (e) {
            //ghi log lỗi:
            console.log(e);
        }
    }
    }


