export const logging = (req, res, next) => {
    console.log(new Date().toUTCString(), req.method, req.url);
    next();
}