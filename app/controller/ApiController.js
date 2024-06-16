const USermodel = require('../model/usermodel')
class UserController {
    getdata = async (req, res) => {
        // --------------------------------match-------------------------------//
        try {
            const Alldata = await USermodel.aggregate([{ $match: { gender: 'female' } }])
            return res.status(201).json({
                message: "All data  get done",
                Getdata: Alldata
            })
        } catch (error) {
            return res.status(500).json({
                message: 'error to get all data',
                error: error.message
            })
        }
    }
    // --------------------------------group----------------------------------//
    groupdata = async (req, res) => {
        try {
            const grpdata = await USermodel.aggregate([{ $group: { _id: '$department.name' } }])
            // const grpdata=await USermodel.aggregate([{$group:{_id:"$department.location"}}])
            if (grpdata) {
                return res.status(200).json({
                    message: "group data get done",
                    Grpdata: grpdata
                })
            }
        } catch (error) {
            return res.status(500).json({
                message: "error to get groupdata",
                error: error.message
            })
        }
    }
    // calculate the accumulated values for each group. The following calculates the number of employees in each department.Accumulator Operator {$sum:1}//
    totalemp = async (req, res) => {
        try {
            const TotalEmp = await USermodel.aggregate([{ $group: { _id: '$department.name', totalEmployees: { $sum: 1 } } }])
            if (TotalEmp) {
                return res.status(201).json({
                    message: 'Total empdata is get',
                    empdata: TotalEmp
                })
            }
        } catch (error) {
            return res.status(500).json({
                message: "error to get total emp data",
                error: error.message
            })
        }
    }
    // -----------aggregation pipeline contains two stages.$match and $group--------------//
    Totalemp_fieldcount = async (req, res) => {
        try {
            const emp = await USermodel.aggregate([{ $match: { gender: 'male' } },
            { $group: { _id: "$department.name", Totalemp: { $sum: 1 } } }])
            if (emp) {
                return res.status(200).json({
                    message: "total emp data is get ",
                    Empdata: emp
                })
            }
        } catch (error) {
            return res.status(500).json({
                message: "error to get emp data",
                error: error.message
            })
        }
    }
    // --------------------salarycount-------------------//
    salarycount = async (req, res) => {
        try {
            const Countsalary = await USermodel.aggregate([{ $match: { gender: 'male' } },
            { $group: { _id: { depname: '$department.name' }, totalSalaries: { $sum: '$salary' } } }])
            if (Countsalary) {
                return res.status(200).json({
                    message: "Total salary in perticular fields are get sucessfully",
                    salary: Countsalary
                })
            }
        } catch (error) {
            return res.status(500).json({
                message: "error to get salary",
                error: error.message
            })
        }
    }
    // ------------------------sort----------------------------//
    sort = async (req, res) => {
        try {
            const Sortdata = await USermodel.aggregate([{ $match: { gender: 'female' } }, { $sort: { firstName: 1 } }])
            if (Sortdata) {
                return res.status(200).json({
                    message: " get sorted all data",
                    sortdata: Sortdata

                })
            }
        } catch (error) {
            return res.status(500).json({
                message: "error to get sort data",
                error: error.message
            })
        }
    }
    // ------------------------------AllData------------------------------//
    AllData = async (req, res) => {
        try {
            const alldata = await USermodel.find()
            if (alldata) {
                return res.status(200).json({
                    message: "All data get sucessfully",
                    count: alldata.length,
                    data: alldata

                })
            }
            // const project=await USermodel.aggregate([{$project:{"__v":0}}])
            // console.log('jj',project);
            // if(project){
            //     return res.status(200).json({
            //         message:'All data get sucessfully',
            //         count:project.length,
            //         data:project
            //     })
            // }
        } catch (error) {
            return res.status(500).json({
                message: "error to get all data",
                error: error.message
            })
        }
    }
    // -----------------------------postdata------------------------------//
    postdata = async (req, res) => {
        try {
            const { firstName, lastName, gender, email, salary, department } = req.body
            const userdata = new USermodel({
                firstName, lastName, gender, email, salary, department
            })
            const savedata = await userdata.save()
            if (savedata) {
                return res.status(200).json({
                    message: "data added sucessfully",
                    data: savedata
                })
            }
        } catch (error) {
            return res.status(500).json({
                message: "error to add data",
                error: error.message
            })
        }
    }
    // ----------------------for paginate--------------------//
    paginate = async (req, res) => {
        try {
            const gdata = await USermodel.find()
            let options =
            {
                page: 1,
                limit: 3
            }
            const paginate_data = await USermodel.aggregatePaginate(gdata, options)
            if (paginate_data) {
                return res.status(201).json({
                    status: 1,
                    message: 'paginate data get sucessfully',
                    count: paginate_data.length,
                    data: paginate_data
                })
            }
        } catch (error) {
            return res.status(500).json({
                message: "error to get peginate data",
                error: error.message
            })
        }
    }
    // ----------------------for project-------------//
    project = async (req, res) => {
        try {
            const project = await USermodel.aggregate([{ $project: { status: 0, __v: 0 } }])
            console.log('jj', project);
            if (project) {
                return res.status(200).json({
                    message: 'All data get sucessfully',
                    count: project.length,
                    data: project
                })
            }
        } catch (error) {
            return res.status(500).json({
                message: "error to get all data",
                error: error.message
            })
        }
    }
    // -------------------------AddField---------------------//
    AddField = async (req, res) => {
        try {
            const addfield = await USermodel.aggregate([
                { $addFields: { "department.citizen": 'Indian', "qualification": 'Graduation' } },
                { $skip: 1 }
            ])
            if (addfield) {
                return res.status(200).json({
                    message: "new field is added",
                    count: addfield.length,
                    newdata: addfield
                })
            }
        } catch (error) {
            return res.status(500).json({
                message: "error to add new field",
                error: error.message
            })
        }
    }
    // --------------------------ReplaceRoot--------------------//
    ReplaceRoot = async (req, res) => {
        try {
            const replace_root = await USermodel.aggregate([
                {
                    $replaceRoot:
                    {
                        newRoot:
                        {
                            fullname:
                                { $concat: ["$firstName", " ", "$lastName"] }
                        }
                    }
                }
            ])
            if(replace_root){
                return res.status(500).json({
                    message:"full name is get succesfully",
                    rootdata:replace_root,
                    count:replace_root.length
                })
            }
        } catch (error) {
            return res.status(500).json({
                message:'error to get fullname',
                error:error.message
            })
        }
    }
    // -------------------RateLimit-----------------//
    RateLimit=async(req,res)=>{
        try{
            const getdata=await USermodel.find()
            if(getdata){
                return res.status(200).json({
                    message:"rate limits works properly",
                    total_data:getdata.length,
                    data:getdata
                })
            }
        }catch(error){
            return res.status(500).json({
               message:'error in rate limit',
                error:error.message
            })
        }
    }
}


module.exports = new UserController