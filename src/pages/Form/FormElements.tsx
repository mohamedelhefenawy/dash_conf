import { useState ,useEffect } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import CryptoJS from 'crypto-js'

const MySwal = withReactContent(Swal)

const FormElements = () => {

  const [name , setName] = useState('')
  const [image , setImage] = useState('')
  const [start , setStart] = useState('')
  const [end , setEnd] = useState('')
  const [start_hour , setStart_hour] = useState('')
  const [end_hour , setEnd_hour] = useState('')
  const [location , setLocation] = useState('')
  const [link_location , setLink_location] = useState('')

  // const start_date = new Date(`${start}T${start_hour}`).toISOString()
  //  const end_date = new Date(`${end}T${end_hour}`).toISOString();

  const  [decryptedToken,setDecryptedToken]   =useState()

    useEffect(() => {
      const encryptedToken = sessionStorage.getItem("token");
  
      if (encryptedToken) {
        const secretKey = "s3cr3t$Key@123!";
        setDecryptedToken(CryptoJS.AES.decrypt(encryptedToken, secretKey).toString(
          CryptoJS.enc.Utf8)  
        );
        console.log(decryptedToken)
      }
  
    
    }, [decryptedToken]); 

  const handleAlert = ()=>{

    


    MySwal.fire({
      title:<strong>تم اضافة الندوة</strong>,
      // html: <div className='flex gap-3'> <button>حذف</button> <button>رجوع</button> </div>
      icon:'success'
    })
  }

  const failedAlert = ()=>{
    MySwal.fire({
      title:<strong>لم يتم اضافة الندوة</strong>,
      // html: <div className='flex gap-3'> <button>حذف</button> <button>رجوع</button> </div>
      icon:'error'
    })
  }
   const postData = async (event) => {
    event.preventDefault();
    try {
      const start_date = new Date(`${start}T${start_hour}`).toISOString();
      const end_date = new Date(`${end}T${end_hour}`).toISOString();
  
      const formData = new FormData();
      formData.append('type',"الندوات")
      formData.append('name', name);
      formData.append('image', image);
      formData.append('start_date', start_date);
      formData.append('end_date', end_date);
      formData.append('location', location);
      formData.append('location_url', link_location);
  
      const response = await axios.post('https://events-back.cowdly.com/api/events/', formData,{
        headers:{
          Authorization:`Token ${decryptedToken}`
        }
      });
      handleAlert()
    } catch (error) {
      failedAlert()
      console.error(error);
    }
  };
  

console.log(image)

  return (
    <>
      <Breadcrumb pageName="اضافة ندوة" />

      <div className="mx-auto  gap-10 sm:grid-cols-2">
        <div className="flex flex-col gap-20">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              {/* <h3 className="font-medium text-black dark:text-white">
                Contact Form
              </h3> */}
            </div>
            <form onSubmit={postData}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full ">
                    <label className="mb-2.5 block text-black dark:text-white">
                      اسم الندوة
                    </label>
                    <input
                      type="text"
                      placeholder="ادخل اسم الندوة"
                      value={name}
                      onChange={(e)=>setName(e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    صورة الندوة <span className="text-meta-1">*</span>
                  </label>
                  {/* <input
                    type="file"
                    accept="image/*"
                    placeholder="Enter your email address"
                    className="w-full rounded  border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary  active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  /> */}
                  <label htmlFor='upload' className='cursor-pointer hover:text-black transition duraion-300'>اختر صورة</label>
                  <input
  id="upload"
  type="file"
  style={{ display: "none" }}
  onChange={(e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  }}
/>

                </div>

                <div className="mb-4.5 flex justify-between flex-wrap">
                  <div>
                  <label className="mb-2.5 block text-black dark:text-white">
                    موعد بداية الندوة
                  </label>
                  <input
                    type="date"
                    value={start}
                    onChange={(e)=>setStart(e.target.value)}
                    className="w-[300px] rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  </div>
                  <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    موعد نهاية الندوة
                  </label>
                  <input
                    type="date"
                    value={end}
                    onChange={(e)=>setEnd(e.target.value)}
                    className="w-[300px]  rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
                </div>

                <div className="mb-4.5 flex justify-between flex-wrap" >
                  <div >
                  <label className="mb-2.5 block text-black dark:text-white">
                    موعد بداية الندوة
                  </label>
                  <input
                    type="time"
                    value={start_hour}
                    onChange={(e)=>setStart_hour(e.target.value)}
                    className="w-[300px] rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  </div>
                  <div >
                  <label className="mb-2.5 block text-black dark:text-white">
                    موعد نهاية الندوة
                  </label>
                  <input
                    type="time"
                    value={end_hour}
                    onChange={(e)=>setEnd_hour(e.target.value)}
                    className="w-[300px]  rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  </div>

                </div>

                {/* <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Subject
                  </label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                      <option value="">Type your subject</option>
                      <option value="">USA</option>
                      <option value="">UK</option>
                      <option value="">Canada</option>
                    </select>
                    <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                      <svg
                        className="fill-current"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                            fill=""
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                </div> */}

                
                  <div className="w-full ">
                    <label className="mb-2.5 block text-black dark:text-white">
                      المكان
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e)=>setLocation(e.target.value)}
                      placeholder="ادخل مكان الندوة"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white" id='location'>
                    الرابط
                  </label>
                  <input type="url"
                   id='location'
                    value={link_location} 
                    onChange ={(e)=>setLink_location(e.target.value)} 
                    placeholder='ادخل رابط الندوة'
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
  اضف ندوة
</button>

              </div>
            </form>
          </div>
        </div>

        {/* <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Sign In Form
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-2.5 block text-black dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter password"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="mt-5 mb-5.5 flex items-center justify-between">
                  <label htmlFor="formCheckbox" className="flex cursor-pointer">
                    <div className="relative pt-0.5">
                      <input
                        type="checkbox"
                        id="formCheckbox"
                        className="taskCheckbox sr-only"
                      />
                      <div className="box mr-3 flex h-5 w-5 items-center justify-center rounded border border-stroke dark:border-strokedark">
                        <span className="text-white opacity-0">
                          <svg
                            className="fill-current"
                            width="10"
                            height="7"
                            viewBox="0 0 10 7"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M9.70685 0.292804C9.89455 0.480344 10 0.734667 10 0.999847C10 1.26503 9.89455 1.51935 9.70685 1.70689L4.70059 6.7072C4.51283 6.89468 4.2582 7 3.9927 7C3.72721 7 3.47258 6.89468 3.28482 6.7072L0.281063 3.70701C0.0986771 3.5184 -0.00224342 3.26578 3.785e-05 3.00357C0.00231912 2.74136 0.10762 2.49053 0.29326 2.30511C0.4789 2.11969 0.730026 2.01451 0.992551 2.01224C1.25508 2.00996 1.50799 2.11076 1.69683 2.29293L3.9927 4.58607L8.29108 0.292804C8.47884 0.105322 8.73347 0 8.99896 0C9.26446 0 9.51908 0.105322 9.70685 0.292804Z"
                              fill=""
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <p>Remember me</p>
                  </label>

                  <a href="#" className="text-sm text-primary">
                    Forget password?
                  </a>
                </div>

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                  Sign In
                </button>
              </div>
            </form>
          </div>

          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Sign Up Form
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter password"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="mb-5.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Re-type Password
                  </label>
                  <input
                    type="password"
                    placeholder="Re-enter password"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default FormElements;
