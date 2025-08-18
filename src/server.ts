import { createApp } from "./app";

const PORT = process.env.PORT || 3000;

createApp()
    .then(app => {
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        })
    })
    .catch(error => {
        console.log(`Error starting application: ${error}`);
    });

