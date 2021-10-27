// packages
import {
  Input,
  InputGroup,
  Icon,
  IconButton,
  InputLeftElement,
  InputRightElement,
  Fade,
  useColorModeValue,
} from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { forwardRef, useState, useRef, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCustomEventListener } from 'react-custom-events';

// hooks
import useBooleanValue from '../../lib/hooks/useBooleanValue';
import useQuery from '../../lib/hooks/useQuery';

// enums
import ActionTypes from '../../lib/enums/ActionTypes';

const Search = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const loaded = useRef(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { text } = useSelector(state => state.search);
  const [value, setValue] = useState(text);
  const query = useQuery();
  const colorMode = useColorModeValue(false, true);
  const [style, setStyle] = useBooleanValue(
    { color: !colorMode ? 'black' : 'white' },
    { color: !colorMode ? 'yellow.700' : 'yellow.400' }
  );

  const handleChange = useCallback(e => setValue(e.target.value), []);

  useCustomEventListener('clear-filter', async () => setValue(''));

  useEffect(() => {
    if (value !== text) {
      const id = setTimeout(async () => {
        dispatch({
          type: ActionTypes.SEARCH_QUERY,
          payload: { text: value },
        });
      }, 50);
      return () => {
        clearTimeout(id);
      };
    }
  }, [value, dispatch, text]);

  useEffect(() => {
    const search = query.get('search');
    if (search && value !== search && !loaded.current) {
      setValue(search.trim());
    }
    return () => (loaded.current = true);
  }, [query, value]);

  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/shop?search=${value}`, { state: location });
  }

  function handleReset(e) {
    setValue('');
  }

  return (
    <InputGroup
      as="form"
      id="search"
      variant="filled"
      role="group"
      onSubmit={handleSubmit}
      maxW={200}
    >
      <InputLeftElement>
        <IconButton
          variant="ghost"
          color={style.color}
          icon={<Icon as={FontAwesomeIcon} icon={['fal', 'search']} />}
          type="submit"
        />
      </InputLeftElement>
      <Input
        ref={ref}
        onFocus={setStyle.on}
        onBlur={setStyle.off}
        color={style.color}
        value={value}
        onChange={handleChange}
        type="text"
        pointerEvents="all"
      />
      <InputRightElement>
        <Fade in={value}>
          <IconButton
            variant="ghost"
            colorScheme="red"
            icon={<Icon as={FontAwesomeIcon} icon={['fal', 'times']} />}
            type="button"
            onClick={handleReset}
          />
        </Fade>
      </InputRightElement>
    </InputGroup>
  );
});

export default Search;
