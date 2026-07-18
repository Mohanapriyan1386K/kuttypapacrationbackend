import app from "./app.js";
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server Started on port ${process.env.PORT || 5000}`);
});