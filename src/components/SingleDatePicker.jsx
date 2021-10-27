import React, { Fragment, useRef, useState } from 'react';
import lodash_isEmpty from 'lodash/isEmpty';
import lodash_map from 'lodash/map';
import lodash_isNil from 'lodash/isNil';
import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  SimpleGrid,
  Text,
  useOutsideClick,
  VStack,
} from '@chakra-ui/react';
import { useDayzed } from 'dayzed';
import { format } from 'date-fns';

const MONTH_NAMES_DEFAULT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const DAY_NAMES_DEFAULT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DATE_FORMAT_DEFAULT = 'yyyy-MM-dd';

const SingleDatepickerBackButtons = props => {
  const { calendars, getBackProps } = props;
  return (
    <Fragment>
      <Button
        {...getBackProps({
          calendars,
          offset: 12,
        })}
        variant="ghost"
        size="sm"
      >
        {'<<'}
      </Button>
      <Button {...getBackProps({ calendars })} variant="ghost" size="sm">
        {'<'}
      </Button>
    </Fragment>
  );
};

const SingleDatepickerForwardButtons = props => {
  const { calendars, getForwardProps } = props;
  return (
    <Fragment>
      <Button {...getForwardProps({ calendars })} variant="ghost" size="sm">
        {'>'}
      </Button>
      <Button
        {...getForwardProps({
          calendars,
          offset: 12,
        })}
        variant="ghost"
        size="sm"
      >
        {'>>'}
      </Button>
    </Fragment>
  );
};

const SingleDatepickerCalendar = props => {
  const { calendars, getDateProps, getBackProps, getForwardProps, configs } =
    props;

  if (lodash_isEmpty(calendars)) {
    return null;
  }

  return (
    <HStack className="datepicker-calendar">
      {lodash_map(calendars, calendar => {
        return (
          <VStack key={`${calendar.month}${calendar.year}`}>
            <HStack>
              <SingleDatepickerBackButtons
                calendars={calendars}
                getBackProps={getBackProps}
              />
              <Heading size="sm" textAlign="center">
                {configs.monthNames[calendar.month]} {calendar.year}
              </Heading>
              <SingleDatepickerForwardButtons
                calendars={calendars}
                getForwardProps={getForwardProps}
              />
            </HStack>
            <Divider />
            <SimpleGrid columns={7} spacing={2} textAlign="center">
              {lodash_map(configs.dayNames, day => (
                <Box key={`${calendar.month}${calendar.year}${day}`}>
                  <Text fontSize="sm" fontWeight="semibold">
                    {day}
                  </Text>
                </Box>
              ))}
              {lodash_map(calendar.weeks, (week, weekIndex) => {
                return lodash_map(week, (dateObj, index) => {
                  const {
                    date,
                    today,
                    // prevMonth,
                    // nextMonth,
                    selected,
                  } = dateObj;
                  const key = `${calendar.month}${calendar.year}${weekIndex}${index}`;

                  return (
                    <Button
                      {...getDateProps({
                        dateObj,
                        // disabled: isDisabled
                      })}
                      key={key}
                      size="sm"
                      variant="outline"
                      borderColor={today ? 'purple.400' : 'transparent'}
                      bg={selected ? 'purple.200' : undefined}
                    >
                      {date.getDate()}
                    </Button>
                  );
                });
              })}
            </SimpleGrid>
          </VStack>
        );
      })}
    </HStack>
  );
};

export const SingleDatepicker = ({
  configs = {
    dateFormat: DATE_FORMAT_DEFAULT,
    monthNames: MONTH_NAMES_DEFAULT,
    dayNames: DAY_NAMES_DEFAULT,
  },
  ...props
}) => {
  const { date, name, disabled, onDateChange, id } = props;

  const ref = useRef(null);
  const initialFocusRef = useRef(null);

  const [popoverOpen, setPopoverOpen] = useState(false);

  useOutsideClick({
    ref: ref,
    handler: () => setPopoverOpen(false),
  });

  const onDateSelected = options => {
    const { selectable, date } = options;
    if (!selectable) return;
    if (!lodash_isNil(date)) {
      onDateChange(date);
      setPopoverOpen(false);
      return;
    }
  };

  const dayzedData = useDayzed({
    showOutsideDays: true,
    onDateSelected,
    selected: date,
  });

  return (
    <Popover
      placement="bottom-start"
      variant="responsive"
      isOpen={popoverOpen}
      onClose={() => setPopoverOpen(false)}
      initialFocusRef={initialFocusRef}
      isLazy
    >
      <PopoverTrigger>
        <Input
          variant="filled"
          id={id}
          autoComplete="off"
          isDisabled={disabled}
          ref={initialFocusRef}
          onClick={() => setPopoverOpen(!popoverOpen)}
          name={name}
          value={format(date, configs.dateFormat)}
          onChange={e => e.target.value}
        />
      </PopoverTrigger>
      <PopoverContent ref={ref}>
        <PopoverBody
          padding={'10px 5px'}
          borderWidth={1}
          borderColor="blue.400"
        >
          <SingleDatepickerCalendar {...dayzedData} configs={configs} />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
