import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common'
import { catchError, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { format } from 'date-fns'

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now()

    return next.handle().pipe(
      map((data) => {
        let errorCode: number
        let errorMessage: string | object

        if (data instanceof HttpException) {
          errorCode = data.getStatus()
          errorMessage = data.getResponse()
        }

        return {
          response: context.switchToHttp().getResponse().statusCode,
          // request_id: context.switchToHttp().getRequest().headers[
          //   'x-request-id'
          // ],
          path: context.switchToHttp().getRequest().path,
          timestamp: format(now, 'yyyy-MM-dd HH:mm:ss'),
          error: errorCode,
          message: errorMessage,
          data: data,
        }
      }),
      catchError((error) => {
        console.error('Unhandled Error:', error)
        throw error
      }),
    )
  }
}
