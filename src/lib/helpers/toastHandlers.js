export const toastError = description => ({
  title: 'Error',
  status: 'error',
  description,
  duration: 9000,
  isClosable: true,
  position: 'top',
  type: 'subtle',
});

export const toastSuccess = (title, description) => ({
  title,
  status: 'success',
  description,
  duration: 9000,
  isClosable: true,
  position: 'top',
  type: 'subtle',
});
