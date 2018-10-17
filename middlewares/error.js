module.exports = async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.statusCode || err.status || 500;
        ctx.body = {
            status: 'error',
            message: err.message || 'unknown have thing just happened, bro:('
        };
    }
}