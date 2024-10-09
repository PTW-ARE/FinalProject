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



app.get('/units', (req, res) => {
    pool.query('SELECT UnitID, UnitName FROM unit', (error, results) => {
        if (error) {
            return res.status(500).json({ error });
        }
        res.json(results);
    });
});


app.get('/part', (req, res) => {
    pool.query('SELECT * FROM part', (error, results) => {
        if (error) {
            return res.status(500).json({ error });
        }
        res.json(results);
    });
});



app.post("/login", (req, res) => {
    const { UserName, Password } = req.body;

    if (!UserName || !Password) {
        return res.status(400).json({
            result: false,
            message: "กรุณากรอกข้อมูลให้ครบทุกช่อง",
        });
    }

    // ตรวจสอบข้อมูลผู้ใช้ในฐานข้อมูล
    pool.query(
        "SELECT * FROM customer WHERE UserName = ? AND Password = MD5(?)",
        [UserName, Password],
        (error, results) => {
            if (error) {
                console.error("Error during login: ", error);
                return res.status(500).json({
                    result: false,
                    message: "เกิดข้อผิดพลาดในการเข้าสู่ระบบ",
                });
            }


            if (results.length > 0) {
                // สร้าง token
                const token = jwt.sign({ UserName }, "MySecretKey", { expiresIn: '1h' });
                return res.status(200).json({
                    result: true,
                    message: "เข้าสู่ระบบสำเร็จ",
                    token,
                });

            } else {
                return res.status(401).json({
                    result: false,
                    message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
                });

            }
        }
    );
});

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


app.listen(8000, () =>
    console.log(`Example app Listening on port ${port}`)
);
