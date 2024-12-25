import Breadcrumb from '../components/Breadcrumb';
// import TableOne from '../components/TableOne';
// import TableThree from '../components/TableThree';
import TableTwoNadwa from '../components/TableTwoNadwa';

const Nadwa = () => {
  return (
    <>
      <Breadcrumb pageName="الندوات" />

      <div className="flex flex-col gap-10">
        
        <TableTwoNadwa />
        
      </div>
    </>
  );
};

export default Nadwa;
