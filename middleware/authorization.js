export const adminAuthorization = (req, res, next) => {
    if (req.user.role == 'admin') {
        next();
    }
    else{
        return res.json({
            message: "Admin access required",
            status: false
        })
    }
    
}