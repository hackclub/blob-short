import fetch from "node-fetch"

const allowCors = fn => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another option
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }
    return await fn(req, res)
}

const BlobShort = async (req, res) => {
    if (!req.body.text) {
        res.send({
            result: null,
            error: true
        })
        return
    }
    let urlRegex = /(https?|chrome):\/\/[^\s$.?#].[^\s]*/g;
    let urls = [...req.body.text.matchAll(urlRegex)]
    let blob = req.body.text
    urls ?
        await Promise.all(
            urls.map(async url => {
                try {
                    let response = await fetch(`https://u.nu/api.php?action=shorturl&format=json&url=${encodeURIComponent(url[0])}`)
                    let json = await response.json()
                    if (json.shorturl) {
                        blob = blob.replace(new RegExp(url[0].replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
                            , "gi"), json.shorturl)
                    }
                } catch {
                    return
                }
            })
        ) : null

    res.send({ result: blob })
}

export default allowCors(BlobShort)