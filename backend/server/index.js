const http = require('http');
const url = require('url');

const user = [
    {
        'name': 'wscube',
        'email': 'wscube@gmail.com',
        'city': 'Jaipur'
    },
    {
        'name': 'abcd',
        'email': 'abcd@gmail.com',
        'city': 'kota'
    }
    ,
    {
        'name': 'xyz',
        'email': 'xyz@gmail.com',
        'city': 'delhi'
    }
]

const product = [
    {
        'name': 'product1',
        'email': 'product1@gmail.com',
        'city': 'Jaipur'
    },
    {
        'name': 'product2',
        'email': 'product2@gmail.com',
        'city': 'kota'
    }
    ,
    {
        'name': 'product3',
        'email': 'product3@gmail.com',
        'city': 'delhi'
    }
]

const categories = [
    {
        'name': 'Shirt',
        'slug': 'men-shirt',
    },
    {
        'name': 'Jeans',
        'slug': 'men-jeans',
    }
]

const server = http.createServer(
    (req, res) => {

        const parseUrl = url.parse(req.url, true);

        console.log(parseUrl.pathname);

        if (parseUrl.pathname == '/shop') {
            res.end(JSON.stringify(product));
        } else if (parseUrl.pathname == '/user') {
            res.end(JSON.stringify(user));
        } else if (parseUrl.pathname == '/categories') {
            res.end(JSON.stringify(categories));
        } else {
            res.end("Hello Jaipur");
        }
    }
)

server.listen(
    7000,
    () => {
        console.log("Server is started at port 5000");
    }
)