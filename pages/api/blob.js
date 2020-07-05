import fetch from "node-fetch"

export default async (req, res) => {
    let urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/g;
    let urls = req.body.text.match(urlRegex)
    let blob = req.body.text
    await Promise.all(
        urls.map(async url => {
            let response = await fetch(`https://u.nu/api.php?action=shorturl&format=json&url=${url}`)
            let json = await response.json()
            blob = blob.replace(new RegExp(url, 'g'), json.shorturl)
        })
    )

    res.send(blob)
}