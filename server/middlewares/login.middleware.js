import { statusCode } from "../config/statusCode.config.js";
import { BaseResponse } from "../config/BaseResponse.config.js";

const isLoggedIn = (req, res, next)=>{
    try {
        if(!req.isAuthenticated()){
            return res.status(statusCode.UNAUTHORIZED).json(BaseResponse.error('Bạn phải đăng nhập trước', null));
        }
        next();
        
    } catch (error) {
        console.log("Is loggin: ", error);
        return res.status(statusCode.NOT_FOUND).json(BaseResponse.error('Thất bại', error));
    }
}


export {isLoggedIn};