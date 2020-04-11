
import { diskStorage } from 'multer';
import { extname } from "path";
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export const arrayFiles = [
    { name: 'htmlBanner', maxCount: 100 },
];

export const localOptions: MulterOptions = {
    storage: diskStorage({
        destination: './uploads/level',
        filename: (req, file, cb) => {
            let extValidas = ['.jpg', '.JPG', '.jpeg', '.JPEG', '.png', '.PNG', '.svg', '.SVG'];
            if (extValidas.indexOf(extname(file.originalname)) < 0) {
                cb('valid extensions: ' + extValidas.join(', '));
                return;
            }
            const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
            if (file.fieldname === 'htmlBanner') {
                req.body.htmlBanner = `${randomName}${extname(file.originalname)}`;
            }
            cb(null, `${randomName}${extname(file.originalname)}`)
        }
    })
}