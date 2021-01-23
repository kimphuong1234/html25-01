$(document).ready(function () {
    new employeejs();
})
/**
 * Class quan ly su kien cho trang Employee
 * CreatedBy: abc (29/12/2020)
 * */
class employeejs extends BaseJS {
    //ham khoi tao đc chạy đầu tiên
    constructor() {
        super();
    }

    setDataUrl() {
        this.getDataUrl = "http://localhost:49782/api/v1/Employees";
        this.api = "http://localhost:49782/api/v1/Employees";
    }

}




