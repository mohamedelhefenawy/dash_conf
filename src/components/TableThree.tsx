const TableThree = () => {
  return (
    <div className="dir-rtl rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-right dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                الاسم
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                الوظيفة
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                العمر
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                اخر مؤتمر تم الاشتراك فيه
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                <h5 className="font-medium text-black dark:text-white">
                  محمد احمد
                </h5>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">معلم</p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  35
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">13 - يناير - 2023</p>
              </td>
            </tr>
            <tr>
              <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                <h5 className="font-medium text-black dark:text-white">
احمد فتحي
                </h5>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">موظف</p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  28
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">13 - يناير - 2023</p>
              </td>
            </tr>
            <tr>
              <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                <h5 className="font-medium text-black dark:text-white">
                  محمود عبد العظيم
                </h5>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">مدير</p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  45
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">13 - يناير - 2023</p>
              </td>
            </tr>
            <tr>
              <td className="py-5 px-4 pl-9 xl:pl-11">
                <h5 className="font-medium text-black dark:text-white">
احمد فتحي
                </h5>
              </td>
              <td className="py-5 px-4">
                <p className="text-black dark:text-white">طالب</p>
              </td>
              <td className="py-5 px-4">
                  21
              </td>
              <td className="py-5 px-4">
                <p className="text-black dark:text-white">13 - يناير - 2023</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableThree;
