// This file globally suppresses network error logs in development

if (import.meta.env.DEV) {
  const originalError = console.error;
  
  console.error = (...args) => {
    // Convert args to string for checking
    const errorString = args.join(' ');
    
    // List of error patterns to suppress
    const suppressPatterns = [
      'AxiosError',
      'Network Error',
      'ERR_NETWORK',
      'ERR_CONNECTION_REFUSED',
      'net::ERR_CONNECTION_REFUSED',
      'Error fetching',
    ];
    
    // Check if error matches any suppress pattern
    const shouldSuppress = suppressPatterns.some(pattern => 
      errorString.includes(pattern)
    );
    
    // Only log if not a network error
    if (!shouldSuppress) {
      originalError.apply(console, args);
    }
  };
}

export default {};