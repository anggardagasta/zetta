import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {Candidate, CandidateSchema} from './schemas/candidate.schema';
import {CandidateResolvers} from './resolvers/candidate.resolvers';
import {IbanHistoryModule} from '../iban-history/iban-history.module';
import {AuthModule} from '../auth/auth.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Candidate.name, schema: CandidateSchema}
        ]),
        AuthModule,
        IbanHistoryModule,
    ],
    providers: [CandidateResolvers],
})
export class CandidateModule {
}