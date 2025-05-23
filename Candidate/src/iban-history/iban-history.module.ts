import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IbanHistory, IbanHistorySchema } from './schemas/iban-history.schema';
import {IbanHistoryService} from "./services/iban-history.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: IbanHistory.name, schema: IbanHistorySchema }]),
  ],
  providers: [IbanHistoryService],
  exports: [MongooseModule],
})
export class IbanHistoryModule {}