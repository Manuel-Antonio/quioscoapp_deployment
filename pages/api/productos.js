export default async function handler(req, res) {
    if(req.method === "POST") {
        res.status(200).json({nota: 20});
    }else {
        res.status(200).json({nota: 10});
    }
}  