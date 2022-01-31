import {cloneElement} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router';
import {isArray, parseQuery} from 'utils/functions.util';

const History = ({children, ...props}) => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const query = parseQuery(location.search);

  const element = isArray(children) ? children[0] : children;
  const newProps = element.props.isFunction ? {...props} : {...props, location, navigate, params, query};

  return cloneElement(element, {...newProps});
};

export {History};