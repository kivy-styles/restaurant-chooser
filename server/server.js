const express = require('express')
const path = require('path')
const port= process.env.PORT || 3000

const app= express()
app.use(express.static('static'))

app.get('*', (req,res)=>{
    res.sendFile(path.resolve('../static/'))
    }
)

app.listen(port,()=>(
    console.log('App started on port 3000')
    )
)
