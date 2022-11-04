import { db } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
    // CHECK IF USER ALREADY EXISTS
    const q = 'SELECT * FROM user WHERE email = ? OR username = ?';
    db.query(q,[req.body.email,req.body.username],(err,data)=>{
        if(err) return res.json(err);
        if(data.length > 0) return res.status(400).json('User already exists');

        // HASH PASSWORD
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password,salt);

        const q = 'INSERT INTO user (`username`,`password`,`email`) VALUES (?)';
        const values =[
            req.body.username,
            hash,
            req.body.email
        ];
        db.query(q,[values],(err,data)=>{
            if(err) return res.json(err);
            res.status(200).json('User created');
        })
    })
}
export const login = (req, res) => {
    // CHECK IF USER EXISTS
    const q = 'SELECT * FROM user WHERE username = ?';
    db.query(q,[req.body.username],(err,data)=>{
        if(err) return res.json(err);
        if(data.length === 0) return res.status(404).json('User does not exist');

        // CHECK IF PASSWORD IS CORRECT
        const validPass = bcrypt.compareSync(req.body.password,data[0].password);
        if(!validPass) return res.status(400).json('Invalid username or password');

        // CREATE AND ASSIGN A TOKEN
        const token = jwt.sign({id: data[0].id},'jwtkey');
        const {password,...other} = data[0];
        res.cookie('access_token',token,{
            httpOnly: true
        }).status(200).json(other);

    })

}
export const logout = (req, res) => {
    res.clearCookie('access_token',{
        sameSite: 'none',
        secure: true
    }).status(200).json('Logged out');
}