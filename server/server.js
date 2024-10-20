const express = require("express");
const path = require('path');
const util = require('util');

const jwt = require("jsonwebtoken");

const app = express();
const port = 8000;

const bodyParser = require('body-parser');

const core = require("cors");

const { exec } = require('child_process');
const fs = require('fs');


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

app.get('/test', (req, res) => {
    pool.query('SELECT * FROM test', (error, results) => {
        if (error) {
            return res.status(500).json({ error });
        }
        res.json(results);
    });
});

app.get('/customer', (req, res) => {
    pool.query('SELECT * FROM customer', (error, results) => {
        if (error) {
            return res.status(500).json({ error });
        }
        res.json(results);
    });
});

app.get('/customer/profile/:userName', (req, res) => {
    const {userName} = req.params
    console.log(userName)
    const sqlSelect ='SELECT * FROM customer WHERE UserName = ?';
    pool.query(sqlSelect, [userName], (error, results) => {
        console.log(results)
        if (error) {
            return res.status(500).json({ error });
        }
        res.json(results);
        
    });
});

app.post('/saveTestScore/:UserName', (req, res) => {
    
    const { score } = req.body;
    const { UserName } = req.params

    // ค้นหาคะแนนเก่าในฐานข้อมูล
    const sqlSelect = "SELECT TestScore FROM customer WHERE UserName = ?";
    pool.query(sqlSelect, [UserName], (error, results) => {
        if (error) {
            console.error("Error during retrieving old test score: ", error);
            return res.status(500).json({
                result: false,
                message: "เกิดข้อผิดพลาดในการตรวจสอบคะแนน",
            });
        }

        // ตรวจสอบคะแนนเก่า
        const oldScore = results[0]?.TestScore || 0; // ใช้ 0 หากไม่มีคะแนนเก่า

        // ตรวจสอบว่าคะแนนใหม่มากกว่าคะแนนเก่าหรือไม่
        if (score <= oldScore) {
            console.error("คะแนนใหม่ต้องมากกว่าคะแนนเก่า");
            return res.status(400).json({
                result: false,
                message: "คะแนนใหม่ต้องมากกว่าคะแนนเก่า",
            });
        }

        // อัปเดตคะแนนใหม่ในฐานข้อมูล
        const sqlUpdate = "UPDATE customer SET TestScore = ? WHERE UserName = ?";
        pool.query(sqlUpdate, [score, UserName], (error, results) => {
            if (error) {
                console.error("Error during updating test score: ", error);
                return res.status(500).json({
                    result: false,
                    message: "เกิดข้อผิดพลาดในการบันทึกคะแนน",
                });
            }

            res.json({
                result: true,
                message: "บันทึกคะแนนเรียบร้อยแล้ว",
            });
        });
    });
});


app.post('/compile', (req, res) => {
    const { code } = req.body;

    // สร้างไฟล์ C ชั่วคราว
    const filePath = path.join(__dirname, 'temp.c');
    fs.writeFileSync(filePath, code);

    const clangCommand = `"D://clang+llvm//bin//clang.exe" -I"C://Path//To//VisualStudio//VC//include" ${filePath} -o temp.out && temp.out`;

    // คำสั่งในการคอมไพล์โค้ด C โดยใช้ gcc
    exec(clangCommand, (error, stdout, stderr) => {
        if (error || stderr) {
            console.error('Compilation Error:', error); // เพิ่มบรรทัดนี้
            console.error('Standard Error Output:', stderr); // เพิ่มบรรทัดนี้
            return res.status(500).json({
                result: false,
                message: "เกิดข้อผิดพลาดในการคอมไพล์",
                error: stderr || error.message,
            });
        }

        // ส่งผลลัพธ์กลับไปยังแอป
        res.json({
            result: true,
            output: stdout
        });

        // ลบไฟล์ชั่วคราว
        fs.unlinkSync(filePath);
        fs.unlinkSync(path.join(__dirname, 'temp.out'));
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
    const { UserName, Password, FirstName, LastName, Email } = req.body;

    if (!UserName || !Password || !FirstName || !LastName ||  !Email) {
        return res.status(400).json({
            result: false,
            message: "กรุณากรอกข้อมูลให้ครบทุกช่อง",
        });
    }

    
    pool.query("SELECT MAX(CustomerID) AS maxCustomerID FROM customer", (error, results) => {
        if (error) {
            console.error("Error during retrieving max CustomerID: ", error);
            return res.status(500).json({
                result: false,
                message: "เกิดข้อผิดพลาดในการตรวจสอบ CustomerID",
            });
        }

        
        let CustomerID = "C01";
        if (results[0].maxCustomerID) {
            const maxCustomerID = results[0].maxCustomerID;
            const maxNumber = parseInt(maxCustomerID.substring(1)) + 1;
            CustomerID = "C" + String(maxNumber).padStart(2, "0");
        }

        
        const sql = "INSERT INTO customer (CustomerID, UserName, Password, FirstName, LastName, Email) VALUES (?, ?, MD5(?), ?, ?, ?)";

        pool.query(sql, [CustomerID, UserName, Password, FirstName, LastName, Email], (error, results) => {
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

app.delete('/customer/profile/:CustomerID', (req, res) => {
    const {CustomerID} = req.params
    console.log(CustomerID)
    pool.query('DELETE FROM customer WHERE CustomerID = ?', [CustomerID] ,(error, results) => {
        if (error) {
            return res.status(500).json({ error });
        }
        res.json(results);
    });

    res.json({ message: 'Customer deleted successfully' });
});


app.listen(8000, () =>
    console.log(`Example app Listening on port ${port}`)
);
