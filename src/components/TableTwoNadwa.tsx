import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const TableTwoNadwad = () => {

  const token = "a1efd174703f533044d12a7992e76f949ed84e7f";
  const [conferences, setConferenceData] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [id_num, setId] = useState(null);  // Store the ID of the conference to delete
  const [deleted, setDeleted] = useState(false);  // Controls the delete modal visibility
  const navigate = useNavigate();



  const handlealert = () => {
    MySwal.fire({
      title: <strong>تم حذف الندوة</strong>,
      icon: 'success',
    });
  };

  // Fetching Data
  const fetchData = async () => {
    try {
      const response = await axios.get("https://events-back.cowdly.com/api/events/?type=%D8%A7%D9%84%D9%86%D8%AF%D9%88%D8%A7%D8%AA", {
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
          id: conf.id,
          name: conf.name,
          location: conf.location,
          image: conf.image,
          start: dayStart,
          end: dayEnd,
          start_hour: hourStart,
          end_hour: hourEnd,
        };
      });

      setConferenceData(Allconf);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };



  useEffect(() => {
    fetchData();
  }, [token]);



  // Deleting Data

  const Delete_conf = async (id) => {
    try {
      await axios.delete(`https://events-back.cowdly.com/api/events/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      handlealert();
      setConferenceData((prevData) => prevData.filter((conf) => conf.id !== id));
      setDeleted(false); // Close the delete modal
    } catch (error) {
      alert('can not delete ')
      console.error("Error deleting the conference:", error.response?.data || error.message);
    }
  };



  const toggleMenu = (id) => {
    setOpenMenuId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      {/* Header */}
      <div className=" flex justify-between items-center py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">اضافة ندوة</h4>
        <button onClick={()=>navigate('/forms/form-elements')} className='bg-primary rounded-xl p-2 text-white'>اضافة ندوة</button>
      </div>

      {/* Table */}
      <div className="relative overflow-auto border-t border-stroke dark:border-strokedark">
        <table className="w-full border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              {["اسم الندوة", "المكان", "موعد البداية", "موعد النهاية", "بداية الساعة", "نهاية الساعة", "الخيارات"].map(
                (header, index) => (
                  <th
                    key={index}
                    className="py-4 px-4 md:px-6 2xl:px-7.5 text-right font-medium text-black dark:text-white"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {conferences.map((conference) => (
              <tr
                key={conference.id}  // Use conference.id as the key
                className="border-b gap-10 border-stroke last:border-none dark:border-strokedark hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                {/* Conference Details */}
                <td className="py-4 px-4 md:px-6 2xl:px-7.5 flex items-center gap-4">
                  <div className="h-12.5 w-15 rounded-md overflow-hidden">
                    <img src={conference.image} alt={conference.name} className="h-full w-full object-cover" />
                  </div>
                  <p className="text-xs md:text-sm text-black dark:text-white">{conference.name}</p>
                </td>
                <td className="py-4 px-4 md:px-6 2xl:px-7.5">
                  <p className="text-xs md:text-sm text-black dark:text-white">{conference.location}</p>
                </td>
                <td className="py-4 px-4 md:px-6 2xl:px-7.5">
                  <p className="text-xs md:text-sm text-black dark:text-white">{conference.start}</p>
                </td>
                <td className="py-4 px-4 md:px-6 2xl:px-7.5">
                  <p className="text-xs md:text-sm text-black dark:text-white">{conference.end}</p>
                </td>
                <td className="py-4 px-4 md:px-6 2xl:px-7.5">
                  <p className="text-xs md:text-sm text-black dark:text-white">{conference.start_hour}</p>
                </td>
                <td className="py-4 px-4 md:px-6 2xl:px-7.5">
                  <p className="text-xs md:text-sm text-black dark:text-white">{conference.end_hour}</p>
                </td>

                {/* Three Dots Menu */}
                <td className="py-4 px-4 md:px-6 2xl:px-7.5 relative">
                  <button
                    className="relative text-xl hover:text-black self-end z-999"
                    onClick={() => toggleMenu(conference.id)}
                    aria-label="Open menu"
                  >
                    &#x2022;&#x2022;&#x2022;
                  </button>
                  {openMenuId === conference.id && (
                    <div className="absolute  left-5 -bottom-10 mt-2 w-40 bg-white shadow-lg rounded-md z-10">
                      <ul className="space-y-2 p-2">
                        <li>
                          <button
                            className="text-gray-800 hover:text-black w-full text-left"
                            onClick={() => navigate(`/updatenadwa/${conference.id}`)}
                          >
                            تعديل البيانات
                          </button>
                        </li>
                        <li>
                          <button
                            className="text-gray-800 hover:text-black w-full text-left"
                            onClick={() => {
                              setId(conference.id); // Set the ID of the conference to delete
                              setDeleted(true);  // Open the delete confirmation modal
                            }}
                          >
                            حذف الندوة
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deleted && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[90%] sm:w-[50%] py-10 px-6 text-center">
            <h2 className="mb-6 text-lg font-semibold">هل انت متأكد من حذف الندوة؟</h2>
            <div className="flex justify-center gap-5">
              <button
                className="px-6 py-2 rounded "
                onClick={() => {
                  Delete_conf(Number(id_num));  // Call Delete function with the conference ID
                }}
              >
                حذف
              </button>
              <button
                className="px-6 py-2 rounded bg-gray-300 hover:bg-gray-400"
                onClick={() => setDeleted(false)}  // Close the modal
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

export default TableTwoNadwad;
