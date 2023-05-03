import doctorModel from '../models/doctorModel.js'


//get Doctor info
export const getDocterController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOne({ userId: req.body.userId })
        res.status(200).send({
            success: true,
            message: "doctor data fitched successfully",
            data: doctor

        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error geting docter info ",
            error
        })

    }
}
//update profile
export const updatProfileController = async(req,res)=>{
    try {
        const doctor = await doctorModel.findByIdAndUpdate({userId: req.body.userId},
            req.body);
            res.status(201).send({
                success:true,
                message:'Doctor profile updated successfully',
                data: doctor,
            })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Docter Profile Update Error",
            error
        })
        
    }
}