type ErrorHandlerType = {
  status: number;
  message: any;
}

function ErrorHandler(error: Error): ErrorHandlerType {
  const convertToStringError = JSON.stringify(eval(`(${error.message})`));

  return JSON.parse(convertToStringError);
}

export default ErrorHandler;
