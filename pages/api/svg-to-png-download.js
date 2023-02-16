//Serverless function that accepts an SVG string and returns a PNG file

const { convert } = require('convert-svg-to-png');


export default async (req, res) => {
    
        const svg = req.body.svg;
        const png = await convert(svg);
    
        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Content-Disposition', 'attachment; filename=qr.png');
        res.setHeader('Content-Length', png.length);
        res.end(png);

}