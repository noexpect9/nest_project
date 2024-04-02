export interface successResponse<T> {
  code: number;
  message: string;
  data: T[];
}

interface ErrorRespones {
  code: 500 | 400 | 404;
  message: string;
}

export abstract class BaseController {
  protected success<T>(data?: T): successResponse<T> {
    return {
      code: 200,
      message: 'success',
      data: data instanceof Array ? data : [data]
    }
  }
  protected error(message: string): ErrorRespones {
    return {
      code: 500,
      message
    }
  }
}