const UpcomingContent = require("../models/UpcomingContent");


// ===============================
// CREATE UPCOMING CONTENT
// ===============================

const createUpcoming = async (req, res) => {
  try {

    const userId = req.user.id || req.user._id;

    const content = await UpcomingContent.create({

      title: req.body.title,

      description: req.body.description,

      category: req.body.category,

      genre: req.body.genre,

      releaseDate: req.body.releaseDate,

      image:
        req.body.image ||
        req.body.imageUrl ||
        "",

      trailerURL:
        req.body.trailerURL ||
        req.body.trailerUrl ||
        "",


      companyId: userId,

      status: "pending"

    });


    return res.status(201).json(content);


  } catch(error){

    console.error(
      "CREATE UPCOMING ERROR:",
      error
    );


    return res.status(500).json({

      message:error.message

    });

  }
};




// ===============================
// GET ALL PUBLIC CONTENT
// ===============================


const getUpcoming = async(req,res)=>{

  try{


    const contents =
      await UpcomingContent.find()
      .populate(
        "companyId",
        "companyName"
      )
      .sort({

        releaseDate:1

      });


    return res.json(contents);


  }catch(error){


    return res.status(500).json({

      message:error.message

    });


  }

};




// ===============================
// GET COMPANY CONTENT
// ===============================


const getMyUpcoming = async(req,res)=>{


try{


const userId =
req.user.id || req.user._id;



const contents =
await UpcomingContent.find({

companyId:userId

})
.sort({

releaseDate:1

});



return res.json(contents);



}catch(error){


return res.status(500).json({

message:error.message

});


}


};




// ===============================
// UPDATE
// ===============================


const updateUpcoming = async(req,res)=>{


try{


const userId =
req.user.id || req.user._id;



const content =
await UpcomingContent.findById(
req.params.id
);



if(!content){

return res.status(404).json({

message:"Content not found"

});

}



if(
content.companyId.toString()
!== userId.toString()
){

return res.status(403).json({

message:"Access denied"

});

}




content.title =
req.body.title || content.title;


content.description =
req.body.description || content.description;


content.category =
req.body.category || content.category;


content.genre =
req.body.genre || content.genre;


content.releaseDate =
req.body.releaseDate || content.releaseDate;



content.image =
req.body.image ||
req.body.imageUrl ||
content.image;



content.trailerURL =
req.body.trailerURL ||
req.body.trailerUrl ||
content.trailerURL;



await content.save();



return res.json(content);



}catch(error){


return res.status(500).json({

message:error.message

});


}


};




// ===============================
// DELETE
// ===============================


const deleteUpcoming = async(req,res)=>{


try{


const userId =
req.user.id || req.user._id;



const content =
await UpcomingContent.findById(
req.params.id
);



if(!content){

return res.status(404).json({

message:"Content not found"

});

}



if(
content.companyId.toString()
!== userId.toString()
){

return res.status(403).json({

message:"Access denied"

});

}



await content.deleteOne();



return res.json({

message:"Deleted successfully"

});



}catch(error){


return res.status(500).json({

message:error.message

});


}


};



module.exports = {


createUpcoming,

getUpcoming,

getMyUpcoming,

updateUpcoming,

deleteUpcoming


};