import { Request, Response, NextFunction } from "express";
import multer from "multer";
import util from "../util";

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    },
})

let upload = multer({
    storage: storage,
    limits: { fileSize: 500 * 1024 }
}).single('file')

/* HANDLE */
async function postAvatar(req: Request, res: Response, next: NextFunction) {
    try {
        upload(req, res, function (err: any) {
            if (err instanceof multer.MulterError) {
                res.statusCode = 404;
                res.message = err.message
            }if(err){
                res.statusCode = 500;
                res.message = err
            }else {
                // Response
                res.statusCode = 200;
                res.message = "success.upload"
                res.data = req.file.filename
            }
            next();
        })
    } catch (error) {
        util.common.requestErrorHandle(res, error)
        next();
    }
}

export default { postAvatar }