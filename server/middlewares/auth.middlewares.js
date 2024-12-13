import jwt from 'jsonwebtoken';

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.sendStatus(401); // Nếu không có token, trả về 401
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403); // Nếu xác thực không thành công, trả về 403
      req.user = user;
      next(); // Chuyển sang middleware tiếp theo hoặc xử lý yêu cầu
    });
}

export default authenticateToken;