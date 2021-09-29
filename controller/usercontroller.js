const User = require('../model/User')
const Todo = require('../model/Todo')

const success = {
    error: null,
    message: "Data retrieved successfully"
}
const failure = {
    data: null,
    message: "Error while fetching data"
}

const no_data = {
    error: null,
    message: "Not present in database"
}
const exists = {
    error: null,
    message: "Already present in database"
}
exports.adduser = async (req, res) => {

    try {
        var today = new Date()
        var current_date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
        // let current_date = new Date("<YYYY-mm-dd>")
        let user = await User.findOne({ email: req.body.email })
        // console.log(user.user_name)
        if (!user) {
            const { user_name, email, phone, role, password } = req.body
            let new_user = await new User({
                user_name,
                email,
                phone,
                role,
                password,
                date: current_date
            }).save()
            return res.status(200).send({
                error: null,
                data: new_user,
                message: "User created successfully"
            })
        } else {
            return res.status(200).send(exists)
        }

    } catch (err) {
        return res.status(400).send({
            error: err.message,
            data: null,
            message: "Error while adding to the database"
        })
    }

};


exports.getalltodo = async (req, res) => {
    let page = parseInt(req.query.page)
    let limit = parseInt(req.query.limit)
    let skip = (page - 1) * limit
    try {
        let id = req.params.id
        let user = await User.findById({ _id: id });
        // console.log(user.role)
        if (user.role == "admin") {
            let all_todo = await Todo.find().skip(skip).limit(limit * 1)
            return res.status(200).send({ success, data: all_todo })
        }
        if (user.role == "app_user") {
            let todo = await Todo.find({ user_name: id }).skip(skip).limit(limit * 1)
            console.log(todo)
            return res.status(200).json({ success, data: todo })
        }
    } catch (err) {
        return res.status(400).send({
            failure,
            error: err.message
        })
    }
};


exports.registereduser = async (req, res) => {

    try {
        let today = new Date()
        let currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
        // console.log(currentDate,typeof(currentDate))
        let user = await User.find({ date: currentDate })
        
        return res.status(200).json({ user })
    }
    catch (err) {
        return res.status(400).send({ failure, error: err.message })
    }
}



