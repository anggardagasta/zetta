import {Module} from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo';
import {MongooseModule} from '@nestjs/mongoose';
import {join} from "path";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {CandidateModule} from './candidate/candidate.module';
import {AppResolver} from "./app/app.resolver";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, // Makes the ConfigModule available globally
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('MONGODB_URI'),
            }),
            inject: [ConfigService],
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'), // Or true to generate in memory
            sortSchema: true,
        }),
        CandidateModule,
    ],
    providers: [
        AppResolver,
    ],
})
export class AppModule {
}