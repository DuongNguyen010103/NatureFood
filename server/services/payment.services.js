//https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
//parameters
import crypto from "crypto";
import axios from "axios";

var accessKey = "F8BBA842ECF85";
var secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
var orderInfo = "Naturee MoMo";
var partnerCode = "MOMO";
var redirectUrl = process.env.REDIREC_URL;
var ipnUrl = "https://2855-27-74-197-42.ngrok-free.app/payment/callback";
var requestType = "payWithMethod";

var orderId = partnerCode + new Date().getTime();
var requestId = orderId;
var extraData = "";
var orderGroupId = "";
var autoCapture = true;
var lang = "vi";
export async function createMoMoPayment(amount) {
    var rawSignature =
        "accessKey=" +
        accessKey +
        "&amount=" +
        amount +
        "&extraData=" +
        extraData +
        "&ipnUrl=" +
        ipnUrl +
        "&orderId=" +
        orderId +
        "&orderInfo=" +
        orderInfo +
        "&partnerCode=" +
        partnerCode +
        "&redirectUrl=" +
        redirectUrl +
        "&requestId=" +
        requestId +
        "&requestType=" +
        requestType;
    //puts raw signature
    console.log("--------------------RAW SIGNATURE----------------");
    console.log(rawSignature);
    //signature

    var signature = crypto.createHmac("sha256", secretKey).update(rawSignature).digest("hex");
    console.log("--------------------SIGNATURE----------------");
    console.log(signature);

    //json object send to MoMo endpoint
    const requestBody = JSON.stringify({
        partnerCode: partnerCode,
        partnerName: "Test",
        storeId: "MomoTestStore",
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        lang: lang,
        requestType: requestType,
        autoCapture: autoCapture,
        extraData: extraData,
        orderGroupId: orderGroupId,
        signature: signature,
    });

    //Create the axios objects
    const options = {
        method: "POST",
        url: "https://test-payment.momo.vn/v2/gateway/api/create",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(requestBody),
        },
        data: requestBody,
    };

    let result;
    try {
        result = await axios(options);
        return result.data;
    } catch (error) {
        return error;
    }
}
