import Breadcrumb from '../components/Breadcrumb';
// import TableOne from '../components/TableOne';
// import TableThree from '../components/TableThree';
import TableTwo from '../components/TableTwo';

const Conference = () => {
  return (
    <>
      <Breadcrumb pageName="المؤتمرات" />

      <div className="flex flex-col gap-10">
        
        <TableTwo />
        
      </div>
    </>
  );
};

export default Conference;
