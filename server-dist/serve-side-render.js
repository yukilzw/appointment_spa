const vue = require('vue')
const path = require('path')
const fs = require('fs')
const express = require('express')
const server=express()
const vueServerRenderer = require('vue-server-renderer')
const code = fs.readFileSync('./server.bundle.js', 'utf8')
const temp = fs.readFileSync('./serve-template.html', 'utf8')
const bundleRenderer = vueServerRenderer.createBundleRenderer(code)

server.use(express.static(path.resolve(__dirname, './')))

server.get('/ssr', (req, res) => {
    const context = {
        url: req.url ,
        title : 'SSR应用'
    }
    bundleRenderer.renderToString(context, (err, html) => {
        if (err){
            console.log(err)
            res.status(404).send('404 some Error happens!')
        }
        res.send(temp.replace('<div id="body"></div>',html))
    })
})

server.listen(8080)

