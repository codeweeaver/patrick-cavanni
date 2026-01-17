// c:/Users/CODEWEEAVER/Desktop/react-wp-app/patrick-cavanni/src/pages/Unauthorized.jsx
import { useNavigate } from 'react-router-dom';
import Button from '../components/global/Button';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">Access Denied</h1>
      <p className="mt-4 max-w-md text-gray-600">
        You don't have permission to access this page. This area is restricted to authorized users
        only.
      </p>
      <div className="mt-8 flex gap-4">
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Go Back
        </Button>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    </div>
  );
};

export default Unauthorized;
