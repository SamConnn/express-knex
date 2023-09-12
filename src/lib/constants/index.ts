export interface ErrorCodes {
  BAD_REQUEST: string
  UNAUTHORIZED: string
  PAYMENT_REQUIRED: string
  FORBIDDEN: string
  NOT_FOUND: string
  METHOD_NOT_ALLOWED: string
  NOT_ACCEPTABLE: string
  PROXY_AUTHENTICATION_REQUIRED: string
  REQUEST_TIMEOUT: string
  CONFLICT: string
  GONE: string
  LENGTH_REQUIRED: string
  PRECONDITION_FAILED: string
  PAYLOAD_TOO_LARGE: string
  URI_TOO_LONG: string
  UNSUPPORTED_MEDIA_TYPE: string
  RANGE_NOT_SATISFIABLE: string
  EXPECTATION_FAILED: string
  MISDIRECTED_REQUEST: string
  UNPROCESSABLE_ENTITY: string
  LOCKED: string
  FAILED_DEPENDENCY: string
  TOO_EARLY: string
  UPGRADE_REQUIRED: string
  PRECONDITION_REQUIRED: string
  TOO_MANY_REQUESTS: string
  REQUEST_HEADER_FIELDS_TOO_LARGE: string
  UNAVAILABLE_FOR_LEGAL_REASONS: string
  INTERNAL_SERVER_ERROR: string
  NOT_IMPLEMENTED: string
  BAD_GATEWAY: string
  SERVICE_UNAVAILABLE: string
  GATEWAY_TIMEOUT: string
  HTTP_VERSION_NOT_SUPPORTED: string
  VARIANT_ALSO_NEGOTIATES: string
  INSUFFICIENT_STORAGE: string
  LOOP_DETECTED: string
  NOT_EXTENDED: string
  NETWORK_AUTHENTICATION_REQUIRED: string
}

export interface ErrorMessages {
  BAD_REQUEST: string
  UNAUTHORIZED: string
  PAYMENT_REQUIRED: string
  FORBIDDEN: string
  NOT_FOUND: string
  METHOD_NOT_ALLOWED: string
  NOT_ACCEPTABLE: string
  PROXY_AUTHENTICATION_REQUIRED: string
  REQUEST_TIMEOUT: string
  CONFLICT: string
  GONE: string
  LENGTH_REQUIRED: string
  PRECONDITION_FAILED: string
  PAYLOAD_TOO_LARGE: string
  URI_TOO_LONG: string
  UNSUPPORTED_MEDIA_TYPE: string
  RANGE_NOT_SATISFIABLE: string
  EXPECTATION_FAILED: string
  MISDIRECTED_REQUEST: string
  UNPROCESSABLE_ENTITY: string
  LOCKED: string
  FAILED_DEPENDENCY: string
  TOO_EARLY: string
  UPGRADE_REQUIRED: string
  PRECONDITION_REQUIRED: string
  TOO_MANY_REQUESTS: string
  REQUEST_HEADER_FIELDS_TOO_LARGE: string
  UNAVAILABLE_FOR_LEGAL_REASONS: string
  INTERNAL_SERVER_ERROR: string
  NOT_IMPLEMENTED: string
  BAD_GATEWAY: string
  SERVICE_UNAVAILABLE: string
  GATEWAY_TIMEOUT: string
  HTTP_VERSION_NOT_SUPPORTED: string
  VARIANT_ALSO_NEGOTIATES: string
  INSUFFICIENT_STORAGE: string
  LOOP_DETECTED: string
  NOT_EXTENDED: string
  NETWORK_AUTHENTICATION_REQUIRED: string
}

export interface Errors {
  codes: ErrorCodes
  statusCodes: {
    [key in keyof ErrorCodes]: number;
  }
  messages: ErrorMessages
}

export const errors: Errors = {
  codes: {
    BAD_REQUEST: 'BAD_USER_INPUT',
    UNAUTHORIZED: 'UNAUTHORIZED',
    PAYMENT_REQUIRED: 'PAYMENT_REQUIRED',
    FORBIDDEN: 'FORBIDDEN',
    NOT_FOUND: 'NOT_FOUND',
    METHOD_NOT_ALLOWED: 'METHOD_NOT_ALLOWED',
    NOT_ACCEPTABLE: 'NOT_ACCEPTABLE',
    PROXY_AUTHENTICATION_REQUIRED: 'PROXY_AUTHENTICATION_REQUIRED',
    REQUEST_TIMEOUT: 'REQUEST_TIMEOUT',
    CONFLICT: 'CONFLICT',
    GONE: 'GONE',
    LENGTH_REQUIRED: 'LENGTH_REQUIRED',
    PRECONDITION_FAILED: 'PRECONDITION_FAILED',
    PAYLOAD_TOO_LARGE: 'PAYLOAD_TOO_LARGE',
    URI_TOO_LONG: 'URI_TOO_LONG',
    UNSUPPORTED_MEDIA_TYPE: 'UNSUPPORTED_MEDIA_TYPE',
    RANGE_NOT_SATISFIABLE: 'RANGE_NOT_SATISFIABLE',
    EXPECTATION_FAILED: 'EXPECTATION_FAILED',
    MISDIRECTED_REQUEST: 'MISDIRECTED_REQUEST',
    UNPROCESSABLE_ENTITY: 'UNPROCESSABLE_ENTITY',
    LOCKED: 'LOCKED',
    FAILED_DEPENDENCY: 'FAILED_DEPENDENCY',
    TOO_EARLY: 'TOO_EARLY',
    UPGRADE_REQUIRED: 'UPGRADE_REQUIRED',
    PRECONDITION_REQUIRED: 'PRECONDITION_REQUIRED',
    TOO_MANY_REQUESTS: 'TOO_MANY_REQUESTS',
    REQUEST_HEADER_FIELDS_TOO_LARGE: 'REQUEST_HEADER_FIELDS_TOO_LARGE',
    UNAVAILABLE_FOR_LEGAL_REASONS: 'UNAVAILABLE_FOR_LEGAL_REASONS',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
    NOT_IMPLEMENTED: 'NOT_IMPLEMENTED',
    BAD_GATEWAY: 'BAD_GATEWAY',
    SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
    GATEWAY_TIMEOUT: 'GATEWAY_TIMEOUT',
    HTTP_VERSION_NOT_SUPPORTED: 'HTTP_VERSION_NOT_SUPPORTED',
    VARIANT_ALSO_NEGOTIATES: 'VARIANT_ALSO_NEGOTIATES',
    INSUFFICIENT_STORAGE: 'INSUFFICIENT_STORAGE',
    LOOP_DETECTED: 'LOOP_DETECTED',
    NOT_EXTENDED: 'NOT_EXTENDED',
    NETWORK_AUTHENTICATION_REQUIRED: 'NETWORK_AUTHENTICATION_REQUIRED'
  },

  statusCodes: {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    PAYMENT_REQUIRED: 402,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    NOT_ACCEPTABLE: 406,
    PROXY_AUTHENTICATION_REQUIRED: 407,
    REQUEST_TIMEOUT: 408,
    CONFLICT: 409,
    GONE: 410,
    LENGTH_REQUIRED: 411,
    PRECONDITION_FAILED: 412,
    PAYLOAD_TOO_LARGE: 413,
    URI_TOO_LONG: 414,
    UNSUPPORTED_MEDIA_TYPE: 415,
    RANGE_NOT_SATISFIABLE: 416,
    EXPECTATION_FAILED: 417,
    MISDIRECTED_REQUEST: 421,
    UNPROCESSABLE_ENTITY: 422,
    LOCKED: 423,
    FAILED_DEPENDENCY: 424,
    TOO_EARLY: 425,
    UPGRADE_REQUIRED: 426,
    PRECONDITION_REQUIRED: 428,
    TOO_MANY_REQUESTS: 429,
    REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
    UNAVAILABLE_FOR_LEGAL_REASONS: 451,
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
    HTTP_VERSION_NOT_SUPPORTED: 505,
    VARIANT_ALSO_NEGOTIATES: 506,
    INSUFFICIENT_STORAGE: 507,
    LOOP_DETECTED: 508,
    NOT_EXTENDED: 510,
    NETWORK_AUTHENTICATION_REQUIRED: 511
  },

  messages: {
    BAD_REQUEST: 'Bad User Input',
    UNAUTHORIZED: 'Unauthorized',
    PAYMENT_REQUIRED: 'Payment Required',
    FORBIDDEN: 'You don\'t have permission',
    NOT_FOUND: 'The data you\'re looking for was not found',
    METHOD_NOT_ALLOWED: 'Method Not Allowed',
    NOT_ACCEPTABLE: 'Not Acceptable',
    PROXY_AUTHENTICATION_REQUIRED: 'Proxy Authentication Required',
    REQUEST_TIMEOUT: 'Request Timeout',
    CONFLICT: 'Conflict',
    GONE: 'The Data You\'re Requested Has Been Removed',
    LENGTH_REQUIRED: 'Length Required',
    PRECONDITION_FAILED: 'Precondition Failed',
    PAYLOAD_TOO_LARGE: 'Payload Too Large',
    URI_TOO_LONG: 'Uri Too Long',
    UNSUPPORTED_MEDIA_TYPE: 'Unsupported Media Type',
    RANGE_NOT_SATISFIABLE: 'Range Not Satisfiable',
    EXPECTATION_FAILED: 'Expectation Failed',
    MISDIRECTED_REQUEST: 'Misdirected Request',
    UNPROCESSABLE_ENTITY: 'Unprocessable Entity',
    LOCKED: 'The Data You\'re Requested Has Been Locked',
    FAILED_DEPENDENCY: 'Failed Dependency',
    TOO_EARLY: 'Too Early',
    UPGRADE_REQUIRED: 'Upgrade Required',
    PRECONDITION_REQUIRED: 'Precondition Failed',
    TOO_MANY_REQUESTS: 'Too Many Request',
    REQUEST_HEADER_FIELDS_TOO_LARGE: 'Request Header Fields Too Large',
    UNAVAILABLE_FOR_LEGAL_REASONS: 'The Data You\'re Requested Unavailable For Legal Reason',
    INTERNAL_SERVER_ERROR: 'Internal Server Error',
    NOT_IMPLEMENTED: 'Not Implemented',
    BAD_GATEWAY: 'Bad Gateway',
    SERVICE_UNAVAILABLE: 'Service Unavailable',
    GATEWAY_TIMEOUT: 'Gateway Timeout',
    HTTP_VERSION_NOT_SUPPORTED: 'HTTP Version Not Supported',
    VARIANT_ALSO_NEGOTIATES: 'Variant Also Negotiates',
    INSUFFICIENT_STORAGE: 'Insufficient Storage',
    LOOP_DETECTED: 'Loop Detected',
    NOT_EXTENDED: 'Not Extended',
    NETWORK_AUTHENTICATION_REQUIRED: 'Network Authentication Required'
  }
}