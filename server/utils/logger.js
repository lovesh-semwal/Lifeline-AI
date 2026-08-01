/* =====================================
   Logger Utility
===================================== */

const getTimestamp = () => {
  return new Date().toISOString();
};

/* =====================================
   Info Log
===================================== */

export const logInfo = (message) => {
  console.log(
    `[INFO] ${getTimestamp()} - ${message}`
  );
};

/* =====================================
   Success Log
===================================== */

export const logSuccess = (message) => {
  console.log(
    `[SUCCESS] ${getTimestamp()} - ${message}`
  );
};

/* =====================================
   Warning Log
===================================== */

export const logWarning = (message) => {
  console.warn(
    `[WARNING] ${getTimestamp()} - ${message}`
  );
};

/* =====================================
   Error Log
===================================== */

export const logError = (message, error = null) => {
  console.error(
    `[ERROR] ${getTimestamp()} - ${message}`
  );

  if (error) {
    console.error(error);
  }
};

/* =====================================
   Request Logger
===================================== */

export const logRequest = (req) => {
  console.log(
    `[REQUEST] ${getTimestamp()} | ${req.method} ${req.originalUrl} | IP: ${req.ip}`
  );
};

/* =====================================
   Export Default
===================================== */

export default {
  logInfo,
  logSuccess,
  logWarning,
  logError,
  logRequest,
};