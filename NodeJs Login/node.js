const http = require("http");
const fs = require("fs");
const { log } = require("console");

const server = http.createServer((req, res) => {
    if (req.method === "GET") {
        // Serve the login page
        if (req.url === "/") {
            fs.readFile("index.html", (err, data) => {
                if (err) {
                    res.writeHead(500, { "Content-Type": "text/plain" });
                    res.end("Internal Server Error");
                } else {
                    console.log("req");
                    
                    res.writeHead(200, { "Content-Type": "text/html" });
                    res.end(data);
                }
            });
        } else {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("404 Not Found");
        }
    } else if (req.method === "POST" && req.url === "/login") {
        let body = "";

        // Collect data chunks
        req.on("data", chunk => {
            body += chunk.toString();
        });

        // Process collected data
        req.on("end", () => {
            const params = new URLSearchParams(body);
            const username = params.get("username");
            const password = params.get("password");

            // Log the data to the console (you can process it as needed)
            console.log("Username:", username);
            console.log("Password:", password);

            // Respond to the client
            if (username === "admin" && password === "1234") {
                res.writeHead(200, {"Content-Type": "text/plain" });
                res.end("Login Success");
            } else {
                res.writeHead(401, { "Content-Type": "text/plain" });
                res.end("Invalid Credentials! you are passing wrong credentials");
            }
        });
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
    }
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000/");
});
