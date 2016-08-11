WebApp.connectHandlers.use("/packages/seekable_materialize/fonts", function (req, res) {
    const url = req.originalUrl.replace("/fonts/", "/dist/fonts/");
    res.statusCode = 301;
    res.setHeader("Location", url);
    res.end();
});
