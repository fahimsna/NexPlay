import { useEffect, useState } from "react";
import { getActivityHistory } from "../services/activityService";


function ActivityHistory() {

  const [activities, setActivities] = useState([]);

  const [loading, setLoading] = useState(true);



  useEffect(() => {

    loadActivities();

  }, []);



  async function loadActivities(){

    try{

      const data = await getActivityHistory();

      setActivities(data);


    }catch(error){

      console.log(
        "Activity history error:",
        error
      );

    }
    finally{

      setLoading(false);

    }

  }



  if(loading){

    return (

      <div className="
        min-h-screen
        bg-[#17191D]
        text-white
        flex
        items-center
        justify-center
      ">

        Loading Activity...

      </div>

    );

  }



  return (

    <div
      className="
      min-h-screen
      bg-[#17191D]
      text-white
      px-6
      py-10
      "
    >


      <h1
        className="
        text-4xl
        font-bold
        mb-8
        "
      >

        My Activity

      </h1>



      {
        activities.length === 0 ? (

          <p className="text-gray-400">
            No activity found.
          </p>

        ) : (


          <div
            className="
            grid
            md:grid-cols-3
            gap-6
            "
          >

            {
              activities.map((item)=>(

                <div
                  key={item._id}
                  className="
                  bg-[#24272D]
                  border
                  border-white/10
                  rounded-3xl
                  overflow-hidden
                  "
                >


                  {
                    item.posterPath && (

                      <img

                        src={
                          `https://image.tmdb.org/t/p/w500${item.posterPath}`
                        }

                        alt={item.title}

                        className="
                        w-full
                        h-80
                        object-cover
                        "

                      />

                    )

                  }



                  <div className="p-5">


                    <h2
                      className="
                      text-xl
                      font-bold
                      "
                    >

                      {item.title}

                    </h2>


                    <p className="text-gray-400 mt-2">

                      {item.contentType}

                    </p>


                    <p className="text-sm text-[#D4A017] mt-3">

                      Viewed

                    </p>


                  </div>


                </div>


              ))

            }


          </div>


        )
      }


    </div>

  );

}


export default ActivityHistory;