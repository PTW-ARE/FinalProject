const express = require("express");
const path = require('path');
const util = require('util');

const jwt = require("jsonwebtoken");

const app = express();
const port = 8000;

const bodyParser = require('body-parser');

const core = require("cors");

app.use(core());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var mysql = require('mysql2');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: '',
    database: "project_app",

});


app.get('/', (req, res) => {
    res.send('hello world');
});


// app.post("/register", (req, res) => {
//     const { UserName, Password, FirstName, LastName, Email ,BirthDate } = req.body;

    

//     if (!UserName || !Password || !FirstName || !LastName || !Email || !BirthDate) {
//         return res.status(400).json({
//             result: false,
//             message: "กรุณากรอกข้อมูลให้ครบทุกช่อง",
//         });
//     }

//     // เขียนคำสั่ง SQL สำหรับการ Insert ข้อมูลลงในตาราง customer
//     const sql = "INSERT INTO customer (UserName, Password, FirstName, LastName, BirthDate, Email) VALUES (?, MD5(?), ?, ?, ?, ?)";
    
//     pool.query(sql, [UserName, Password, FirstName, LastName, BirthDate,Email ], (error, results) => {
//         if (error) {
//             return res.status(500).json({
//                 result: false,
//                 message: "เกิดข้อผิดพลาดในการลงทะเบียน",
//                 error: error.message,
//             });
//         }
//         res.status(201).json({
//             result: true,
//             message: "ลงทะเบียนสำเร็จ",
//         });
//     });
// });

app.post("/register", (req, res) => {
    const { UserName, Password, FirstName, LastName, BirthDate, Email } = req.body;

    if (!UserName || !Password || !FirstName || !LastName || !BirthDate || !Email) {
        return res.status(400).json({
            result: false,
            message: "กรุณากรอกข้อมูลให้ครบทุกช่อง",
        });
    }

    // ค้นหา CustomerID ที่มีค่าสูงสุดในฐานข้อมูล
    pool.query("SELECT MAX(CustomerID) AS maxCustomerID FROM customer", (error, results) => {
        if (error) {
            console.error("Error during retrieving max CustomerID: ", error);
            return res.status(500).json({
                result: false,
                message: "เกิดข้อผิดพลาดในการตรวจสอบ CustomerID",
            });
        }

        // สร้าง CustomerID ใหม่โดยเพิ่มลำดับหมายเลขต่อท้าย
        let CustomerID = "C01";
        if (results[0].maxCustomerID) {
            const maxCustomerID = results[0].maxCustomerID;
            const maxNumber = parseInt(maxCustomerID.substring(1)) + 1;
            CustomerID = "C" + String(maxNumber).padStart(2, "0");
        }

        // แทรกข้อมูลลงในฐานข้อมูลพร้อม CustomerID ที่สร้างขึ้นใหม่
        const sql = "INSERT INTO customer (CustomerID, UserName, Password, FirstName, LastName, BirthDate, Email) VALUES (?, ?, MD5(?), ?, ?, ?, ?)";
        
        pool.query(sql, [CustomerID, UserName, Password, FirstName, LastName, BirthDate, Email], (error, results) => {
            if (error) {
                console.error("Error during registration: ", error);
                return res.status(500).json({
                    result: false,
                    message: "เกิดข้อผิดพลาดในการลงทะเบียน",
                });
            }
            res.status(201).json({
                result: true,
                message: "ลงทะเบียนสำเร็จ",
            });
        });
    });
});



app.post("/login", (req, res) => {
    const UserName = req.body.UserName;
    const Password = req.body.Password;

    pool.query("SELECT * FROM customer WHERE UserName = ? AND Password = MD5(?)", [UserName, Password], function (error, results, fields) {

        if (error) {
            res.json({
                result: false, // ผลลัพธ์การเข้าสู่ระบบ
                message: error.message // ข้อความแจ้งการเกิด error
            });
        }

        // results.length คือ ตัวแปรที่บอกว่าผลลัพธ์จากคำสั่ง query ของเรามีอยู่กี่แถว
        if (results.length) {
            res.json({
                result: true
            });
        } else {
            res.json({
                result: false, // login ไม่สำเร็จ
                message: "Username หรือ Password ไม่ถูกต้อง"
            });
        }
    });
});

app.post("/api/authen_request", (req, res) => {
    const sql = "SELECT * FROM customer WHERE UserName = ?";
    // นำ username ไปตรวจสอบว่ามีข้อมูล username นี้ในฐานข้อมูลหรือไม่
    pool.query(sql, [req.body.UserName], (error, results) => {
        var response;
        if (error) {
            response = {
                result: false,
                message: error.message
            };
        } else {
            if (results.length) {
                // เก็บข้อมูล username ของผู้ใช้
                var payload = { UserName: req.body.UserName };
                // เพื่อนำไปเข้ารหัสกับข้อมูลใน payload
                var secretKey = "MySecretKey";
                // เข้ารหัสข้อมูล payload ด้วย secretKey แล้วเก็บไว้ในตัวแปร authToken
                const authToken = jwt.sign(payload, secretKey);
                // object -> เพื่อเก็บผลลัพธ์ของการทำ authentication request
                response = {
                    result: true,
                    data: {
                        auth_token: authToken
                    }
                };
            } else {
                response = {
                    result: false,
                    message: "Username ไม่ถูกต้อง"
                };
            }
        }

        // ส่งข้อมูลกลับไปยัง client ในรูปแบบ JSON
        res.json(response);

    });
});

//ป้องกันไม่ให้ดึงข้อมูลไปใช้
let checkAuth = (req, res, next) => {
    let token = null;
    
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        token = req.query.token;
    } else {
        token = req.body.token;
    }

    if (token) {
        jwt.verify(token, "MySecretKey", (err, decoded) => {
            if (error) {
                res.send(JSON.stringtify({
                    result: false,
                    message: "ไม่ได้เข้าสู่ระบบ"
                }));
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.status(401).send("Not authorized");
    }
}



app.post("/api/access_request", (req, res) => {
    const authenSignature = req.body.auth_signature;
    const authToken = req.body.auth_token;

    var decoded = jwt.verify(authToken, "MySecretKey");

    if (decoded) {
        const query = "SELECT CustomerID, UserName, FirstName, LastName, Email"
            + "FROM customer WHERE MD5(CONCAT(UserName, '&', Password)) = ?";
        pool.query(query, [authenSignature], (error, results) => {
            var response;
            if (error) {
                response = {
                    result: false,
                    message: error.message
                };
            } else {
                if (results.length) {
                    var payload = {
                        CustomerId: results[0].CustomerId, UserName: results[0].UserName, FirstName: results[0].FirstName,
                        LastName: results[0].LastName, Email: results[0].Email
                    };
                    const accessToken = jwt.sign(payload, "MySecretKey");
                    response = { result: true, data: { access_token: accessToken, account_info: payload } };
                } else {
                    response = { result: false, message: "Username หรือ Password ไม่ถูกต้อง" };
                }
            }
            res.json(response);
        });
    }
});




app.listen(8000, () =>
    console.log(`Example app Listening on port ${port}`)
);
