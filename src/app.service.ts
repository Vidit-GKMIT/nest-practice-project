import { Injectable } from '@nestjs/common';

export interface healthResponse {
  message: string;
  date: Date;
  success: boolean;
}

@Injectable()
export class AppService {
  getHello(): healthResponse {
    return {
      message: 'Backend is running...!!',
      date: new Date(),
      success: true,
    };
  }
}
