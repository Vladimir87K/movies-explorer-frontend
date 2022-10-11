import { useNavigate } from 'react-router-dom';

const ProtectedRoute = (props) => {
  const navigate = useNavigate()

  return (
   props.loggedIn ? props.children : navigate('/')
  );
};

export default ProtectedRoute; 