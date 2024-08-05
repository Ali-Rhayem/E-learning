import Class from '../models/class.model.js';

export const createClass = async (req, res) => {
    const { title, description, files } = req.body;
    try {
        const newClass = new Class({ title, description, files, students: [] });
        await newClass.save();
        res.status(201).json(newClass);
    } catch (e) {
        res.status(500).json({ message: "error creating class", e })
    }
}

export const getAllClasses = async (req,res)=>{
    try{
        const classes = await Class.find().populate('students');
        res.status(200).json(classes);
    }catch(e){
        res.status(500).json({message:"error getting classes",e})
    }
}

export const enrollStudent = async (req,res)=>{
    const {classId} = req.params;
    const {studentId} = req.body;

    try{
        const ClassToEnroll = await Class.findById(classId);

        if(ClassToEnroll.students.includes(studentId)){
            return res.status(400).json({message:"student already enrolled"})
        }
        ClassToEnroll.students.push(studentId);
        await ClassToEnroll.save();
        res.status(200).json(ClassToEnroll);
    }catch(e){
        res.status(500).json({message:"error adding student",e})
    }
}

export const getClassById = async(req,res) =>{
    const {classId} = req.params;
    try{
        const classDetails = await Class.findById(classId);
        if(!classDetails){
            res.status(500).json({message:"Class Not Found"})
        }
        res.status(200).json(classDetails);
    }catch(e){
        res.status(500).json({message:"Error fetching class",e})
    }
}