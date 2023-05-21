// $PROJECT ******************************************
db.users.aggregate
(
    [
        {$match:{status:'active'}},
        {$project:{name:1,email:1,_id:0}}
    ]
)
// /This is project use to select particulare Key from Data base
// name:1 is cold column show 1 is TRUE
// _id:1 is cold column can't show 0 is FAULSE
//O/P
// {
//     "name":"SId",
//     "Email":"sid@gmail.com"
// }

(
    [
        {$match:{status:'active'}},
        {$project:{name:1,emailID:'$eamil',_id:0}}
    ]
)
//In This EmailID is custmise name 
// '$email' is database email key value(Database column name)

(
    [
        {$match:{status:'active'}},
        {$project:{name:1,email:{$type:'$email'},_id:0}}
    ]
)
//In this check type of email id 
//$type check type like string,number,object etc


// $unwind  ******************************************\
db.users.aggregate
(
    [
        {$unwind:"$language"},
        {$match:{status:'active'}},
        {$project:{name:1,language:1}}
    ]
)
//OP
// {
//     "_id": ObjectId("123456789"),
//     "name":"Sid",
//     "Language":
//     [
//         "React Js"
//         "Next JS"
//     ]
// }

//After Unwind
// {
//     "_id": ObjectId("123456789"),
//     "name":"Sid",
//     "Language":"React Js"
// }
// {
//     "_id": ObjectId("123456789"),
//     "name":"Sid",
//     "Language":"Next Js"
// }

//Use of One array to unwind


(
    [
        {_id:{$language}}
    ]
)
// op
// {
//     "_id" : ["React"]
// }
// {
//     "_id" : ["React Js","Next Js"]
// }




// $OUT  ******************************************\
db.users.aggregate
(
    [
        {$unwind:"$language"},
        {$match:{status:'active'}},
        {$project:{name:1,language:1}},
        {$project:{'$out':'info'}},
    ]
)
// create a new collection
// Make a new collection name of info in this key value {name,language}





// $lookup  ******************************************\
db.users.aggregate
(
    {
        $lookup:{
            from:"department",
            localField:"dept",
            foreignField:"name",
            as:"dept",
        }
    }   
)
// from: user relation to department
// localField: user comman fild in department
// localField: Like match fild Like _id and Name
// as: Use to key value



// $Match and group  ******************************************\
db.users.aggregate
(
    [
        {$match:{department:{$in:['HR','TECH']}}},
        {$group:{_id:'$department'},tot:{$sum:'$marks'}},
        {$match:{tot:170}}
    ]
)
