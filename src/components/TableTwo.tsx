import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const TableTwo = () => {
  const token = "a1efd174703f533044d12a7992e76f949ed84e7f";
  const [conferences, setConferenceData] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const navigate = useNavigate()


  const handlealert = ()=>{
    MySwal.fire({
      title:<strong>تم حذف المؤتمر</strong>,
      // html: <div className='flex gap-3'> <button>حذف</button> <button>رجوع</button> </div>
      icon:'success'
    })
  } 

  // Fetchting Data
  const fetchData = async () => {
    try {
      const response = await axios.get("https://events-back.cowdly.com/api/events/", {
        headers: {
          accept: "application/json",
          Authorization: `Token ${token}`,
        },
      });

      const Allconf = response.data.map((conf) => {
        const startDate = new Date(conf.start_date);
        const dayStart = startDate.toISOString().split("T")[0];
        const hourStart = startDate.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });

        const endDate = new Date(conf.end_date);
        const dayEnd = endDate.toISOString().split("T")[0];
        const hourEnd = endDate.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });

        return {
          id: conf.id, // Ensure you have a unique ID for each conference
          name: conf.name,
          location: conf.location,
          image: conf.image,
          start: dayStart,
          end: dayEnd,
          start_hour: hourStart,
          end_hour: hourEnd,
        };
      });
      console.log(response)

      setConferenceData(Allconf);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  


  const toggleMenu = (id) => {
    setOpenMenuId((prevId) => (prevId === id ? null : id));
  };
  const [deleted , setDelete] =useState(false)

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">المؤتمرات</h4>
      </div>

      <div className="flex justify-between border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">اسم المؤتمر</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">المكان</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">موعد البداية</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">موعد النهاية</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">بداية الساعة</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">نهاية الساعة</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">الخيارات</p>
        </div>
      </div>

      {conferences.map((conference) => (
        <div
          key={conference.id}
          className="flex justify-between border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
        >
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                <img src={conference.image} alt={conference.name} className="h-[90%]" />
              </div>
              <p className="text-sm text-black dark:text-white">{conference.name}</p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">{conference.location}</p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="text-sm text-black dark:text-white">{conference.start}</p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="text-sm text-black dark:text-white">{conference.end}</p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="text-sm text-black dark:text-white">{conference.start_hour}</p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="text-sm text-black dark:text-white">{conference.end_hour}</p>
          </div>

          {/* Three Dots Menu */}
          <div className="  flex flex-col     cursor-pointer ">
            <button
              className="text-xl hover:text-black self-end"
              onClick={() => toggleMenu(conference.id)}
              aria-label="Open menu"
              
            >
              &#x2022;&#x2022;&#x2022;
            </button>
            {openMenuId === conference.id && (
              <div className=" mt-2 w-40 bg-white shadow-lg rounded-md">
                <ul className="space-y-2 p-2">
                  <li>
                    <button className="text-gray-800 hover:text-black" onClick={()=>navigate('/update')}>تعديل البيانات</button>
                  </li>
                  <li>
                    <button className="text-gray-800 hover:text-black" onClick={()=>setDelete(true)}>حذف المؤتمر</button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      ))}
     {deleted && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-lg w-[50%] py-10 px-6 text-center">
      <h2 className="mb-10 text-lg font-semibold">هل انت متأكد من حذف المؤتمر؟</h2>
      <div className="flex gap-5 justify-center">
        <button
          className=" px-6 py-2 rounded hover:text-black"
          onClick={  ()=> {setDelete(false);handlealert()}}
        >
          حذف
        </button>
        <button
          className="hover:text-black  rounded "
          onClick={() => setDelete(false)}
        >
          رجوع
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default TableTwo;
